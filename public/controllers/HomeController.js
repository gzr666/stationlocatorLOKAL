(function(){

	

		angular.module("myApp")
		.controller("HomeController",function($scope,geoService,store,_,$rootScope){

						$scope.name ="home";
						$scope.stanice = [];
						


						
						
/*
			 $scope.pop = function(){

					toaster.pop('success', "title", "text");


			}	*/	

			
			


				


			 $scope.getGeoData = function()
			{

				
				geoService.geoData().then(function(data){

					
					
					$scope.stanice = data.data;
					

				},function(error){

					

				});

			};


			


			 $scope.getGeoDataByType = function(id)
			{
				//$scope.pop();
				
				//$scope.loader = true;
				

				if(store.get("geoData") !== null)
				{
					
					
				$scope.stanice = [];

				var mydata = store.get("geoData");
				var test = _.where(store.get("geoData"),{'Vrsta':id.toString()});
				angular.copy(test,$scope.stanice);
				
				
				
				
				
				//angular.copy(test,$scope.stanice);
				//angular.copy($scope)
				$scope.imeStanice = "";
				
				


				}


				
				
				else
				{
				
				
					

						geoService.geoDataByType(id).then(function(data){

							//store.set("")

							
							angular.copy(data.data,$scope.stanice);
							//$scope.stanice = data.data;


							

						},function(error){

							

						}).then(function(){
							
							
						});

					};

				}



			

		
		});






}());