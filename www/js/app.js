
angular.module('tradeapp', ['ionic', 'tradeapp.controllers', 'tradeapp.services','ngCordova','ngSanitize'])

.run(function($ionicPlatform, $rootScope, $cordovaToast, $http, $ionicPopup, $interval,Auth) {
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
    // window.plugins.toast.showShortBottom(msg, 
    //     function(a) { console.log('toast success: ' + a) }, 
    //     function(b) { console.log('toast error: ' + b) });
    $cordovaToast.showShortBottom(msg).then(function(success) {
    // success
    }, function (error) {
      // error
    });

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
  .state('menu.all-connections', {
      url: '/all-connections',
      views: {
        'menuContent': {
          templateUrl: 'templates/all-connections.html',
          controller: 'ConnectionsCtrl'
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
   .state('menu.trader-images', {
      url: '/trader-images',
      views: {
        'menuContent': {
          templateUrl: 'templates/trader-images.html',
          controller: 'traderImageCtrl'
        }
      }
    })
    .state('menu.trader-videos', {
      url: '/trader-videos',
      views: {
        'menuContent': {
          templateUrl: 'templates/trader-videos.html',
          controller: 'traderVideoCtrl'
        }
      }
    })
  .state('n-trader-images', {
    url: "/n-trader-images",
    templateUrl: "templates/n-trader-images.html",
    controller: 'traderImageCtrl'
  })
  .state('n-trader-videos', {
    url: "/n-trader-videos",
    templateUrl: "templates/n-trader-videos.html",
    controller: 'traderVideoCtrl'
  })
  .state('menu.add-image', {
      url: '/add-image',
      views: {
        'menuContent': {
          templateUrl: 'templates/add-image.html',
          controller: 'FilesCtrl'
        }
      }
    })
  .state('menu.connect-trader', {
      url: '/connect-trader',
      views: {
        'menuContent': {
          templateUrl: 'templates/connect-trader.html',
          controller: 'ConnectCtrl'
        }
      }
    })
  .state('menu.image-list', {
      url: '/image-list',
      views: {
        'menuContent': {
          templateUrl: 'templates/image-list.html',
          controller: 'ImageListCtrl'
        }
      }
    })
    .state('menu.add-video', {
      url: '/add-video',
      views: {
        'menuContent': {
          templateUrl: 'templates/add-video.html',
          controller: 'VideosCtrl'
        }
      }
    })
  .state('menu.video-list', {
      url: '/video-list',
      views: {
        'menuContent': {
          templateUrl: 'templates/video-list.html',
          controller: 'VideoListCtrl'
        }
      }
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
  .state('reset', {
    url: "/reset",
    templateUrl: "templates/resetpassword.html",
    controller: 'ResetPasswordCtrl'
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
