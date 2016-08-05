package com.simpleapp.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MainController {

	@RequestMapping("/")
  public String index() {
		System.out.println("masuk Index");
    return "redirect:/app/index.html";
  }

}
