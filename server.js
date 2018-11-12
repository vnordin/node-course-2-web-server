const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//om process.env.PORt inte finns sätts den till 3000.
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// app.get('/', (req, res) => {
//     //nedan är vad någon kommer få när man besöker sidan, eller om en request kommer från en app kommer nedan string finnas i bodyn.
//     //res.send('<h1>hello express</h1>');
//     res.send({
//         name: 'Victoria',
//         likes: [
//             'Cykel',
//             'Cities'
//         ]
//     });
// });

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Victorias Home page',
        welcomeMessage: 'Welcome to my page!'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Victorias about Page'
    });
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Could not fulfill request.'
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});