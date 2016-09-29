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
	geoDataByType:getGeoDataByType

}


});




}());