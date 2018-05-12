package com.zhwx.wms.dao;

import java.util.ArrayList;

import com.zhwx.wms.entity.User;

public interface UserMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
    
    User selectBylogin(User u);
    	
	int updatePassword(String id,String password,String pastpassword);
	
	User selectById(String id);
}