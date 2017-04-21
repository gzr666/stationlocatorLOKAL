(function(){

	

		angular.module("myApp")
		.controller("HomeController",function($scope,geoService,store,_,$rootScope){

						$scope.name ="home";
						$scope.stanice = [];
						$scope.disableButton = true;
						$scope.remDiv = true;




			$scope.VN = "VN";			

						$scope.showPostr = false;
					

						


						
						
/*
			 $scope.pop = function(){

					toaster.pop('success', "title", "text");


			}	*/	

			
			var limitStep = 10;
			$scope.limit = limitStep;
			$scope.incrementLimit = function() {
    		$scope.limit += limitStep;
			if($scope.limit > $scope.stanice.length)
			{
				$scope.disableButton = true;
			}


			};

			$scope.removeDiv = function()
			{
				
				if($scope.imeStanice=="")
				{
					$scope.remDiv = true;
				}
				else{

				$scope.remDiv = false;
				}
			}



				


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

				if(id==1)
				{
					$scope.tipPostr = "VN";
					$scope.showPostr = true;
				}

				else if(id==2)
				{
					$scope.tipPostr = "SN";
					$scope.showPostr = true;
				}
				else if(id==3)
				{
					$scope.tipPostr = "KRO";
					$scope.showPostr = true;
				}
				else
				{
					$scope.showPostr = false;
				}
				
				//$scope.loader = true;
				$scope.limit = limitStep;
				$scope.remDiv = true;

				if(store.get("geoData") !== null)
				{
					
					
				$scope.stanice = [];

				var mydata = store.get("geoData");
				var test = _.where(store.get("geoData"),{'Vrsta':id.toString()});
				angular.copy(test,$scope.stanice);

				if($scope.limit > $scope.stanice.length)
					{
						$scope.disableButton = true;
					}
					else{
						$scope.disableButton = false;
					}

				
				
				
				
				
				
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