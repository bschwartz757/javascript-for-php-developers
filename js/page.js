
var $ = require("./globals/jquery");

var EventEmitter = require("events").EventEmitter;
var ev = new EventEmitter();

ev.on("bingo", function(data){
    console.log(data);
});

$(function(){

    $("html").on("click", function(e){
       ev.emit("bingo", e.target);
    });

});