const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase() );

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) { console.log('Unable to append to server.log'); }
    });
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.render('home.hbs', {
    title: 'Home Page',
    welcomeMessage: 'Welcom to this fantastic New Page about Some.'
}));

app.get('/about', (req, res) => res.render('about.hbs', {
    title: 'About Page'
}));
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Error handling request"
    })
})

app.listen(port, () => console.log(`Server is up on port ${port}`));
