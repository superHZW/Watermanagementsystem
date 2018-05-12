package com.zhwx.wms.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.zhwx.wms.dao.UserMapper;
import com.zhwx.wms.entity.User;

public class userService {	
	@Autowired
	public UserMapper um;
	Map<String,Object> hm =  new HashMap<>();
	public String selectBylogin (String userName, String password) {
		User user =um.selectBylogin(userName, password);
		if(user==null) {
			hm.put("msg","user_or_pass_error");
			hm.put("id", "null");
			return JSON.toJSONString(hm);	
		}else {
			hm.put("msg","success");
			hm.put("id", user.getId());
			return JSON.toJSONString(hm);
		}	
	}
		
	private Object getUserPasswordbyPassword(String password) {
		// TODO Auto-generated method stub
		return null;
	}

	private Object getUserNameByName(String username) {
		// TODO Auto-generated method stub
		return null;
	}

	public String updatePassword(String id, String password, String pastpassword) {
		User user= um.selectById(id);
		if(pastpassword.equals(user.getPassword())) {
			int flag = um.updatePassword(id, password,pastpassword);
			hm.put("msg","success");
			return JSON.toJSONString(hm);
		}else {
			hm.put("msg","old_error");
			return JSON.toJSONString(hm);

	}
	}

	public String logout(String id, String date) {
		
		hm.put("msg","success");
		return JSON.toJSONString(hm);
	}
	
}