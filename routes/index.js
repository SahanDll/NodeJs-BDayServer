var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/birthday');
var Schema = mongoose.Schema;
var initDataSchema = new Schema({
    name: {type: String, required: true},
    department: String,
    age: Number,
    birthDay: {type: Date, required: true}
}, {collection: 'init'});

var initData = mongoose.model('init', initDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

