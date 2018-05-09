package com.zhwx.wms.dao;

import com.zhwx.wms.entity.Intakesump;

public interface IntakesumpMapper {
    int deleteByPrimaryKey(Integer cnwCd);

    int insert(Intakesump record);

    int insertSelective(Intakesump record);

    Intakesump selectByPrimaryKey(Integer cnwCd);

    int updateByPrimaryKeySelective(Intakesump record);

    int updateByPrimaryKey(Intakesump record);
}