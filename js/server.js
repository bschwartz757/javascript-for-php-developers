var express = require("express");
var app = express();

var fs = require("fs");
var FS = require("q-io/fs");
var makeGreeter = require("./lib/makeGreeter");
var Tweet = require("./lib/tweet");

var hello = makeGreeter("hello");
var howdy = makeGreeter("howdy partner, how are you", "?");

app.get("/", function(req, res){
  res.send("Hello from JS!");
});

app.get("/hello/:from", function(req, res){
  res.send(hello(req.params.from.toUpperCase()));
});

app.get("/howdy/:from", function(req, res){
  res.send(howdy(req.params.from.toUpperCase()));
});

app.get("/tweets/?(:id)?", function(req, res){

  fs.readFile("../php/data/tweets.json", function(error, result){

    // if(error){
    //   res.send(error);
    //   return;
    // }

    var tweets = result.toString();

    if (!req.params.id){
      res.send(tweets);
      return;
    }

    var tweet = JSON.parse(tweets)[req.params.id];
    tweet.id = req.params.id;
    res.send(Tweet.prototype.getJSON.call(tweet));

  });

});

app.get("/promise/tweets/?(:id)?", function(req, res){

  FS.read("../php/data/tweets.json", "b")

  .then(function(result){

    var tweets = result.toString();

    if (!req.params.id){
      res.send(tweets);
      return;
    }

    var tweet = JSON.parse(tweets)[req.params.id];
    tweet.id = req.params.id;
    res.send(Tweet.prototype.getJSON.call(tweet));

  });

});

app.listen(3000);
