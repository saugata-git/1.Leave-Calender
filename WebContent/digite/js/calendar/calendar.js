var Cal = function () {
	
};

Cal.prototype.render = function () {

	var	that=this;
	
	AppUtil.ajax('AjaxRouter', {
		classname: 'com.digite.CalenderHelper',
		method: 'getEvents',
		userloginid: localStorage.getItem("userloginid")
	}, function(response){
	
			  
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
				
				var calendarEl = document.getElementById('root');
				   that.calendar = new FullCalendar.Calendar(calendarEl, {
                    
				    initialDate: formatDate().toString(),
				    editable: true,
				    selectable: true,
				    businessHours: true,
				    dayMaxEvents: true, // allow "more" link when too many events
				    events: response.events,
				    dateClick: function(info) {
				        var w_add = new AddEvent(that.calendar);
						w_add.render('add',info);
				

				    },
				    eventClick: function(info) {
				        info.jsEvent.preventDefault(); // don't let the browser navigate
				        var w_add = new AddEvent(that.calendar,info);
						w_add.render('edit',info.event);
					    
				    }  
				    
				});

				that.calendar.render();	
		
	});
	
	
	
};

				