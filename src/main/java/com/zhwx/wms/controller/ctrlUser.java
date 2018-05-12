package com.zhwx.wms.controller;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zhwx.wms.entity.Project;
import com.zhwx.wms.entity.User;
import com.zhwx.wms.Service.userService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

@Controller
public class ctrlUser {
	@Autowired 
	private userService us= new userService();
  
	JSONObject jo=new JSONObject();	
	
@RequestMapping(value="/login",produces = "application/json; charset=utf-8")
@ResponseBody
public String aslogin(@RequestBody String param) {
	JSONObject sjo = jo.parseObject(param);
	String userName = sjo.getString("username");
	String password = sjo.getString("password");
	return us.selectBylogin(userName,password);

	}

@RequestMapping(value="/updatepassword",produces = "application/json; charset=utf-8")
@ResponseBody
public String updatepassward(@RequestBody String param) {
	JSONObject sjo = jo.parseObject(param);
	String id = sjo.getString("id");
	String password = sjo.getString("password");
	String pastpassword = sjo.getString("pastpassword");
	return us.updatePassword(id,password,pastpassword);
	
    }

@RequestMapping(value="/logout",produces = "application/json; charset=utf-8")
@ResponseBody
public String logout(@RequestBody String param) {
	JSONObject sjo = jo.parseObject(param);
	String id = sjo.getString("id");
	String date = sjo.getString("date");
	return us.logout(id,date);
	
    }
}
