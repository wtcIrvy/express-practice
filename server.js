const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server log.')
        }
    });
    next();
});

/**
 * USED Incase want to put website under maintenance!!
 * app.use((req, res, next) => {
    res.render('maintenance.hbs');
});**/

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('shoutIt', (string) => {
    return string.toUpperCase();
});
//(url, function to run)
app.get('/', (request, response) => {
    //response.send('<h1>Yo Yo G-Star</h1>');
    response.render('home.hbs', {
        pageTitle: 'My Website',
        welcomeMessage: 'Welcome To The Home Page',
        author: 'Luke Irvine'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page',
    });
});
app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Unable to handle request'
    });
});
app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
});

