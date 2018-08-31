const Joi = require("joi");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"}
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
    if (!course) return res.status(404).send("Request with given id not found");
    res.send(course);
});

app.post("/api/courses/", (req, res) => {
    const result = validateCourse(req.body);

    if (result.error) return res.status(400).send(result.error);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
    //lookup course
    //if not return 404
    var course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Course not found");

    //validate input
    //if invalid return 404
    const result = validateCourse(req.body);

    if (result.error) return res.status(404).send(result.error);

    //update course
    //return udpated course
    course.name = req.body.name;
    res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
    //look up course
    //if doesn't exit, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("Course with that id not found");

    // delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //return same course
    res.send(course);
});

app.listen(port, err => {
    if (err) throw err;
    console.log(`listening on port ${port}`);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string()
            .min(3)
            .required()
    };
    const result = Joi.validate(course, schema);
    return result;
}
