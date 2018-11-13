# Todo list exercise

### Install

- Install https://nodejs.org/en/
- Download archive from link provided
- Unzip file and cd into it
- run `npm install`

### Run
`node app.js`

Visit http://localhost:8080 in your browser

### High level application requirements
1. Multiple users should be able to view the shared public todo list
2. Should be able to add items
3. Should be able to delete items
4. Should be able to edit items (Missing feature)
5. Must be able to deploy in docker (Missing feature)

### Tasks
1. Add missing requirement #4 to the application
2. Add sufficient test coverage to the application and update readme on howto run the tests
3. Add missing requirement #5 to the application (Dockerfile and update readme with instructions)

### Bonus
4. Display test coverage after tests are executed
5. Find and fix the XSS vulnerability in the application. Also make sure that it wont happen again by including a test.

> ### Notes
> - Update the code as needed and document what you have done in the readme below
> - Will be nice if you can git tag the tasks by number

### Solution
Explain what you have done here and why...

**Stephen Carboni:**

Refactored the http server out of app.js. This makes testing easier.
Run the app with `npm start`

>Add missing requirement #4 to the application

Added a new post endpoint and form to the template to provide this.
Buttons with pencil icon just selects the option in the dropdown for you.

>Add sufficient test coverage to the application and update readme on howto run the tests

I used:
 - `mocha` as the testing framework
 - `istanbul` for coverage
 - `axios` as an HTTP client
 - `cheerio` for parsing the returned DOM
 - `chai` to make the tests read more naturally

Run `npm run test` to start tests.

>Add missing requirement #5 to the application (Dockerfile and update readme with instructions)

Docker does not have release for Fedora 29 yet. Which is what I'm using. But, I've created `Dockerfile`
 and `.dockerignore` according to instructions online.
 
To build:

Change into repo and `docker build -t <your username>/my-todolist .`

Running:

`docker run -p <port you want>:8080 -d <your username>/my-todolist`
 
 The app should now be serving over `localhost:<port you want>`

>Display test coverage after tests are executed

`npm run test` does so.

>Find and fix the XSS vulnerability in the application. Also make sure that it wont happen again by including a test.

Done and there is a test case. Change `<%= todo %>` back to `<%- todo %>` to watch it fail.

