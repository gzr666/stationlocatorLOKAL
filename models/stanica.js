var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var stanicaSchema = new Schema({

	Organizacija:String,
	Naziv:String,
	Nivo:String,
	Tip:String,
	Broj:String,
	"Long":String,
	Lat:String,
	Vrsta:String,
	regija:String



},{ collection: 'koordinateTEST' });


var Stanica = mongoose.model("koordinate",stanicaSchema,"koordinateTEST");


module.exports = {shema:stanicaSchema,
				model:Stanica};






