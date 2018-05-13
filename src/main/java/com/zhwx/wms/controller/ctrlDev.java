package com.zhwx.wms.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.zhwx.wms.Service.devService;



@Controller 
public class ctrlDev {
	private static final String String = null;
	//1.需要注入服务类
	@Autowired 
	private devService ds =  new devService();
	//2.解析json需要的对象
	JSONObject jo=new JSONObject();

	@RequestMapping(value="/fetDev",produces = "application/json; charset=utf-8") //@RequestParam("uid") int uid,
    @ResponseBody 
    public List fetDev(@RequestBody String param){
		
		
		 JSONObject sjo = jo.parseObject(param);
		 //把元件类型传给对应的服务类
//		 System.out.println(sjo.getString("devType"));
		 return ds.fetAllDev(sjo.getString("devType"));
    }  
}
