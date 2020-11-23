var Signup = function () {
	
};

Signup.prototype.render = function () {

	$('#root').append('<div id="login">' + 
			             '<div class="header">'+
                              '<h2>SignUp For Calendar</h2>'+
                         '</div>'+

	            	     '<div class="container">'+
		                   '<label for="uname"><b>User name :</b></label>'+
		                   '<input type="text" id="username" placeholder="Enter Username" name="uname" required>'+

		                  '<label for="psw"><b>Password :</b></label>'+
		                  '<input type="password" id="password" placeholder="Enter Password" name="psw" required>'+
                          '<button id="signup_button2">SignUp</button>'+  
		              '</div>'+
		            '</div> ')
    this.applyEvents();		                        
};


Signup.prototype.applyEvents = function(){

	var signup_button2 = document.getElementById('signup_button2')
	signup_button2.addEventListener('click', this.signup.bind(this) )
};


Signup.prototype.signup =function(){
	
	
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	
	var errMsg=this.validatePage(username,password);
	
	if (errMsg){
		alert(errMsg);
	}
	else{
		AppUtil.ajax('AjaxRouter', {
			classname: 'com.digite.login.LoginHelper',
			method: 'signup',
			username :username,
		    password :password,
		}, function(response){
			   if(response.sucess){
				  alert(response.sucess);
				   $("#root").empty();
					var w_login = new Login();
					w_login.render();
			   }
			   else if(response.unsucess){
				   alert(response.unsucess);
				  
				   $("#root").empty();
				   var w_login = new Login();
				   w_login.render();
			   }
		});
	}
}


Signup.prototype.validatePage =function(username,password){
	
	if (username == ""){
		return "User name is Empty";
	}
	else if (password == ""){
		return "User password is Empty";
	}
}


