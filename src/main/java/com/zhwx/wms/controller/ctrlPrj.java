package com.zhwx.wms.controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.zhwx.wms.Service.prjService;
import com.zhwx.wms.entity.Project;
import com.zhwx.wms.entity.test;

@Controller  
public class ctrlPrj {
	//1.需要注入服务类
	@Autowired 
	private prjService ps =  new prjService();
	//2.解析json需要的对象
	JSONObject jo=new JSONObject();
	
	 
	//拓扑检查任务分配
	@RequestMapping(value="/checkGraph",produces = "application/json; charset=utf-8") //@RequestParam("uid") int uid,
    @ResponseBody 
    public void checkGraph(@RequestBody String param){
			//前台要先提醒用户先保存，然后把工程对应的ID发给我
			//System.out.println(param);
    		JSONObject sjo =  JSON.parseObject(param);
    		System.out.println(param);
   	    	//System.out.println(sjo.getString("modifyData").toString());
    		//return 	ps.checkGraph(sjo.getString("PRJ_CD").toString());
    		ps.checkGraph();
    }
	
	//保存 编辑工程时  打开拓扑图需要的信息 到文本文件中
	@RequestMapping(value="/saveGraph",produces = "application/json; charset=utf-8") //@RequestParam("uid") int uid,
    @ResponseBody 
    public String saveGraph(@RequestBody String param){
			//System.out.println(param);
    		JSONObject sjo =  jo.parseObject(param);
    		//System.out.println(sjo);
   	    	System.out.println(sjo.getString("modifyData").toString());
   	    	return ps.savgraphData(sjo.getString("PRJ_CD").toString(), sjo.getString("Graph").toString());
    }
	
	
	//获取回复工程图所需的信息。
	@RequestMapping(value="/getGraph",produces = "application/json; charset=utf-8") //@RequestParam("uid") int uid,
    @ResponseBody 
    public String getraph(@RequestBody String param){
		
		JSONObject sjo =  jo.parseObject(param);
		System.out.println(sjo.getString("PRJ_CD").toString());
		return ps.getgraphData(sjo.getString("PRJ_CD").toString());
    }
	
	//3.前台写要去哪里 这里就写哪里     产生 utf-8的文字信息 解决乱码问题
    //增
	@RequestMapping(value="/newPrj",produces = "application/json; charset=utf-8") //@RequestParam("uid") int uid,
    //4.返回体
    @ResponseBody 
    public String newPrj(@RequestBody String param){

    	//5.得到前台数据
    	//System.out.println(param);
    	//System.out.println("newPrj"); 
    	//解析前台传来的数据，并得到获取属性所需要的对象， string转json
    	JSONObject sjo = jo.parseObject(param);
    	//使用sjo
    	//System.out.println(sjo.getString("PRJ_NM"));    
	    //以上都是接受的部分
	    //7.实现增删改查
    	//DAO(mapper类)  entity   mapper（xml）
	    //System.out.println(ps.getTestByName("黄家驹").getId());         
	    //
    	//  return ps.insertProject(sjo.getString("PRJ_NM"));
//	    //8.下面是返回数据给前台
//    	//Map<String, Object> map=(Map<String, Object> )jo.parse(param);  
// 	    //String prjName = map.get("PRJ_NM").toString();
//    	 Map<String,Object> userMap = new HashMap<String, Object>();  
//	     test test = new test();
//    	 test.setId(123129999);
//    	 test.setName("wangq");   
//	     System.out.println(JSON.toJSONString(test));
//    	 userMap.put("test",JSON.toJSONString(test) );
// 	     userMap.put("prj",JSON.toJSONString("262600"));
//       String json=JSON.toJSONString(userMap);
//         System.out.println("成功进入控制器");     
         return ps.insertProject(sjo.getString("PRJ_NM"));
    }  
    //查
	@RequestMapping(value="/getAllPrjs",produces = "application/json; charset=utf-8") //@RequestParam("uid") int uid,
    @ResponseBody 
    public List<Project> getPrjs(){
    	return ps.selectAll();
    }
	//删
	@RequestMapping(value="/delPrj",produces = "application/json; charset=utf-8") //@RequestParam("uid") int uid,
    @ResponseBody 
    public String delPrj(@RequestBody String param){
		JSONObject sjo = jo.parseObject(param);
		JSONArray sja = sjo.getJSONArray("PRJ_CD");
		String nowID = sjo.getString("getPRJ_CD");
//		System.out.println(sja.get(1).toString());
		//System.out.println(sja.size());
		ArrayList<String>al = new ArrayList<String>();
		for(int i=0;i<sja.size();i++) {
			al.add(sja.get(i).toString());
			//System.out.println(sja.get(i));
		}
		return ps.deltProject(al,nowID);
    }
	//重命名
	@RequestMapping(value="/renPrj",produces = "application/json; charset=utf-8") //@RequestParam("uid") int uid,
    @ResponseBody 
    public String renPrj(@RequestBody String param){
		
		System.out.println(param);
		JSONObject sjo = jo.parseObject(param);
		
		String PRJ_ID = sjo.getString("PRJ_CD");
		String PRJ_NM = sjo.getString("PRJ_NM");
//		System.out.println(sja.get(1).toString());
		//System.out.println(sja.size());

		return ps.updProjectById(PRJ_ID,PRJ_NM);
    }
}







