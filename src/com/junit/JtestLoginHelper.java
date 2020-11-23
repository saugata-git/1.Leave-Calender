/**
 * 
 */
/**
 * @author HP
 *
 */
package com.junit;

import static org.junit.Assert.*;
import org.json.JSONObject;
import org.junit.Test;
import static org.mockito.Mockito.*;
import javax.servlet.http.*;

import com.digite.login.LoginHelper;


public class JtestLoginHelper{
	
	
	@Test
	public void login() throws Exception {
		
	        HttpServletRequest request = mock(HttpServletRequest.class);      
	        HttpServletResponse response = mock(HttpServletResponse.class);    

	       //test 1
	        when(request.getParameter("username")).thenReturn("ABCggfD");
	        when(request.getParameter("password")).thenReturn("1234");
	       
	        JSONObject actual1 = LoginHelper.login(request, response);
	        assertEquals(actual1.getString("errMsg"),"User Does not exist");
	        
	       //test 2
	        when(request.getParameter("username")).thenReturn("saugata");
	        when(request.getParameter("password")).thenReturn("123");
	       
	        JSONObject actual2 = LoginHelper.login(request, response);
	        assertTrue(actual2.getBoolean("sucess"));
	       
	        //test3
	        when(request.getParameter("username")).thenReturn("saugata");
	        when(request.getParameter("password")).thenReturn("1234");
	       
	        JSONObject actual3 = LoginHelper.login(request, response);
	        assertEquals(actual3.getString("errMsg"),"Invalid password");
	        

	}
    
	
	
	@Test
	public void signup() throws Exception {
		
	        HttpServletRequest request = mock(HttpServletRequest.class);      
	        HttpServletResponse response = mock(HttpServletResponse.class);    

	        
	        //test 1
	        when(request.getParameter("username")).thenReturn("ABCD");
	        when(request.getParameter("password")).thenReturn("1234");
	       
	        JSONObject actual1 = LoginHelper.signup(request, response);
	        assertEquals(actual1.getString("sucess"),"You Have Sucessfully Signed Up");
	        
	       //test 2
	        when(request.getParameter("username")).thenReturn("saugata");
	        when(request.getParameter("password")).thenReturn("123");
	       
	        JSONObject actual2 = LoginHelper.signup(request, response);
	        assertEquals(actual2.getString("unsucess"),"User Already exist plz login");   
	}
	
}