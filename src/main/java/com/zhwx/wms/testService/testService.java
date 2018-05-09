package com.zhwx.wms.testService;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;


import com.zhwx.wms.dao.testMapper;
import com.zhwx.wms.entity.test;
public class testService {



		@Autowired
		public testMapper tm;
//增
		public boolean insertTest(test t) {
					
		if(tm.selectByPrimaryKey(t.getId())==null) {
			tm.insertSelective(t);
				return true;
			}
			return false;
		}
//删除
		//按照id
		public int deltTest(int id) {
			
			return tm.deleteByPrimaryKey(id);
		}
		//按名字
		public int deltTestByName(String name) {
			
			return tm.deleteByName(name);
		}
//改
		//按照id
		public int updtestById(test t) {
			int updNtm = tm.updateByPrimaryKeySelective(t);
			return updNtm;
		}
//查 
		//全部显示
		public ArrayList selectAll() {
			ArrayList al = tm.selectAll();
			return al;
		}
		//按照id
		public test getTestById(int id) {
			test t = tm.selectByPrimaryKey(id);
			
			return t;
		}
		//按照名字
		public test getTestByName(String name) {
			test s = tm.selectByName(name);
			return s;
		}
}
