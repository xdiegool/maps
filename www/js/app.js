// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.factories'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})



.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider

  .state('auth', {
    url: '/auth',
    abstract: true,
    templateUrl: 'templates/auth.html',
    controller: ''
  })
  .state('auth.login', {
    url: '/login',
    views: {
      'authContent': {
        templateUrl: 'templates/login.html',
        controller: 'AuthCtrl'
      }
    }
  })
  .state('map', {
    url: '/map',
    abstract: true,
    templateUrl: 'templates/mapView.html',
    controller: ''
  })
  .state('map.nameit', {
    url: '/nameit',
    views: {
      'mapContent': {
        templateUrl: 'templates/nameit.html',
        controller: 'NameitCtrl'
      }
    }
  })
  .state('map.view', {
    url: '/view/:trip',
    views: {
      'mapContent': {
        templateUrl: 'templates/map.html',
        controller: 'GoogleMapCtrl',
        params: { trip: null }
      }
    }
  })
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.trips', {
    url: '/trips',
    views: {
      'menuContent': {
        templateUrl: 'templates/trips.html',
        controller: 'TripsCtrl'
      }
    }
  })
  .state('app.curTrip', {
      url: '/trips/:trip',
      views: {
        'menuContent': {
          templateUrl: 'templates/curTrip.html',
          controller: 'CurTripCtrl'
        }
      }
    })

  .state('app.spots', {
    url: '/trips/:trip/spots',
    views: {
      'menuContent': {
        templateUrl: 'templates/spots.html',
        controller: 'SpotCtrl'
      },
    params: { trip: null }
    }
  })
  .state('app.info', {
    url: '/trips/:trip/info',
    views: {
      'menuContent': {
        templateUrl: 'templates/info.html',
        controller: 'InfoCtrl'
      }
    }
  })
  .state('app.fav', {
    url: '/trips/:trip/fav-spots',
    views: {
      'menuContent': {
        templateUrl: 'templates/fav.html',
        controller: 'FavCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/auth/login');
});
