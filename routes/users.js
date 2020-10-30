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
// NEED TO BUILD THIS BOTH TO ADD AND TO SUBTRACT
router.post("/", (req, res, next) => {
    const kundid = parseInt(req.body.id);

    if (req.body.cost) {
        var reduce = parseInt(req.body.cost);
        db.run("UPDATE users SET depot = depot - (?) WHERE id = (?)",
        reduce,
        kundid, (err) => {
            if (err) {
                console.log(err);
            }
            return res.status(201).json({
                data: {
                    title: "Got a POST request, sending back 201 Created",
                    msg: "user depot updated"
                }
            });
        });
    } else {
        var deposit = parseInt(req.body.deposit);

        db.run("UPDATE users SET depot = depot + (?) WHERE id = (?)",
        deposit,
        kundid, (err) => {
            if (err) {
                console.log(err);
            }
            return res.status(201).json({
                data: {
                    title: "Got a POST request, sending back 201 Created",
                    msg: "user depot updated"
                }
            });
        });
    }
});

module.exports = router;
