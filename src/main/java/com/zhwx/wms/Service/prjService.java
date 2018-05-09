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
//��������ͼ���ݵ��ı��ļ�
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

//��ȡgraphData
	public String getgraphData(String PRJ_ID) {
	       String str = null;
			try {
					File file = new File("F:\\graphData\\"+PRJ_ID+".txt");//����һ��file����������ʼ��FileReader
				    
					//System.out.println(file.exists());
					
					//����ļ������� �ʹ���
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
	
//��
	public String insertProject(String name) {
			//���ܽ�Ҫ�������ݿ��Project
			Project prj = null;
			String error = "";
			//��ŷ������ݵ�map
			Map<String,Object> hm = null;
			//System.out.println(name);	
			//��ʼ��������Ϣ�ַ��� һ��ʼΪnone û�д���
			error = "none";
			//����Ψһ����
			String uuid = null;
			//��ʽ��Ϊ24Сʱ
			//DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			hm = new HashMap<String, Object>();
			
			//���ǰ̨ ����Ĺ�����Ϊ�� �������� ���ظ�ǰ̨��ajax�Լ�����
			if(name==null) {		
				//error����none���ܽ��봦�� ����error�Ķ�
			} 
			//���ǰ̨����Ĺ���������
			else{
				//�Ƿ��Ѿ������ݿ�����ͬ��
				//System.out.println(DateFormat.getInstance().format(new Date()));
				//System.out.println(df.format(new Date()));
				//System.out.println("�����½�");
				//������ͬ��
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
				//����ͬ��
				else {
					//error����none���ܽ��봦��
					error = "<font color='red'>�½�ʧ��!</font>"+
					"</br>�Ѵ�����Ϊ:\"<font color='blue'>"+name+"</font>\"�Ĺ���,��ʹ���µĹ�������!";	
				}
			}

			hm.put("error", error);
			return JSON.toJSONString(hm);		
}
//ɾ��
	//����id------����ɾ��
	
	public String deltProject(ArrayList<String> al,String nowID) {
		//���ܽ�Ҫ�������ݿ��Project
		Project prj = null;
		String msg = "";
		String res = "";
		//��ŷ������ݵ�map
		Map<String,Object> hm = null;
		hm = new HashMap<>();
		int delNum=0;
		for(int i=0;i<al.size();i++) {
			String delName = pm.selectByPrimaryKey(al.get(i)).getName();
			
			//��ֹҳ������ݿ��ͺ�
			if(pm.selectByPrimaryKey(al.get(i))==null) {
				msg+="����<font color ='green'>\""+delName+"\"</font>�����ڻ��Ѿ���ɾ����</br>";
			}
			else {
			    if(pm.deleteByPrimaryKey(al.get(i))==0) {
			    	msg+="ɾ������<font color ='red'>\""+delName+"\"</font>ʧ��</br>";
			    }else {
			    	if(al.get(i).equals(nowID))hm.put("hide", "1");
			    	delNum++;
			    	//System.out.println(pm.selectByPrimaryKey(al.get(i)));
			    	msg+="ɾ������<font color ='blue'>\""+delName+"\"</font>�ɹ�</br>";
			    }
			}
		}
		res = "�ɹ�ɾ������<font color='blue'>"+delNum+"</font>��!</br>ʧ��<font color='red'>"+(al.size()-delNum)+"</font>��!</br>";
		hm.put("height", al.size());
		hm.put("error", res+msg);
		return JSON.toJSONString(hm);	
	}
	
	//������
	/*public int deltProjectByName(String name) {
		
		return pm.deleteByName(name);
	}
	*/
//��
	//����id-----����ɾ��
	public String updProjectById(String PRJ_CD,String PRJ_NM) {
		
		Project p = null;
		String msg = "�������ɹ���";
		Map<String,Object> hm = new HashMap<String,Object>();
		p = pm.selectByName(PRJ_NM);
		System.out.println(p);
		if(p==null) {
			p = pm.selectByPrimaryKey(PRJ_CD);
			p.setName(PRJ_NM);
			p.setLastalter(new Timestamp((new Date()).getTime()));
			pm.updateByPrimaryKeySelective(p);	
		}else {
			msg =  "������<font color='blue'>\""+PRJ_NM+"\"</font>��!</br>�ѱ�ʹ�ã�����������";
		
		}
		hm.put("msg", msg);
		return JSON.toJSONString(hm);
	}
//�� 
	//ȫ����ʾ
	public ArrayList<Project> selectAll() {
		ArrayList al = pm.selectAll();
		return al;
	}
	//����id-------����ɾ��
	public Project getProjectById(String id) {
		Project p = pm.selectByPrimaryKey(id);
		return p;
	}
	//��������    ���������������õ� ��ɾ
	public Project getProjectByName(String name) {
		Project s = pm.selectByName(name);
		return s;
	}
}
