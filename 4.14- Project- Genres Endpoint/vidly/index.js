const debug = require("debug")("app:debug");
const Joi = require("joi");

const home = require('./routes/home')
const genres = require('./routes/genres')
const express = require("express");
const app = express();

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json());
app.use(express.urlencoded({entended: true}))
app.use(express.static('public'))

app.use('/api/genres', genres)
app.use('/', home)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}`));
