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

myApp.run(function(store,geoService,$rootScope){

		$rootScope.loadingData = false;

		

	if(store.get("geoData")===null)
	{
		
	geoService.geoData().then(function(data){

					$rootScope.loadingData = true;
					store.set("geoData",data.data);
					

					$rootScope.loadingData = false;
				
					

				},function(error){

					console.log(error);

				});
	}



});






}());