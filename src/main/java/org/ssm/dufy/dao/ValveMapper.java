package org.ssm.dufy.dao;

import org.ssm.dufy.entity.Valve;

public interface ValveMapper {
    int deleteByPrimaryKey(Integer vavCd);

    int insert(Valve record);

    int insertSelective(Valve record);

    Valve selectByPrimaryKey(Integer vavCd);

    int updateByPrimaryKeySelective(Valve record);

    int updateByPrimaryKey(Valve record);
}