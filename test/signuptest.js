var validatePage =function(username,password){
	
	if (username == ""){
		return "User name is Empty";
	}
	else if (password == ""){
		return "User password is Empty";
	}

}


var assert = require('assert');

describe('Signup', function () {
  describe('validatePage', function () {
    it('should return username errMsg', function () {
      assert.equal(validatePage('',''),"User name is Empty");
    });
    it('should return pasword errMsg', function () {
        assert.equal(validatePage('dfsdf',''),"User password is Empty");
     });
    it('should enter in next stage', function () {
        assert.equal(validatePage('dfsdf','1212'),undefined);
     });
  });
});