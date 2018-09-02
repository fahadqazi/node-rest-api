const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.render('index.pug', {title:"Vidly", message:"Hello, Vidly"})
});

module.exports = router;
