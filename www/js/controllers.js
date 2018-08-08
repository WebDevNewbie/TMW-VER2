angular.module('tradeapp.controllers', [])

.controller('RegisterCtrl', function($scope,  $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {})
.controller('DashCtrl', function($scope,  $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {})
.controller('LoginCtrl', function($scope,  $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {
	console.log($rootScope.baseURL);
	console.log($rootScope.isLogged);
	$scope.login = function()
    { 
		console.log($scope.user.name);
		console.log($scope.user.pass);
		if($scope.user.name == "" && $scope.user.pass == ""){
			//$rootScope.showToast('Please enter Username and Password.');
		}
		else{
				$ionicLoading.show({
				  template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
				});
				var obj    = new Object();
				obj.method = 'POST';
				obj.url    = $rootScope.baseURL + "/mobile/login_controller/logIn";
				obj.data   = new FormData();
				obj.data.append('chrUserName',$scope.user.name);
				obj.data.append('passUserPassword',$scope.user.pass);
				obj.data.append('loginSecret','0ff9346b4edc8dc033bff30762bc3c15d465d3f');
				obj.params = {};
		   
				Auth.REQUEST(obj).then(
									  function(success) { 
										  if(JSON.stringify(success.data.success) == "true"){
											  console.log(success.data.user_info);
											  var obj          = new Object();
												  obj.user_id       = success.data.user_info.user_id;
												  obj.username     = success.data.user_info.username;
									   
											  Auth.STORE_DATA('userData',obj);
											  $rootScope.isLogged  = true;
											  /*if(obj.role == 0){
													window.location.href = "#/menuAdmin/dashboardAdmin";
											  }
											  else{
													window.location.href = "#/menu/dashboard";
											  }*/
											  window.location.href = "#/search";
											  $ionicLoading.hide();
											  console.log("true");
										  }
										  else{
											$ionicLoading.hide();
											console.log("false");
											//$rootScope.showToast('Invalid Username/Password');
										  }
										},
										function(error) { 
										  $ionicLoading.hide();
										  // $rootScope.showToast('Invalid Username/Password');
										}
									  );    
			}							  
    }
})
.controller('SearchCtrl', function($scope,  $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {
	
	//$rootScope.isLogged  = false;
	console.log($rootScope.isLogged);
})

.controller('ChatsCtrl', function($scope,  $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope,  $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope,  $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {
  $scope.settings = {
    enableFriends: true
  };
});
