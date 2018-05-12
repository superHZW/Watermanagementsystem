package com.zhwx.wms.dao;

import java.util.ArrayList;

import com.zhwx.wms.entity.Intakesump;
import com.zhwx.wms.entity.Project;

public interface IntakesumpMapper {
    int deleteByPrimaryKey(String deviceCode);

    int insert(Intakesump record);

    int insertSelective(Intakesump record);

    Intakesump selectByPrimaryKey(String deviceCode);

    int updateByPrimaryKeySelective(Intakesump record);

    int updateByPrimaryKey(Intakesump record);
    
    //生成器以外自己写的全查方法
    ArrayList<Intakesump> selectAll();
}