const debug = require('debug')('app:delete')
const express = require('express')
const router = express.Router();
const Joi = require('joi')

const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"}
];

router.get("/", (req, res) => {
    res.send(courses);
});

router.get("/:id", (req, res) => {
    const courseId = req.params.id;
    const course = courses.find(c => c.id === parseInt(courseId));
    if (!course) return res.status(404).send("Request with given id not found");
    res.send(course);
});

router.post("/", (req, res) => {
    const result = validateCourse(req.body);

    if (result.error) return res.status(400).send(result.error);
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
    //look up course
    //if doesn't exit, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    debug(course)
    if (!course) return res.status(404).send("Course with that id not found");

    // delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //return same course
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string()
            .min(3)
            .required()
    };
    return Joi.validate(course, schema);
}

module.exports = router;