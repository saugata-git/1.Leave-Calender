package com.junit;


import static org.junit.Assert.*;

import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.Test;
import org.skyscreamer.jsonassert.JSONAssert;

import static org.mockito.Mockito.*;
import javax.servlet.http.*;

import com.digite.CalenderHelper;




public class JtestCalendarHelper {

	@Test
	public void deleteEvents() throws Exception {
		
	        HttpServletRequest request = mock(HttpServletRequest.class);      
	        HttpServletResponse response = mock(HttpServletResponse.class);    

	       //test 1
	        when(request.getParameter("eventid")).thenReturn("4");
	 
	        JSONObject actual1 = CalenderHelper.deleteEvents(request, response);
	        assertTrue(actual1.getBoolean("sucess"));

	}


	
	@Test
	public void updateEvents() throws Exception {
		
	        HttpServletRequest request = mock(HttpServletRequest.class);      
	        HttpServletResponse response = mock(HttpServletResponse.class);    

	       //test 1
	        
	        when(request.getParameter("eventname")).thenReturn("3rdevent");
	        when(request.getParameter("starttime")).thenReturn("11:00:00");
	        when(request.getParameter("endtime")).thenReturn("12:00:00");
	        when(request.getParameter("startdate")).thenReturn("2020-08-13");
	        when(request.getParameter("enddate")).thenReturn("2020-08-14");
	        when(request.getParameter("eventid")).thenReturn("3");
	 
	        JSONObject actual1 = CalenderHelper.updateEvents(request, response);
	        assertTrue(actual1.getBoolean("sucess"));

	}
	


	@Test
	public void setEvents() throws Exception {
		
	        HttpServletRequest request = mock(HttpServletRequest.class);      
	        HttpServletResponse response = mock(HttpServletResponse.class);    

	       //test 1
	        
	        when(request.getParameter("eventname")).thenReturn("4rthevent");
	        when(request.getParameter("starttime")).thenReturn("11:00:00");
	        when(request.getParameter("endtime")).thenReturn("12:00:00");
	        when(request.getParameter("startdate")).thenReturn("2020-08-17");
	        when(request.getParameter("enddate")).thenReturn("2020-08-20");
	        when(request.getParameter("username")).thenReturn("saugata");
	        
	  
	 
	        JSONObject actual = CalenderHelper.setEvents(request, response);
	        assertEquals(actual.getJSONObject("event").getString("title"),"4rthevent");
	        assertEquals(actual.getJSONObject("event").getInt("id"),4);
	        assertEquals(actual.getJSONObject("event").getString("start"),"2020-08-17T11:00:00");
	        assertEquals(actual.getJSONObject("event").getString("end"),"2020-08-20T12:00:00");
	        
	}



	@Test
	public void getEvents() throws Exception {
		
	        HttpServletRequest request = mock(HttpServletRequest.class);      
	        HttpServletResponse response = mock(HttpServletResponse.class);    

	       //test 1
	        when(request.getParameter("userloginid")).thenReturn("saugata");
	        
	        JSONObject actual = CalenderHelper.getEvents(request, response);
	        JSONArray actarray=actual.getJSONArray("events");    	 
		    assertEquals(actarray.getJSONObject(3).getString("title"),"4rthevent");
		    assertEquals(actarray.getJSONObject(3).getInt("id"),4);
		    assertEquals(actarray.getJSONObject(3).getString("start"),"2020-08-17T11:00:00");
		    assertEquals(actarray.getJSONObject(3).getString("end"),"2020-08-20T12:00:00");

	}

}
