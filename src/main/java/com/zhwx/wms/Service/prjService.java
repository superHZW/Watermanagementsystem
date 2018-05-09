package com.zhwx.wms.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.zhwx.wms.dao.ProjectMapper;
import com.zhwx.wms.entity.Project;

public class prjService {
	@Autowired
	public ProjectMapper pm;
//保存拓扑图数据到文本文件
	public String savgraphData(String PRJ_ID,String graphData) {
        FileWriter writer;
        try {
            writer = new FileWriter("F:\\graphData\\"+PRJ_ID+".txt");
            writer.write(graphData);
            writer.flush();
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        this.getProjectById(PRJ_ID).setLastalter(new Timestamp((new Date()).getTime()));
        Map<String,Object> hm = new HashMap<String,Object>();
        hm.put("error", "none");
        hm.put("newKey", this.getProjectById(PRJ_ID).getNewKey().toString());
        return JSON.toJSONString(hm);
	}

//获取graphData
	public String getgraphData(String PRJ_ID) {
	       String str = null;
			try {
					File file = new File("F:\\graphData\\"+PRJ_ID+".txt");//定义一个file对象，用来初始化FileReader
				    
					//System.out.println(file.exists());
					
					//如果文件不存在 就创建
				    if(!file.exists()) {
				        FileWriter writer;
				        try {
				            writer = new FileWriter("F:\\graphData\\"+PRJ_ID+".txt");
				            //writer.write("");
				            writer.flush();
				            writer.close();
				        } catch (IOException e) {
				            e.printStackTrace();
				        }
				    }
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
				    str = sb.toString();
			} catch (FileNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		        
			Map<String,Object>hm =new HashMap<String,Object>();
			hm.put("graphData", str);
			hm.put("newKey", "1");
			hm.put("error", "none");
	       return JSON.toJSONString(hm);
	}
	
//增
	public String insertProject(String name) {
			//可能将要插入数据库的Project
			Project prj = null;
			String error = "";
			//存放返回数据的map
			Map<String,Object> hm = null;
			//System.out.println(name);	
			//初始化错误信息字符串 一开始为none 没有错误
			error = "none";
			//工程唯一编码
			String uuid = null;
			//格式化为24小时
			//DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			hm = new HashMap<String, Object>();
			
			//如果前台 传入的工程名为空 不做处理 返回给前台的ajax自己处理
			if(name==null) {		
				//error等于none才能进入处理 不对error改动
			} 
			//如果前台传入的工程名不空
			else{
				//是否已经在数据库中有同名
				//System.out.println(DateFormat.getInstance().format(new Date()));
				//System.out.println(df.format(new Date()));
				//System.out.println("可以新建");
				//不存在同名
				if(getProjectByName(name)==null) {
					uuid = UUID.randomUUID().toString();
					prj = new Project();
	 				prj.setId(uuid);
	 				prj.setName(name);
	 				prj.setLastalter(new Timestamp((new Date()).getTime()));
	 				prj.setNewKey(0);
	 				prj.setVerifyMeg(0);
					pm.insertSelective(prj);
					
					hm.put("newKey", "newKey");
					hm.put("PRJ_CD",uuid);

				}
				//存在同名
				else {
					//error等于none才能进入处理
					error = "<font color='red'>新建失败!</font>"+
					"</br>已存在名为:\"<font color='blue'>"+name+"</font>\"的工程,请使用新的工程名称!";	
				}
			}

			hm.put("error", error);
			return JSON.toJSONString(hm);		
}
//删除
	//按照id------可能删除
	
	public String deltProject(ArrayList<String> al,String nowID) {
		//可能将要插入数据库的Project
		Project prj = null;
		String msg = "";
		String res = "";
		//存放返回数据的map
		Map<String,Object> hm = null;
		hm = new HashMap<>();
		int delNum=0;
		for(int i=0;i<al.size();i++) {
			String delName = pm.selectByPrimaryKey(al.get(i)).getName();
			
			//防止页面较数据库滞后
			if(pm.selectByPrimaryKey(al.get(i))==null) {
				msg+="工程<font color ='green'>\""+delName+"\"</font>不存在或已经被删除！</br>";
			}
			else {
			    if(pm.deleteByPrimaryKey(al.get(i))==0) {
			    	msg+="删除工程<font color ='red'>\""+delName+"\"</font>失败</br>";
			    }else {
			    	if(al.get(i).equals(nowID))hm.put("hide", "1");
			    	delNum++;
			    	//System.out.println(pm.selectByPrimaryKey(al.get(i)));
			    	msg+="删除工程<font color ='blue'>\""+delName+"\"</font>成功</br>";
			    }
			}
		}
		res = "成功删除工程<font color='blue'>"+delNum+"</font>个!</br>失败<font color='red'>"+(al.size()-delNum)+"</font>个!</br>";
		hm.put("height", al.size());
		hm.put("error", res+msg);
		return JSON.toJSONString(hm);	
	}
	
	//按名字
	/*public int deltProjectByName(String name) {
		
		return pm.deleteByName(name);
	}
	*/
//改
	//按照id-----可能删除
	public String updProjectById(String PRJ_CD,String PRJ_NM) {
		
		Project p = null;
		String msg = "重命名成功！";
		Map<String,Object> hm = new HashMap<String,Object>();
		p = pm.selectByName(PRJ_NM);
		System.out.println(p);
		if(p==null) {
			p = pm.selectByPrimaryKey(PRJ_CD);
			p.setName(PRJ_NM);
			p.setLastalter(new Timestamp((new Date()).getTime()));
			pm.updateByPrimaryKeySelective(p);	
		}else {
			msg =  "工程名<font color='blue'>\""+PRJ_NM+"\"</font>个!</br>已被使用！请重新输入";
		
		}
		hm.put("msg", msg);
		return JSON.toJSONString(hm);
	}
//查 
	//全部显示
	public ArrayList<Project> selectAll() {
		ArrayList al = pm.selectAll();
		return al;
	}
	//按照id-------可能删除
	public Project getProjectById(String id) {
		Project p = pm.selectByPrimaryKey(id);
		return p;
	}
	//按照名字    本类其他方法会用到 不删
	public Project getProjectByName(String name) {
		Project s = pm.selectByName(name);
		return s;
	}
}
