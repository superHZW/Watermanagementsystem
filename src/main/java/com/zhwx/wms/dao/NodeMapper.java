package com.zhwx.wms.dao;

import com.zhwx.wms.entity.Node;

public interface NodeMapper {
    int deleteByPrimaryKey(Integer nodeCd);

    int insert(Node record);

    int insertSelective(Node record);

    Node selectByPrimaryKey(Integer nodeCd);

    int updateByPrimaryKeySelective(Node record);

    int updateByPrimaryKey(Node record);
}