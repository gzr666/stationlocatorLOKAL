(function(){

var myApp = angular.module("myApp",["ui.router",'angularUtils.directives.dirPagination',"angular-storage","underscore","debounce"]);

myApp.config(function($stateProvider,$urlRouterProvider){


		$urlRouterProvider.otherwise("/home");

		$stateProvider.state("home",{

			url:"/home",
			templateUrl:"templates/home.html",
			controller:"HomeController"

       });



});

myApp.run(function(store,geoService,$rootScope,$timeout){

		function callshit()
		{
			$rootScope.loadingData = false;
		}
		$rootScope.loadingData = true;

		geoService.wakeMyApp().then(function(data){

			
		});

		$timeout(callshit,5000);


		

	if(store.get("geoData")===null)
	{
		
	geoService.geoData().then(function(data){

					//$rootScope.loadingData = true;
					store.set("geoData",data.data);
					

					//$rootScope.loadingData = false;
				
					

				},function(error){

					console.log(error);

				});
	}



});






}());