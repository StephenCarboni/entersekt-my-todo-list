const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

let todolist = [];

app.clearDatabase = () => {

    todolist = [];

};


/* The to do list and the form are displayed */
app.get('/todo', function(req, res) {
    res.render('todo.ejs', { todolist, clickHandler:"func1();" });
})

/* Adding an item to the to do list */
.post('/todo/add/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

/* Deletes an item from the to do list */
.get('/todo/delete/:id', function(req, res) {

    if (req.params.id != '') {
        todolist.splice(0, 1);
    }
    res.redirect('/todo');
})

.post('/todo/edit', urlencodedParser, (req,res) => {

    todolist[req.body.replacementindex] = req.body.replacementtodo;

    res.redirect('/todo');

})

/* Redirects to the to do list if the page requested is not found */
.use(function(req, res, next){
    res.redirect('/todo');
});


module.exports = app;