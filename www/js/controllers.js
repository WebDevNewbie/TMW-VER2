angular.module('tradeapp.controllers', [])

.controller('RegisterCtrl',['$scope','$window','$ionicActionSheet','$ionicModal','$rootScope','$ionicPlatform','$ionicHistory','$ionicLoading','$ionicPopup','Auth',
                     function($scope, $window, $ionicActionSheet, $ionicModal, $rootScope,  $ionicPlatform,  $ionicHistory,  $ionicLoading, $ionicPopup, Auth)  {
	$scope.user = [];
	$scope.uname = [];
	$scope.pass = [];
	$scope.cpass = [];
	$scope.notEqual = [];
	$scope.clean_uname = "";
	$scope.uname.check = false;
	
	$scope.user.fname_error = false;
	$scope.user.lname_error = false;
	$scope.user.age_error = false;
	$scope.user.bday_error = false;
	$scope.user.address_error = false;
	
	$scope.uname.error = false;
	$scope.pass.error = false;
	$scope.cpass.error = false;
	$scope.notEqual.error = false;
	
	$scope.chkUsername = function (){

		console.log($scope.user.uname);
		 var obj    = new Object();
        obj.method = 'POST';
        obj.url    = $rootScope.baseURL + "/mobile/user_controller/chckUsername";
        obj.data   = new FormData();
        obj.data.append('username',$scope.user.uname);
        obj.params = {};
   
			Auth.REQUEST(obj).then(
                function(success) { 
                    console.log(success.data.success);
					if(success.data.success  == true)
					{
						$scope.uname.error = true;
						$scope.uname.desc = "Username is already taken.";
						$scope.uname.check = true;
					} else {
						$scope.uname.error = false;
						$scope.uname.check = false;
					}
                                  
                },
                function(error) { 
               }
            ); 
	}
	$scope.register = function (){
		
		var validInput = $scope.VALIDATE_REGISTER_INPUT();
		if(validInput){
			var tDate = new Date($scope.user.bday);
			var monD = tDate.getMonth() + 1;
			var todD = tDate.getDate();
			if(monD < 10){ monD = "0"+monD }
			if(todD < 10){ todD = "0"+todD }
			var newDate = tDate.getFullYear()+"-"+monD+"-"+todD;
			$scope.user.pack = document.getElementById('user_role').value;
			$scope.user.bday = newDate;
		
			$scope.ADD_TO_SERVER();
			console.log("add to server");

		}else{
			//console.log("invalid input");
		}

	}
	$scope.VALIDATE_REGISTER_INPUT = function ()
	  {
		
		if($scope.user.uname == undefined) $scope.user.uname="";  
		if($scope.user.pass == undefined) $scope.user.pass="";  
		if($scope.user.cpass == undefined) $scope.user.cpass="";  
		if($scope.user.fname == undefined) $scope.user.fname="";  
		if($scope.user.lname == undefined) $scope.user.lname="";  
		if($scope.user.age == undefined) $scope.user.age="";  
		if($scope.user.bday == undefined) $scope.user.bday="";  
		if($scope.user.address == undefined) $scope.user.address=""; 
		if($scope.user.pass != $scope.user.cpass){
			$scope.notEqual.error = true;
			$scope.notEqual.desc = "Password did not match.";
		}else{$scope.notEqual.error = false;}
		var ret = true;
		$scope.clean_fname = $rootScope._remove_white_space($scope.user.fname);
		$scope.clean_lname = $rootScope._remove_white_space($scope.user.lname);
		$scope.clean_age = $rootScope._remove_white_space($scope.user.age);
		
		$scope.clean_address = $rootScope._remove_white_space($scope.user.address);
		
		$scope.clean_uname = $rootScope._remove_white_space($scope.user.uname);
		$scope.clean_userPass = $rootScope._remove_white_space($scope.user.pass);
		$scope.clean_userConfirmPass = $rootScope._remove_white_space($scope.user.cpass);
		var return_bol = true;
		
		
		if(!$rootScope.inputBlank($scope.clean_fname))
		{
		  $scope.user.fname_error = true;
		  $scope.user.fname_desc = "Please fill out this field.";
		  ret = false;
		} else {
		  $scope.user.fname_error = false;
		}
		if(!$rootScope.inputBlank($scope.clean_lname))
		{
		  $scope.user.lname_error = true;
		  $scope.user.lname_desc = "Please fill out this field.";
		  ret = false;
		} else {
		  $scope.user.lname_error = false;
		}
		if(!$rootScope.inputBlank($scope.clean_age))
		{
		  $scope.user.age_error = true;
		  $scope.user.age_desc = "Please fill out this field.";
		  ret = false;
		} else {
			if(!$rootScope.isNumber($scope.clean_age)){
				$scope.user.age_error = true;
				$scope.user.age_desc = "Please input a number.";
			}else{
				$scope.user.age_error = false;
			}
		}
		if(!$rootScope.inputBlank($scope.user.bday))
		{
		  $scope.user.bday_error = true;
		  $scope.user.bday_desc = "Please fill out this field.";
		  ret = false;
		} else {
		  $scope.user.bday_error = false;
		}
		if(!$rootScope.inputBlank($scope.clean_address))
		{
		  $scope.user.address_error = true;
		  $scope.user.address_desc = "Please fill out this field.";
		  ret = false;
		} else {
		  $scope.user.address_error = false;
		}
		
		if(!$rootScope.inputLength($scope.clean_uname))
		{
		  $scope.uname.error = true;
		  $scope.uname.desc = "Atleast 6 and maximum of 40 alphanumeric characters.";
		  ret = false;
		} else {
			
		  if($scope.uname.check == true){
				$scope.uname.error = true;
				$scope.uname.desc = "Username is already taken.";	
				ret = false;
				//console.log("checkusername taken");
			}
			else{
				$scope.uname.error = false;
				 ret = true;
				 //console.log("checkusername nottaken");
			}
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
	  
	   $scope.ADD_TO_SERVER = function ()
	  {

		$ionicLoading.show({
          template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
        });
        var obj    = new Object();
        obj.method = 'POST';
        obj.url    = $rootScope.baseURL + "/mobile/user_controller/addUser";
        obj.data   = new FormData();
        obj.data.append('username',$scope.user.uname);
        obj.data.append('password',$scope.user.pass);
        obj.data.append('fname',$scope.user.fname);
        obj.data.append('lname',$scope.user.lname);
        obj.data.append('age',$scope.user.age);
        obj.data.append('address',$scope.user.address);
        obj.data.append('bday',$scope.user.bday);
        obj.data.append('package',$scope.user.pack);
        obj.data.append('loginSecret','0ff9346b4edc8dc033bff30762bc3c15d465d3f');
        obj.params = {};
   
			Auth.REQUEST(obj).then(
                function(success) { 
                    console.log(success.data);
					$ionicLoading.hide();
					if(success.data.success == true){
						$scope.user.uname = "";
						$scope.user.pass = "";
						$scope.user.cpass = "";
						$scope.user.fname = "";
						$scope.user.lname = "";
						$scope.user.age = "";
						$scope.user.address = "";
						$scope.user.bday = "";
						$scope.showSuccessMessage(); 
					}
					             
                },
                function(error) { 
                    $ionicLoading.hide();
               }
            ); 
	  }
	  
	   $scope.showSuccessMessage = function() {
		   var alertPopup = $ionicPopup.alert({
			 title: 'SUCCESS!',
			 template: 'You can now login.'
		   });

		   alertPopup.then(function(res) {
			   window.location.href = "#/search";
			 //console.log('Thank you for not eating my delicious ice cream cone');
		   });
		};
}])
.controller('DashCtrl', function($scope,  $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {})
.controller('LoginCtrl', function($scope,  $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {
	//console.log($rootScope.baseURL);
	//console.log($rootScope.isLogged);
	$scope.login = function()
    { 
		//console.log($scope.user.name);
		//console.log($scope.user.pass);
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
											 // console.log(success.data.user_info);
											 $scope.user.name = "";
											 $scope.user.pass = "";
											  var obj          = new Object();
												  obj.user_id       = success.data.user_info.user_id;
												  obj.username     = success.data.user_info.username;
												  obj.user_role     = success.data.user_info.user_role;
									   
											  Auth.STORE_DATA('userData',obj);
											  $rootScope.isLogged  = true;
											  $rootScope.user_info =  Auth.FETCH_DATA('userData');
											  
											  /*if(obj.role == 0){
													window.location.href = "#/menuAdmin/dashboardAdmin";
											  }
											  else{
													window.location.href = "#/menu/dashboard";
											  }*/
											  window.location.href = "#/menu/usersearch";
											  $ionicLoading.hide();
											 // console.log("true");
										  }
										  else{
											$ionicLoading.hide();
											//console.log("false");
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
	//console.log($rootScope.isLogged);
	console.log($rootScope.user_info);

	$scope.logout = function()
    {
      Auth.STORE_DATA('userData',"");
	  $rootScope.user_info =  Auth.FETCH_DATA('userData');
	  $rootScope.isLogged  = false;
      window.location.href = "#/search";
	 // console.log(Auth.FETCH_DATA('userData'));
	  //console.log($rootScope.user_info);
    }
})
.controller('UserProfileCtrl', function($scope,  $rootScope,  $ionicLoading,  $ionicPlatform,  Auth, $ionicHistory) {
	
	$scope.user = [];
	
	$scope.goBack = function()
    {
		$ionicHistory.goBack();
		console.log(333);
		//window.location.href = "#/menu/usersearch";
	}
	$scope.$on('$ionicView.enter', function(event) {
		//console.log("get data");
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
		});
		var obj    = new Object();
			obj.method = 'POST';
			obj.url    = $rootScope.baseURL + "/mobile/user_controller/getUserData";
			obj.data   = new FormData();
			obj.data.append('userID',$rootScope.user_info.user_id);
			obj.data.append('loginSecret','0ff9346b4edc8dc033bff30762bc3c15d465d3f');
			obj.params = {};
			   
				Auth.REQUEST(obj).then(
					function(success) { 
						if(JSON.stringify(success.data.success) == "true"){
							$ionicLoading.hide();
							console.log(success.data.user_info);
							console.log(success.data.user_info.birthday);
							document.getElementById("user_bday").value = success.data.user_info.birthday;
							$scope.user.fname = success.data.user_info.first_name;
							$scope.user.lname = success.data.user_info.last_name;
							$scope.user.age = success.data.user_info.age;
							$scope.user.address = success.data.user_info.address;
						}
						else{
							$ionicLoading.hide();
							//console.log("false");
							//$rootScope.showToast('Invalid Username/Password');
						}
					},
					function(error) { 
						$ionicLoading.hide();
						// $rootScope.showToast('Invalid Username/Password');
					}
				);   	
	});
	
})
.controller('ChatsCtrl', function($scope,  $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('UserSearchCtrl', function($scope,  $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {
  	console.log($rootScope.user_info);

	$scope.logout = function()
    {
      Auth.STORE_DATA('userData',"");
	  $rootScope.user_info =  Auth.FETCH_DATA('userData');
	  $rootScope.isLogged  = false;
      window.location.href = "#/search";
	 // console.log(Auth.FETCH_DATA('userData'));
	  //console.log($rootScope.user_info);
    }
})
.controller('ChatDetailCtrl', function($scope,  $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope,  $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {
  $scope.settings = {
    enableFriends: true
  };
});
