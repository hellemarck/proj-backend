var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./db/texts.sqlite');
const db = require("../db/database.js");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// get route - register user
router.get("/", function(req, res, next) {
    const data = {
        data: {
            msg: "Got a GET request"
        }
    };

    res.json(data);
});

// post route - register new user
router.post("/", (req, res) => {
    console.log(req.body.email);
    console.log(req.body.pw);

    bcrypt.hash(req.body.pw, saltRounds, function(err, hash) {
        db.run("INSERT INTO users (email, password) VALUES (?, ?)",
        req.body.email,
        hash, (err) => {
            if (err) {
                console.log(err);
            }
            res.status(201).json({
                data: {
                    msg: "Got a POST request, sending back 201 Created"
                }
            });
        });
    });
});

router.put("/", (req, res) => {
    // PUT requests should return 204 No Content
    res.status(204).send();
});

router.delete("/", (req, res) => {
    // DELETE requests should return 204 No Content
    res.status(204).send();
});



module.exports = router;
