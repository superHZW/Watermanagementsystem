package com.zhwx.wms.dao;

import com.zhwx.wms.entity.Prjgraph;

public interface PrjgraphMapper {
    int deleteByPrimaryKey(String cellId);

    int insert(Prjgraph record);

    int insertSelective(Prjgraph record);

    Prjgraph selectByPrimaryKey(String cellId);

    int updateByPrimaryKeySelective(Prjgraph record);

    int updateByPrimaryKey(Prjgraph record);
}