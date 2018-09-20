
angular.module('tradeapp', ['ionic', 'tradeapp.controllers', 'tradeapp.services'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  $rootScope.showToast = function(msg)
  {
    window.plugins.toast.showShortBottom(msg, 
        function(a) { console.log('toast success: ' + a) }, 
        function(b) { console.log('toast error: ' + b) });
  }
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('menu', {
    url: '/menu',
    abstract: true,
    templateUrl: 'templates/menu.html',
	controller: 'MenuCtrl'
  })
  .state('menu.usersearch', {
      url: '/usersearch',
      views: {
        'menuContent': {
          templateUrl: 'templates/usersearch.html',
          controller: 'SearchCtrl'
        }
      }
    })
	.state('menu.trader-profile', {
      url: '/trader-profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/trader-profile.html',
          controller: 'traderProfileCtrl'
        }
      }
    })
	.state('signuptab', {
    url: '/signuptab',
    abstract: true,
    templateUrl: 'templates/signup-tab.html'
  })
	.state('search', {
    url: "/search",
    templateUrl: "templates/search.html",
    controller: 'SearchCtrl'
  })
  .state('n-trader-profile', {
    url: "/n-trader-profile",
    templateUrl: "templates/n-trader-profile.html",
    controller: 'traderProfileCtrl'
  })
  .state('menu.userprofile', {
      url: '/userprofile',
      views: {
        'menuContent': {
          templateUrl: 'templates/profile.html',
		  controller: 'UserProfileCtrl'
        }
      }
    })
  .state('menu.changepass', {
      url: '/changepass',
      views: {
        'menuContent': {
          templateUrl: 'templates/changepass.html',
		  controller: 'ChangePassCtrl'
        }
      }
    })
  .state('login', {
    url: "/login",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl'
  })
  .state('register', {
    url: "/register",
    templateUrl: "templates/register.html",
    controller: 'RegisterCtrl'
  })
  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/search');

});
