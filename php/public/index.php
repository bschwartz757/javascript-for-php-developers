<?php
/**
 * Created by PhpStorm.
 * User: blakers757
 * Date: 3/31/2016
 * Time: 1:24 PM
 */

require "../vendor/autoload.php";

$app = new Slim\Slim();

$fs = new MyApp\FileSystem();
$app->get("/", function(){
    echo "Hello world!";
});

$app->get("/tweets(/:id)", function($id = null) use($app, $fs){

    $app->response->header("content-type", "application/json");
    
    $contents = $fs->readFile("../data/tweets.json");

    if (is_null($id)){
        echo $contents;
        return;
    }

    $tweets = json_decode($contents);
    $tweet = new MyApp\Tweet();
    $tweet->id = $id;
    $tweet->content = $tweets->$id->content;
    $tweet->username = $tweets->$id->username;
    echo $tweet->getJSON();

});

$app->get("/page", function(){

    include("page.php");

});

$app->run();