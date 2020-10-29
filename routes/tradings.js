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
router.get("/:id", (req, res, next) => {
    db.all("SELECT * FROM tradings WHERE kundid = " + req.params.id, function(err, rows) {
        if (err) {
            console.log(err)
        }
        res.json(rows);
    });
});

router.post("/:id", (req, res, next) => checkToken(req, res, next),
(req, res) => {
    var kundid = parseInt(req.body.id);
    // "UPDATE tradings SET event = (?), price = (?) WHERE object = (?) LIMIT 1"
    db.run("UPDATE tradings SET event = (?), price = (?) WHERE (object = (?) AND kundid = (?))",
    req.body.sold,
    req.body.price,
    req.body.object,
    kundid, (err) => {
        if (err) {
            console.log(err);
        }
        return res.status(201).json({
            data: {
                msg: "Got a POST request, sending back 201 ROW CHANGED",
                object: req.body.object + " sold"
            }
        });
    });
});

router.post("/", (req, res, next) => checkToken(req, res, next),
(req, res) => {
    for (var i=0; i < req.body.quantity; i++) {
        db.run("INSERT INTO tradings (kundid, object, event, price) VALUES (?, ?, ?, ?)",
        req.body.kundid,
        req.body.object,
        req.body.event,
        req.body.price, (err) => {
            if (err) {
                console.log(err);
            }
            return res.status(201).json({
                data: {
                    msg: "Got a POST request, sending back 201 Created",
                    object: req.body.object + " bought"
                }
            });
        });
    };
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
