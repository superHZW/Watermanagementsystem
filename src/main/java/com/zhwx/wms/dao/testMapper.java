package com.zhwx.wms.dao;

import java.util.ArrayList;

import com.zhwx.wms.entity.test;

public interface testMapper {
	
    int insert(test record);

    int insertSelective(test record);
    
    int deleteByPrimaryKey(Integer id);
    
    int deleteByName(String name);
    
    int updateByPrimaryKeySelective(test record);

    int updateByPrimaryKey(test record);

    test selectByPrimaryKey(Integer id);
    
    test selectByName(String name);
    
    ArrayList<test>selectAll();

}