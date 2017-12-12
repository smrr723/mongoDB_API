var express = require('express');
var parser = require('body-parser');
var app = express();
var path = require("path");
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(express.static('client/build'));

var MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017/exoplanets", function(err, client){
   if(err){
      return console.log(err);
   }
// declare global variable
   db = client.db("exoplanets");;
   console.log("Connected to db");

   app.listen(3000, function(){
     console.log("Listening on port 3000");
   });
});

// db.collection("exoplanets").insert({name: "MOS3458", type: "4"});

// include GET, POST, DELETE routes in here.


app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/build/index.html');
});

app.get("/exoplanets", function(req, res){
   db.collection("exoplanets").find().toArray(function(err, results){
      if(err){
         return console.log(err);
      }
         res.json(results);
   });
});

app.post('/exoplanets', function(req, res){
   db.collection("exoplanets").save(req.body, function(err, result){
      if(err){
         return console.log(err);
      }
      console.log("Saved to DB");
      res.redirect("/exoplanets");
      // res.json(result);
   });
});

app.post('/exoplanets/delete', function(req, res){
   db.collection("exoplanets").remove();
   res.redirect("/exoplanets");
});
