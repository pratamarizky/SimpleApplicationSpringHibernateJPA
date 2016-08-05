package com.simpleapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.simpleapp.models.Employee;
import com.simpleapp.repositories.EmployeeDao;

@RestController
public class EmployeeController {
	@RequestMapping(value="/employee/save")
	  @ResponseBody
	  public String save(Employee employee) {
	    try {
	      employeeDao.create(employee);
	    }
	    catch (Exception ex) {
	      return "Error creating the employee: " + ex.toString();
	    }
	    return "Employee succesfully created!";
	  }
	
	@RequestMapping(value="/employee/getEmployeeByCode")
	  @ResponseBody
	  public String getEmployeeByCode(String employeeCode) {
	    try {
	    	Employee employee = employeeDao.getById(employeeCode);
	    	return "The employee name is: " + employee.getEmployeeName();
	    }
	    catch (Exception ex) {
	    	return "Employee not found: " + ex.toString();
	    }
	    
	  }
	
	@RequestMapping(value="/employee/getAll")
	  @ResponseBody
	  public String getAllEmployee() {
	    try {
	    	List<Employee> listemployee = employeeDao.getAll();
	    	return "The list employee is: " + listemployee.size();
	    }
	    catch (Exception ex) {
	    	return "Employee not found: " + ex.toString();
	    }
	    
	  }
	// ------------------------
	  // PRIVATE FIELDS
	  // ------------------------
	  
	  // Wire the UserDao used inside this controller.
	  @Autowired
	  private EmployeeDao employeeDao;
}
