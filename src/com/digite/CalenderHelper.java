package com.digite;

import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.Time;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.database.QueryHelper;

public class CalenderHelper {

    public static String userloginid;
	
    
    public static JSONObject  getEvents( HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		JSONArray events=new JSONArray();
		String eventids = "";
		JSONObject w_response = new JSONObject();
		Connection w_connection = null;
		ResultSet w_resultSet = null;
		ResultSet w_resultSet2 = null;		
		
		try{
			userloginid = request.getParameter("userloginid");
			w_connection = QueryHelper.getConnection();
			w_resultSet = QueryHelper.getQueryResult("select * from  invited_user where loginid ='"+ userloginid+"'", w_connection);
			
			if ( w_resultSet != null ){
			
				while(w_resultSet.next()){
				    if(!"".equals(eventids)){
				    	eventids += ",";
				    }
				    eventids += w_resultSet.getString(3);
					
				}
			}
			
			
			if(!"".equals(eventids)){
			
		     	w_resultSet2 = QueryHelper.getQueryResult("select* from event_table where eventid in("+eventids+")", w_connection);	
			    
		     	if(w_resultSet2!=null){
	   
		    		while(w_resultSet2.next()){
		    			
					     int  eventid = w_resultSet2.getInt("eventid");
			             Date startDate = w_resultSet2.getDate("eventdate");
			             Date endDate = w_resultSet2.getDate("enddate");
			             Time startTime = w_resultSet2.getTime("starttime");
			             Time endTime = w_resultSet2.getTime("endtime");
			             String eventName = w_resultSet2.getString("eventname");
			             String meetingId = w_resultSet2.getString("meetingid");   

			             String start=startDate.toString()+"T"+startTime.toString();
			             String end=endDate.toString()+"T"+endTime.toString();
			            
			            
			            JSONObject event =new JSONObject();
			            event.put("id", eventid);
			            event.put("title", eventName);
			            event.put("start", start);
			            event.put("end",end);
			            event.put("url", meetingId);
			            events.put(event);
			     	}
     			}		
			}
		    w_response.put("events", events);    	
		}
		
		
		
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			w_connection.close();
			w_resultSet.close();
			if(w_resultSet2!=null)
			    w_resultSet2.close();
		}
		
		return w_response;
	}
	
	
	
	
	static String getAlphaNumericString(int n){ 
  
       
        int lowerLimit = 97; 
        int upperLimit = 122; 
  
        Random random = new Random(); 
        StringBuffer r = new StringBuffer(n); 
        for (int i = 0; i < n; i++) { 
            int nextRandomChar = lowerLimit + (int)(random.nextFloat() * (upperLimit - lowerLimit + 1)); 
            r.append((char)nextRandomChar); 
        } 
        return r.toString(); 
    } 
    
	
	
	public static int  getUniqueEventId() throws Exception{
		
		
		Connection w_connection = null;
		ResultSet w_resultSet = null;
		int  eventId=0;
		try
		{
			 w_connection = QueryHelper.getConnection();
			 w_resultSet = QueryHelper.getQueryResult("select max(eventid) from event_table", w_connection);
			 w_resultSet.next();
			 eventId= w_resultSet.getInt("max(eventid)")+1;
			
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			w_connection.close();
			w_resultSet.close();
			
		}
		return eventId;
   }
	
	public static int  getInvitedUserUniqueId() throws Exception{
		
		
		Connection w_connection = null;
		ResultSet w_resultSet = null;
		int invitedId = 0;
		try
		{
			w_connection = QueryHelper.getConnection();
			w_resultSet = QueryHelper.getQueryResult("select max(id) from invited_user", w_connection);
			w_resultSet.next();
			invitedId = w_resultSet.getInt("max(id)");	
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			w_connection.close();
			w_resultSet.close();
			
		}
		return invitedId;
}	
	
	
	

	public static JSONObject  setEvents( HttpServletRequest request, HttpServletResponse response) throws Exception{
		

		JSONObject w_response = new JSONObject();
		Connection w_connection = null;
		
		try
		{
			 String meetingid =  "https://www."+getAlphaNumericString(6)+".com/"; 
			 String eventname = request.getParameter("eventname");
			 String starttime = request.getParameter("starttime");
			 String endtime = request.getParameter("endtime");
			 String startdate = request.getParameter("startdate");
			 String enddate = request.getParameter("enddate");
			 String username=request.getParameter("username");
			 
			 
			 w_connection = QueryHelper.getConnection();
			 
			 int  eventId=getUniqueEventId();
			 
			 String query1="insert into event_table values("+eventId+",'"+startdate+"','"+starttime+"','"+endtime+"','"+eventname+"','"+meetingid+"','"+enddate+"')";
		     QueryHelper.executeQuery(query1, w_connection);		     
		     
		     int invitedId1= 1 + getInvitedUserUniqueId();
		     int invitedId2= 2 + getInvitedUserUniqueId();
		     
		     String query2="insert into invited_user values("+invitedId1+",'"+username+"',"+eventId+")";
		     String query3="insert into invited_user values("+invitedId2+",'"+userloginid+"',"+eventId+")";
		     
		     QueryHelper.executeQuery(query2, w_connection);
		     QueryHelper.executeQuery(query3, w_connection);
		     
		  
		     String start=startdate.toString()+"T"+starttime.toString();
	         String end=enddate.toString()+"T"+endtime.toString();
		     
		     JSONObject event1 =new JSONObject();
		     event1.put("id",eventId);
	         event1.put("title", eventname);
	         event1.put("start", start);
	         event1.put("end",end);
	         event1.put("url", meetingid);
		     w_response.put("event", event1);   
		     
		}
		
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			w_connection.close();
		}
		
		return w_response;
	}
	
	
	
    public static JSONObject  deleteEvents( HttpServletRequest request, HttpServletResponse response) throws Exception{
		

		JSONObject w_response = new JSONObject();
		Connection w_connection = null;
	
		
		try{
			
			 int  eventid =Integer.parseInt( request.getParameter("eventid"));
			 w_connection = QueryHelper.getConnection();
			 
			 String query1 = "DELETE FROM event_table WHERE eventid ='"+eventid+"'";
		     QueryHelper.executeQuery(query1, w_connection);
		     
		     String query2 = "DELETE FROM invited_user WHERE eventid ='"+eventid+"'";
		     QueryHelper.executeQuery(query2, w_connection);
		     
		     w_response.put("sucess", true); 
		}
		
		
		
		catch (Exception e){
			e.printStackTrace();
		}
		finally{
			w_connection.close();
		}
		
		return w_response;
	}
    
    public static JSONObject  updateEvents( HttpServletRequest request, HttpServletResponse response) throws Exception{
		

		JSONObject w_response = new JSONObject();
		Connection w_connection = null;
	
		
		try{
			 String eventname = request.getParameter("eventname");
			 String starttime = request.getParameter("starttime");
			 String endtime = request.getParameter("endtime");
			 String startdate = request.getParameter("startdate");
			 String enddate = request.getParameter("enddate");
			 int  eventid =Integer.parseInt( request.getParameter("eventid"));
			 
			 w_connection = QueryHelper.getConnection();
			 String query = " UPDATE event_table SET eventdate='"+startdate+"',"+
					                                 "starttime ='"+starttime+"',"+
					                                 "endtime='"+endtime+"',"+
					                                 "eventname='"+eventname+"',"+
					                                 "enddate='"+enddate+"'"+ 
					                                 " WHERE eventid ='"+eventid+"'";
		     QueryHelper.executeQuery(query, w_connection);
		     w_response.put("sucess", true); 
		}
		
		catch (Exception e){
			e.printStackTrace();
		}
		finally{
			w_connection.close();
		}
		
		return w_response;
	}
}
