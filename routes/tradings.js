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

// Get route for all tradings
router.get("/", function(req, res, next) {
    db.all("SELECT * FROM tradings", function(err, rows) {
        if (err) return res.status(500).json(err);

        res.json(rows);
    });
});

// history of user tradings
// router.get("/:id", (req, res, next) => {
//     db.each("SELECT * FROM tradings WHERE kundid = " + req.params.id, function(err, row) {
//         const data = {
//             kundid: row.kundid,
//             object: row.object,
//             event: row.event,
//             price: row.price
//         }
//         res.json(data);
//     });
// });

router.post("/", (req, res, next) => checkToken(req, res, next),
(req, res) => {
    if (req.body.quantity) {
        for (var i=0; i < req.body.quantity; i++) {
            db.run("INSERT INTO tradings (kundid, object, event, price) VALUES (?, ?, ?, ?)",
            req.body.kundid,
            req.body.object,
            req.body.event,
            req.body.price, (err) => {
                if (err) {
                    console.log(err);
                }
                res.status(201).json({
                    data: {
                        msg: "Got a POST request, sending back 201 Created"
                    }
                });
            });
        };
    } else {
        db.run("UPDATE tradings SET event = (?), price = (?) WHERE (kundid = (?) AND object = (?)) ORDER BY price LIMIT 1",
        req.body.sold,
        req.body.object
        req.body.price,
        req.body.id, (err) => {
            if (err) {
                console.log(err);
            }
        });
        res.status(201).json({
            data: {
                msg: "Got a POST request, sending back 201",
                price: req.body.price,
                id: req.body.id,
                object: req.body.object,
                sold: req.body.sold
            }
        });
    }
});

// function to verify user
function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, jwtSecret, function(err) {
            if(err) {
                console.log("crashed");
                return res.status(500).json({
                    errors: {
                        status: 500,
                        title: "Token not verified",
                        detail: "Token expired, cannot make changes"
                    }
                })
            }
            console.log("successfully validated token");
            next();

            return undefined;
        });
    } else {
        return res.status(401).json({
            errors: {
                status: 401,
                source: req.path,
                title: "No token",
                detail: "No token provided in request headers"
            }
        });
    }
};



module.exports = router;
