package com.zhwx.wms.testTest;

import java.util.ArrayList;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.zhwx.wms.entity.test;
import com.zhwx.wms.testService.testService;

public class testTest {

	public static void main(String[] args) {
		// TODO Auto-generated method Testb
		// TODO Auto-generated method Testb
		ApplicationContext application = new ClassPathXmlApplicationContext("applicationContext.xml");
		
		testService ts = (testService) application.getBean("testService");
		
		test t = new test();
		test t1 = new test();
		test tNew = new test();


//增
		
		tNew.setId(333);
		tNew.setName("黄盖");
		if(ts.insertTest(tNew)) {
			System.out.println("插入成功！"+ts.getTestById(tNew.getId()).getName());
		}else{
			System.out.println("请勿重复添加");
		}
//删除
		//按照id删除
	/*
		int delNum = ts.deltTest(333);
		System.out.println(delNum);		
		
	*/
		//按照名字删除
	/*	int delNum = ts.deltTestByName("黄盖");
		System.out.println(delNum);
	*/
//改
		//按照id修改 名字
	/*	t1.setId(333);
		t1.setName("黄家驹");
		int updNum = ts.updtestById(t1);
		System.out.println(updNum);
	*/
//查
		//按照id查找
	/*	t = ts.getTestById(12);
		System.out.println(t.getName());
	*/	
		//按照name查找
	/*	t = ts.getTestByName("黄家驹");
		System.out.println(t.getId()+" "+t.getName());
	*/
		//列出全部
		ArrayList<test> al = null;
		al = ts.selectAll();
		for(int i =0;i<al.size();i++) {
			System.out.println(((test)al.get(i)).getId()+" "+((test)al.get(i)).getName());
		}
	}

}
