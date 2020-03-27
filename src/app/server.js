
const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser')
const app = express();
const router = express.Router();
var mongo = require("mongoose");
const axios = require('axios');
//https://mongoosejs.com/docs/api.html#model_Model.find
//https://mongoosejs.com/docs/models.html#querying
var db = mongo.connect("mongodb://localhost:27017/users", function (err, response) {
  if (err) {
    console.log('Hi This is Kalanithi....');
    console.log(err);
  }
  else { console.log('Connected to ' + db, ' + ', response); }
});

app.use(bodyParser());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));


var Schema = mongo.Schema;

var UsersSchema = new Schema({
  name: { type: String },
  address: { type: String },
  sur_enm: { type: String },
}, { versionKey: false });

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.get('/api/Get_test', function (req, res) {
  var user_id = req.param('id');
  var token = req.param('token');
  var geo = req.param('geo');

  res.send({ 'id': user_id, 'token': token, 'geo': geo });
});


//https://mongoosejs.com/docs/api.html#model_Model.find

//https://mongoosejs.com/docs/api.html#query_Query



//db.getCollection('Exam').find({'students.mode':'Primary'}, { College: 1, Exam: 1 })
//db.getCollection('Exam').find({$and:[{'students.mode':'Primary'},{'Exam':'Final'}]}, { College: 1, Exam: 1 })
var Schema = mongo.Schema;

var OrderSchema = new Schema({
  item: { type: String },
  price: { type: String },
  quantity: { type: String },
}, { versionKey: false });

var inventorySchema = new Schema({
  sku: { type: String },
  description: { type: String },
  instock: { type: String },
}, { versionKey: false });

var orderModel = mongo.model('orders', OrderSchema, 'orders');
var inventoryModel = mongo.model('inventory', inventorySchema, 'inventory');

orderModel.find({}, function (req, res) {

  console.log('Order data::' + res)
  //   res.send({data:"success"});

});



// orderModel.aggregate([
//   {
//      $match: { 'item' : 'pecans' },
//     $lookup: 
//       {
//         from: "inventory",
//         localField: "item",
//         foreignField: "sku",
//         as: "inventory_docs"
//       }
//  },function( err, data ) {

//   if ( err )
//     throw err;

//   console.log( JSON.stringify( data, undefined, 2 ) );

// }
// ])


//var model = mongo.model('reg',UsersSchema, 'reg');
app.post('/api/Get_test2', function (req, res) {

  //console.log(req.param);
  console.log(req.body);
  // model.find({ sur_nm: /dsf/i }, 'name sur_nm', function (err, data) {
  //   if (err) {
  //     res.send('hihihi'+err);
  //   }
  //   else {
  //     console.log(data)
  //     res.send(data);
  //   }
  // });

  data = JSON.stringify(req.body)
  res.send(data);

});

//http://tutorialtous.com/mongodb/queryoperators.php
app.put('/api/Get_test3', function (req, res) {

  console.log(req.body);
  data = JSON.stringify(req.body)
  res.send(data);

});


app.listen(8080, function () {

  console.log('Example app listening on port 8080!')
}) 
