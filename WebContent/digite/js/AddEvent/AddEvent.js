var AddEvent = function (calendar,calInfo) {
	this.calendar=calendar;
	this.calInfo=calInfo;
};

AddEvent.prototype.render = function (mode,data) {
  
	
   this.data=data;
   this.mode=mode;
   var  template='<div  class="addeventmask"> </div>'+
	   '<div id="addevent">' + 
        '<div class="form">'+

        '<div class="header">';
             
             if(mode=='edit'){
                template += '<h2>Update/Delete Event</h2>'+'<button id="closeicon"><i class="fa fa-close"></i></button>' ;
             }
             else{
            	 template+='<h2>Add Event</h2>'+'<button id="closeicon"><i class="fa fa-close"></i></button>';
             }
   
             
       template+= '</div>'+

        '<div class="container">'+
             '<label for="uname"><b>Event Name :</b></label>'+
             '<input type="text" id="eventname" placeholder="Enter Event Name " name="uname" required>'+

              '<label for="date"><b>Event Start Date :</b></label>'+
              '<input type="date" id="startdate" name="startdate" required>'+

              '<label for="start_time"><b>Event Start Time :</b></label>'+
              '<input type="time" id="start_time" name="start_time" required>'+

              '<label for="date"><b>Event End Date :</b></label>'+
              '<input type="date" id="enddate" name="enddate" required>'+
              
              '<label for="end_time"><b>Event End Time :</b></label>'+
              '<input type="time" id="end_time" name="end_time" required>';
               if(mode=='add'){
                  template+='<label for="invitee"><b>Invitee :  </b></label><br/>'+
                            '<select name="invitee" id="invitee">';
                            var allUsers=JSON.parse(localStorage.getItem("users"));
                            for(var i=0;i<allUsers.length;i++){
            	                var username=allUsers[i].username;
            	                template +=  '<option value="'+username+'">'+username+'</option>';
                            }
                 template+= '</select>';
               }
            template+='</div>'+
              
        '<div class="footer">'+
              '<button id="addbutton">Save</button>';     
              if(mode=='edit'){
	            template +=  '<button id="deleteEvent">Delete</button>';
              }
              template += '</div>'+
      '</div>'+
     '</div> ';
   
   
	$('body').append(template);

    this.setData(mode,data);      
	this.applyEvents();
	
	
};


AddEvent.prototype.applyEvents = function(){
	
	var closeicon= document.getElementById('closeicon')
	closeicon.addEventListener('click', this.removeAddevent );
	
    var addbutton = document.getElementById('addbutton')
	addbutton.addEventListener('click', this.addData.bind(this) );
    
    var deletebutton = document.getElementById('deleteEvent')
	deletebutton.addEventListener('click', this.deleteData.bind(this));
 
};


AddEvent.prototype.deleteData = function(){

	var that=this;
	AppUtil.ajax('AjaxRouter', {
		 classname: 'com.digite.CalenderHelper',
		 method: 'deleteEvents',
		 eventid : this.data.id,
     	}, function(response){
		   if(response.sucess){
			  alert("You have sucessfuylly Deleted Event");
			  $("#addevent").remove();
			  $(".addeventmask").remove();	
			  that.data.remove();
		   }
	});
	
}


AddEvent.prototype.addData = function(){
		
		var eventname = document.getElementById('eventname').value;
		var starttime = document.getElementById('start_time').value;
		var endtime = document.getElementById('end_time').value;
		var startdate = document.getElementById('startdate').value;
		var enddate = document.getElementById('enddate').value;
		
		var that=this;
		var errMsg=this.validatePage(eventname,starttime,endtime,startdate,enddate);
		
		if (errMsg){
			alert(errMsg);
		}

		else if(that.mode=='add'){

			var x = document.getElementById('invitee');
		    var username=x.options[x.selectedIndex].value;

			AppUtil.ajax('AjaxRouter', {
				classname: 'com.digite.CalenderHelper',
				method: 'setEvents',
				eventname : eventname,
			    starttime : starttime,
			    endtime : endtime,
			    startdate : startdate,
			    enddate : enddate,
			    username: username,
		     	}, function(response){
				   if(response.event){
					  alert("You have sucessfuylly Added Event");
					  $("#addevent").remove();
					  $(".addeventmask").remove();	
					  that.calendar.addEvent(response.event);
				   }
			});

		}
		else if(that.mode=='edit'){
			
			AppUtil.ajax('AjaxRouter', {
				classname: 'com.digite.CalenderHelper',
				method: 'updateEvents',
				eventname : eventname,
			    starttime : starttime,
			    endtime : endtime,
			    startdate : startdate,
			    enddate : enddate,
			    eventid : this.data.id,
		     	}, function(response){
				   if(response.sucess){
					  alert("You have sucessfuylly updated Event");
					  $("#addevent").remove();
					  $(".addeventmask").remove();	
					
					  that.data.remove();
					  that.calendar.addEvent({
						   title:eventname,
						   start:startdate+'T'+starttime,
						   end:enddate+'T'+endtime,
					       id:that.data.id,
					       url:that.data.url
					  });
				   }
			});
		}
};



AddEvent.prototype.validatePage =function(eventname,starttime,endtime,startdate,enddate){
	
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
};
  



AddEvent.prototype.removeAddevent = function(){
	$("#addevent").remove();
	$(".addeventmask").remove();
};


AddEvent.prototype.setData=function(mode,data){

	  if(mode=='edit'){
	    document.getElementById("eventname").value = data.title;
	    document.getElementById("start_time").value = data.startStr.substr(11,8);
	    document.getElementById("end_time").value =  data.endStr.substr(11,8);
	    document.getElementById("startdate").value = data.startStr.substr(0,10);
	    document.getElementById("enddate").value =  data.endStr.substr(0,10);
	  }
	  else if(mode=='add'){
		  document.getElementById("startdate").value = data.dateStr.substr(0,10);
	  }
} 

