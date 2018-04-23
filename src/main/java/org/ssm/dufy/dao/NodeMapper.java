package org.ssm.dufy.dao;

import org.ssm.dufy.entity.Node;

public interface NodeMapper {
    int deleteByPrimaryKey(Integer nodeCd);

    int insert(Node record);

    int insertSelective(Node record);

    Node selectByPrimaryKey(Integer nodeCd);

    int updateByPrimaryKeySelective(Node record);

    int updateByPrimaryKey(Node record);
}