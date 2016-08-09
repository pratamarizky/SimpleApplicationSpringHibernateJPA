package com.simpleapp.controllers;

import java.text.SimpleDateFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.simpleapp.models.Employee;
import com.simpleapp.repositories.EmployeeDao;

@RestController
public class EmployeeController {
//	-----------------------------Update/Save--------------------------//
	@RequestMapping(value="/employee/save", method=RequestMethod.POST)
	  @ResponseBody
	  public boolean save(@RequestBody Employee employee) {
	    try {
	      System.out.println(employee.getEmployeeName());
	      employee.setEmployeeCode(employeeDao.generateCode());
	      System.out.println(employee.getEmployeeCode());
	      employeeDao.create(employee);
	    }
	    catch (Exception ex) {
	      System.out.println("Error creating/updating the employee: " + ex.toString());
	      return false;
	    }
	    System.out.println("Employee succesfully created!");
	    return true;
	  }
	
//	-------------------------------Delete----------------------------//
	@RequestMapping(value="/employee/delete", method=RequestMethod.DELETE)
	  @ResponseBody
	  public boolean delete(@RequestBody Employee employee) {
	    try {
	      employeeDao.delete(employee);
	    }
	    catch (Exception ex) {
	      System.out.println("Error delete the employee: " + ex.toString());
	      return false;
	    }
	    System.out.println("Employee succesfully created!");
	    return true;
	  }
//	-----------------------------Get Data--------------------------------------//
	@RequestMapping(value="/employee/getEmployeeByCode", method=RequestMethod.GET)
	  @ResponseBody
	  public String getEmployeeByCode(String employeeCode) {
	    try {
	    	Employee employee = employeeDao.getById(employeeCode);
	    	ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
	    	ow = ow.with(new SimpleDateFormat("dd-MM-YYYY"));
	    	String json = ow.writeValueAsString(employee);
	    	System.out.println(json);
	    	return json;
	    }
	    catch (Exception ex) {
	    	System.out.println(ex.getMessage());
	    }
	    return "";
	  }
	
	@RequestMapping(value="/employee/getAll", method=RequestMethod.GET)
	  @ResponseBody
	  public String getAllEmployee() {
	    try {
	    	List<Employee> listemployee = employeeDao.getAll();
	    	ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
	    	ow = ow.with(new SimpleDateFormat("dd-MM-YYYY"));
	    	String json = ow.writeValueAsString(listemployee);
	    	System.out.println(json);
	    	return json;
	    	
	    }
	    catch (Exception ex) {
	    	ex.printStackTrace();
	    }
	    return "";
	    
	  }
	// ------------------------
	  // PRIVATE FIELDS
	  // ------------------------
	  
	  // Wire the UserDao used inside this controller.
	  @Autowired
	  private EmployeeDao employeeDao;
}
