const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" }
];

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    const courseId = req.params.id;
    const course = courses.find(c => c.id === parseInt(courseId));
    if (!course) res.status(404).send("Request with given id not found");
    res.send(course);
});

app.post("/api/courses/", (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        res.status(400).send(
            "Name is required and should be minimum 3 characters"
        );
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.listen(port, err => {
    if (err) throw err;
    console.log(`listening on port ${port}`);
});
