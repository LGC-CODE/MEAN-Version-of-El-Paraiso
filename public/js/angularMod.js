var app = angular.module('myApp',['ui.router']);

app.factory('object', ['$http', 'auth', function($http, auth){ //creating service syntax
	var o = {
		pictures: [
			{url: 'http://img1.beachbodyimages.com/beachbody/image/upload/v1435693633/beachbodyblog/Chocolate-Peanut-Butter-Shakeology-Ice-Cream.jpg', description: 'Helado de Chocolate'},
			{url: 'http://img1.beachbodyimages.com/beachbody/image/upload/v1435693633/beachbodyblog/Chocolate-Peanut-Butter-Shakeology-Ice-Cream.jpg', description: 'Helado de Chocolate'},
			{url: 'http://img1.beachbodyimages.com/beachbody/image/upload/v1435693633/beachbodyblog/Chocolate-Peanut-Butter-Shakeology-Ice-Cream.jpg', description: 'Helado de Chocolate'},
			{url: 'http://img1.beachbodyimages.com/beachbody/image/upload/v1435693633/beachbodyblog/Chocolate-Peanut-Butter-Shakeology-Ice-Cream.jpg', description: 'Helado de Chocolate'},
			{url: 'http://img1.beachbodyimages.com/beachbody/image/upload/v1435693633/beachbodyblog/Chocolate-Peanut-Butter-Shakeology-Ice-Cream.jpg', description: 'Helado de Chocolate'},
			{url: 'http://img1.beachbodyimages.com/beachbody/image/upload/v1435693633/beachbodyblog/Chocolate-Peanut-Butter-Shakeology-Ice-Cream.jpg', description: 'Helado de Chocolate'},
			{url: 'http://img1.beachbodyimages.com/beachbody/image/upload/v1435693633/beachbodyblog/Chocolate-Peanut-Butter-Shakeology-Ice-Cream.jpg', description: 'Helado de Chocolate'},
			{url: 'http://img1.beachbodyimages.com/beachbody/image/upload/v1435693633/beachbodyblog/Chocolate-Peanut-Butter-Shakeology-Ice-Cream.jpg', description: 'Helado de Chocolate'}		
		],
		alert: []
	}

	o.getAllPics = function(){
		return $http.get('/allPictures').success(function(data){
			angular.copy(data, o.pictures);
		});
	};

	o.createPic = function(picData){
		if( auth.isLoggedIn() ){
			return $http.post('/savePictures', picData).success(function(data){
				o.pictures.unshift(data);
			});
		}
	}

	return o;

}]);

app.factory('auth', ['$http', '$window', function($http, $window){
	var auth = {};

	auth.saveToken =  function(token){
		$window.localStorage['rockstar-token'] = token;
	};

	auth.getToken = function(){
		return $window.localStorage['rockstar-token'];

	};

	auth.isLoggedIn = function(){
		var token = auth.getToken();
		if(token){
			var payload = JSON.parse($window.atob(token.split('.')[1]));

			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}

	};

	auth.currentUser =  function(){
		if(auth.isLoggedIn()){
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			var info = {
				name: payload.username
			}
			return info;
		}
	};

	auth.register =  function(logUsers){
		return $http.post('/register', logUsers).success(function(data){
			auth.saveToken(data.token);
		});
	};

	auth.logIn = function(logUsers){
		return $http.post('/login', logUsers).success(function(data){
			auth.saveToken(data.token);
		});
	};

	auth.logOut =  function(){
		$window.localStorage.removeItem('rockstar-token');
	};

	return auth;
}]);

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
				.state('loginUp', {
					url: '/loginUp',
					templateUrl: '/loginUp.html',
					controller: 'logCtrl'
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

app.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider){

			$stateProvider
				.state('private', {
					url: '/private',
					templateUrl: '/private.html',
					controller: 'privateCtrl'
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

app.controller('mainCtrl', ['$scope', 'object', function($scope, object){ //gallery

	$scope.random = function() {
        return 0.5 - Math.random();
    };

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
	};
	object.getAllPics();
	$scope.pictures = object.pictures;

	$scope.galleryBackground = function(){
		$('.texture-overlay')
			.css({ 
				'background-color' : 'rgba(0, 29, 255, 0.21)',
				'opacity': '1' 
			});

		$('body')
			.css({ 
				'background': 'url("img/sky.jpg")', 
				'background-size' : 'cover', 
				'background-repeat': 'no-repeat',
				'background-attachment': 'fixed'
			 });
	}
	

}]);

app.controller('homeCtrl', ['$scope', function($scope){
	var audio = new Audio('../mp3/jazz.mp3');
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
				'background-color' : 'rgba(69, 101, 255, 0.25)',
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

        if (audio) {
        	audio.play();
        } else if( audio.play() ){
        	audio.pause();
        }
	}

}]);

app.controller('logCtrl',['$scope', 'auth', '$state', function($scope, auth, $state){
	$scope.getUser =  function(){
			var credentials = { username: $scope.username, password: $scope.password }

			auth.logIn(credentials).error(function(error){
				$scope.error = error;
			}).then(function(){
				$state.go('private');
			});
		};

	$scope.isLoggedIn = auth.isLoggedIn;

	if( auth.isLoggedIn() ){
		$state.go('private');
	}
}]);

app.controller('privateCtrl',['$scope', 'auth', '$state', 'object', function($scope, auth, $state, object){
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.logOut = function(){
		auth.logOut();
		$state.go('loginUp');
	}

	$scope.alert = "";
	$scope.alertSuccess = "";

	$scope.getUrl = function(){
		if(!$scope.url || $scope.url == undefined || $scope.url == ""){ 
			$scope.alert = {message: 'llene todo el formulario'};
			return; 
		}
		if(!$scope.des || $scope.des == undefined || $scope.des == ""){ 
			$scope.alert = {message: 'llene todo el formulario'};
			return; 
		}

		var picData = { url: $scope.url, description: $scope.des }
		object.createPic(picData);
		// console.log('url' , $scope.url, 'des' , $scope.des)
		$scope.alert = {message: 'Foto Se Subio!'};
		$scope.url = "";
		$scope.des = "";
	}

	$scope.hideAlert = function(){
		$('.success-btn').fadeIn(1500).delay(4500).fadeOut(1500);
	}

	$scope.privateBackground = function(){
		$('.texture-overlay')
			.css({ 
				'background': 'none', 
				'background-color' : 'rgba(34, 61, 110, 0.34)',
				'opacity': '1' 
			});

		$('body')
			.css({ 
				'background': 'url("img/electro.jpg")', 
				'background-size' : 'cover', 
				'background-repeat': 'no-repeat',
				'background-attachment': 'fixed'
			 });
	}

}]);

console.log('angular initiated');