angular.module('tradeapp.controllers', [])

.controller('RegisterCtrl',['$scope','$window','$ionicActionSheet','$ionicModal','$rootScope','$ionicPlatform','$ionicHistory','$ionicLoading','$ionicPopup','Auth',
                     function($scope, $window, $ionicActionSheet, $ionicModal, $rootScope,  $ionicPlatform,  $ionicHistory,  $ionicLoading, $ionicPopup, Auth)  {
	$scope.user = [];
	$scope.uname = [];
	$scope.pass = [];
	$scope.cpass = [];
	$scope.notEqual = [];
	$scope.clean_uname = "";
	
	$scope.user.fname_error = false;
	$scope.user.lname_error = false;
	$scope.user.age_error = false;
	$scope.user.bday_error = false;
	$scope.user.address_error = false;
	
	$scope.uname.error = false;
	$scope.pass.error = false;
	$scope.cpass.error = false;
	$scope.notEqual.error = false;
	
	$scope.register = function (){
		console.log(document.getElementById('user_role').value);
		var validInput = $scope.VALIDATE_REGISTER_INPUT();
		if(validInput){
			if($scope.user.pass == $scope.user.cpass){
				//$scope.ADD_TO_SERVER();
				console.log("add to server");
				$scope.notEqual.error = false;
			}
			else{
				console.log("not added to server");
				console.log("Password did not match.");
				$scope.notEqual.error = true;
				$scope.notEqual.desc = "Password did not match.";
			}
		}
	}
	$scope.VALIDATE_REGISTER_INPUT = function ()
	  {
		var ret = true;
		$scope.clean_fname = $rootScope._remove_white_space($scope.user.fname);
		$scope.clean_lname = $rootScope._remove_white_space($scope.user.lname);
		$scope.clean_age = $rootScope._remove_white_space($scope.user.age);
		$scope.clean_bday = $rootScope._remove_white_space($scope.user.bday);
		$scope.clean_address = $rootScope._remove_white_space($scope.user.address);
		
		$scope.clean_uname = $rootScope._remove_white_space($scope.user.uname);
		$scope.clean_userPass = $rootScope._remove_white_space($scope.user.pass);
		$scope.clean_userConfirmPass = $rootScope._remove_white_space($scope.user.cpass);
		var return_bol = true;
		
		if(!$rootScope.inputLength($scope.clean_uname))
		{
		  $scope.uname.error = true;
		  $scope.uname.desc = "Atleast 6 and maximum of 40 alphanumeric characters.";
		  ret = false;
		} else {
		  $scope.uname.error = false;
		}
		
		if (!$rootScope.inputLength($scope.user.pass))
		{
		  $scope.pass.error = true;
		  $scope.pass.desc = "Atleast 6 and maximum of 40 alphanumeric characters.";
		  ret = false;
		}else {
		  $scope.pass.error = false;
		}
		
		if (!$rootScope.inputLength($scope.user.cpass))
		{
		  $scope.cpass.error = true;
		  $scope.cpass.desc = "Atleast 6 and maximum of 40 alphanumeric characters.";
		  ret = false;
		}else {
		  $scope.cpass.error = false;
		}

	 
		return ret;

	  }
}])
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
