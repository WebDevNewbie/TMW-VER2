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
.controller('UserSearchCtrl', function($scope,  $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {
	
	//$rootScope.isLogged  = false;
	//console.log($rootScope.isLogged);
	console.log($rootScope.user_info);
	console.log(4444);

})
.controller('SearchCtrl', function($scope,  $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {
	
	//$rootScope.isLogged  = false;
	//console.log($rootScope.isLogged);
	console.log($rootScope.user_info);

})
.controller('MenuCtrl', function($scope,  $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {
	
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
.controller('ChangePassCtrl', function($scope,  $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {
	
	//$rootScope.isLogged  = false;
	//console.log($rootScope.isLogged);
	console.log($rootScope.user_info);
	$scope.user = [];
	$scope.user.changeStat = false;
	$scope.user.changeStatSucc = false;
	$scope.changepass = function()
    { 
		if($scope.user.oldpass == undefined) $scope.user.oldpass = "";
		if($scope.user.newpass == undefined) $scope.user.newpass = "";
		if($scope.user.cnewpass == undefined) $scope.user.cnewpass = "";
		//console.log($scope.user.oldpass);
		//console.log($scope.user.newpass);
		//console.log($scope.user.cnewpass);
		if($scope.user.newpass == "" || $scope.user.cnewpass == "" || $scope.user.oldpass == ""){
			$scope.user.changeStat = true;
			$scope.user.changeDesc = "Please fill out all fields.";
		}
		else{
			if($scope.user.newpass == $scope.user.cnewpass){
				$ionicLoading.show({
				  template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
				});
				var obj    = new Object();
				obj.method = 'POST';
				obj.url    = $rootScope.baseURL + "/mobile/login_controller/changePass";
				obj.data   = new FormData();
				obj.data.append('user_id',$rootScope.user_info.user_id);
				obj.data.append('password',$scope.user.oldpass);
				obj.data.append('newpassword',$scope.user.newpass);
				obj.data.append('loginSecret','0ff9346b4edc8dc033bff30762bc3c15d465d3f');
				obj.params = {};
		   
				Auth.REQUEST(obj).then(
					function(success) { 
						if(JSON.stringify(success.data.success) == "true"){
							// console.log(success.data.user_info);
							$scope.user.oldpass = "";
							$scope.user.newpass = "";
							$scope.user.cnewpass = "";
							//window.location.href = "#/menu/usersearch";
							$ionicLoading.hide();
							console.log("true");
							$scope.user.changeStatSucc = true;
							$scope.user.changeStat = false;
							$scope.user.changeSuccDesc = "Your password has been successfully updated.";
							setTimeout(function(){
								document.getElementById('changeStatSucc').style.display = 'none';
							}, 2000);
						}
						else{
							$ionicLoading.hide();
							$scope.user.changeStat = true;
							$scope.user.changeDesc = "Old Password is incorrect.";
							console.log("false");
							}
					},
					function(error) { 
						$ionicLoading.hide();
						$scope.user.changeStat = true;
						$scope.user.changeDesc = "Old Password is incorrect.";
					}
				);    
			}else{
				$scope.user.changeStat = true;
				$scope.user.changeDesc = "New and confirm password does not match.";
			}
		}							  
    }
})
.controller('UserProfileCtrl',['$scope','$window','$ionicActionSheet','$ionicModal','$rootScope','$ionicPlatform','$ionicHistory','$ionicLoading','$ionicPopup','Auth',
                     function($scope, $window, $ionicActionSheet, $ionicModal, $rootScope,  $ionicPlatform,  $ionicHistory,  $ionicLoading, $ionicPopup, Auth){
	
	$scope.user = [];
	$scope.user.fname_error = false;
	$scope.user.lname_error = false;
	$scope.user.age_error = false;
	$scope.user.bday_error = false;
	$scope.user.address_error = false;
	$scope.user.clickedEdit = false;
	
	$scope.editProfile = function()
    {
		$scope.user.clickedEdit = true;
		$("#profile-wrapper label input").prop("disabled", false);
	}
	$scope.saveProfile = function()
    {
		//$scope.user.clickedEdit = false;
		//$("#profile-wrapper label input").prop("disabled", true);
		if($scope.user.fname == undefined) $scope.user.fname="";  
		if($scope.user.lname == undefined) $scope.user.lname="";  
		if($scope.user.age == undefined) $scope.user.age="";  
		if($scope.user.address == undefined) $scope.user.address="";  
		if($scope.user.activity1 == undefined) $scope.user.activity1="";  
		if($scope.user.activity2 == undefined) $scope.user.activity2="";  
		if($scope.user.activity3 == undefined) $scope.user.activity3="";  
		if($scope.user.occupation == undefined) $scope.user.occupation=""; 
		if($scope.user.hobbies == undefined) $scope.user.hobbies=""; 
		if($scope.user.skill == undefined) $scope.user.skill=""; 
		if($scope.user.learn == undefined) $scope.user.learn=""; 
		if($scope.user.todo == undefined) $scope.user.todo=""; 
		if($scope.user.visit == undefined) $scope.user.visit=""; 
		if($scope.user.language == undefined) $scope.user.language=""; 
		if($scope.user.education == undefined) $scope.user.education=""; 
		if($scope.user.collegecourse == undefined) $scope.user.collegecourse=""; 
		if($scope.user.certificate == undefined) $scope.user.certificate=""; 
		if($scope.user.religion == undefined) $scope.user.religion=""; 
		if($scope.user.children == undefined) $scope.user.children=""; 
		if($scope.user.ethniticity == undefined) $scope.user.ethniticity=""; 
		
		var validInput = $scope.VALIDATE_EDITPROFILE_INPUT();
		if(validInput){
			var tDate = new Date(document.getElementById("user_bday").value);
			var monD = tDate.getMonth() + 1;
			var todD = tDate.getDate();
			if(monD < 10){ monD = "0"+monD }
			if(todD < 10){ todD = "0"+todD }
			var newDate = tDate.getFullYear()+"-"+monD+"-"+todD;
			$scope.user.bday = newDate;
			console.log($scope.user.bday);
			$scope.UPDATE_TO_SERVER();
			console.log("add to server");

		}else{
			console.log("invalid input");
		}
	}
	$scope.VALIDATE_EDITPROFILE_INPUT = function ()
	  {
		var ret = true;
		$scope.clean_fname = $rootScope._remove_white_space($scope.user.fname);
		$scope.clean_lname = $rootScope._remove_white_space($scope.user.lname);
		$scope.clean_age = $rootScope._remove_white_space($scope.user.age);
		
		$scope.clean_address = $rootScope._remove_white_space($scope.user.address);

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
		if(!$rootScope.inputBlank(document.getElementById("user_bday").value))
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

		return ret;

	  }
	
	$scope.UPDATE_TO_SERVER = function ()
	{
		var actArray = [];
		$ionicLoading.show({
          template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
        });
		if($scope.user.activity1 == "" && $scope.user.activity2 == "" && $scope.user.activity3 =="")
		{
			actArray = [];
		}else{
			if($scope.user.activity1 != ""){actArray.push($scope.user.activity1);}
			if($scope.user.activity2 != ""){actArray.push($scope.user.activity2);}
			if($scope.user.activity3 != ""){actArray.push($scope.user.activity3);}
		}	
			
        var obj    = new Object();
        obj.method = 'POST';
        obj.url    = $rootScope.baseURL + "/mobile/user_controller/updateUser";
        obj.data   = new FormData();
        obj.data.append('user_id',$rootScope.user_info.user_id);
        obj.data.append('fname',$scope.user.fname);
        obj.data.append('lname',$scope.user.lname);
        obj.data.append('age',$scope.user.age);
        obj.data.append('address',$scope.user.address);
        obj.data.append('bday',$scope.user.bday);
        obj.data.append('activity',actArray);
        obj.data.append('occupation',$scope.user.occupation);
        obj.data.append('hobbies',$scope.user.hobbies);
        obj.data.append('skill',$scope.user.skill);
        obj.data.append('learn',$scope.user.learn);
        obj.data.append('todo',$scope.user.todo);
        obj.data.append('visit',$scope.user.visit);
        obj.data.append('language',$scope.user.language);
        obj.data.append('education',$scope.user.education);
        obj.data.append('collegecourse',$scope.user.collegecourse);
        obj.data.append('certificate',$scope.user.certificate);
        obj.data.append('prefer_group',document.getElementById("user_group").value);
        obj.data.append('prefer_place',document.getElementById("user_place_prefer").value);
        obj.data.append('civil_status',document.getElementById("user_civil_status").value);
        obj.data.append('live_athome',document.getElementById("user_live_athome").value);
        obj.data.append('religion',$scope.user.religion);
        obj.data.append('children',$scope.user.children);
        obj.data.append('ethniticity',$scope.user.ethniticity);
        obj.data.append('loginSecret','0ff9346b4edc8dc033bff30762bc3c15d465d3f');
        obj.params = {};
   
			Auth.REQUEST(obj).then(
                function(success) { 
                    console.log(success.data);
					$ionicLoading.hide();
					if(success.data.success == true){
						console.log("success"); 
						$scope.user.clickedEdit = false;
						$("#profile-wrapper label input").prop("disabled", true);
						$scope.showEditSuccessMessage();
					}
					             
                },
                function(error) { 
                    $ionicLoading.hide();
               }
            ); 
	}
	$scope.showEditSuccessMessage = function() {
		   var alertPopup = $ionicPopup.alert({
			 title: 'SUCCESS',
			 template: 'Your profile is now updated.'
		   });
		};  
	$scope.goBack = function()
    {
		//$ionicHistory.goBack();
		console.log(333);
		//window.location.href = "#/menu/usersearch";
	}
	$scope.replaceAll = function(str, find, replace)
    {
		return str.replace(new RegExp(find, 'g'), replace);
	}
	$scope.$on('$ionicView.enter', function(event) {
		//console.log("get data");
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>',
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
							
							var act = success.data.user_info.activity;
							var actini = $scope.replaceAll(act,'"','');
							var actfinal = actini.split(",");
							setTimeout(function(){ $ionicLoading.hide(); }, 500);
							console.log(success.data.user_info);

							console.log(actfinal);
							document.getElementById("user_bday").value = success.data.user_info.birthday;
							$scope.user.fname = success.data.user_info.first_name;
							$scope.user.lname = success.data.user_info.last_name;
							$scope.user.age = success.data.user_info.age;
							$scope.user.address = success.data.user_info.address;
							$scope.user.activity1 = actfinal[0];
							$scope.user.activity2 = actfinal[1];
							$scope.user.activity3 = actfinal[2];
							$scope.user.occupation = success.data.user_info.occupation;
							$scope.user.hobbies = success.data.user_info.hobbies;
							$scope.user.skill = success.data.user_info.skills;
							$scope.user.learn = success.data.user_info.learn;
							$scope.user.todo = success.data.user_info.todo;
							$scope.user.visit = success.data.user_info.visit;
							$scope.user.language = success.data.user_info.languages;
							$scope.user.education = success.data.user_info.education;
							$scope.user.collegecourse = success.data.user_info.collegecourse;
							$scope.user.certificate = success.data.user_info.certificate;
							document.getElementById("user_group").value = success.data.user_info.prefer_group;
							document.getElementById("user_place_prefer").value = success.data.user_info.prefer_place;
							$scope.user.religion = success.data.user_info.religion;
							document.getElementById("user_civil_status").value = success.data.user_info.civil_status;
							document.getElementById("user_live_athome").value = success.data.user_info.live_athome;
							$scope.user.children = success.data.user_info.children;
							$scope.user.ethniticity = success.data.user_info.ethniticity;
						}
						else{
							setTimeout(function(){ $ionicLoading.hide(); }, 1000);
							//console.log("false");
							//$rootScope.showToast('Invalid Username/Password');
						}
					},
					function(error) { 
						setTimeout(function(){ $ionicLoading.hide(); }, 1000);
						// $rootScope.showToast('Invalid Username/Password');
					}
				);   	
	})
	
	
}])
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
