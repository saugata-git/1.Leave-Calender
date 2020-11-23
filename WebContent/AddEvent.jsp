<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>MyApp</title>
		
		<link rel="stylesheet" type="text/css" href="digite/css/style.css" />
		<link rel="stylesheet" type="text/css" href="digite/material/button/css/MaterialButton.css" />
		
		<script type="text/javascript" src="digite/lib/jquery/jquery.js"></script>
		<script type="text/javascript" src="digite/lib/underscore/underscore-min.js"></script>
		<script type="text/javascript" src="digite/material/button/component/MaterialButton.js"></script>
		<script type="text/javascript" src="digite/js/util/AppUtil.js"></script>
		<script type="text/javascript" src="digite/js/App.js"></script>
		
	</head>
	<body>
		
     <div>
         <form>
             <div class="header">
                 <h2>Add Event</h2>
             </div>
 
             <div class="container">
                <label for="uname"><b>Event Name :</b></label>
                <input type="text" placeholder="Enter Event Name " name="uname" required>
 
                <label for="date"><b>Event Date :</b></label>
                <input type="date" id="date" name="date" required>
                
                <label for="start_time"><b>Event Start Time :</b></label>
                <input type="time" id="start_time" name="start_time" required>
                
                <label for="end_time"><b>Event End Time :</b></label>
                <input type="time" id="end_time" name="end_time" required>
                </br>
                <label for="meeting_id"><b>Event Id :</b></label>
                <input type="url" placeholder="Enter Event ID " id="event_id" name="event_id">
                
               <button type="submit">Submit</button>  
            </div>
        </form>
     
     </div>
		
	</body>
</html>