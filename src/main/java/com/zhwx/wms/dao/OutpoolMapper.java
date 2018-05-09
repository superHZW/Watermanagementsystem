package com.zhwx.wms.dao;

import com.zhwx.wms.entity.Outpool;

public interface OutpoolMapper {
    int deleteByPrimaryKey(Integer cnwCd);

    int insert(Outpool record);

    int insertSelective(Outpool record);

    Outpool selectByPrimaryKey(Integer cnwCd);

    int updateByPrimaryKeySelective(Outpool record);

    int updateByPrimaryKey(Outpool record);
}