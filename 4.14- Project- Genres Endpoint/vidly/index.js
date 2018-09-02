const debug = require("debug")("app:debug");
const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const genres = [
    {id: 1, name: "Action"},
    {id: 2, name: "Horror"},
    {id: 3, name: "Romance"}
];

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.get("/api/genres", (req, res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id))
    if(!genre) res.status(404).send('Genre with given id now found')
    res.send(genre)
})

app.post("/api/genres", (req, res) => {
    const {error} = validateGenre(req.body);
    if (error) res.status(404).send(error);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

app.put("/api/genres/:id", (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) res.status(404).send("The genre was not found");

    const {error} = validateGenre(res.body);
    if (error) res.status(404).send(error);

    genre.name = req.body.name;
    res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) res.status(404).send("The genre wasn not found");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string()
            .min(3)
            .required(0)
    };
    return Joi.validate(genre, schema);
}
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port: ${port}`));
