package com.zhwx.wms.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.zhwx.wms.entity.test;
import com.zhwx.wms.testService.testService;

@Controller 
public class controllerTest2 {
	@Autowired 
	private testService ss =  new testService();
	JSONObject jo=new JSONObject();
    //,consumes = MediaType.APPLICATION_JSON_VALUE
    @RequestMapping(value="/test") //@RequestParam("uid") int uid,
    @ResponseBody
    //public void testServletAPI(){  
    public void testServletAPI(@RequestBody String param){

    	System.out.println("77777777777777777777777777");
    	
    }  
}
