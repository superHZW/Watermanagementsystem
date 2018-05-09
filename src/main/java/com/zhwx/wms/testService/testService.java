package com.zhwx.wms.testService;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;


import com.zhwx.wms.dao.testMapper;
import com.zhwx.wms.entity.test;
public class testService {



		@Autowired
		public testMapper tm;
//��
		public boolean insertTest(test t) {
					
		if(tm.selectByPrimaryKey(t.getId())==null) {
			tm.insertSelective(t);
				return true;
			}
			return false;
		}
//ɾ��
		//����id
		public int deltTest(int id) {
			
			return tm.deleteByPrimaryKey(id);
		}
		//������
		public int deltTestByName(String name) {
			
			return tm.deleteByName(name);
		}
//��
		//����id
		public int updtestById(test t) {
			int updNtm = tm.updateByPrimaryKeySelective(t);
			return updNtm;
		}
//�� 
		//ȫ����ʾ
		public ArrayList selectAll() {
			ArrayList al = tm.selectAll();
			return al;
		}
		//����id
		public test getTestById(int id) {
			test t = tm.selectByPrimaryKey(id);
			
			return t;
		}
		//��������
		public test getTestByName(String name) {
			test s = tm.selectByName(name);
			return s;
		}
}
