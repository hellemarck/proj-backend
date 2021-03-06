var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('./db/texts.sqlite');
const db = require("../db/database.js");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

router.use(bodyParser.json());
router.use(express.json());

// get all posters
router.get("/", function(req, res, next) {
    db.all("SELECT * FROM posters", function(err, rows) {
        if (err) return res.status(500).json(err);

        res.json(rows);
    });
})

// Route to get poster content
router.get("/:id", function(req, res, next) {
    db.each("SELECT * FROM posters WHERE id = " + req.params.id, function(err, row) {
        const data = {
            data: {
                id: req.params.id,
                title: row.title,
                image: row.image,
                description: row.description,
                price: row.price
            }
        }
        res.json(data);
    });
})


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
