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
		//与springMVC框架有关
		ApplicationContext application = new ClassPathXmlApplicationContext("applicationContext.xml");
		testService ts = (testService) application.getBean("testService");
		
		
		String checkRes = "Yes";
	    Map<String,Object>hm =new HashMap<String,Object>();
        String graphStr = null;
        String msg = null;
		try {
				//尝试打开工程ID对应的拓扑图存储文件
				File file = new File("F:\\graphData\\"+"51e7f23f-f2fd-4e2d-aec9-b558a442b358"+".txt");
				//如果文件不存在 就创建
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
				FileReader reader = new FileReader(file);//定义一个fileReader对象，用来初始化BufferedReader
			    BufferedReader bReader = new BufferedReader(reader);//new一个BufferedReader对象，将文件内容读取到缓存
			    StringBuilder sb = new StringBuilder();//定义一个字符串缓存，将字符串存放缓存中
			    String s = "";
			    while ((s =bReader.readLine()) != null) {//逐行读取文件内容，不读取换行符和末尾的空格
			        sb.append(s + "\n");//将读取的字符串添加换行符后累加存放在缓存中
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
		
		
		//不能用一般的数组存 有泛型的map   直接用ArrayList吧
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
		//----------java主程序
		
//		//声明增删改查可能需要的对象
//		test t = new test();
//		test t1 = new test();
//		
//		//用来封装成新的test对象 用于插入test表
//		test tNew = new test();
//		
//		//声明控制台输入对象
//	    Scanner sc = new Scanner(System.in); 
//	    
//        //输入整型  用nextInt方法
//        System.out.println("请输入testID："); 
//        int id = Integer.parseInt(sc.nextLine());
//	    
//        System.out.println("请输入test名称："); 
//        //要输入的是字符串 用nextLine方法
//        String name = sc.nextLine(); 
//        

        
//        //输入浮点型 用nextFloat方法
//        System.out.println("请输入你的工资："); 
//        float salary = sc.nextFloat();
        
//        System.out.println("你的test如下："); 
//        System.out.println("id："+id+"\n"+"name："+name+"\n"); 
//增
        /*
		tNew.setId(id);
		tNew.setName(name);
		if(ts.insertTest(tNew)) {
			System.out.println("插入成功！"+ts.getTestById(tNew.getId()).getName());
		}else{
			System.out.println("请勿重复添加");
		}
		*/
//删除
		//按照id删除 返回删除语句执行之后 表里有几条记录被删除
//	
//		int delNum = ts.deltTest(id);
//		System.out.println(delNum);		
		
	
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
	/*	ArrayList<test> al = null;
		al = ts.selectAll();
		for(int i =0;i<al.size();i++) {
			System.out.println(((test)al.get(i)).getId()+" "+((test)al.get(i)).getName());
		}*/
	}

}
