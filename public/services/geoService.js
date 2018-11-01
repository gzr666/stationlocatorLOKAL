(function(){

angular.module("myApp")
.factory("geoService",function($http,$q){


	// openshift stuff
	/*var localhost = location.hostname;
	var API_URL = "NONE"

	if(localhost=="localhost")
	{
		API_URL = "http://localhost:3000/api/stanice/";
	}
	else
	{
		API_URL = "http://stationlocator-gzr.rhcloud.com/api/stanice/";
	}*/

	var API_URL = "http://localhost:1188/api/stanice";

	var wakeUp = function()
	{
		var q = $q.defer();

		//OPENSHIFT CALL
		//$http.get("http://stationlocator-gzr.rhcloud.com/api/v2/stanice?_id=59004a0475c103eec4c89228")
		$http.get("https://stationlocator.herokuapp.com/api/v2/stanice?_id=59004a0475c103eec4c89228")
		.then(function(data){

				q.resolve(data);

		},function(error){

				q.reject(error);
		});
			return q.promise;

	}


	//funkcija koja inicijalno puni bazu localStorage
	var getGeoData = function()
	{
		var q = $q.defer();

		$http.get(API_URL).then(function(data){



				q.resolve(data.data);


		},function(error){

			q.reject(error)

		});

		return q.promise;

	};



	//dohvacanje stanica po tipu(VN,SN itd...)
	var getGeoDataByType = function(id)
	{
		var q = $q.defer();
		$http.get(API_URL + id).then(function(data){



				q.resolve(data.data);

				console.log(data.data);


		},function(error){

			q.reject(error)

		});

		return q.promise;

	}


return {

	geoData:getGeoData,
	geoDataByType:getGeoDataByType,
	wakeMyApp:wakeUp


}


});




}());