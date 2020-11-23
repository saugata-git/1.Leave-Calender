var Login = function () {
	
};

Login.prototype.render = function () {

	$('#root').append('<div id="login">' + 
			           '<div class="header">'+
		                 '<h2>Login For Calendar</h2>'+
		               '</div>'+

	            	     '<div class="container">'+
		                   '<label for="uname"><b>User name :</b></label>'+
		                   '<input type="text" id="user_name" placeholder="Enter Username" name="uname" >'+

		                  '<label for="psw"><b>Password :</b></label>'+
		                  '<input type="password" id="password" placeholder="Enter Password" name="psw" >'+
                          '<button id="login_button">Login</button>'+  
                          '<button id="signup_button">SignUp</button>'+  
		              '</div>'+
		            '</div> ')
    this.applyEvents();		                        
};

Login.prototype.applyEvents = function(){
	var login_button = document.getElementById('login_button')
	login_button.addEventListener('click', this.login.bind(this))
	
	var signup_button = document.getElementById('signup_button')
	signup_button.addEventListener('click', this.signuprender )
};


Login.prototype.signuprender = function(){
	
	$("#root").empty();
	var w_sign = new Signup();
	w_sign.render();
}

Login.prototype.login = function(){
	//alert("inside login");
	
	var user_name = document.getElementById('user_name').value;
	var password = document.getElementById('password').value;
	
    var errMsg=this.validatePage(user_name,password);
	
	if (errMsg){
		alert(errMsg);
	}
	
	/*if (username == ""){
		alert("User name is Empty");
	}
	else if (password == ""){
		alert("User password is Empty");
	}
	
	*/
	else{
		AppUtil.ajax('AjaxRouter', {
			classname: 'com.digite.login.LoginHelper',
			method: 'login',
			username :user_name,
		    password :password,
		}, function(response){
			   if(response.sucess){
				  alert("You have sucessfuylly login");
				   $("#root").empty();
				   
				    localStorage.setItem("userloginid",user_name);
			        localStorage.setItem("users",JSON.stringify(response.users));
					var w_cal = new Cal();
					w_cal.render();
				    
				    
			   }
			   else if(response.errMsg){
				   alert(response.errMsg);
			   }
		});

	}
}

Login.prototype.validatePage =function(username,password){
	
	if (username == ""){
		return "User name is Empty";
	}
	else if (password == ""){
		return "User password is Empty";
	}
	
}

