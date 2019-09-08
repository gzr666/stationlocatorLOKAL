(function(){

	

		angular.module("myApp")
		.controller("HomeController",function($scope,geoService,store,_,$rootScope){

						$scope.name ="home";
						$scope.stanice = [];
						$scope.disableButton = true;
						$scope.remDiv = true;
						$scope.VN = "VN";			
						$scope.showPostr = false;
						$scope.odabranoPodrucje = "";
			// ako je rootScope.regija 	undefined postavi ga na jedan
			if($rootScope.regija == undefined)
			{
				$rootScope.regija = 1;
				$scope.odabranoPodrucje = "ElektroDalmacija";
			}
			if($rootScope.regija == 1)
			{
				
				$scope.odabranoPodrucje = "ElektroDalmacija";
			}

			if($rootScope.regija == 2)
			{
				
				$scope.odabranoPodrucje = "ElektroSlavonija";
			}


			
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
				else if(id==4)
				{
					$scope.tipPostr = "KK";
					$scope.showPostr = true;
				}
				else if(id==5)
				{
					$scope.tipPostr = "RS";
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
				console.log($rootScope.regija);
				console.log(id);
				console.log(mydata)
				var test = _.where(mydata,{'Vrsta':id.toString()});
				var test2 = _.where(test,{'Regija':$rootScope.regija});
				console.log(test2);
				angular.copy(test2,$scope.stanice);

				console.log($scope.stanice);

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