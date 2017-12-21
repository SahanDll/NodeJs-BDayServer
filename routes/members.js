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

router.get('/getMembers', function (req, res, next) {
    memberData.find()
        .then(function (doc) {
            res.write(JSON.stringify(doc));
            res.end();
        });
});

router.get('/getMember', function (req, res, next) {
    memberData.find({name: req.query.name}).exec(function (err, doc) {
        if (!doc.length) {
            res.send({error: 'Data not found'});
        } else {
            res.write(JSON.stringify(doc));
        }
        res.end();
    });
});

router.post('/insertMembers', function (req, res, next) {
    var item = {
        name: 'sam',
        department: 'IT',
        age: 20,
        birthDay: new Date()
    };

    var data = new memberData(item);
    data.save();
    res.redirect('/')
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
