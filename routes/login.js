var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./db/texts.sqlite');
const db = require("../db/database.js");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.use(express.json());
const saltRounds = 10;

// let config = require('../config/config.json');

const jwtSecret = process.env.JWT_SECRET;

// Get route for login
router.get("/", function(req, res, next) {
    const data = {
        data: {
            msg: "Got a GET request on login"
        }
    };

    res.json(data);
});

// post route to login
router.post("/", (req, res) => {
    const email = req.body.email;
    const pw = req.body.pw;

    db.get("SELECT * FROM users WHERE email = (?)",
        email, (err, row) => {

        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    title: "Database error",
                    detail: err.message
                }
            });
        }

        if (row === undefined) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/login",
                    title: "No user found",
                    detail: "User with that email-address not found"
                }
            });
        }

        // using bcrypt w password, matching hash/pw
        bcrypt.compare(pw, row.password, function(err, result) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/login",
                        title: "bcrypt error",
                        detail: "bcrypt error"
                    }
                });
            }

            if (result) {
                console.log("correct password");
                const user = { email: email };
                const token = jwt.sign(user, jwtSecret, { expiresIn: '1h'});

                return res.json({
                    data: {
                        type: "success",
                        message: "User logged in",
                        user: user,
                        token: token
                    }
                });
            }

            // return 401 if pw incorrect
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/login",
                    title: "Wrong password",
                    detail: "The password is incorrect"
                }
            });
        });
    });
});


module.exports = router;
