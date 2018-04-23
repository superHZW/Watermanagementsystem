package org.ssm.dufy.dao;

import org.ssm.dufy.entity.IUser;

public interface IUserDao {
    int deleteByPrimaryKey(Integer id);

    int insert(IUser record);
    int insertSelective(IUser record);

    IUser selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(IUser record);

    int updateByPrimaryKey(IUser record);
}