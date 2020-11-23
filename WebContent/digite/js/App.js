var App = function () {
	
};

App.prototype.render = function () {
	var w_button = new MaterialButton({
		text: 'Show Users',
		variant: 'contained',
		onClick: this.loadUsers.bind(this)
	});
	w_button.render();
	
	
	$('#root').append(w_button.el);
	$('#root').append('<div class="user_cnt"><table><thead><tr><th>NAME</th></tr></thead><tbody></tbody></table><div>')
};

App.prototype.loadUsers = function () {
	AppUtil.ajax('AjaxRouter', {
		classname: 'com.digite.UserHelper',
		method: 'getUsers'
	}, this.renderUsers);
};

App.prototype.renderUsers = function (a_users) {
	$('.user_cnt tbody').empty();
	
	a_users.data.forEach( user => {
		$('.user_cnt tbody').append('<tr><th>' +  user.name  + '</th></tr>')
	} )
}