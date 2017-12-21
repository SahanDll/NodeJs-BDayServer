var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/birthday');
var Schema = mongoose.Schema;
var memberDataSchema = new Schema({
    name: {type: String, required: true},
    department: String,
    age: Number,
    birthDay: {type: Date, required: true}
}, {collection: 'member'});

var memberData = mongoose.model('member', memberDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.get('/getMembers', function (req, res, next) {
    memberData.find()
        .then(function (doc) {
            res.write(JSON.stringify(doc));
            res.end();

        });
});

router.post('/insertMembers', function (req, res, next) {
    var item = {
        name: 'sahan',
        department: 'IT',
        age: 30,
        birthDay: new Date()
    };

    var data = new memberData(item);
    data.save();
    res.redirect('/')
});