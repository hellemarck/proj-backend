var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = require("../db/database.js");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.use(express.json());
// const saltRounds = 10;

const jwtSecret = process.env.JWT_SECRET;

// get route for info on specific user
router.get("/:id", (req, res, next) => {
    db.each("SELECT * FROM users WHERE id = " + req.params.id, function(err, row) {
        const data = {
            id: row.id,
            depot: row.depot,
            email: row.email
        }
        res.json(data);
    });
});

// Route to update user money depot
// need to check token?
router.post("/", (req, res, next) => {
    const deposit = req.body.deposit;
    const kundid = req.body.id;

    db.run("UPDATE users SET depot = depot + (?) WHERE id = (?)",
    deposit,
    kundid, (err) => {
        if (err) {
            console.log(err);
        }
        res.status(201).json({
            data: {
                title: "Got a POST request, sending back 201 Created",
                msg: "user depot updated"
            }
        });
    });
});

module.exports = router;
