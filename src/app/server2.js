
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




// var orderModel = mongo.model('orders', OrderSchema, 'orders');
// var inventoryModel = mongo.model('inventory', inventorySchema, 'inventory');

// orderModel.find({}, function (req, res) {

//   console.log('Order data::' + res)
//   //   res.send({data:"success"});

// });





var Schema = mongo.Schema;

// var UsersSchema = new Schema({
//   id: { type: Number },
//   first_name: { type: String },
//   last_name: { type: String },
//   email: { type: String },
//   gender: { type: String },
//   ip_address: { type: {} },
//   homework : { type: {} },
//   quiz : { type: {} }
// }, { versionKey: false });

var UsersSchema = new Schema({
  homework: { type: {} },
  quiz: { type: {} },
  item: { type: String },
  price: { type: Number },
  quantity: { type: Number },
  date: { type: Date },
}, { versionKey: false });


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
var MyModel = mongo.model('users', UsersSchema, 'users');

// var MyModel = mongo.model('demodata', UsersSchema, 'demodata');

//https://docs.mongodb.com/manual/core/aggregation-pipeline/
// https://docs.mongodb.com/manual/reference/operator/aggregation/dayOfMonth/

// MyModel.find({ first_name: 'Lauralee', gender:"Female"}, function (err, docs) {
//   if (err) {
//     console.log("here is " + err);
//   }
//   else{
//     console.log("All Data is here ");
//     console.log(docs);
//   }
// });


// https://docs.mongodb.com/manual/reference/operator/aggregation/concatArrays/#exp._S_concatArrays
// MyModel.aggregate([
//   { $project: { items: { $concatArrays: [ "$instock", "$ordered" ] } } }
// ])


// The following operation uses $expr to find documents where the spent amount exceeds the budget
// MyModel.find( { $expr: { $gt: [ "$spent" , "$budget" ] } } )






// MyModel.find({ quantity: { $elemMatch: { $gte: 10, $lt:20 } } }, function (err, docs) {
//   if (err) {
//       console.log("here is " + err);
//   }
//   else {
//       console.log(JSON.stringify(docs));
//   }
// });

// Find Second Highest Number
// MyModel.find({}).sort({ qty: -1 }).skip(1).limit(1).exec(function (e, d) {
//   console.log(d)
// });

// Find Highest Number
// MyModel.distinct("qty").sort().exec(function (e, d) {
//   var sal = d;
//   console.log(sal);
//   MyModel.find({}).sort({ "qty": -1 }).limit(1).exec(function (e, g) {
//       console.log(g)
//   });
// });


// MyModel.find({
//   $expr: {
//       $lte: [{
//           $cond: {
//               if: { $gte: ["$quantity", 10] },
//               then: { $divide: ["$price", 2] },
//               else: { $divide: ["$price", 4] }
//           }
//       },
//           6]
//   }
// }, function (err, docs) {
//   if (err) {
//       console.log("here is " + err);
//   }
//   else {
//       console.log(JSON.stringify(docs));
//   }
// });

app.get("/api/getUser", function (req, res) {
  MyModel.aggregate(
    [
      {
        $project:
        {
          item: 1,
          quantity: 1,
          qtyLte250: { $lte: ["$quantity", 10] },
          _id: 0
        }
      }
    ],
    function (err, docs) {
      if (err) {
        console.log("here is " + err);
        res.send(err);
      }
      else {
        console.log(JSON.stringify(docs));
        res.send(docs);
      }
    })
})






// MyModel.find({ marks: { $gte: 520 } }, { "marks.$": 1, firstname: 1, _id: 0 }, function (err, docs) {
//   if (err) {
//       console.log("here is " + err);
//   }
//   else {
//       console.log(JSON.stringify(docs));
//   }
// });



// MyModel.find({ first_name: /Laur/i}, 'first_name gender', function (err, docs) {
//   if (err) {
//     console.log("here is " + err);
//   }
//   else{
//     console.log("All Data is here ");
//     console.log(docs);
//   }
// });



// MyModel.findById({_id: '5ba712ba0cc9dd74be875505' },"first_name last_name", function (err, docs) {
//   if (err) {
//     console.log("here is " + err);
//   }
//   else{
//     console.log("All Data is here ");
//     console.log(docs);
//   }
// });

// MyModel.findById({_id: '5ba712ba0cc9dd74be875509' }, function (err, docs) {
//   if (err) {
//     console.log("here is " + err);
//   }
//   else{
//     console.log("All Data is here ");
//     console.log(docs);
//   }
// });

// MyModel.findByIdAndDelete({ _id: '5ba712ba0cc9dd74be875509' }, function (err, docs) {
//   if (err) {
//     console.log("here is " + err);
//   }
//   else {
//     console.log("Data Deleted");
//   }
// });


// MyModel.findByIdAndUpdate({ _id: '5ba712ba0cc9dd74be8754fd' },{ $set: { first_name: 'UDaya bhanu' , last_name: 'swain' }}, function (err, docs) {
//   if (err) {
//     console.log("here is " + err);
//   }
//   else {
//     console.log("Data Updated");
//   }
// });

// MyModel.find({ id: { $gt: 5, $lt: 20 } }, function (err, docs) {
//   if (err) {
//     console.log("here is " + err);
//   }
//   else {
//     console.log(docs);
//   }
// });

// MyModel.find({ id: { $gte: 5, $lte: 20 } }, function (err, docs) {
//   if (err) {
//     console.log("here is " + err);
//   }
//   else {
//     console.log(docs);
//   }
// });

// MyModel.findOne({ id: { $gt: 5, $lt: 20 } }, function (err, docs) {
//   if (err) {
//     console.log("here is " + err);
//   }
//   else {
//     console.log(docs);
//   }
// });

// MyModel.find({ id: { $gt: 5, $lt: 20 } },'gender id email', function (err, docs) {
//   if (err) {
//     console.log("here is " + err);
//   }
//   else {
//     console.log(docs);
//   }
// });


// var query = { first_name: 'UDaya bhanu' };
// MyModel.findOneAndUpdate(query, { $set: { gender: 'Transgender' }}, function (err, docs) {
//   if (err) {
//     console.log("here is " + err);
//   }
//   else {
//     console.log(docs);
//   }
// });



// var query = { first_name: 'UDaya bhanu' , gender:'Male' };
// MyModel.findOneAndUpdate(query, { $set: { gender: 'male' }}, function (err, docs) {
//   if (err) {
//     console.log("here is " + err);
//   }
//   else {
//     console.log(docs);
//   }
// });


// MyModel.count({ first_name: 'UDaya bhanu' }, function (err, count) {
//   if (!err)
//   console.log('there are %d jungle adventures', count);
// });


// MyModel.countDocuments({ first_name: 'UDaya bhanu' }, function (err, count) {
//   console.log('there are %d jungle adventures', count);
// });


// MyModel.bulkWrite([
//   {
//     insertOne: {
//       document: {
//         id :120,
//         first_name: 'Eddard Stark',
//         last_name :'fan',
//         email:'udayacadila',
//         gender: 'Warden of the North',
//         ip_address:'1234.567.899'
//       }
//     }
//   },
//   {
//     updateOne: {
//       filter: { first_name: 'UDaya bhanu' },
//       update: { $set : {gender: 'Hand of the King'} }
//     }
//   }
// ]).then(res => {

//  console.log(res.insertedCount, res.modifiedCount);
// });


// var arr = [{ first_name: 'Hello Udaya' }, { gender: 'Angular developer as well as NodeJS also' }];
// MyModel.insertMany(arr, function(error, docs) {
//   console.log(docs);
// });



// MyModel.deleteMany({ first_name: /Lau/}, function (err) {
//   console.log("Deleted");
// });
// https://docs.mongodb.com/manual/reference/method/db.collection.bulkWrite/#db.collection.bulkWrite
// The supported operations are:

// insertOne
// updateOne
// updateMany
// deleteOne
// deleteMany
// replaceOne


// MyModel.create([
//   {
//     "id": 8000,
//     "first_name": "demodata10",
//     "last_name": "demodata20",
//     "email": "demo@gmail.com",
//     "gender": "Male",
//     "ip_address": [ "school", "clothing" ],
//     "homework": [ 100, 90 ],
//     "quiz": [ 87, 78 ]
//   },
//   {
//     "id": 9001,
//     "first_name": "demodata30",
//     "last_name": "demodata40",
//     "email": "demo@gmail.com",
//     "gender": "Male",
//     "ip_address": [ "a", "bb" ],
//     "homework": [ 17, 60 ],
//     "quiz": [ 27, 68 ]
//   }
// ], function(err ,doc){
// console.log("Inserted");
// })


// MyModel.find({ id: { $in: [5000, 5001] } }, function (err, doc) {
//   console.log(doc);
// })


// MyModel.update(
//   { ip_address: { $in: ["appliances", "school"] } },
//   { $set: { gender: "trans" } }, function (err, docs) {
//     console.log(docs);
//   }
// )

//https://docs.mongodb.com/manual/reference/operator/query/nin/
// MyModel.find({ ip_address: { $in: ["a"] } }, function (err, docs) {
//   console.log(docs);
// })

// MyModel.update({ "id": { $gt: 4000 } }, { $set: { gender: "male" } },{multi: true}, function (err, doc) {
//   console.log(doc);
// })

// MyModel.update({ $and: [{ "id": { $gt: 6000 }} ,{ first_name: /demo/i} ] }, { $set: { gender: "oklolo" } }, { multi: true }, function (err, doc) {
//   console.log(doc);
// })
// db.inventory.find( {
//   $and : [
//       { $or : [ { price : 0.99 }, { price : 1.99 } ] },
//       { $or : [ { sale : true }, { qty : { $lt : 20 } } ] }
//   ]
// } )
// https://docs.mongodb.com/manual/reference/operator/query/not/
// https://docs.mongodb.com/manual/reference/operator/query-comparison/
// db.inventory.find( { price: { $not: { $gt: 1.99 } } } )


// Agreegate Functions

// https://docs.mongodb.com/manual/reference/operator/aggregation/
// MyModel.aggregate([
//   {
//     $addFields: {
//       totalHomework: { $sum:"$homework"},
//       totalQuiz: { $sum: "$quiz" }
//     }
//   },
//   {
//     $addFields: {
//       totalScore:
//         { $add: ["$totalHomework", "$totalQuiz"] }
//     }
//   }
// ]).exec(function (e, d) {
//   console.log(d)
// });

// MyModel.aggregate( [
//   {
//      $addFields: {
//         "specs.fuel_type": "unleaded"
//      }
//   }
// ] )
// { _id: 1, type: "car", specs: { doors: 4, wheels: 4 } } before
// { _id: 1, type: "car",   specs: { doors: 4, wheels: 4, fuel_type: "unleaded" } }   add feild


// MyModel.aggregate([
//   { $match: { _id: 1 } },
//   { $addFields: { homework: { $concatArrays: [ "$homework", [ 7 ] ] } } }
// ])

// { _id: 1, student: "Maya", homework: [ 10, 5, 10 ], quiz: [ 10, 8 ], extraCredit: 0 }

// { "_id" : 1, "student" : "Maya", "homework" : [ 10, 5, 10, 7 ], "quiz" : [ 10, 8 ], "extraCredit" : 0 }





// db.fruit.aggregate( [
//   {
//     $addFields: {
//       _id : "$item",
//       item: "fruit"
//     }
//   }
// ] )
// { "_id" : 1, "item" : "tangerine", "type" : "citrus" }
// { "_id" : "tangerine", "item" : "fruit", "type" : "citrus" }


// https://docs.mongodb.com/manual/reference/operator/aggregation/group/

// MyModel.aggregate(
//   [
//     {
//       $group: {
//         _id: {},
//         totalPrice: { $sum: { $multiply: ["$price", "$quantity"] } },
//         averageQuantity: { $avg: "$homework" },
//         count: { $sum: 1 }
//       }
//     }
//   ]
// ).exec(function (e, d) {
//   console.log(d)
// });


// MyModel.aggregate(
//   [
//      {
//        $group : {
//           _id :'$item',
//           totalPrice: { $sum: { $multiply: [ "$price", "$quantity" ] } },
//           averageQuantity: { $avg: "$quantity" },
//           count: { $sum: 1 }
//        }
//      }
//   ]
// ).exec(function (e, d) {
//     console.log(d)
//   });


// MyModel.aggregate(
//   [
//     {
//       $group: {
//         _id: '$item',
//       }
//     }
//   ]
// ).exec(function (e, d) {
//   console.log(d)
// });


// orderModel.aggregate([

//   { "$match": { "item": "pecans" } },
//   {
//     $lookup:
//       {
//         from: "inventory",
//         localField: "item",
//         foreignField: "sku",
//         as: "inventory_docs"
//       }
//  }]).exec(function( err, data ) {

//   console.log( JSON.stringify( data) );

// });

// https://docs.mongodb.com/manual/reference/operator/aggregation/gte/

// db.orders.aggregate([
//   {
//      $lookup:
//         {
//           from: "warehouses",
//           let: { order_item: "$item", order_qty: "$ordered" },
//           pipeline: [
//              { $match:
//                 { $expr:
//                    { $and:
//                       [
//                         { $eq: [ "$stock_item",  "$$order_item" ] },
//                         { $gte: [ "$instock", "$$order_qty" ] }
//                       ]
//                    }
//                 }
//              },
//              { $project: { stock_item: 0, _id: 0 } }
//           ],
//           as: "stockdata"
//         }
//    }
// ])


// https://docs.mongodb.com/manual/reference/operator/aggregation/project/
// db.books.aggregate( [
//   {
//      $project: {
//         title: 1,
//         "author.first": 1,
//         "author.last" : 1,
//         "author.middle": {
//            $cond: {
//               if: { $eq: [ "", "$author.middle" ] },
//               then: "$$REMOVE",
//               else: "$author.middle"
//            }
//         }
//      }
//   }
// ] )
// https://docs.mongodb.com/manual/reference/operator/aggregation/map/

// db.grades.aggregate(
//   [
//      { $project:
//         { adjustedGrades:
//            {
//              $map:
//                 {
//                   input: "$quizzes",
//                   as: "grade",
//                   in: { $add: [ "$$grade", 2 ] }
//                 }
//            }
//         }
//      }
//   ]


app.listen(8080, function () {

  console.log('Example app listening on port 8080!')
}) 
