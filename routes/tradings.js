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
    db.each("SELECT * FROM tradings WHERE kundid = " + req.params.id, function(err, row) {
        const data = {
            kundid: row.kundid,
            object: row.object,
            event: row.event,
            price: row.price
        }
        res.json(data);
    });
});


module.exports = router;
