package netgloo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.util.JSONPObject;

import netgloo.daos.DistrictDao;
import netgloo.models.District;
@RestController
public class DistrictController {
	
	@RequestMapping(value="/district/create")
	  @ResponseBody
	  public String create(String districtCode, String districtName) {
	    try {
	      District district = new District(districtCode, districtName);
	      districtDao.create(district);
	    }
	    catch (Exception ex) {
	      return "Error creating the district: " + ex.toString();
	    }
	    return "District succesfully created!";
	  }
	
	@RequestMapping(value="/district/getDistrictByCode")
	  @ResponseBody
	  public String getDistrictByCode(String districtCode) {
	    try {
	    	District district = districtDao.getById(districtCode);
	    	return "The district name is: " + district.getDistrictName();
	    }
	    catch (Exception ex) {
	    	return "District not found: " + ex.toString();
	    }
	    
	  }
	
	@RequestMapping(value="/district/getAll")
	  @ResponseBody
	  public String getAllDistrict() {
	    try {
	    	List<District> listdistrict = districtDao.getAll();
	    	return "The list district is: " + listdistrict.size();
	    }
	    catch (Exception ex) {
	    	return "District not found: " + ex.toString();
	    }
	    
	  }
	// ------------------------
	  // PRIVATE FIELDS
	  // ------------------------
	  
	  // Wire the UserDao used inside this controller.
	  @Autowired
	  private DistrictDao districtDao;
}
