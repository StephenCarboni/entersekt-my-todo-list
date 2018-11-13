const expect = require("chai").expect;
const should = require("chai").should();
const axios = require("axios");
const querystring = require("querystring");
const app = require("../app");
const cheerio = require('cheerio');


const serverAddress = "http://localhost:8080";

describe("App", function () {

    const testTodo = "Buy milk at Pick 'n Pay by Wednesday";
    let httpServer;
    let httpClient;

    beforeEach(function startServer() {

        httpServer = require("http").createServer(app);
        httpServer.listen("8080");
        httpClient = axios.create({
            baseURL: serverAddress
        });
        app.clearDatabase();

    });

    afterEach(function shutdownServer() {

        httpServer.close();

    });

    it("should run without crashing", async function () {
        const res = await httpClient.get();
        expect(res.status).to.be.oneOf([200, 302]);
    });

    it("stores a todo", async () => {
        const res = await httpClient.post(
            "/todo/add/",
            querystring.stringify({newtodo: testTodo})
        );

        const $ = cheerio.load(res.data);

        const returnedTodo = $(".todo-text[data-index=0]").text();

        returnedTodo.should.equal(testTodo);

    });

    it("deletes a todo", async () => {

        // add a todo
        await httpClient
            .post("/todo/add/", querystring.stringify({newtodo: testTodo}));

        //ask for it to be deleted
        const resp = await httpClient
            .get("/todo/delete/0");

        // check it's not there
        const res = await httpClient
            .get("/todo");
        res.data.should.not.include(testTodo, `todo text ${testTodo} was found in response!`);

    });

    it("edits a todo", async () => {

        // add a todo
        await httpClient
            .post("/todo/add/", querystring.stringify({newtodo: testTodo}));

        // ask for it to be edited
        const newTodo = 'run away';

        const res = await httpClient
            .post("/todo/edit/", querystring.stringify({replacementindex: 0, replacementtodo: newTodo}));


        const $ = cheerio.load(res.data);

        const returnedTodo = $(".todo-text[data-index=0]").text();

        returnedTodo.should.equal(newTodo);

    });

    it("should escape html tags on todo output", async () => {

        const XSS_todo = "<script>alert('123');</script>";
        const resp = await httpClient
            .post("/todo/add/", querystring.stringify({newtodo: XSS_todo}));


        const $ = cheerio.load(resp.data);

        const scriptTag = $(".todo-text[data-index=0] script");

        expect(scriptTag).to.have.lengthOf(0, 'THERE IS A VALID SCRIPT TAG HERE!');


    });

});
