var express = require('express');
var app = express();
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var ObjectID = mongodb.ObjectID;
var path = require('path');

app.use(bodyParser.json());
app.use(express.static('client/build'));


app.get('/', function (req, res) {
 res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use(express.static('client/build'));


var server = app.listen(3000, function () {
 var host = server.address().address;
 var port = server.address().port;

 console.log('Example app listening at http://%s:%s', host, port);
});

app.get("/airports/:code", function(req,res){
 MongoClient.connect('mongodb://localhost:27017/airportsAPI', function(err, db){
   var collection = db.collection('airports');
   collection.find({
    'code': {'$eq': req.params.code}
   }).toArray(function(err, docs){
     console.log(docs);
     res.json(docs);
     db.close();
   })
 })
})


// app.get ('/flights')
//app.get ('/hotels')
//app.get ('/uber')

// here we are not creating or updating we are just retrieving info