var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var stanicaSchema = new Schema({

	Organizacija:String,
	naziv:String,
	TS:String,
	broj:String,
	Long:Number,
	Lat:Number



},{ collection: 'koordinate' });


var Stanica = mongoose.model("koordinate",stanicaSchema,"koordinate");


module.exports = {shema:stanicaSchema,
				model:Stanica};






