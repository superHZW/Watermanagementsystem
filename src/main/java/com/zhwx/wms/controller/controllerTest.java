package com.zhwx.wms.controller;

import java.util.HashMap;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import com.zhwx.wms.entity.test;
import com.zhwx.wms.testService.testService;

/**
 * Servlet implementation class controllerTest
 */

@Controller  
public class controllerTest {  
	@Autowired 
	private testService ss =  new testService();
	JSONObject jo=new JSONObject();
    //,consumes = MediaType.APPLICATION_JSON_VALUE
    @RequestMapping(value="/newTest") //@RequestParam("uid") int uid,
    @ResponseBody
    //public void testServletAPI(){  
    public String testServletAPI(@RequestBody String param){
    	
    	System.out.println("newTest");
    	
    	//stringתmap 
    	
     	//System.out.println(m.get("user"));   
    	
    	//stringתjson  
    	JSONObject parseObject = jo.parseObject(param); 
    	
    	System.out.println(parseObject.getString("PRJ_NM"));        

    	System.out.println(ss.getTestByName("�ƼҾ�").getId());         
    	
    	//Map<String, Object> map=(Map<String, Object> )jo.parse(param);  
 	    //String prjName = map.get("PRJ_NM").toString();
    	
    	 Map<String,Object> userMap = new HashMap<String, Object>();
    	 test test = new test();
    	 test.setId(123123);
    	 test.setName("wangq");
    	 System.out.println(JSON.toJSONString(test));
    	 userMap.put("test",JSON.toJSONString(test) );
         String json=JSON.toJSONString(userMap);
         return json;

    }  
  
}  