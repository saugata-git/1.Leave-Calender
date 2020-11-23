package com.digite.login;

import java.sql.Connection;
import java.sql.ResultSet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import com.database.QueryHelper;

public class LoginHelper {

	
	 public static int sum(int a,int b){
		 return a+b;
	 }
	
	
	public static JSONObject  login( HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		JSONObject w_response = new JSONObject();
		Connection w_connection = null;
		ResultSet w_resultSet = null;
		
		try
		{
			 String username = request.getParameter("username");
			 String password = request.getParameter("password");
			
			
			w_connection = QueryHelper.getConnection();
			w_resultSet = QueryHelper.getQueryResult("select * from user_login where username='"+username+"'", w_connection);
			
			if ( w_resultSet != null ){
				 if (!w_resultSet.next())
				 {
			    	  w_response.put("errMsg", "User Does not exist");
			     }
			     else if(w_resultSet.getString("password").equals(password) &&  w_resultSet.getString("username").equals(username)){
			    	 w_response.put("sucess", true);
			    	 w_response.put("users", getAllUsers());
			     }
			     else{
			    	 w_response.put("errMsg", "Invalid password");
			     }
			
			}
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
		
		return w_response;
	}
	
	
    public static JSONArray  getAllUsers( ) throws Exception{
		
		JSONArray w_users = new JSONArray();
		Connection w_connection = null;
		ResultSet w_resultSet = null;
		
		try
		{
			w_connection = QueryHelper.getConnection();
			w_resultSet = QueryHelper.getQueryResult("select * from user_login", w_connection);
			
			if ( w_resultSet != null ){
				while(w_resultSet.next()){
					JSONObject user = new JSONObject();
					user.put("id", w_resultSet.getInt("id"));
					user.put("username", w_resultSet.getString("username"));
					w_users.put(user);
				}
			}
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
		
		return w_users;
	}
	
    
    
    
    
public static int  getUserUniqueId() throws Exception{
		
	
		Connection w_connection = null;
		ResultSet w_resultSet2 = null;
		int id = 0;
		try
		{
			w_connection = QueryHelper.getConnection();
		    w_resultSet2 = QueryHelper.getQueryResult("select max(id) from user_login", w_connection);
			w_resultSet2.next();
		    id = w_resultSet2.getInt("max(id)")+1;	
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			w_connection.close();
			w_resultSet2.close();
			
		}
		return id;
}
	    
	
public static JSONObject  signup( HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		JSONObject w_response = new JSONObject();
		Connection w_connection = null;
		ResultSet w_resultSet2 = null;
		ResultSet w_resultSet3 = null;
		
		try
		{
			String username = request.getParameter("username");
		    String password = request.getParameter("password");
			
			
			w_connection = QueryHelper.getConnection();
			w_resultSet2 = QueryHelper.getQueryResult("select * from user_login where username='"+username+"'", w_connection);
		
			if ( w_resultSet2 != null ){
				 if (!w_resultSet2.next()){
					 
					 int id=getUserUniqueId();
					 
					 String query="insert into user_login values(" + id + ",'" + username + "','" + password + "')";
				     QueryHelper.executeQuery(query, w_connection);
				     
				     w_response.put("sucess", "You Have Sucessfully Signed Up");
			     }
			     else if(w_resultSet2.getString("username").equals(username)){
			    	 w_response.put("unsucess", "User Already exist plz login");
			     }
			     else{
			    	 w_response.put("unsucess", "Unsucessful Sign Up");
			     }
			   
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			w_connection.close();
			w_resultSet2.close();
			if(w_resultSet3!=null)
		      	w_resultSet3.close();
		}
		
		return w_response;
	}
	
	
}
