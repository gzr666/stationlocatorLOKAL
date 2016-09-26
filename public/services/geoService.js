(function(){

angular.module("myApp")
.factory("geoService",function($http,$q){

	var getGeoData = function()
	{
		var q = $q.defer();
		$http.get("http://stationlocator-gzr.rhcloud.com/api/stanice").then(function(data){



				q.resolve(data.data);


		},function(error){

			q.reject(error)

		});

		return q.promise;

	};



	var getGeoDataByType = function(id)
	{
		var q = $q.defer();
		$http.get("http://stationlocator-gzr.rhcloud.com/api/stanice/" + id).then(function(data){



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