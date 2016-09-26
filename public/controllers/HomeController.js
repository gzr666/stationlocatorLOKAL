(function(){

		angular.module("myApp")
		.controller("HomeController",function($scope,geoService){

						$scope.name ="home";
						$scope.stanice = [];


			 $scope.getGeoData = function()
			{

				geoService.geoData().then(function(data){

					
					console.log(data.data);
					$scope.stanice = data.data;

				},function(error){

					console.log(error);

				});

			};


			 $scope.getGeoDataByType = function(id)
			{
				$scope.stanice = [];

				geoService.geoDataByType(id).then(function(data){

					
					console.log(data.data);
					$scope.stanice = data.data;

				},function(error){

					console.log(error);

				});

			};


		
		})



}());