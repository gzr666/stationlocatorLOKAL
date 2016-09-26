var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var morgan = require('morgan');
var restful = require('node-restful');
var favicon = require('serve-favicon');


var Stanica = require("./models/stanica");
var API_URL = "http://stationlocator-gzr.rhcloud.com/";


var app = express();
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/img/favicon.ico'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());
app.set('port', process.env.PORT || 3000);


//openshift or local
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000; 

//mongo connectionstring
//mongodb configuration
var mongoHost = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost';
var mongoPort = process.env.OPENSHIFT_MONGODB_DB_PORT || 27017;
var mongoUser = "admin"; //mongodb username
var mongoPass = "Buz-S9gtgMTm"; //mongodb password
var mongoDb   = "stationlocator"; //mongodb database name

var mongoString = 'mongodb://' + mongoUser + ':' + mongoPass + '@' + mongoHost + ':' + mongoPort +  '/' + mongoDb;

if (typeof process.env.OPENSHIFT_MONGODB_DB_HOST === "undefined") {
    
    mongoString = "mongodb://localhost/stationlocator";
  };




//mongo connection
mongoose.connect(mongoString);
var db = mongoose.connection;
db.on("error",function(error){
console.log(error);
});

db.once("open",function(){
console.log("success");

});


//node-restful resources
var stanicaResource = restful.model("resource",Stanica.shema)
.methods(["get","post","put","delete"]);
stanicaResource.register(app,"/api/v2/stanice");



app.get('/', function(req, res){
res.type('text/html');
res.sendFile("/index.html");
});

app.get("/api/stanice",function(req,res){

Stanica.model.find({},function(err,data){

console.log(data);
res.status(200).json({data:data});

});



	

});


app.get("/api/stanice/:vrstaid",function(req,res){

Stanica.model.find({Vrsta:req.params.vrstaid},function(err,data){
console.log(req.params.vrstaid);

res.status(200).json({data:data});

});



	

});






// custom 404 page
app.use(function(req, res){
res.type('text/plain');
res.status(404);
res.send('404 - Not Found');
});
// custom 500 page
app.use(function(err, req, res, next){
console.error(err.stack);
res.type('text/plain');
res.status(500);
res.send('500 - Server Error');
});
app.listen(app.get('port',ipaddress), function(){



 });
