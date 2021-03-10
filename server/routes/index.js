const express = require('express');
const router = express.Router();

router.get('/', function(req,res){
    res.send({greeting:'Hello React X Node.js'});
});

module.exports = router;