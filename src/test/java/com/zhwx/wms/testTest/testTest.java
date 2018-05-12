package com.zhwx.wms.testTest;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.zhwx.wms.entity.test;
import com.zhwx.wms.testService.testService;

public class testTest {

	public static void main(String[] args) {
		// TODO Auto-generated method Testb
		// TODO Auto-generated method Testb
		//��springMVC����й�
		ApplicationContext application = new ClassPathXmlApplicationContext("applicationContext.xml");
		testService ts = (testService) application.getBean("testService");
		
		
		String checkRes = "Yes";
	    Map<String,Object>hm =new HashMap<String,Object>();
        String graphStr = null;
        String msg = null;
		try {
				//���Դ򿪹���ID��Ӧ������ͼ�洢�ļ�
				File file = new File("F:\\graphData\\"+"51e7f23f-f2fd-4e2d-aec9-b558a442b358"+".txt");
				//����ļ������� �ʹ���
			   /* if(!file.exists()) {
			        FileWriter writer;
			        try {
			            writer = new FileWriter("F:\\graphData\\"+PRJ_ID+".txt");
			            //writer.write("");
			            writer.flush();
			            writer.close();
			        } catch (IOException e) {
			            e.printStackTrace();
			        }
			    }*/
				FileReader reader = new FileReader(file);//����һ��fileReader����������ʼ��BufferedReader
			    BufferedReader bReader = new BufferedReader(reader);//newһ��BufferedReader���󣬽��ļ����ݶ�ȡ������
			    StringBuilder sb = new StringBuilder();//����һ���ַ������棬���ַ�����Ż�����
			    String s = "";
			    while ((s =bReader.readLine()) != null) {//���ж�ȡ�ļ����ݣ�����ȡ���з���ĩβ�Ŀո�
			        sb.append(s + "\n");//����ȡ���ַ�����ӻ��з����ۼӴ���ڻ�����
			        System.out.println(s);
			    }
			    bReader.close();
			    reader.close();
			    graphStr = sb.toString();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

//		hm.put("graphData", graphStr);
//		hm.put("newKey", "1");
//		hm.put("error", "none");
		
		JSONObject sjo = JSON.parseObject(graphStr);
		JSONArray cellsArray = sjo.getJSONArray("cells");
		
		
		//������һ�������� �з��͵�map   ֱ����ArrayList��
		//Map<String,String> [] value= new Map<String,String> [3];
		//HashMap<String,Object> graphgInfo = new HashMap<String,Object>();
		ArrayList<Map<String,String>>value = new ArrayList();
		for(int i=0;i<cellsArray.size();i++) {
			String type = cellsArray.getJSONObject(i).getString("id");
			value.add(JSON.parseObject(cellsArray.getJSONObject(i).toJSONString(),Map.class));
			System.out.println(value.get(i).get("type"));
		}
		
		
		
		
		
		
		
		
		
		
		/*int [][] a = new int [9][9];
		for(int i=0;i<9;i++) {
			for(int j=0;j<9;j++)
			System.out.print(a[i][j]);
		}
		*/
		//----------java������
		
//		//������ɾ�Ĳ������Ҫ�Ķ���
//		test t = new test();
//		test t1 = new test();
//		
//		//������װ���µ�test���� ���ڲ���test��
//		test tNew = new test();
//		
//		//��������̨�������
//	    Scanner sc = new Scanner(System.in); 
//	    
//        //��������  ��nextInt����
//        System.out.println("������testID��"); 
//        int id = Integer.parseInt(sc.nextLine());
//	    
//        System.out.println("������test���ƣ�"); 
//        //Ҫ��������ַ��� ��nextLine����
//        String name = sc.nextLine(); 
//        

        
//        //���븡���� ��nextFloat����
//        System.out.println("��������Ĺ��ʣ�"); 
//        float salary = sc.nextFloat();
        
//        System.out.println("���test���£�"); 
//        System.out.println("id��"+id+"\n"+"name��"+name+"\n"); 
//��
        /*
		tNew.setId(id);
		tNew.setName(name);
		if(ts.insertTest(tNew)) {
			System.out.println("����ɹ���"+ts.getTestById(tNew.getId()).getName());
		}else{
			System.out.println("�����ظ����");
		}
		*/
//ɾ��
		//����idɾ�� ����ɾ�����ִ��֮�� �����м�����¼��ɾ��
//	
//		int delNum = ts.deltTest(id);
//		System.out.println(delNum);		
		
	
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
	/*	ArrayList<test> al = null;
		al = ts.selectAll();
		for(int i =0;i<al.size();i++) {
			System.out.println(((test)al.get(i)).getId()+" "+((test)al.get(i)).getName());
		}*/
	}

}
