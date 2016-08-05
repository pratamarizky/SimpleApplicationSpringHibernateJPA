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
	  public boolean save(Employee employee) {
	    try {
	      employeeDao.create(employee);
	    }
	    catch (Exception ex) {
	      System.out.println("Error creating the employee: " + ex.toString());
	      return false;
	    }
	    System.out.println("Employee succesfully created!");
	    return true;
	  }
	
	@RequestMapping(value="/employee/getEmployeeByCode")
	  @ResponseBody
	  public Employee getEmployeeByCode(String employeeCode) {
	    try {
	    	Employee employee = employeeDao.getById(employeeCode);
	    	return employee;
	    }
	    catch (Exception ex) {
	    	System.out.println(ex.getMessage());
	    }
	    return null;
	  }
	
	@RequestMapping(value="/employee/getAll")
	  @ResponseBody
	  public List<Employee> getAllEmployee() {
	    try {
	    	List<Employee> listemployee = employeeDao.getAll();
	    	return listemployee;
	    }
	    catch (Exception ex) {
	    	ex.printStackTrace();
	    }
	    return null;
	    
	  }
	// ------------------------
	  // PRIVATE FIELDS
	  // ------------------------
	  
	  // Wire the UserDao used inside this controller.
	  @Autowired
	  private EmployeeDao employeeDao;
}
