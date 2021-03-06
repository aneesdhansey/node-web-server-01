const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    })
    next();
    
});

// app.use((req, res, next) => {
//     res.render('maintenance');
// });

app.use(express.static(`${__dirname}/public`))

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home Sweet Home!!!',
        welcomeMessage: '@@@@ This is dope ! @@@@'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects', {
        pageTitle: 'Projects',
        message: 'portfolio page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Unable to fulfill the request'
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});