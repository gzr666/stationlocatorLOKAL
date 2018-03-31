(function(){

	

		angular.module("myApp")
		.controller("RegionController",function($scope,geoService,store,_,$rootScope,$state,$interval){

			
			//igra sa intervalima
			$scope.testinterval = [];

			function callInterval()
			{
				geoService.geoData().then(function(data){

					if($scope.testinterval.length > 4)
					{
						$scope.testinterval = [];
					}

						$scope.testinterval.push((data.data[0]));

				});
				
			}


			$interval(callInterval,5000);


			//odabir regije klik
			$scope.odaberiRegiju = function(regija)
			{
				switch(regija)
				{
					case 1:

						$rootScope.regija = 1;
						console.log($rootScope.regija);
						$state.go("home");
						break;

					case 2:
						
						$rootScope.regija = 2	;
						console.log($rootScope.regija);
						$state.go("home");
						break;

					default:
        				$rootScope.regija = 7;

				}


			};				


			

		
		});






}());