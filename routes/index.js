var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.json(presentation);
});



var presentation = `<p>Välkommen till webbshopen för posters, med realtidsvärdering! Bläddra runt bland utbudet, investera i det som faller dig i smaken och sälj med förtjänst.</p>

`;

module.exports = router;
