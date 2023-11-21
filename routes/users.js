var express = require('express');
var router = express.Router();
const {query}=require("../db")

/* GET users listing. */
router.get('/', async function(req, res, next) {
   res.json(await query());
});

module.exports = router;
