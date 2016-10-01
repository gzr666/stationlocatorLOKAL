var express = require('express');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var morgan = require('morgan');
var restful = require('node-restful');
var favicon = require('serve-favicon');
var cors = require('cors');
var c = require('appcache-node');


//application cache code
var cf = c.newCache(
  [

		"components/bootstrap/dist/css/bootstrap.css",
		"css/style.css",
		"img/apple-icon-57x57.png",
		"img/apple-icon-60x60.png",
		"img/apple-icon-72x72.png",
		"img/apple-icon-76x76.png",
		"img/apple-icon-114x114.png",
		"img/apple-icon-120x120.png",
		"img/apple-icon-144x144.png",
		"img/apple-icon-152x152.png",
		"img/apple-icon-180x180.png",
		"img/android-icon-192x192.png",
		"img/favicon-32x32.png",
		"img/favicon-96x96.png",
		"img/favicon-16x16.png",
		"img/manifest.json",
	    "components/jquery/dist/jquery.js",
		"components/bootstrap/dist/js/bootstrap.js",
	    "/app/aplication.js",
	    "/app/underscore.js",
	    "components/lodash/dist/lodash.js",
	 	"components/underscore/underscore.js",
	 	"components/angular/angular.js",
	 	"components/gmaps/gmaps.js",
	 	"components/angular-ui-router/release/angular-ui-router.js",
	 	"app/aplication.js",
	 	"controllers/HomeController.js",
	 	"services/geoService.js",
	 	"components/angularUtils-pagination/dirPagination.js",
	 	"components/a0-angular-storage/dist/angular-storage.js",
	 	"app/underscore.js",
	 	"components/ng-debounce/angular-debounce.js",
	 	"templates/home.html",
	 	"img/loader.gif",
	 	"img/loader2.gif",
	 	"img/logo1.png",
	 	"img/logo2.png",
	 	"img/logo3.png"

    
  ]
);



var Stanica = require("./models/stanica");
var API_URL = "http://stationlocator-gzr.rhcloud.com/";


var app = express();
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/img/favicon.ico'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride("X-HTTP-Method-Override"));
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


//cache requests
app.all('/app.cache', function(req, res){
    res.writeHead(200, {'Content-Type': 'text/cache-manifest'});
    res.end(cf);
})


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
app.listen(port,ipaddress, function(){



 });
