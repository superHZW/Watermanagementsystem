package com.zhwx.wms.dao;

import java.util.ArrayList;

import com.zhwx.wms.entity.Outpool;
import com.zhwx.wms.entity.Project;

public interface OutpoolMapper {
    int deleteByPrimaryKey(String deviceCode);

    int insert(Outpool record);

    int insertSelective(Outpool record);

    Outpool selectByPrimaryKey(String deviceCode);

    int updateByPrimaryKeySelective(Outpool record);

    int updateByPrimaryKey(Outpool record);
    
    //�����������Լ�д��ȫ�鷽��
    ArrayList<Outpool> selectAll();
}