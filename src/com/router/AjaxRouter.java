package com.router;

import java.io.IOException;
import java.lang.reflect.Method;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

/**
 * Servlet implementation class AjaxRouter
 */
@WebServlet("/AjaxRouter")
public class AjaxRouter extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AjaxRouter() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
		String w_responseData = callApi(request, response);
		response.getWriter().append(w_responseData);
	}
	
	private String callApi(HttpServletRequest request, HttpServletResponse response)
	{
		String w_response = "";
		
		try
		{
			String w_className = request.getParameter("classname");
			String w_methodName = request.getParameter("method");
			
			Class[] w_Params = new Class[2];
			
			w_Params[0] = Class.forName("javax.servlet.http.HttpServletRequest");
			w_Params[1] = Class.forName("javax.servlet.http.HttpServletResponse");
			
			Class w_DynamicClass = Class.forName(w_className);
			Method w_DynamicMethod = w_DynamicClass.getMethod(w_methodName, w_Params);
			
			//Object w_DynamicObject = w_DynamicClass.newInstance();
			
			JSONObject w_json = (JSONObject) w_DynamicMethod.invoke(w_DynamicMethod, request, response);
			
			w_response = w_json.toString();
		} 
		catch (Exception e)
		{
			e.printStackTrace();
		}
		
		return w_response;
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
}
;