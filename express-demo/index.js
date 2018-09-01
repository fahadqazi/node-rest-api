const debug = require('debug')('app:startupt s')
const config = require('config')
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
const logger = require("./logger");
const auth = require("./authenticate");
const express = require("express");
const courses =  require('./routes/courses')
const app = express();
const port = process.env.PORT || 3000;

// Setting the view engine & setting location for views
app.set('view engine', 'pug')
app.set('views', './views')

// Built in Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true})); //key=value&key=value
app.use(express.static("public"));
app.use(helmet());

// For any routes begining with /api/courses use the 'courses' router
app.use('/api/courses', courses)

// Logging the environment
debug('Application name: ' + config.get('name'))
debug('Mail Server: ' + config.get('mail.host'))
debug('Mail Password: ' + config.get('mail.password'))

// setting development environment
if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    debug("Morgan enabled...");
}

// Custom Middleware
app.use(logger);
app.use(auth);

app.get("/", (req, res) => {
    res.render('index.pug', {title: 'My Express App', message:'Hello world'})
});

app.listen(port, err => {
    if (err) throw err;
    debug(`listening on port ${port}`);
});


