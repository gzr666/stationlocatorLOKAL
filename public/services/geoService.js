(function(){

angular.module("myApp")
.factory("geoService",function($http,$q){

	var localhost = location.hostname;
	var API_URL = "NONE"

	if(localhost=="localhost")
	{
		API_URL = "http://localhost:3000/api/stanice/";
	}
	else
	{
		API_URL = "http://stationlocator-gzr.rhcloud.com/api/stanice/";
	}


	var wakeUp = function()
	{
		var q = $q.defer();
		$http.get("http://stationlocator-gzr.rhcloud.com/api/v2/stanice?_id=57e64f915627aa427f1e0482")
		.then(function(data){

				q.resolve(data);

		},function(error){

				q.reject(error);
		});
			return q.promise;

	}

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



	var getGeoDataByType = function(id)
	{
		var q = $q.defer();
		$http.get(API_URL + id).then(function(data){



				q.resolve(data.data);


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