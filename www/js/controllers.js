angular.module('tradeapp.controllers', ['ngCordova','ngSanitize'])

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
	$scope.user.email_error = false;
	$scope.user.age_error = false;
	$scope.user.bday_error = false;
	$scope.user.address_error = false;
	$scope.user.servname_error = false;
	$scope.user.servdesc_error = false;
	
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

	$scope.chkUsername2 = function (){

        var query = 'http://192.168.1.22/tradeappbackend/checkUsername.php';
			

			var sOptions = {
				username : $scope.user.uname
			}
	   		
	   		$http.post(query, sOptions).then(function (res){
            	$scope.response = res.data;
   
            	if ($scope.response.success == true) {
            		$scope.uname.error = true;
					$scope.uname.desc = "Username is already taken.";
					$scope.uname.check = true;
            		
            	} else {
					$scope.uname.error = false;
					$scope.uname.check = false;
            	}
        	})
	}


	$scope.register = function (){
		
		var validInput = $scope.VALIDATE_REGISTER_INPUT();
		if(validInput){
			// var tDate = new Date($scope.user.bday);
			// var monD = tDate.getMonth() + 1;
			// var todD = tDate.getDate();
			// if(monD < 10){ monD = "0"+monD }
			// if(todD < 10){ todD = "0"+todD }
			// var newDate = tDate.getFullYear()+"-"+monD+"-"+todD;
			$scope.user.pack = document.getElementById('user_role').value;
			$scope.user.gender = document.getElementById('gender').value;
			//$scope.user.bday = newDate;
		
			$scope.ADD_TO_SERVER();
			console.log("add to server");

		}else{
			//console.log("invalid input");
		}

	}
	$scope.VALIDATE_REGISTER_INPUT = function ()
	  {
		
		if($scope.user.email == undefined) $scope.user.email="";  
		if($scope.user.servname == undefined) $scope.user.servname="";  
		//if($scope.user.servdesc == undefined) $scope.user.servdesc="";  
		if($scope.user.uname == undefined) $scope.user.uname="";  
		if($scope.user.pass == undefined) $scope.user.pass="";  
		if($scope.user.cpass == undefined) $scope.user.cpass="";  
		if($scope.user.fname == undefined) $scope.user.fname="";  
		if($scope.user.lname == undefined) $scope.user.lname="";  
		if($scope.user.age == undefined) $scope.user.age="";  
		//if($scope.user.bday == undefined) $scope.user.bday="";  
		//if($scope.user.address == undefined) $scope.user.address=""; 
		if($scope.user.pass != $scope.user.cpass){
			$scope.notEqual.error = true;
			$scope.notEqual.desc = "Password did not match.";
		}else{$scope.notEqual.error = false;}
		var ret = true;
		$scope.clean_fname = $rootScope._remove_white_space($scope.user.fname);
		$scope.clean_lname = $rootScope._remove_white_space($scope.user.lname);
		$scope.clean_age = $rootScope._remove_white_space($scope.user.age);
		$scope.clean_email = $rootScope._remove_white_space($scope.user.email);
		
		$scope.clean_servname = $rootScope._remove_white_space($scope.user.servname);
		//$scope.clean_servdesc = $rootScope._remove_white_space($scope.user.servdesc);
		
		//$scope.clean_address = $rootScope._remove_white_space($scope.user.address);
		
		$scope.clean_uname = $rootScope._remove_white_space($scope.user.uname);
		$scope.clean_userPass = $rootScope._remove_white_space($scope.user.pass);
		$scope.clean_userConfirmPass = $rootScope._remove_white_space($scope.user.cpass);
		var return_bol = true;
		
		
		if(!$rootScope.inputBlank($scope.clean_servname))
		{
		  $scope.user.servname_error = true;
		  $scope.user.servname_desc = "Please fill out this field.";
		  ret = false;
		} else {
		  $scope.user.servname_error = false;
		}
		if(!$rootScope.inputBlank($scope.clean_email))
		{
		  $scope.user.email_error = true;
		  $scope.user.email_desc = "Please fill out this field.";
		  ret = false;
		} else {
		  $scope.user.email_error = false;
		}
		/*if(!$rootScope.inputBlank($scope.clean_servdesc))
		{
		  $scope.user.servdesc_error = true;
		  $scope.user.servdesc_desc = "Please fill out this field.";
		  ret = false;
		} else {
		  $scope.user.servdesc_error = false;
		}*/
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
		/*if(!$rootScope.inputBlank($scope.clean_address))
		{
		  $scope.user.address_error = true;
		  $scope.user.address_desc = "Please fill out this field.";
		  ret = false;
		} else {
		  $scope.user.address_error = false;
		}*/
		
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
		$scope.user.servdesc ="";
		$scope.user.address = "";
		$scope.user.bday = "2018-01-01";
		$ionicLoading.show({
          template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
        });
        var obj    = new Object();
        obj.method = 'POST';
        obj.url    = $rootScope.baseURL + "/mobile/user_controller/addUser";
        obj.data   = new FormData();
        obj.data.append('servicename',$scope.user.servname);
        obj.data.append('servicedesc',$scope.user.servdesc);
        obj.data.append('username',$scope.user.uname);
        obj.data.append('password',$scope.user.pass);
        obj.data.append('fname',$scope.user.fname);
        obj.data.append('lname',$scope.user.lname);
        obj.data.append('age',$scope.user.age);
        obj.data.append('email',$scope.user.email);
        obj.data.append('address',$scope.user.address);
        obj.data.append('bday',$scope.user.bday);
        obj.data.append('package',$scope.user.pack);
        obj.data.append('gender',$scope.user.gender);
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
						$scope.user.email = "";
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
.controller('LoginCtrl', function($scope,  $http, $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {
	//console.log($rootScope.baseURL);
	//console.log($rootScope.isLogged);
	$scope.login = function()
    { 
		var username = document.getElementById("user").value;
		var password = document.getElementById("pass").value;

		if(username == "" && password == ""){
			$rootScope.showToast('Username and Password is required!');
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
					 $scope.user.name = "";
					 $scope.user.pass = "";
					  var obj = new Object();
					  obj.user_id  = success.data.user_info[0].user_id;
					  obj.username = success.data.user_info[0].username;
					  obj.user_role = success.data.user_info[0].user_role;
					  obj.face_img  = success.data.user_info[0].face_img;
			   
					  Auth.STORE_DATA('userData',obj);
					  $rootScope.isLogged  = true;
					  $rootScope.user_info =  Auth.FETCH_DATA('userData');
					  console.log($rootScope.user_info.user_id);
					  console.log($rootScope.user_info.face_img);
					  //console.log(JSON.stringify($rootScope.user_info.user_id));	
					  
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
					$rootScope.showToast('Invalid Username or Password, Please try again!');
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
.controller('SearchCtrl', function($scope,$sce,$ionicSlideBoxDelegate, $ionicModal, $http, $cordovaCamera, $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {
		
	
	//$rootScope.isLogged  = false;
	//console.log($rootScope.isLogged);
	$scope.user = [];
	$scope.users = [];

	$scope.user.fname_error = false;
	$scope.user.lname_error = false;
	$scope.user.age_error = false;
	$scope.user.bday_error = false;
	$scope.user.address_error = false;
	$scope.user.clickedEdit = false;
	$scope.user.servname_error = false;
	$scope.user.servdesc_error = false;

	console.log('in search controller');
	 $ionicModal.fromTemplateUrl('templates/search-settings.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });
	  $scope.openModal = function() {
	    $scope.modal.show();
	  };
	  $scope.closeModal = function() {
	    $scope.modal.hide();
	  };
	$scope.slideChanged = function(index) {
	    $scope.slideIndex = index;
	 };
	$scope.startSearch = function()
    { 
		//var searchkey = document.getElementById("searchkey").value;
		if($scope.user.search == ""){
			//$rootScope.showToast('Please enter Username and Password.');
		}
		else{
			$ionicLoading.show({
			  template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
			});
			var obj    = new Object();
			obj.method = 'POST';
			obj.url    = $rootScope.baseURL + "/mobile/user_controller/startSearch";
			obj.data   = new FormData();
			obj.data.append('search',$scope.user.search);

			if($rootScope.fage != 0 && $rootScope.tage != 0 && $rootScope.finalGender != 0){
				obj.data.append('fromage',$rootScope.fage);
				obj.data.append('toage',$rootScope.tage);
				obj.data.append('gender',$rootScope.finalGender);
			}
			

			obj.data.append('loginSecret','0ff9346b4edc8dc033bff30762bc3c15d465d3f');
			obj.params = {};
	   
			Auth.REQUEST(obj).then(
			  function(success) { 
				  if(JSON.stringify(success.data.success) == "true"){
					 console.log(success.data.search_result);
					 $scope.result = success.data.search_result;
					 $scope.mainDIR = $rootScope.baseURL + '/MediaFiles/';
					 //$scope.user.search = "";
					 
					 $ionicLoading.hide();
				  }
				  else{
				  	console.log(JSON.stringify(success.data.search_result));
				  	$scope.result = success.data.search_result;
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

    $scope.trustSrc = function(src) {
    	return $sce.trustAsResourceUrl(src);
  	}

    $scope.viewMore = function(data)
    { 
		console.log(data);
		$rootScope.s_u_ID = data;
		window.location.href = "#/menu/trader-profile";
    }
	
	 $scope.n_viewMore = function(data)
    { 
		console.log(data);
		$rootScope.s_u_ID = data;
		window.location.href = "#/n-trader-profile";
    }	

})
.controller('traderProfileCtrl',['$scope','$window','$ionicActionSheet','$ionicModal','$rootScope','$ionicPlatform','$ionicHistory','$ionicLoading','$ionicPopup','Auth',
                     function($scope, $window, $ionicActionSheet, $ionicModal, $rootScope,  $ionicPlatform,  $ionicHistory,  $ionicLoading, $ionicPopup, Auth){
	
	$scope.user = [];
	$scope.replaceAll = function(str, find, replace)
    {
		return str.replace(new RegExp(find, 'g'), replace);
	}
	$scope.$on('$ionicView.enter', function(event) {
		
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-calm"></ion-spinner>',
		});
		
		var obj    = new Object();
			obj.method = 'POST';
			obj.url    = $rootScope.baseURL + "/mobile/user_controller/getUserData";
			obj.data   = new FormData();
			obj.data.append('userID',$rootScope.s_u_ID);
			obj.data.append('loginSecret','0ff9346b4edc8dc033bff30762bc3c15d465d3f');
			obj.params = {};
			   
				Auth.REQUEST(obj).then(
					function(success) { 
						if(JSON.stringify(success.data.success) == "true"){
							console.log(success.data.user_info);
							var act = success.data.user_info.activity;
							console.log(act);
							if(act == "" || act == null || act == "null"){
								console.log("act null");
							}else{
								var actini = $scope.replaceAll(act,'"','');
								var actfinal = actini.split(",");
								$scope.user.activity1 = actfinal[0];
								$scope.user.activity2 = actfinal[1];
								$scope.user.activity3 = actfinal[2];
							}
							setTimeout(function(){ $ionicLoading.hide(); }, 500);
							console.log(success.data.user_info);
							$scope.user.username = success.data.user_info.username;
							$scope.user.user_id = success.data.user_info.user_id;
							//document.getElementById("user_bday").value = success.data.user_info.birthday;
							$scope.user.fname = success.data.user_info.first_name;
							$scope.user.lname = success.data.user_info.last_name;
							$scope.user.age = success.data.user_info.age;
							$scope.user.gender = success.data.user_info.gender;
							$scope.user.address = success.data.user_info.address;
							$scope.user.package = success.data.user_info.user_role;
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
							$scope.user.civil_status = success.data.user_info.civil_status;
							document.getElementById("user_live_athome").value = success.data.user_info.live_athome;
							$scope.user.children = success.data.user_info.children;
							$scope.user.ethniticity = success.data.user_info.ethniticity;
							$scope.user.servname = success.data.user_info.service_name;
							$scope.user.servdesc = success.data.user_info.service_desc;
							
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

	// $scope.ConnectWithTrader = function(traderid){
	// 	$rootScope.s_u_ID = traderid;
	// 	window.location.href = "#/menu/connect-trader";
	// }
	$scope.ConnectWithTrader = function(chat_room,traderid){
		$rootScope.chat_room = chat_room;
		$rootScope.s_u_ID = traderid;
		window.location.href = "#/menu/connect-trader";
	}
	$scope.viewImages = function(){
		window.location.href = "#/n-trader-images";
	}
	$scope.viewVideos = function(){
		window.location.href = "#/n-trader-videos";
	}
	$scope.viewTradeimages = function(){
		window.location.href = "#/menu/trader-images";
	}
	$scope.viewTradevideos = function(){
		window.location.href = "#/menu/trader-videos";
	};

}])
.controller('traderImageCtrl',['$scope','$http','$window','$ionicActionSheet','$ionicModal','$rootScope','$ionicPlatform','$ionicHistory','$ionicLoading','$ionicPopup','Auth',
                     function($scope, $http, $window, $ionicActionSheet, $ionicModal, $rootScope,  $ionicPlatform,  $ionicHistory,  $ionicLoading, $ionicPopup, Auth){
	
	$scope.user = [];

	$scope.replaceAll = function(str, find, replace)
    {
		return str.replace(new RegExp(find, 'g'), replace);
	}

	$scope.$on('$ionicView.enter', function(event){
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>',
		});
		var obj    = new Object();
		obj.method = 'POST';
		obj.url    = $rootScope.baseURL + "/mobile/upload_controller/ListMedia";
		obj.data   = new FormData();
		obj.data.append('user_id',$rootScope.s_u_ID);
		obj.data.append('dbTable','imagefiles');
		obj.params = {};
		   
		Auth.REQUEST(obj).then(
			function(success) {
				$scope.response = success.data;
				if ($scope.response.success == true) {
	        		$scope.mainDIR = $rootScope.baseURL + '/MediaFiles/';
	        		$scope.IdholderDIR =  $rootScope.s_u_ID + "/Images/";
	        		$scope.tradeImages = $scope.response.file_names;
	        		console.log($scope.tradeImages);
					$ionicLoading.hide();
	        	} else {
	        		$scope.tradeImages = $scope.response.file_names;
					$ionicLoading.hide();
	        	}
			},
			function(error) { 
				setTimeout(function(){ $ionicLoading.hide(); }, 1000);
			}
		); 
	})



}])
.controller('traderVideoCtrl',['$scope','$sce','$http','$window','$ionicActionSheet','$ionicModal','$rootScope','$ionicPlatform','$ionicHistory','$ionicLoading','$ionicPopup','Auth',
                     function($scope, $sce, $http, $window, $ionicActionSheet, $ionicModal, $rootScope,  $ionicPlatform,  $ionicHistory,  $ionicLoading, $ionicPopup, Auth){
	
	$scope.user = [];
	$scope.trustSrc = function(src) {
    	return $sce.trustAsResourceUrl(src);
  	}; 
	$scope.replaceAll = function(str, find, replace)
    {
		return str.replace(new RegExp(find, 'g'), replace);
	}

	$scope.$on('$ionicView.enter', function(event){
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>',
		});
		var obj    = new Object();
		obj.method = 'POST';
		obj.url    = $rootScope.baseURL + "/mobile/upload_controller/ListMedia";
		obj.data   = new FormData();
		obj.data.append('user_id',$rootScope.s_u_ID);
		obj.data.append('dbTable','videofiles');
		obj.params = {};
		   
		Auth.REQUEST(obj).then(
			function(success) {
				$scope.response = success.data;
				if ($scope.response.success == true) {
	        		$scope.mainDIR = $rootScope.baseURL + '/MediaFiles/';
	        		$scope.IdholderDIR =  $rootScope.s_u_ID + "/Videos/";
	        		$scope.tradeVideos = $scope.response.file_names;
					$ionicLoading.hide();
	        	} else {
	        		$scope.tradeVideos = $scope.response.file_names;
					$ionicLoading.hide();
	        	}
			},
			function(error) { 
				setTimeout(function(){ $ionicLoading.hide(); }, 1000);
			}
		); 
	})

}])

.controller('MenuCtrl', function($scope,  $ionicModal, $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {
	
	//$rootScope.isLogged  = false;
	//console.log($rootScope.isLogged);
	console.log($rootScope.user_info);
	$scope.$on('$ionicView.enter', function(event){
		$scope.username = $rootScope.user_info.username;
		$scope.mainDIR = $rootScope.baseURL + '/MediaFiles/';
	    $scope.profileFolder =  $rootScope.user_info.user_id + "/Profile_images/";
	    $scope.face_img = $rootScope.user_info.face_img;
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>',
		});
		var obj    = new Object();
		obj.method = 'POST';
		obj.url    = $rootScope.baseURL + "/mobile/chat_controller/count_unseen_messages";
		obj.data   = new FormData();
		obj.data.append('user_id',$rootScope.user_info.user_id);
		obj.params = {};
		$scope.package = $rootScope.user_info.user_role;
		Auth.REQUEST(obj).then(
			function(success) {
				$scope.response = success.data;
				if ($scope.response.success == true) {
	        		$scope.unseen_messages = $scope.response.unseen_messages;
					$ionicLoading.hide();
	        	} else {
					$ionicLoading.hide();
	        	}
			},
			function(error) { 
				setTimeout(function(){ $ionicLoading.hide(); }, 1000);
			}
		); 
	})

	$ionicModal.fromTemplateUrl('templates/search-settings.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });
	  $scope.openModal = function() {
	    $scope.modal.show();
	  };
	  $scope.closeModal = function() {
	    $scope.modal.hide();
	  };

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
	$scope.user.region_error = false;
	$scope.user.state_error = false;
	$scope.user.country_error = false;
	$scope.user.fname_error = false;
	$scope.user.lname_error = false;
	$scope.user.age_error = false;
	$scope.user.email_error = false;
	$scope.user.bday_error = false;
	$scope.user.address_error = false;
	$scope.user.clickedEdit = false;
	$scope.user.servname_error = false;
	$scope.user.servdesc_error = false;

	
	$scope.editProfile = function()
    {
		$scope.user.clickedEdit = true;
		$("#profile-wrapper label input").prop("disabled", false);
	}
	$scope.saveProfile = function()
    {
		//$scope.user.clickedEdit = false;
		//$("#profile-wrapper label input").prop("disabled", true);
		if($scope.user.email == undefined) $scope.user.email="";  
		if($scope.user.gender == undefined) $scope.user.gender="";  
		if($scope.user.region == undefined) $scope.user.region="";  
		if($scope.user.state == undefined) $scope.user.state="";  
		if($scope.user.country == undefined) $scope.user.country="";  
		if($scope.user.servname == undefined) $scope.user.servname="";  
		if($scope.user.servdesc == undefined) $scope.user.servdesc="";  
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
			/*var tDate = new Date(document.getElementById("user_bday").value);
			var monD = tDate.getMonth() + 1;
			var todD = tDate.getDate();
			if(monD < 10){ monD = "0"+monD }
			if(todD < 10){ todD = "0"+todD }
			var newDate = tDate.getFullYear()+"-"+monD+"-"+todD;
			$scope.user.bday = newDate;*/
			$scope.user.bday = "2018-01-01";
			//console.log($scope.user.bday);
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
		$scope.clean_email = $rootScope._remove_white_space($scope.user.email);
		$scope.clean_servname = $rootScope._remove_white_space($scope.user.servname);
		$scope.clean_servdesc = $rootScope._remove_white_space($scope.user.servdesc);
		$scope.clean_address = $rootScope._remove_white_space($scope.user.address);

		var return_bol = true;
		
		if(!$rootScope.inputBlank($scope.clean_servname))
		{
		  $scope.user.servname_error = true;
		  $scope.user.servname_desc = "Please fill out this field.";
		  ret = false;
		} else {
		  $scope.user.servname_error = false;
		}
		if(!$rootScope.inputBlank($scope.clean_email))
		{
		  $scope.user.email_error = true;
		  $scope.user.email_desc = "Please fill out this field.";
		  ret = false;
		} else {
		  $scope.user.email_error = false;
		}
		/*if(!$rootScope.inputBlank($scope.clean_servdesc))
		{
		  $scope.user.servdesc_error = true;
		  $scope.user.servdesc_desc = "Please fill out this field.";
		  ret = false;
		} else {
		  $scope.user.servdesc_error = false;
		}*/
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
			/*if(!$rootScope.inputBlank(document.getElementById("user_bday").value))
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
		}*/

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
        obj.data.append('region',$scope.user.region);
        obj.data.append('gender',$scope.user.gender);
        obj.data.append('email',$scope.user.email);
        obj.data.append('state',$scope.user.state);
        obj.data.append('country',$scope.user.country);
        obj.data.append('servname',$scope.user.servname);
        obj.data.append('servdesc',$scope.user.servdesc);
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
		$scope.mainDIR = $rootScope.baseURL + '/MediaFiles/';
	    $scope.profileFolder =  $rootScope.user_info.user_id + "/Profile_images/";
		$scope.face_img = $rootScope.user_info.face_img;
		console.log(JSON.stringify($rootScope.user_info));
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
							console.log(act);
							if(act == "" || act == null || act == "null"){
								console.log("act null");
							}else{
								var actini = $scope.replaceAll(act,'"','');
								var actfinal = actini.split(",");
								$scope.user.activity1 = actfinal[0];
								$scope.user.activity2 = actfinal[1];
								$scope.user.activity3 = actfinal[2];
							}
							setTimeout(function(){ $ionicLoading.hide(); }, 500);
							console.log(success.data.user_info);

							
						//	document.getElementById("user_bday").value = success.data.user_info.birthday;
							$scope.user.gender = success.data.user_info.gender;
							$scope.user.fname = success.data.user_info.first_name;
							$scope.user.lname = success.data.user_info.last_name;
							$scope.user.age = success.data.user_info.age;
							$scope.user.address = success.data.user_info.address;
							
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
							$scope.user.servname = success.data.user_info.service_name;
							$scope.user.servdesc = success.data.user_info.service_desc;
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
.controller('ResetPasswordCtrl',['$scope','$window','$ionicActionSheet','$ionicModal','$rootScope','$ionicPlatform','$ionicHistory','$ionicLoading','$ionicPopup','Auth',
                     function($scope, $window, $ionicActionSheet, $ionicModal, $rootScope,  $ionicPlatform,  $ionicHistory,  $ionicLoading, $ionicPopup, Auth){
	$scope.user = [];
	$scope.user.uname_error = false;
	$scope.user.email_error = false;
	
	$scope.resetpass = function()
    {
		var validInput = $scope.VALIDATE_REGISTER_INPUT();
		if(validInput){
			$scope.ADD_TO_SERVER();
			console.log("add to server");

		}
	}
	$scope.VALIDATE_REGISTER_INPUT = function ()
	{
		if($scope.user.email == undefined) $scope.user.email="";  
		if($scope.user.uname == undefined) $scope.user.uname="";  
		$scope.clean_uname = $rootScope._remove_white_space($scope.user.uname);
		$scope.clean_email = $rootScope._remove_white_space($scope.user.email);
		var ret = true;
		if(!$rootScope.inputBlank($scope.clean_uname))
		{
		  $scope.user.uname_error = true;
		  $scope.user.uname_desc = "Please fill out this field.";
		  ret = false;
		} else {
		  $scope.user.uname_error = false;
		}
		if(!$rootScope.inputBlank($scope.clean_email))
		{
		  $scope.user.email_error = true;
		  $scope.user.email_desc = "Please fill out this field.";
		  ret = false;
		} else {
		  $scope.user.email_error = false;
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
        obj.url    = $rootScope.baseURL + "/mobile/user_controller/send_reset_code";
        obj.data   = new FormData();
        obj.data.append('username',$scope.user.uname);
        obj.data.append('email',$scope.user.email);
        obj.params = {};
   
			Auth.REQUEST(obj).then(
                function(success) { 
                    console.log(success.data);
					$ionicLoading.hide();
					if(success.data.success == true){
						$scope.user.uname = "";
						$scope.user.email = "";
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
		 title: 'SUCCESS',
		 template: 'New password has been sent your email address.'
	   });

	   alertPopup.then(function(res) {
		   window.location.href = "#/search";
		 //console.log('Thank you for not eating my delicious ice cream cone');
	   });
	};
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

// handling Upload of images Contollers
.controller('FilesCtrl', ['$scope','$http','$cordovaCamera','$rootScope','$ionicLoading','$ionicPlatform','$ionicPopup','$ionicActionSheet','Auth', 
	function($scope, $http, $cordovaCamera, $rootScope,  $ionicLoading,  $ionicPlatform, $ionicPopup, $ionicActionSheet,Auth) {
    
    $scope.pictureUrl = null;
    $scope.face_img = $rootScope.user_info.face_img;
    $scope.$on('$ionicView.enter', function(event){
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>',
		});
		var obj    = new Object();
		obj.method = 'POST';
		obj.url    = $rootScope.baseURL + "/mobile/upload_controller/ListMedia";
		obj.data   = new FormData();
		obj.data.append('user_id',$rootScope.user_info.user_id);
		obj.data.append('dbTable','imagefiles');
		obj.params = {};
		   
		Auth.REQUEST(obj).then(
			function(success) {
				$scope.response = success.data;
				$scope.package = $rootScope.user_info.user_role;
				if ($scope.response.success == true) {
					console.log("in IF");
	        	
	        		$rootScope.fileCount = $scope.response.file_names[0].imgCount;
	        		
					$ionicLoading.hide();
	        	} else {
	        		console.log("in ELSE");
	        		$rootScope.fileCount = $scope.response.file_names;
					$ionicLoading.hide();
	        	}
			},
			function(error) { 
				setTimeout(function(){ $ionicLoading.hide(); }, 1000);
			}
		); 
	})

    $scope.takePicture = function(){
    	var options = {
    	  sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
	      destinationType: Camera.DestinationType.DATA_URL,
	      encodingType: Camera.EncodingType.JPEG
	    }
	    $ionicLoading.show({
		  template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
		});
    	$cordovaCamera.getPicture(options)
    	.then(function(data){
    		
    		$scope.pictureUrl = "data:image/jpeg;base64," + data;
    		$rootScope.pictureImage = data;
    		$ionicLoading.hide();
    		 
    	}, function(error){
    		console.log('camera error:' + JSON.stringify(error));
    		$ionicLoading.hide();
    	});
    }

    $scope.showSuccessMessage = function(message) {
	   var alertPopup = $ionicPopup.alert({
		 title: 'SUCCESS!',
		 template: message
	   });
	}

	$scope.showSuccessMessageRedirect = function(message) {
	   var alertPopup = $ionicPopup.alert({
		 title: 'SUCCESS!',
		 template: message
	   });
	   alertPopup.then(function(res) {
		   window.location.href = "#/menu/image-list";
		 //console.log('Thank you for not eating my delicious ice cream cone');
	   });
	}

    $scope.uploadImage = function(folder,hasProfileimg){
    	$ionicLoading.show({
		  template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>',
		});
	   
		var obj    = new Object();
		obj.method = 'POST';
		obj.url    = $rootScope.baseURL + "/mobile/upload_controller/upload_image";
		obj.data   = new FormData();
		obj.data.append('folder',folder);
		obj.data.append('base64',$rootScope.pictureImage);
		obj.data.append('user_id',$rootScope.user_info.user_id);
		obj.data.append('hasProfileimg',hasProfileimg);
		obj.data.append('loginSecret','0ff9346b4edc8dc033bff30762bc3c15d465d3f');
		obj.params = {};
   
		Auth.REQUEST(obj).then(
		  function(success) { 
			  if(JSON.stringify(success.data.success) == "true"){
				$ionicLoading.hide();
        		
        		if(success.data.file != 'notProfile'){
        			$rootScope.user_info.face_img = success.data.file;
        		} else {
        			$rootScope.fileCount++;
        		}

        		if(folder == 'Images'){
        			$scope.showSuccessMessageRedirect(success.data.message);
        		} else {
        			$scope.showSuccessMessage(success.data.message);
        		}
        		$scope.pictureUrl = null;
			  }
			  else{
			  	$scope.showSuccessMessage(success.data.message);
				$ionicLoading.hide();
				
			  }
			},
			function(error) { 
			  $ionicLoading.hide();
			}
		);
    };
 
}])
.controller('ImageListCtrl', function($scope, $cordovaActionSheet,$ionicActionSheet,$rootScope, $ionicModal, $sce, $http, $cordovaCamera, $rootScope,  $ionicLoading,  $ionicPlatform, $ionicPopup, Auth) {


	$scope.$on('$ionicView.enter', function(event){
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>',
		});
		var obj    = new Object();
		obj.method = 'POST';
		obj.url    = $rootScope.baseURL + "/mobile/upload_controller/ListMedia";
		obj.data   = new FormData();
		obj.data.append('user_id',$rootScope.user_info.user_id);
		obj.data.append('dbTable','imagefiles');
		obj.params = {};
		   
		Auth.REQUEST(obj).then(
			function(success) {
				$scope.response = success.data;
				$scope.package = $rootScope.user_info.user_role;
				if ($scope.response.success == true) {
					console.log("in IF");
	        		$scope.mainDIR = $rootScope.baseURL + '/MediaFiles/';
	        		$scope.IdholderDIR =  $rootScope.user_info.user_id + "/Images/";
	        		$scope.Images = $scope.response.file_names;
	        		$rootScope.Uploads = $scope.response.file_names[0].imgCount;
	        		console.log($rootScope.Uploads);
	        		console.log($scope.Images);
					$ionicLoading.hide();
	        	} else {
	        		console.log("in ELSE");
	        		$scope.Images = $scope.response.file_names;
	        		$rootScope.Uploads = $scope.response.file_names;
					$ionicLoading.hide();
	        	}
			},
			function(error) { 
				setTimeout(function(){ $ionicLoading.hide(); }, 1000);
			}
		); 
	})

	$scope.subCount = function(){
		if($rootScope.Uploads != 0){
			$rootScope.Uploads--;
		}
	}

	$scope.trustSrc = function(src) {
    	return $sce.trustAsResourceUrl(src);
  	}

  	$scope.showSuccessMessage = function(message) {
	   var alertPopup = $ionicPopup.alert({
		 title: 'SUCCESS!',
		 template: message
	   });
	}

  	$scope.deleteFile = function(itemIndex,imgID,imgName,table,storage) {
  		
	   var options = {
	    title: 'Are you sure you wanted to delete this Image?',
	    addCancelButtonWithLabel: 'Cancel',
	    androidEnableCancelButton : true,
	    winphoneEnableCancelButton : true,
	    addDestructiveButtonWithLabel : 'Delete it'
	  };

	   $cordovaActionSheet.show(options)
      .then(function(btnIndex) {
        if(btnIndex === 1){
        	$ionicLoading.show({
				template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>',
			});
        	var obj    = new Object();
			obj.method = 'POST';
			obj.url    = $rootScope.baseURL + "/mobile/upload_controller/deleteMedia";
			obj.data   = new FormData();
			obj.data.append('user_id',$rootScope.user_info.user_id);
			obj.data.append('storage',storage);
			obj.data.append('filename',imgName);
			obj.data.append('img_id',imgID);
			obj.data.append('dbTable',table);
			obj.params = {};
			   
			Auth.REQUEST(obj).then(
				function(success) {
					$scope.response = success.data;
					if ($scope.response.success == true) {
		        		$scope.Images.splice(itemIndex,1);
		        		$scope.showSuccessMessage($scope.response.message);
		        		$scope.subCount();
						$ionicLoading.hide();
		        	} else {
						$ionicLoading.hide();
		        	}
				},
				function(error) { 
					setTimeout(function(){ $ionicLoading.hide(); }, 1000);
				}
			);
        	
         }
     });
  };

})

// end

// Handling Upload of videos Controllers
.controller('VideosCtrl', ['$scope','$sce','$cordovaFile','$cordovaFileTransfer','$cordovaCapture','$cordovaFile','$http','$cordovaCamera','$rootScope','$ionicLoading','$ionicPlatform','$ionicPopup','$ionicActionSheet','Auth',
	function($scope, $sce, $cordovaFile, $cordovaFileTransfer, $cordovaCapture, $cordovaFile, $http, $cordovaCamera, $rootScope,  $ionicLoading,  $ionicPlatform, $ionicPopup, $ionicActionSheet, Auth) {
    
	$scope.videoLoaded = null;

	$scope.$on('$ionicView.enter', function(event){
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>',
		});
		var obj    = new Object();
		obj.method = 'POST';
		obj.url    = $rootScope.baseURL + "/mobile/upload_controller/ListMedia";
		obj.data   = new FormData();
		obj.data.append('user_id',$rootScope.user_info.user_id);
		obj.data.append('dbTable','videofiles');
		obj.params = {};
		   
		Auth.REQUEST(obj).then(
			function(success) {
				$scope.response = success.data;
				$scope.package = $rootScope.user_info.user_role;
				if ($scope.response.success == true) {
	        		// $scope.mainDIR = $rootScope.baseURL + '/MediaFiles/';
	        		// $scope.IdholderDIR =  $rootScope.user_info.user_id + "/Videos/";
	        		$rootScope.vidFilecount = $scope.response.file_names[0].imgCount;
	        		$scope.Videos = $scope.response.file_names;
	        		
					$ionicLoading.hide();
	        	} else {
	        		$rootScope.vidFilecount = $scope.response.file_names;
					$ionicLoading.hide();
	        	}
			},
			function(error) { 
				setTimeout(function(){ $ionicLoading.hide(); }, 1000);
			}
		); 
	})

    $scope.showSuccessMessage = function(message) {
	   var alertPopup = $ionicPopup.alert({
		 title: 'SUCCESS!',
		 template: message
	   });
	}

	$scope.showSuccessMessageRedirect = function(message,redirect) {
	   var alertPopup = $ionicPopup.alert({
		 title: 'SUCCESS!',
		 template: message
	   });
	   alertPopup.then(function(res) {
		   window.location.href = redirect;
		 //console.log('Thank you for not eating my delicious ice cream cone');
	   });
	}

	// copy video file
	$scope.copyFile = function(namePath,name,toPath,filename){
		$cordovaFile.copyFile(namePath, name, toPath, filename)
	      .then(function(info) {
	      	console.log('Copying file..');
	      	$rootScope.pathTodel = toPath;
	       	$scope.videoLoaded = info.nativeURL;
	       	$rootScope.videofile = info.nativeURL;
	       	var thumbname = info.nativeURL.slice(0, -4);
        	var mainDir = cordova.file.dataDirectory;
        	var thumbDir = 'TMWFILES/VIDTHUMBS';
        	var pathTothumbs = mainDir + thumbDir;
        	

        	// generate thumbnail image from video
	       	window.PKVideoThumbnail.createThumbnail (info.nativeURL, thumbname + '.png', function(vidThumb) {
			 	var thumbPath = vidThumb.substr(0, vidThumb.lastIndexOf('/') + 1);
			 	var img = vidThumb.substr(vidThumb.lastIndexOf('/') + 1);

			 	window.resolveLocalFileSystemURL( mainDir , function (dirEntry) {
			 	 	// check VIDTHUMBS directory does exists 
			    	$cordovaFile.checkDir(mainDir, thumbDir)
		      		.then(function (success) {
		      			console.log('DOES EXISTS');
		      			// if does exists, copy image to TMWTHUMBS
			      		$cordovaFile.copyFile('file://' + thumbPath,img,pathTothumbs,img)
					      .then(function (thumbFile) {
					        // success
					        console.log('New image Path:' + JSON.stringify(thumbFile));
					        $scope.thumbNailimage = thumbFile.nativeURL;
					      }, function (error) {
					        // error
					        console.log('Error in copying Found:' + error.message);
					    });
			     	}, function (error) {
			       		// else create VIDTHUMBS write image to directory
				       	function successHandler() {
			    			console.log('Directory created');
			    			// copy image to VIDTHUMBS directory
				    		$cordovaFile.copyFile('file://' + thumbPath,img,pathTothumbs,img)
						      .then(function (thumbFile) {
						        // success
						        console.log('New image Path:' + JSON.stringify(thumbFile));
						        $scope.thumbNailimage = thumbFile.nativeURL;
						      }, function (error) {
						        // error
						        console.log('Error in copying Found:' + error.message);
						    });
				    	}
				    	function errorHandler(err) {
				    		console.log('Error in creating directory.', err);
				    	}
				       	dirEntry.getDirectory(thumbDir, { create: true }, successHandler, errorHandler);
				    });
			    });
		 		
			},function(error){
	    		console.log('Thumbnail Error:' + error);
	    	});

	       	console.log('Copied file:' + JSON.stringify(info));
	       	$ionicLoading.hide();
	      }, function(e) {
	      	console.log(JSON.stringify('Error copying:' + e.message));
	    });
	}

	$scope.selectVideo = function(){
    	var options = {
    		
    	  sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
	      destinationType: Camera.DestinationType.FILE_URI,
	      mediaType:Camera.MediaType.VIDEO
	     
	    }
	    $ionicLoading.show({
		  template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>'
		});
    	$cordovaCamera.getPicture(options)
    	.then(function(videoData){
    		
	     	var name = videoData.substr(videoData.lastIndexOf('/') + 1);
        	var namePath = videoData.substr(0, videoData.lastIndexOf('/') + 1);
        	console.log(namePath);
        	var text = '';
			var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			for ( var i=0; i < 5; i++ ) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
        	var newName = text + name;
    		var tempDirname = 'TMWFILES';
        	var toPath = cordova.file.dataDirectory;
        	var pathTocopy = toPath + tempDirname;
			$rootScope.newFilename = newName;
    		window.resolveLocalFileSystemURL( toPath , function (dirEntry) {
			 	
			 	 $cordovaFile.checkDir(toPath, tempDirname)
			      .then(function (success) {
			      	// if it exists, copy video 
			       	$scope.copyFile('file://'+ namePath,name,pathTocopy,newName);
			        $ionicLoading.hide();
			     }, function (error) {
			       // else create directory and copy video
			       $scope.createTempstorage(toPath,tempDirname,pathTocopy,newName,namePath);
			       $ionicLoading.hide();
			     });
		     });
    		$ionicLoading.hide();
    		 
    	}, function(error){
    		console.log('camera error:' + JSON.stringify(error));
    		$ionicLoading.hide();
    	});
    }

	// creating the directory TMWFILES.
	$scope.createTempstorage = function(parentDirectory,directoryToCreate,pathTocopy,newName,namePath) {
	    window.resolveLocalFileSystemURL( parentDirectory , function (dirEntry) {
	    	function successHandler() {
	    		console.log('Directory created');
	    		$scope.copyFile(namePath,newName,pathTocopy,newName);
	    	}
	    	function errorHandler(err) {
	    		console.log('Error in creating directory.', err);
	    	}
	       	dirEntry.getDirectory(directoryToCreate, { create: true }, successHandler, errorHandler);
	    });
	}

  	$scope.uploadVideo = function(location,table){
  		$ionicLoading.show({
		  template: '<ion-spinner class="spinner-calm" icon="android"> Uploading Trade video..</ion-spinner> ',
		});

  		// settings for uploading process
  		var server = $rootScope.baseURL + "/mobile/upload_controller/upload_video";
  		var filePath = $scope.videoLoaded;
  		var filename = $rootScope.newFilename;
  		var pathTodel = $rootScope.pathTodel;
  		var options = {
		    fileKey: "file",
		    fileName: filename,
		    chunkedMode: true,
		    mimeType: "multipart/form-data",
		    params : {
		    	'fileName': filename,
		    	'user'	  : $rootScope.user_info.user_id,
		    	'location'	: location,
		    	'table'		: table			
		    }
		};

	   // attempt on uploading the video file
	   $cordovaFileTransfer.upload(server, filePath, options)
      	.then(function(result) {
      		// if upload was a success.
       		$scope.fileTodelete(pathTodel,filename);
       		$rootScope.vidFilecount++;
       		$scope.videoLoaded = null;
       		if(location == 'Videos'){
       			$scope.showSuccessMessageRedirect(result.response,'#/menu/video-list');
       		} else {
       			$scope.showSuccessMessageRedirect(result.response,'#/menu/video-promotion-list');
       		}
       		$ionicLoading.hide();
      	}, function(err) {
      		// if there was an error
        	console.log(JSON.stringify(err));
        	$ionicLoading.hide();
      	});
  	}

  	$scope.fileTodelete = function(path,filename){
  		window.resolveLocalFileSystemURL(path, function(dir) {
			dir.getFile(filename, {create:false}, function(fileEntry) {
              fileEntry.remove(function(success){
                 console.log(success);
              },function(error){
                 console.log(error);
              },function(Existing){
                 console.log(Existing);
              });
			});
		});
  	}

  	$scope.trustSrc = function(src) {
    	return $sce.trustAsResourceUrl(src);
  	}; 
 
}])

.controller('VideoListCtrl', ['$scope','$sce','$http','$cordovaActionSheet','$cordovaCamera','$rootScope','$ionicLoading','$ionicPlatform','$ionicPopup','$ionicActionSheet','Auth', 
	function($scope, $sce, $http, $cordovaActionSheet ,$cordovaCamera, $rootScope,  $ionicLoading,  $ionicPlatform, $ionicPopup, $ionicActionSheet, Auth) {

	$scope.$on('$ionicView.enter', function(event){
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>',
		});
		var obj    = new Object();
		obj.method = 'POST';
		obj.url    = $rootScope.baseURL + "/mobile/upload_controller/ListMedia";
		obj.data   = new FormData();
		obj.data.append('user_id',$rootScope.user_info.user_id);
		obj.data.append('dbTable','videofiles');
		obj.params = {};
		   
		Auth.REQUEST(obj).then(
			function(success) {
				$scope.response = success.data;
				$scope.package = $rootScope.user_info.user_role;
				if ($scope.response.success == true) {
	        		// $scope.mainDIR = $rootScope.baseURL + '/MediaFiles/';
	        		// $scope.IdholderDIR =  $rootScope.user_info.user_id + "/Videos/";
	        		$rootScope.vidUploads = $scope.response.file_names[0].imgCount;
	        		$scope.Videos = $scope.response.file_names;
	        		
					$ionicLoading.hide();
	        	} else {
	        		$scope.Videos = $scope.response.file_names;
	        		$rootScope.vidUploads = $scope.response.file_names;
					$ionicLoading.hide();
	        	}
			},
			function(error) { 
				setTimeout(function(){ $ionicLoading.hide(); }, 1000);
			}
		); 
	})

	$scope.subVidcnt = function(){
		if($rootScope.vidUploads != 0){
			$rootScope.vidUploads--;
		}
	}

	$scope.deleteVid = function(itemIndex,imgID,imgName,table,storage) {
  		
	   var options = {
	    title: 'Are you sure you wanted to delete this Video?',
	    addCancelButtonWithLabel: 'Cancel',
	    androidEnableCancelButton : true,
	    winphoneEnableCancelButton : true,
	    addDestructiveButtonWithLabel : 'Delete it'
	  };

	   $cordovaActionSheet.show(options)
      .then(function(btnIndex) {
        if(btnIndex === 1){
        	$ionicLoading.show({
				template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>',
			});
        	var obj    = new Object();
			obj.method = 'POST';
			obj.url    = $rootScope.baseURL + "/mobile/upload_controller/deleteMedia";
			obj.data   = new FormData();
			obj.data.append('user_id',$rootScope.user_info.user_id);
			obj.data.append('storage',storage);
			obj.data.append('filename',imgName);
			obj.data.append('img_id',imgID);
			obj.data.append('dbTable',table);
			obj.params = {};
			   
			Auth.REQUEST(obj).then(
				function(success) {
					$scope.response = success.data;
					if ($scope.response.success == true) {
		        		$scope.Videos.splice(itemIndex,1);
		        		$scope.showSuccessMessage($scope.response.message);
		        		$scope.subVidcnt();
						$ionicLoading.hide();
		        	} else {
						$ionicLoading.hide();
		        	}
				},
				function(error) { 
					setTimeout(function(){ $ionicLoading.hide(); }, 1000);
				}
			);
        	
         }
     });
  }
  	$scope.showSuccessMessage = function(message) {
	   var alertPopup = $ionicPopup.alert({
		 title: 'SUCCESS!',
		 template: message
	   });
	}

	$scope.trustSrc = function(src) {
    	return $sce.trustAsResourceUrl(src);
  	};  
}])


// end

.controller('ConnectCtrl', ['$scope','$sce','$http','$cordovaCamera','$rootScope','$ionicLoading','$ionicPlatform','$ionicPopup','$ionicActionSheet','$interval','$timeout','Auth', 
	function($scope, $sce, $http, $cordovaCamera, $rootScope,  $ionicLoading,  $ionicPlatform, $ionicPopup, $ionicActionSheet, $interval, $timeout, Auth) {
	
	// update Dec 28, 2018
	
	// var ret = $interval(function(){ 
 //      	$scope.get_old_messages_count_by_chatroom();
 //      	$scope.get_new_messages_count_by_chatroom();
      	
 //      	console.log("OLD COUNT:" + parseInt(localStorage.getItem('OldCount')));
 //      	console.log("NEW COUNT:" + $rootScope.chatNewCnt);
	// },1000);
	

	$scope.stopRetrieve = function(){
		$interval.cancel(ret);
	}

	$scope.$on('$ionicView.enter', function(event){
		$scope.chats = [];
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>',
		});
		var obj    = new Object();
		obj.method = 'POST';
		obj.url    = $rootScope.baseURL + "/mobile/chat_controller/fetch_messages";
		obj.data   = new FormData();
		obj.data.append('fromTrader',$rootScope.user_info.user_id);
		obj.data.append('toTrader',$rootScope.s_u_ID);
		obj.data.append('chat_room',$rootScope.chat_room);
		obj.params = {};
		   
		Auth.REQUEST(obj).then(
			function(success) {
				$scope.response = success.data;
				if ($scope.response.success == true) {
					$scope.mainDIR = $rootScope.baseURL + '/MediaFiles/';
	        		$scope.chats = $scope.response.chat_messages;
	        		//console.log(JSON.stringify($scope.chats));
	        		$rootScope.chatCount = $scope.response.chat_messages[0].count;
					$ionicLoading.hide();
	        	} else {
	        		$rootScope.chatCount = $scope.response.chat_messages;
					$ionicLoading.hide();
	        	}
			},
			function(error) { 
				setTimeout(function(){ $ionicLoading.hide(); }, 1000);
			}
		);
	})

	$scope.sendMessage = function(){
		
		var obj    = new Object();
		obj.method = 'POST';
		obj.url    = $rootScope.baseURL + "/mobile/chat_controller/insert_chat";
		obj.data   = new FormData();
		obj.data.append('fromTrader',$rootScope.user_info.user_id);
		obj.data.append('toTrader',$rootScope.s_u_ID);
		obj.data.append('chatMessage',$scope.trader.chat);
		obj.data.append('chat_room',$rootScope.chat_room);
		
		obj.params = {};
   
		Auth.REQUEST(obj).then(
		  function(success) { 
			  if(JSON.stringify(success.data.success) == "true"){
				
				// fetch chat messages
				var chatdata = [];
				chatdata.user_id = success.data.chat_messages[0].user_id;
				chatdata.face_img = success.data.chat_messages[0].face_img;
				chatdata.username = success.data.chat_messages[0].username;
				chatdata.message = success.data.chat_messages[0].message;
				$scope.chats.unshift(chatdata);
				$rootScope.chatCount++;
				$scope.trader.chat = "";
				//$scope.RetrieveMessage();
				// end
				
			  }
			  else{
				$ionicLoading.hide();
				//console.log("false");
				//$rootScope.showToast('Invalid Username or Password, Please try again!');
			  }
			},
			function(error) { 
			  $ionicLoading.hide();
			  // $rootScope.showToast('Invalid Username/Password');
			}
		);   
	}

	$scope.chatMessagerealtime = function(){
    	var obj    = new Object();
		obj.method = 'POST';
		obj.url    = $rootScope.baseURL + "/mobile/chat_controller/latest_chat_message";
		obj.data   = new FormData();
		obj.data.append('logged_id',$rootScope.user_info.user_id);
		obj.data.append('chat_room',$rootScope.chat_room);
		obj.params = {};
		   
		Auth.REQUEST(obj).then(
			function(success) {
				$scope.response = success.data;
				if ($scope.response.success == true && $scope.response.new_message != null) {
					var chatdata = [];
					//$rootScope.curChatID = $scope.response.new_message[0].chat_id;

					chatdata.user_id = success.data.new_message[0].user_id;
					chatdata.face_img = success.data.new_message[0].face_img;
					chatdata.username = success.data.new_message[0].username;
					chatdata.message = success.data.new_message[0].message;
					$scope.chats.unshift(chatdata);
	        	} else {
  					$rootScope.curChatID  = 0;
  					$rootScope.prevChatID  = 0;

	        	}
			},
			function(error) { 
				//setTimeout(function(){ $ionicLoading.hide(); }, 1000);
			}
		); 
  	}

  	$scope.updateStatusmessage = function(){
  		var obj    = new Object();
		obj.method = 'POST';
		obj.url    = $rootScope.baseURL + "/mobile/chat_controller/update_latest_message";
		obj.data   = new FormData();
		obj.data.append('chat_id',$rootScope.curChatID);
		obj.params = {};
		   
		Auth.REQUEST(obj).then(
			function(success) {
				$scope.response = success.data;
				if ($scope.response.success == true && $scope.response.status != null) {
					console.log('updated!');
	        	} else {
  					console.log('error!');
	        	}
			},
			function(error) { 
				//setTimeout(function(){ $ionicLoading.hide(); }, 1000);
			}
		); 
  	}

	$scope.showSuccessMessage = function(message) {
	   var alertPopup = $ionicPopup.alert({
		 title: 'NEW MESSAGE ID!',
		 template: message
	   });
	}

	$scope.trustSrc = function(src) {
    	return $sce.trustAsResourceUrl(src);
  	};

}])

.controller('ConnectionsCtrl', ['$scope','$sce','$http','$cordovaCamera','$rootScope','$ionicLoading','$ionicPlatform','$ionicPopup','$ionicActionSheet','Auth', 
	function($scope, $sce, $http, $cordovaCamera, $rootScope,  $ionicLoading,  $ionicPlatform, $ionicPopup, $ionicActionSheet, Auth) {
	


	$scope.$on('$ionicView.enter', function(event){
	
		var obj    = new Object();
		obj.method = 'POST';
		obj.url    = $rootScope.baseURL + "/mobile/chat_controller/fetch_connections";
		obj.data   = new FormData();
		obj.data.append('user_id',$rootScope.user_info.user_id);
		obj.params = {};
		   
		Auth.REQUEST(obj).then(
			function(success) {
				$scope.response = success.data;
				if ($scope.response.success == true) {
					$scope.mainDIR = $rootScope.baseURL + '/MediaFiles/';
	        		$scope.userConnections = $scope.response.userConnections;
					$ionicLoading.hide();
	        	} else {
					$ionicLoading.hide();
	        	}
			},
			function(error) { 
				setTimeout(function(){ $ionicLoading.hide(); }, 1000);
			}
		); 
	})

	// $scope.viewChatHistory = function(traderID){
	// 	$rootScope.s_u_ID = traderID;
	// 	window.location.href = "#/menu/connect-trader";
	// }
	$scope.viewChatHistory = function(chat_room,traderID){
		$rootScope.chat_room = chat_room;
		$rootScope.s_u_ID = traderID;
		window.location.href = "#/menu/connect-trader";
	}

	$scope.showSuccessMessage = function(message) {
	   var alertPopup = $ionicPopup.alert({
		 title: 'SUCCESS!',
		 template: message
	   });
	}

	$scope.trustSrc = function(src) {
    	return $sce.trustAsResourceUrl(src);
  	};  
}])

.controller('PromotionListCtrl', ['$scope','$sce','$http','$cordovaActionSheet','$cordovaCamera','$rootScope','$ionicLoading','$ionicPlatform','$ionicPopup','$ionicActionSheet','Auth', 
	function($scope, $sce, $http, $cordovaActionSheet ,$cordovaCamera, $rootScope,  $ionicLoading,  $ionicPlatform, $ionicPopup, $ionicActionSheet, Auth) {

	$scope.$on('$ionicView.enter', function(event){
		$ionicLoading.show({
			template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>',
		});
		var obj    = new Object();
		obj.method = 'POST';
		obj.url    = $rootScope.baseURL + "/mobile/upload_controller/ListMedia";
		obj.data   = new FormData();
		obj.data.append('user_id',$rootScope.user_info.user_id);
		obj.data.append('dbTable','video_promotion');
		obj.params = {};
		   
		Auth.REQUEST(obj).then(
			function(success) {
				$scope.response = success.data;
				if ($scope.response.success == true) {
	        		$scope.Videos = $scope.response.file_names;
					$ionicLoading.hide();
	        	} else {
	        		$scope.Videos = $scope.response.file_names;
					$ionicLoading.hide();
	        	}
			},
			function(error) { 
				setTimeout(function(){ $ionicLoading.hide(); }, 1000);
			}
		); 
	})

	$scope.subVidcnt = function(){
		if($rootScope.vidUploads != 0){
			$rootScope.vidUploads--;
		}
	}

	$scope.deleteVid = function(itemIndex,imgID,imgName,table,storage) {
  		
	   var options = {
	    title: 'Are you sure you wanted to delete this Video?',
	    addCancelButtonWithLabel: 'Cancel',
	    androidEnableCancelButton : true,
	    winphoneEnableCancelButton : true,
	    addDestructiveButtonWithLabel : 'Delete it'
	  };

	   $cordovaActionSheet.show(options)
      .then(function(btnIndex) {
        if(btnIndex === 1){
        	$ionicLoading.show({
				template: '<ion-spinner class="spinner-calm" icon="android"></ion-spinner>',
			});
        	var obj    = new Object();
			obj.method = 'POST';
			obj.url    = $rootScope.baseURL + "/mobile/upload_controller/deleteMedia";
			obj.data   = new FormData();
			obj.data.append('user_id',$rootScope.user_info.user_id);
			obj.data.append('storage',storage);
			obj.data.append('filename',imgName);
			obj.data.append('img_id',imgID);
			obj.data.append('dbTable',table);
			obj.params = {};
			   
			Auth.REQUEST(obj).then(
				function(success) {
					$scope.response = success.data;
					if ($scope.response.success == true) {
		        		$scope.Videos.splice(itemIndex,1);
		        		$scope.showSuccessMessage($scope.response.message);
		        		$scope.subVidcnt();
						$ionicLoading.hide();
		        	} else {
						$ionicLoading.hide();
		        	}
				},
				function(error) { 
					setTimeout(function(){ $ionicLoading.hide(); }, 1000);
				}
			);
        	
         }
     });
  }
  	$scope.showSuccessMessage = function(message) {
	   var alertPopup = $ionicPopup.alert({
		 title: 'SUCCESS!',
		 template: message
	   });
	}

	$scope.toggleChange = function(promotion_id){
		if($scope.value == false) {
		   $scope.value = true; 

		   console.log('testToggle changed to '+$scope.value); 
		   console.log('1');
		   $scope.num = 1;

		   // if its off
		} else {
		   $scope.value = false;
		   console.log('testToggle changed to '+$scope.value);
		   console.log('2');
		   $scope.num = 0;
		   // if its on
		}

		var obj    = new Object();
		obj.method = 'POST';
		obj.url    = $rootScope.baseURL + "/mobile/upload_controller/promotionVideostatus";
		obj.data   = new FormData();
		obj.data.append('user_id',$rootScope.user_info.user_id);
		obj.data.append('promotion_id',promotion_id);
		obj.data.append('Trigger',$scope.num);
		obj.params = {};
		   
		Auth.REQUEST(obj).then(
			function(success) {
				$scope.response = success.data;
				if ($scope.response.success == true) {
	        		console.log($scope.response.message);
	        	} else {
	        		console.log($scope.response.message);
	        	}
			},
			function(error) { 
				setTimeout(function(){ $ionicLoading.hide(); }, 1000);
			}
		); 
	}

	$scope.trustSrc = function(src) {
    	return $sce.trustAsResourceUrl(src);
  	};  
}])
.controller('searchSettingsCtrl', function($scope, $sce, $ionicPopup, $ionicModal, $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {
	$rootScope.finalGender = 1;
	$scope.age_bracket = {'value':[
		{num: 18},
		{num: 19},
		{num: 20},
		{num: 21},
		{num: 22},
		{num: 23},
		{num: 24},
		{num: 25},
		{num: 26},
		{num: 27},
		{num: 28},
		{num: 29},
		{num: 30},
		{num: 31},
		{num: 32},
		{num: 33},
		{num: 34},
		{num: 35},
		{num: 36},
		{num: 37},
		{num: 38},
		{num: 39},
		{num: 40},
		{num: 41},
		{num: 42},
		{num: 43},
		{num: 44},
		{num: 45},
		{num: 46},
		{num: 47},
		{num: 48},
		{num: 49},
		{num: 50}
	]};

	$scope.fromage = {
    'num': 18
  	};
  	$scope.toage = {
    'num': 18
  	};

  	$scope.genderList = [
	    { text: "Male", value: "1" },
	    { text: "Female", value: "2" }
	];
	$scope.data = {
    	gender: '1'
  	};

  	$scope.onSelectgender = function(item) {
    	console.log("Selected Gender, text:", item.text, "value:", item.value);
    	$rootScope.finalGender = item.value;
  	};

	$scope.submit = function(){
		$rootScope.fage = $scope.fromage.num;
		$rootScope.tage = $scope.toage.num;
	 	console.log($rootScope.fage + " " + $rootScope.tage);
	 	console.log($rootScope.finalGender + " is selected.");
		if($rootScope.fage > $rootScope.tage){
			$scope.showSuccessMessage('FROM AGE must be lesser than TO AGE','OOPS!');
		} else {
		 	$scope.showSuccessMessage('Settings Saved!','SUCCESS!');
		}
	 	
	}

	$scope.showSuccessMessage = function(message,title) {
	   var alertPopup = $ionicPopup.alert({
		 title: title,
		 template: message
	   });
	}

	$scope.trustSrc = function(src) {
    	return $sce.trustAsResourceUrl(src);
  	}; 

	 
})

.controller('AccountCtrl', function($scope,  $rootScope,  $ionicLoading,  $ionicPlatform,  Auth) {
  $scope.settings = {
    enableFriends: true
  };
});

