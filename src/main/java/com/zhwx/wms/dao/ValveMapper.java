package com.zhwx.wms.dao;

import java.util.ArrayList;

import com.zhwx.wms.entity.Pipe;
import com.zhwx.wms.entity.Valve;

public interface ValveMapper {
    int deleteByPrimaryKey(String deviceCode);

    int insert(Valve record);

    int insertSelective(Valve record);

    Valve selectByPrimaryKey(String deviceCode);

    int updateByPrimaryKeySelective(Valve record);

    int updateByPrimaryKey(Valve record);
    
    //生成器以外自己写的按阀门类型全查方法
    ArrayList<Valve> selectByType(String vavType);
}