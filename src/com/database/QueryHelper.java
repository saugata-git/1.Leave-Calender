package com.database;

import java.sql.*;

public class QueryHelper
{
	
	public static Connection getConnection() throws Exception
	{
		return DriverManager.getConnection("jdbc:mysql://localhost:3306/calendar", "root", "1234It56@");
	}

	
	public static void executeQuery(String query, Connection connection) throws Exception{

	   try{
	     //Create Statement
	     Statement w_statement = connection.createStatement();

	     //Sql query execution
         w_statement.executeUpdate(query);
       }
	   catch (Exception e){
     	e.printStackTrace();
	   }
	}
	
	
	
	public static ResultSet getQueryResult(String query, Connection connection) throws Exception
	{
		ResultSet w_resultset = null;
		
		try
		{
			//Create Statement
			Statement w_statement = connection.createStatement();
			//Sql query execution
			w_resultset = w_statement.executeQuery(query);
			
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		
		return w_resultset;	
	}
}
