package com.zhwx.wms.dao;

import java.util.ArrayList;

import com.zhwx.wms.entity.Pipe;
import com.zhwx.wms.entity.Project;

public interface PipeMapper {
    int deleteByPrimaryKey(String deviceCode);

    int insert(Pipe record);

    int insertSelective(Pipe record);

    Pipe selectByPrimaryKey(String deviceCode);

    int updateByPrimaryKeySelective(Pipe record);

    int updateByPrimaryKey(Pipe record);
    
    //生成器以外自己写的全查方法
    ArrayList<Pipe> selectAll();
}