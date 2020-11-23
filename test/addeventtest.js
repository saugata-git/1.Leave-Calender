validatePage =function(eventname,starttime,endtime,startdate,enddate){
	
       function formatDate() {
             var d = new Date(),
             month = '' + (d.getMonth() + 1),
             day = '' + d.getDate(),
             year = d.getFullYear();

             if (month.length < 2) 
                   month = '0' + month;
             if (day.length < 2) 
                   day = '0' + day;

             return [year, month, day].join('-');
         }

         if (eventname == ""){
	          return "EventName is Empty";
         }

         else if (starttime == ""){
	         return "Event Start Time is Empty";
         }
         else if (endtime == ""){
	         return "Event End Time is Empty";
         }
         else if (startdate == ""){
        	return "Event Start Date is Empty";
         }
         else if (enddate == ""){
	        return "Event End Date is Empty";
         }
         else if (startdate == enddate && starttime>endtime){
	         return "Event Start Time cant not be grater than End Time";
         }
         else if (startdate > enddate){
	         return "Event Start Date cant not be grater than End Date";
         }
	     else if(formatDate().toString()>startdate){
		     return "Start Date can not be previous of todays date date";
	     }
}


var assert = require('assert');

describe('Addevent', function () {
  describe('validatePage', function () {
	  
	  
    it('should return EventName is Empty', function () {
      assert.equal(validatePage('','','','','',''),"EventName is Empty");
    });
    it('should return Event Start Time is Empty', function () {
        assert.equal(validatePage('1stevent','','','',''),"Event Start Time is Empty");
    });
    
    it('should return Event end Time is Empty', function () {
        assert.equal(validatePage('1st','11:00:00','','',''),"Event End Time is Empty");
    });
    
    it('should return Event Start Date is Empty', function () {
        assert.equal(validatePage('1stevent','11:00:00','12:00:00','',''),"Event Start Date is Empty");
    });
   
    it('should return Event end Date is Empty', function () {
        assert.equal(validatePage('1stevent','11:00:00','12:00:00','2020-09-12',''),"Event End Date is Empty");
    });
    
    it('should return Event Start Time cant not be grater than End Time', function () {
        assert.equal(validatePage('1stevent','11:00:00','10:00:00','2020-09-12','2020-09-12'),"Event Start Time cant not be grater than End Time");
    });
    
    it('should return Event Start Date cant not be grater than End Date', function () {
        assert.equal(validatePage('1stevent','11:00:00','12:00:00','2020-09-12','2020-09-11'),"Event Start Date cant not be grater than End Date");
    });
    
    it('should return Start Date can not be previous of todays date', function () {
        assert.equal(validatePage('1stevent','11:00:00','12:00:00','2020-08-1','2020-08-2'),"Start Date can not be previous of todays date date");
    });
    
  });
});
  

