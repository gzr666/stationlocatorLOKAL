(function(){

		angular.module("myApp")
		.controller("HomeController",function($scope,geoService,store,_){

						$scope.name ="home";
						$scope.stanice = [];



			 $scope.getGeoData = function()
			{

				
				geoService.geoData().then(function(data){

					
					
					$scope.stanice = data.data;
					

				},function(error){

					

				});

			};


			 $scope.getGeoDataByType = function(id)
			{
				$scope.stanice = [];
				$scope.loader = true;
				

				if(store.get("geoData") != null)
				{

				var mydata = store.get("geoData");
				var test = _.where(store.get("geoData"),{'Vrsta':id.toString()});
				
				
				angular.copy(test,$scope.stanice);
				$scope.loader = false;

				}


				
				
				else
				{
				

						geoService.geoDataByType(id).then(function(data){

							//store.set("")

							angular.copy(data.data,$scope.stanice);
							//$scope.stanice = data.data;

							

						},function(error){

							console.log(error);

						}).then(function(){
							$scope.loader = false;
						});

					};

				}



			

		
		})



}());