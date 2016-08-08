package com.simpleapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.simpleapp.models.District;
import com.simpleapp.repositories.DistrictDao;
@RestController
public class DistrictController {
	
	@RequestMapping(value="/district/save", method= RequestMethod.POST)
	  @ResponseBody
	  public boolean save(District district) {
	    try {
	    	System.out.println(district.getDistrictName());
//	      District district = new District(districtCode, districtName);
	      if(districtDao.getById(district.getDistrictCode())!= null){
	    	  districtDao.update(district);
	      }else districtDao.create(district);
	    }
	    catch (Exception ex) {
	      System.out.println("Error creating the district: " + ex.toString());
	      return false;
	    }
	    System.out.println("District succesfully created!");
	    return true;
	  }
	
	@RequestMapping(value="/district/getDistrictByCode", method=RequestMethod.GET)
	  @ResponseBody
	  public District getDistrictByCode(String districtCode) {
	    try {
	    	District district = districtDao.getById(districtCode);
	    	return district;
	    }
	    catch (Exception ex) {
	    	ex.printStackTrace();
	    	return null;
	    }
	    
	  }
	
	@RequestMapping(value="/district/getAll", method=RequestMethod.GET)
	  @ResponseBody
	  public List<District> getAllDistrict() {
	    try {
	    	List<District> listdistrict = districtDao.getAll();
	    	return listdistrict;
	    }
	    catch (Exception ex) {
	    	ex.printStackTrace();
	    	return null;
	    }
	    
	  }
	// ------------------------
	  // PRIVATE FIELDS
	  // ------------------------
	  
	  // Wire the UserDao used inside this controller.
	  @Autowired
	  private DistrictDao districtDao;
}
