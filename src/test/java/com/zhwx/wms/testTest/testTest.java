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


//��
		
		tNew.setId(333);
		tNew.setName("�Ƹ�");
		if(ts.insertTest(tNew)) {
			System.out.println("����ɹ���"+ts.getTestById(tNew.getId()).getName());
		}else{
			System.out.println("�����ظ����");
		}
//ɾ��
		//����idɾ��
	/*
		int delNum = ts.deltTest(333);
		System.out.println(delNum);		
		
	*/
		//��������ɾ��
	/*	int delNum = ts.deltTestByName("�Ƹ�");
		System.out.println(delNum);
	*/
//��
		//����id�޸� ����
	/*	t1.setId(333);
		t1.setName("�ƼҾ�");
		int updNum = ts.updtestById(t1);
		System.out.println(updNum);
	*/
//��
		//����id����
	/*	t = ts.getTestById(12);
		System.out.println(t.getName());
	*/	
		//����name����
	/*	t = ts.getTestByName("�ƼҾ�");
		System.out.println(t.getId()+" "+t.getName());
	*/
		//�г�ȫ��
		ArrayList<test> al = null;
		al = ts.selectAll();
		for(int i =0;i<al.size();i++) {
			System.out.println(((test)al.get(i)).getId()+" "+((test)al.get(i)).getName());
		}
	}

}
