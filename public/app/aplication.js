(function(){

var myApp = angular.module("myApp",["ui.router",'angularUtils.directives.dirPagination']);

myApp.config(function($stateProvider,$urlRouterProvider){


		$urlRouterProvider.otherwise("/home");

		$stateProvider.state("home",{

			url:"/home",
			templateUrl:"templates/home.html",
			controller:"HomeController"

       });



});





}());