const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser')
const app = express();
const router = express.Router();
var mongo = require("mongoose");
const axios = require('axios');

var db = mongo.connect("mongodb://localhost:27017/Employee", function (err, response) {
    if (err) {
        console.log('Hi This is Kalanithi....');
        console.log(err);
    }
    else { console.log('Connected to ' + db, ' + ', response); }
});

app.use(bodyParser());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));




app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


var Schema = mongo.Schema;
// var testtable = new Schema({
//     id: { type: Number },
//     education: { type: Array },
//     firstname: { type: String },
//     lastname: { type: String },
//     keyskills: { type: Array },
//     marks: { type: Array },
//     company: { type: Array }
// }, { versionKey: false });

var testtable = new Schema({
    _id: { type: Number },
    item: { type: String },
    qty: { type: Number },
    price: { type: Number },
    quizzes: { type: Array },
    studentName: { type: String },
    exam: { type: String },
    course: { type: String },
    school: { type: String },
    marks: { type: Number },
}, { versionKey: false });



// var MyModel = mongo.model('testtable', testtable, 'testtable');

var MyModel = mongo.model('exp', testtable, 'exp');



// MyModel.find({ marks: { $gte: 520 } }, { "marks.$": 1 }, function (err, docs) {
//     if (err) {
//         console.log("here is " + err);
//     }
//     else {
//         console.log(JSON.stringify(docs));
//     }
// });

// MyModel.find({
//     $expr: {
//         $lte: [{
//             $cond: {
//                 if: { $gte: ["$qty", 100] },
//                 then: { $divide: ["$price", 2] },
//                 else: { $divide: ["$price", 4] }
//             }
//         },
//             6]
//     }
// }, function (err, docs) {
//     if (err) {
//         console.log("here is " + err);
//     }
//     else {
//         console.log(JSON.stringify(docs));
//     }
// });


MyModel.aggregate([
    { $sort: { studentName: 1, marks: -1 } },
    {
        $group: {
            _id: "$studentName",
            exam: { $push: '$exam' },
            course: { $push: 'course' },
            school: { $push: '$school' },
            Percentage: { $avg: '$marks' },
            max_mark: { $max: '$mark' },
            min_mark: { $min: '$mark' },
            all_marks: { $push: '$marks' }
        }
    },
    {
        $project: {
            exam: 1,
            course: 1,
            school: 1,
            Percentage: 1,
            max_mark: 1,
            min_mark: 1,
            second_max_mark: { $arrayElemAt: ['$all_marks', 1] }
        }
    }]).exec(function (e, d) {
        console.log(JSON.stringify(d))
    });

app.listen(8080, function () {

    console.log('Example app listening on port 8080!')
}) 
