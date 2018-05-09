package com.zhwx.wms.dao;

import java.util.ArrayList;

import com.zhwx.wms.entity.Project;

public interface ProjectMapper {

    int insert(Project record);

    int insertSelective(Project record);
    
    int deleteByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Project record);

    int updateByPrimaryKey(Project record);
    
    Project selectByPrimaryKey(String id);
    
    Project selectByName(String name);

    ArrayList<Project> selectAll();
}