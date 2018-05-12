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
	//1.��Ҫע�������
	@Autowired 
	private prjService ps =  new prjService();
	//2.����json��Ҫ�Ķ���
	JSONObject jo=new JSONObject();
	
	 
	//���˼���������
	@RequestMapping(value="/checkGraph",produces = "application/json; charset=utf-8") //@RequestParam("uid") int uid,
    @ResponseBody 
    public void checkGraph(@RequestBody String param){
			//ǰ̨Ҫ�������û��ȱ��棬Ȼ��ѹ��̶�Ӧ��ID������
			//System.out.println(param);
    		JSONObject sjo =  JSON.parseObject(param);
    		System.out.println(param);
   	    	//System.out.println(sjo.getString("modifyData").toString());
    		//return 	ps.checkGraph(sjo.getString("PRJ_CD").toString());
    		ps.checkGraph();
    }
	
	//���� �༭����ʱ  ������ͼ��Ҫ����Ϣ ���ı��ļ���
	@RequestMapping(value="/saveGraph",produces = "application/json; charset=utf-8") //@RequestParam("uid") int uid,
    @ResponseBody 
    public String saveGraph(@RequestBody String param){
			//System.out.println(param);
    		JSONObject sjo =  jo.parseObject(param);
    		//System.out.println(sjo);
   	    	System.out.println(sjo.getString("modifyData").toString());
   	    	return ps.savgraphData(sjo.getString("PRJ_CD").toString(), sjo.getString("Graph").toString());
    }
	
	
	//��ȡ�ظ�����ͼ�������Ϣ��
	@RequestMapping(value="/getGraph",produces = "application/json; charset=utf-8") //@RequestParam("uid") int uid,
    @ResponseBody 
    public String getraph(@RequestBody String param){
		
		JSONObject sjo =  jo.parseObject(param);
		System.out.println(sjo.getString("PRJ_CD").toString());
		return ps.getgraphData(sjo.getString("PRJ_CD").toString());
    }
	
	//3.ǰ̨дҪȥ���� �����д����     ���� utf-8��������Ϣ �����������
    //��
	@RequestMapping(value="/newPrj",produces = "application/json; charset=utf-8") //@RequestParam("uid") int uid,
    //4.������
    @ResponseBody 
    public String newPrj(@RequestBody String param){

    	//5.�õ�ǰ̨����
    	//System.out.println(param);
    	//System.out.println("newPrj"); 
    	//����ǰ̨���������ݣ����õ���ȡ��������Ҫ�Ķ��� stringתjson
    	JSONObject sjo = jo.parseObject(param);
    	//ʹ��sjo
    	//System.out.println(sjo.getString("PRJ_NM"));    
	    //���϶��ǽ��ܵĲ���
	    //7.ʵ����ɾ�Ĳ�
    	//DAO(mapper��)  entity   mapper��xml��
	    //System.out.println(ps.getTestByName("�ƼҾ�").getId());         
	    //
    	//  return ps.insertProject(sjo.getString("PRJ_NM"));
//	    //8.�����Ƿ������ݸ�ǰ̨
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
//         System.out.println("�ɹ����������");     
         return ps.insertProject(sjo.getString("PRJ_NM"));
    }  
    //��
	@RequestMapping(value="/getAllPrjs",produces = "application/json; charset=utf-8") //@RequestParam("uid") int uid,
    @ResponseBody 
    public List<Project> getPrjs(){
    	return ps.selectAll();
    }
	//ɾ
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
	//������
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







