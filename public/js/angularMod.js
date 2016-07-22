var app = angular.module('myApp',['ui.router']);

app.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){

			$stateProvider
				.state('home', {
					url: '/home',
					templateUrl: '/home.html',
					controller: 'homeCtrl'
				});
			$urlRouterProvider.otherwise('home');
		}]);

app.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){

			$stateProvider
				.state('about', {
					url: '/about',
					templateUrl: '/about.html',
					controller: 'sliderCtrl'
				});
		}]);

app.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){

			$stateProvider
				.state('contact', {
					url: '/contact',
					templateUrl: '/contact.html',
					controller: 'mainCtrl'
				});
		}]);

app.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){

			$stateProvider
				.state('info', {
					url: '/info',
					templateUrl: '/info.html',
					controller: 'mainCtrl'
				});
		}]);

app.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){

			$stateProvider
				.state('gallery', {
					url: '/gallery',
					templateUrl: '/gallery.html',
					controller: 'mainCtrl'
				});
		}]);

app.controller('sliderCtrl', ['$scope', function($scope){
	$scope.fxLogo = function(){
		$('.wp1').waypoint(function() {
			$('.wp1').addClass('animated fadeInLeft');
			}, {
				offset: '75%'
		});

		$('#featuresSlider').flickity({
			cellAlign: 'left',
			contain: true,
			prevNextButtons: false
		});

		$('#showcaseSlider').flickity({
			cellAlign: 'left',
			contain: true,
			prevNextButtons: false,
			imagesLoaded: true
		});
	}

	$scope.aboutBackground = function(){
		$('.texture-overlay')
			.fadeIn(4000)
			.css({ 'background': 'rgba(0, 21, 255, 0.1) url("img/diamond-light.png")', 'opacity' : '0.5' });
		$('body').css({ 
			'background': 'url("img/blur-bg.jpg")', 
			'background-size' : 'cover', 
			'background-repeat': 'no-repeat',
			'background-attachment': 'fixed'
		 });
	}


}]);

app.controller('navCtrl', ['$scope', function($scope){
	$scope.navToggle = function(){
		$(".nav-toggle").toggleClass("active");
		$(".overlay-boxify").toggleClass("open");
	}
}]);

app.controller('mainCtrl', ['$scope', function($scope){

	$scope.loadPacks = function(){
		$('.wp2').waypoint(function() {
			$('.wp2').addClass('animated fadeInDown');
		}, {
			offset: '75%'
		});
	}

	$scope.emailUs = function(){
		if(!$scope.subject || $scope.subject == undefined  || $scope.subject == ""){ return; }
		if(!$scope.body || $scope.body == undefined || $scope.body == ""){ return; }

		subject = encodeURIComponent($scope.subject);
		body = encodeURIComponent($scope.body);

		var link = "mailto:elparaisonievesyraspados@gmail.com?subject=";
		link += subject;
		link += '&body=';
		link += body;

		window.location.href = link;

		$('.email').fadeOut(1500);
		$('.success').delay(1000).fadeIn(1000);
	}

	$scope.pictures = [
		{ 
			set1: [
				{url: 'http://img1.beachbodyimages.com/beachbody/image/upload/v1435693633/beachbodyblog/Chocolate-Peanut-Butter-Shakeology-Ice-Cream.jpg'},
				{url: 'http://img1.beachbodyimages.com/beachbody/image/upload/v1435693633/beachbodyblog/Chocolate-Peanut-Butter-Shakeology-Ice-Cream.jpg'},
				{url: 'http://img1.beachbodyimages.com/beachbody/image/upload/v1435693633/beachbodyblog/Chocolate-Peanut-Butter-Shakeology-Ice-Cream.jpg'},
				{url: 'http://img1.beachbodyimages.com/beachbody/image/upload/v1435693633/beachbodyblog/Chocolate-Peanut-Butter-Shakeology-Ice-Cream.jpg'}
			]
		},
		{
			set2: [
				{url: 'http://img1.beachbodyimages.com/beachbody/image/upload/v1435693633/beachbodyblog/Chocolate-Peanut-Butter-Shakeology-Ice-Cream.jpg'},
				{url: 'http://img1.beachbodyimages.com/beachbody/image/upload/v1435693633/beachbodyblog/Chocolate-Peanut-Butter-Shakeology-Ice-Cream.jpg'},
				{url: 'http://img1.beachbodyimages.com/beachbody/image/upload/v1435693633/beachbodyblog/Chocolate-Peanut-Butter-Shakeology-Ice-Cream.jpg'},
				{url: 'http://img1.beachbodyimages.com/beachbody/image/upload/v1435693633/beachbodyblog/Chocolate-Peanut-Butter-Shakeology-Ice-Cream.jpg'}
			]
		}
		
	];

}]);

app.controller('homeCtrl', ['$scope', function($scope){
	var audio = new Audio('http://incompetech.com/music/royalty-free/mp3-royaltyfree/Suave%20Standpipe.mp3');
	audio.volume = 0.2;

	var comments = [
		{name: 'luis', city: 'oakland', comment: 'this is a really good ice cream parlor!!!'},
		{name: 'john', city: 'san leandro', comment: 'this is a really good ice cream parlor!!!'},
		{name: 'bernie', city: 'vallejo', comment: 'this is a really good ice cream parlor!!!'},
		{name: 'antio', city: 'san francisco', comment: 'this is a really good ice cream parlor!!!'},
		{name: 'lopez', city: 'san jose', comment: 'this is a really good ice cream parlor!!!'},
		{name: 'mimi', city: 'san leandro', comment: 'this is a really good ice cream parlor!!!'}
	];

	$scope.homeBackground = function(){
		$('.texture-overlay')
			.css({ 
				'background': 'url("img/thread.png")', 
				'background-color' : 'rgba(34, 61, 110, 0.34)',
				'opacity': '1' 
			});

		$('body')
			.css({ 
				'background': 'url("img/mount.jpg")', 
				'background-size' : 'cover', 
				'background-repeat': 'no-repeat',
				'background-attachment': 'fixed'
			 });
	}

	$scope.soundStart = function() {
        audio.play();
	}

}]);

console.log('angular initiated');