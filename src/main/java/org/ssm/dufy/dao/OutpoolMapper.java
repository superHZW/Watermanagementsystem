package org.ssm.dufy.dao;

import org.ssm.dufy.entity.Outpool;

public interface OutpoolMapper {
    int deleteByPrimaryKey(Integer cnwCd);

    int insert(Outpool record);

    int insertSelective(Outpool record);

    Outpool selectByPrimaryKey(Integer cnwCd);

    int updateByPrimaryKeySelective(Outpool record);

    int updateByPrimaryKey(Outpool record);
}