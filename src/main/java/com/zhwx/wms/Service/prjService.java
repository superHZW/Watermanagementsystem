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
import java.util.Iterator;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.zhwx.wms.dao.ProjectMapper;
import com.zhwx.wms.entity.Intakesump;
import com.zhwx.wms.entity.Project;

public class prjService {
	@Autowired
	public ProjectMapper pm;
	int []father;
//��֤����ͼ�ĺ�����
	public void checkGraph() {
		
			String checkRes = "Yes";
		    Map<String,Object>hm =new HashMap<String,Object>();
	        String graphStr = null;
	        String msg = null;
	        boolean hasIn = false;
	        boolean hasOut = false;
			try {
					//���Դ򿪹���ID��Ӧ������ͼ�洢�ļ�
					File file = new File("F:\\graphData\\"+"d8992f6b-742b-4dfa-bcc6-e050e17989f1"+".txt");
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

//			hm.put("graphData", graphStr);
//			hm.put("newKey", "1");
//			hm.put("error", "none");
			
			
			// �γ� cells ͼԪ����  ����ʹ��
			JSONObject sjo = JSON.parseObject(graphStr);
			JSONArray cellsArray = sjo.getJSONArray("cells");
//			HashMap<String,Object> graphgInfo = new HashMap<String,Object>();

			
			//1.�ж���ͨ��ʼ
			//��÷�link��Ԫ�� �����ڵ� ����
			//�õ��ж��Ƿ���ͨ����Ҫ�ڽӾ���lt
			
			//   ͨ�� ͼԪid  ȡͼԪ ���
			HashMap<String,Integer>mark = new HashMap<String,Integer>();
			int devAndp=0;
			for(int i=0;i<cellsArray.size();i++) {
				String type = cellsArray.getJSONObject(i).getString("type");
				if(!type.equals("link")) {
					devAndp++;
					//����ͼԪ��ͼԪ���ϱ��1 2 3 ...
					mark.put(cellsArray.getJSONObject(i).getString("id"),devAndp);
				}
				
			}
			
			//���ӽڵ��豸��־����    ���Ӧid�豸�����ӵĽڵ���
			HashMap<String,Integer>SingleCon = new HashMap<String,Integer>();
			
			//˫�ӽڵ��豸��־���� ���Ӧid�豸�����ӵĽڵ�id����
			HashMap<String,ArrayList<String>>DoubleCon = new HashMap<String,ArrayList<String>>();
			
			//�����ж��Ƿ��γɻ�  ������ȥ�ж�
			HashMap<String,ArrayList<String>>Node = new HashMap<String,ArrayList<String>>();
			
			//ˮ���豸��־����
			HashMap<String,Integer>isPipe = new HashMap<String,Integer>();
			
			//��������־����
			HashMap<String,Integer>isValven = new HashMap<String,Integer>();
			
			//�ж���ͨ�õĶ�ά����
			int [][] lt = new int [devAndp+1][devAndp+1];
			
			
			//���� ͼԪ ArrayList ���� �� �ڵ� �豸
			for(int i=0;i<cellsArray.size();i++) {
				//System.out.println(cellsArray.getJSONObject(i).getString("type"));
				JSONObject cai = cellsArray.getJSONObject(i);
				
				//�õ�ͼԪ������
				String type = cai.getString("type");
				
				//jointjsĬ�ϰ� link�������
				
				//�ⲽ���Ա������еı�
				if(type.equals("link")) {
					//���������һ��            
//					System.out.println(cellsArray.getJSONObject(i).getString("z"));
					String target = cai.getString("target");
					String source = cai.getString("source");
//					System.out.println(JSON.parseObject(target).getString("id"));
//					System.out.println(JSON.parseObject(source).getString("id"));
					
					//����Դ �� Ŀ�ķ���  ���Ǻ���û��
					String sid = JSON.parseObject(target).getString("id");
					String tid = JSON.parseObject(source).getString("id");
					
					//�õ�ͼԪ��Ӧ�ı��
					int a = mark.get(sid);
					int b = mark.get(tid);
					
					//��ͨ����ͼԪ  ��־Ϊ1    ȡ�����Ǿ���
					if(a>b)lt[b][a]=1;
					else lt[a][b]=1;
					
					//Դa�� �ڵ�
					if(Node.get(sid)!=null){
							
							// Դ�ǽڵ� Ŀ��Ҳ�ǽڵ� �ǲ��Ϸ��� ***********��
							if(Node.get(tid)!=null) {
								checkRes="�����������ӵĽڵ㣬���Ϸ���";
								//����ֱ�ӷ��ش���
								return ;
							}
							//������
							else {
								
								//  ��ñ����� sid �Ľڵ�  �����ӵ������豸
								Node.get(sid).add(tid);
								
								//��Ŀ��b�ǵ��ӽڵ���豸  ���뵥�ӽڵ� map  
								if((SingleCon.get(tid)!=null)){
									int SingleConCount = SingleCon.get(tid);
									//��ʹ�ĵ��ӽڵ��豸 ���ӽڵ���+1
									SingleCon.put(tid, ++SingleConCount);
								}
								//��Ŀ����˫�ӽڵ���豸
								else if((DoubleCon.get(tid)!=null)) {
									//�Ѷ�Ӧ�ڵ� ���� ��˫�ӽڵ��豸 �Ľڵ�����
									DoubleCon.get(tid).add(sid);
								}
								
							}
					}
					//Ŀ��b�ǽڵ�   ������ ֻ�� Դ Ŀ���෴״�����ж�
					else if(Node.get(tid)!=null) {
						//��Դ Ҳ�� �ڵ�
						if(Node.get(sid)!=null) {
							checkRes="�����������ӵĽڵ㣬���Ϸ���";
						}
						//������
						else {
							
							Node.get(tid).add(sid);
							//��Դa�ǵ��ӽڵ���豸
							if((SingleCon.get(sid)!=null)){
								int SingleConCount = SingleCon.get(sid)+1;
								SingleCon.put(sid, SingleConCount);
							}
							//��Դa��˫�ӽڵ���豸
							else if((DoubleCon.get(sid)!=null)) {
								DoubleCon.get(sid).add(tid);
							}
							
						}
					}
				}
				
				
				
				//����������Ԫ��
				else {	
					//�ǽ�ˮ�� �� ��ˮ�صĻ�
					if(type.equals("devs.MyInsump")||type.equals("devs.MyOutpool")) {
						
						//��־ �ù���ͼ�Ƿ��н��г�
						if(type.equals("devs.MyInsump"))hasIn = true;
						if(type.equals("devs.MyOutpool"))hasOut = true;
						
						//���ӽڵ��豸������ɨ�赽��ʱ��  ���������ӵĽڵ���Ϊ0
						int a = 0;
						SingleCon.put(cai.getString("id"), a);
					}
					//�Ƿ��� ���� ˮ�ܵĻ�
					else if(type.equals("devs.MyValuen")||type.equals("devs.MyValuef")||type.equals("devs.MyValueb")||type.equals("devs.Mypipe")) {
						//��ʼ��˫�ӽڵ��豸�� ��Ӧ�ڵ�����
						ArrayList<String> al = new ArrayList<String>();
						DoubleCon.put(cai.getString("id"),al);
						
						//�ǵ������Ļ�  ��־һ��
						if(type.equals("devs.MyValuen")) {
							isValven.put(cai.getString("id"), 1);
						}
						//��ˮ�ܵĻ� ��־һ��
						else if(type.equals("devs.Mypipe")) {
							isPipe.put(cai.getString("id"), 1);
						}
					}
					//�ǽڵ�Ļ�
					else if(type.equals("app.Connector")) {
						//��ʼ�� �ڵ������ӵ��豸���� 
						ArrayList<String> al = new ArrayList<String>();
						Node.put(cai.getString("id"), al);
					}
				}
			}
			/*
			for(int i=0;i<=devAndp;i++) {
				for(int j=0;j<=devAndp;j++)
					System.out.print(lt[i][j]);
				System.out.println("");
			}
			*/
			//��ʼ�� father����
			father = new int[devAndp+1];
			for(int i=1;i<=devAndp;i++) {
				father[i]=i;
			}
			/*for(int i=1;i<=devAndp;i++) {
				System.out.print(father[i]);
			}*/
			for(int i=0;i<=devAndp;i++) {
				for(int j=i;j<=devAndp;j++){
					if(lt[i][j]!=0) {
						join(i,j); 
					}
				}
			}
			/*
			for(int i=0;i<=devAndp;i++) {
				for(int j=0;j<=devAndp;j++)
					System.out.print(lt[i][j]);
				System.out.println("");
			}*/
		
			//�п��о�����ߵ�·��ѹ��
			for(int i=1;i<devAndp;i++) {
				//System.out.println(find(i));
				if(find(i)!=find(i+1)) {
					checkRes = "����ͼδ��ͨ,���飡";
					//ֱ��return
					return ;
				}
			}
			
//			1�����д��ڵ��豸��Ӧ�����Žڵ㣺
//			�����е��ӽڵ��豸��ֻ����һ���ڵ�
//			�����зǵ��ӽڵ��豸������Ҫ�������ڵ��  
//			  ��Ŀ��  ֻ�йܵ������Ŷ���˫�ӽڵ��豸 ���߸�ֻ��һ���ڵ�
			
			
			//��ʼ���          ��Ҫ©�˶�Ӧ��������it
			Iterator SingleConit=SingleCon.keySet().iterator();
			while(SingleConit.hasNext()) {
				String key=(String)SingleConit.next();
				if(SingleCon.get(key)!=1) {
					System.out.println(SingleCon.get(key));
					checkRes = "���ӽڵ�Ԫ��δ���ӽڵ�����ӽڵ����,���飡";
					return ;
				}
			}
			//����˫�ӽڵ��豸
			Iterator DoubleConit=DoubleCon.keySet().iterator();
			while(DoubleConit.hasNext()) {
				String key=(String)(DoubleConit.next());
				//������� ����ͨ��
				if(DoubleCon.get(key).size()!=2) {
					checkRes = "˫�ӽڵ�Ԫ��δ���������ڵ�����ӽڵ����,���飡";
					return;
				}
				else if(DoubleCon.get(key).get(0).equals(DoubleCon.get(key).get(1))){
					checkRes = "˫�ӽڵ�Ԫ����������ͬһ���ڵ�,���飡";
					return ;
				}
			}
			
			//�жϽڵ���Χ�豸
			Iterator Nodeit=Node.keySet().iterator();
			boolean flag = true;
			while(Nodeit.hasNext()) {
				String key=(String)(Nodeit.next());
				//�ڵ���Χ�豸�� ���ڵ���4   ֻ��ȫ�� ˮ��
				if(Node.get(key).size()>=4) {
						for(int n=0;n<Node.get(key).size();n++) {
							if(isPipe.get(Node.get(key).get(n))==null) {
								checkRes = "�ڵ���Χ����4���������豸ʱ,��ֻ������ˮ�ܣ�";
								flag = false;
								break;
							}
						}
				}
				//�ڵ���Χ�豸�� ����3ʱ ֻ��ȫ��ˮ�� ���� һ��ˮ�� ����ˮ��
				else if(Node.get(key).size()==3) {
					int countPipe = 0;
					int countSingle = 0;
				
					for(int n=0;n<Node.get(key).size();n++) {
						//��ˮ�ܽ��м���
						if(isPipe.get(Node.get(key).get(n))!=null) {
							countPipe++;
						}
						//��ˮ�������м���
						else if(SingleCon.get(Node.get(key).get(n))!=null) {
							countSingle++;
						}
					}
					
					if(countPipe==3||(countPipe==2&&countSingle==1)) {
						;
					}else {
						checkRes = "�ڵ���Χ����3���豸ʱ,ֻ��ȫ����ˮ�ܻ�����������ˮ�ܺ�һ��ˮ�أ�";
						return;
					}
				}
				//һ���ڵ�ֻ�������豸ʱ
				else if(Node.get(key).size()==2) {
					//һ���ڵ�ֻ��������ˮ�� �� ��ˮ��֮����˵
					
					//��� һ���� ˮ��
					if(SingleCon.get(Node.get(key).get(0))!=null) {
						//��һ���豸ֻ���ǵ��ӽڵ��豸 ˮ��  ���ߵ�����
						if(SingleCon.get(Node.get(key).get(1))!=null||isPipe.get(Node.get(key).get(1))!=null||isValven.get(Node.get(key).get(1))!=null) {
							;
						}
						//��������������� ˵�� ˮ�� ���˵���������
						else {
							checkRes = "�������򷧲�����ˮ��������";
							break;
						}
					}
					//���һ����ˮ��  �� ��һ���������κ��豸
					else if(isPipe.get(Node.get(key).get(0))!=null) {
						;
					}
					//���һ���ǵ�����
					else if(isValven.get(Node.get(key).get(0))!=null) {
						
						//��һ�������� ˮ�ܻ���ˮ��
						if(SingleCon.get(Node.get(key).get(1))!=null||isPipe.get(Node.get(key).get(1))!=null) {
							;
						}
						//����˵�������� ���˲��������豸
						else {
							checkRes = "������ֻ����ˮ�ػ��߹ܵ�������";
							return ;
						}
					}
					//�����豸�� ����һ�����򷧻��ߵ���
					else if(isPipe.get(Node.get(key).get(1))==null){
						//��һ�����ǹܵ��Ͳ���
						checkRes = "�򷧡�����ֻ����ܵ�������";
						return ;
					}
						
				}
				//�����豸��С��2  ���Բ���
				else if(Node.get(key).size()<2) {
					checkRes = "�ڵ���Χ�������������������豸��";
					return ;
				}
				//˵�������ĸ��豸ʱ  ����ȫ����ˮ��
				if(flag==false)return ;
			}
			
			
			
			
			
			
			
/*************************���淽��̫ɵ�ˣ����µķ�������ʱ������д��********************************************/
/*************************�õ����µķ���********************************************/
			//�жϽڵ��Ƿ�ͬʱ �н��г�
			int graphNum = 0;
			
			int doublegNum=0;
			Map<String,Map<String,String>>devices = new HashMap();
			
			Map<String,Integer>graphNo = new HashMap();
			
			Map<String,Integer>hasInn = new HashMap<String,Integer>();
			
			Map<String,Integer>hasOutt = new HashMap<String,Integer>();
			
			Map<String,Integer>nodeNo = new HashMap<String,Integer>();
			int nodeNum = 0;
			
			for(int i=0;i<cellsArray.size();i++) {
				//��ǰͼԪ��id
				String cid = cellsArray.getJSONObject(i).getString("id").toString();
				devices.put(cid,JSON.parseObject(cellsArray.getJSONObject(i).toJSONString(),Map.class));
				//System.out.println(devices.get(i).get("type"));
				if(!devices.get(cid).get("type").equals("link")&&!devices.get(cid).get("type").equals("app.Connector")) {
					graphNum++;
					if(!devices.get(cid).get("type").equals("devs.MyInsump")&&!devices.get(cid).get("type").equals("devs.MyOutpool"))
						graphNo.put(cid, ++doublegNum);
				}else if(devices.get(cid).get("type").equals("app.Connector")) {
					nodeNum++;
					nodeNo.put(cid, nodeNum);
					hasInn.put(cid, 0);
					hasOutt.put(cid,0);	
				}
			}
			System.out.println("nodeNum="+nodeNum);
			ArrayList<Map<String,String>>connectOneNodeDeivce = new ArrayList<Map<String,String>>();

			for(int i=0;i<cellsArray.size();i++) {
				String cid = cellsArray.getJSONObject(i).getString("id").toString();
				//System.out.println(devices.get(i).get("type"));
				if(devices.get(cid).get("type").equals("link")) {
					//���Դid
					String sourceInfo = JSON.toJSONString((devices.get(cid).get("source")));
					String targetInfo = JSON.toJSONString((devices.get(cid).get("target")));
					String sid = JSON.parseObject(sourceInfo).get("id").toString();
					String tid = JSON.parseObject(targetInfo).get("id").toString();
					String port = null;
					System.out.println(JSON.parseObject(targetInfo));
					System.out.println(sid+"---->"+tid);
					
					if(devices.get(sid).get("type").equals("app.Connector")) {	
						
						if(JSON.parseObject(targetInfo).get("port").toString().equals("����")){
							hasInn.put(sid, 1);							
						}else if(JSON.parseObject(targetInfo).get("port").toString().equals("����")) {
							hasOutt.put(sid, 1);
						}
						
					}else if(devices.get(sid).get("type").equals("devs.MyInsump")||devices.get(sid).get("type").equals("devs.MyOutpool")) {
						if(devices.get(JSON.parseObject(targetInfo).get("id").toString()).get("type").equals("app.Connector")){
							//��ȡ���ӽڵ���豸 id �� ��Ӧ�ڵ�id�Ĺ�ϵ
							System.out.println("Դ �� ��ˮ��    Ŀ�� �� �ڵ�");
							Map conOne = new HashMap ();
							conOne.put(JSON.parseObject(targetInfo).get("id").toString(), sid);
							connectOneNodeDeivce.add(conOne);
						}
					}
					if(devices.get(tid).get("type").equals("app.Connector")) {
						if(JSON.parseObject(sourceInfo).get("port").toString().equals("����")){
							hasInn.put(sid, 1);							
						}else if(JSON.parseObject(sourceInfo).get("port").toString().equals("����")) {
							hasOutt.put(sid, 1);
						}
					}else if(devices.get(tid).get("type").equals("devs.MyInsump")||devices.get(tid).get("type").equals("devs.MyOutpool")) {
						if(devices.get(JSON.parseObject(sourceInfo).get("id").toString()).get("type").equals("app.Connector")){
							System.out.println("Դ �� �ڵ�    Ŀ�� �� ��ˮ��");
							//��ȡ���ӽڵ���豸 id �� ��Ӧ�ڵ�id�Ĺ�ϵ
							Map conOne = new HashMap ();
							conOne.put(JSON.parseObject(sourceInfo).get("id").toString(), tid);
							connectOneNodeDeivce.add(conOne);
						}
					}

					
					
					
				}
			}
			boolean allHasIO = true;
			
			Iterator hasInnn=hasInn.keySet().iterator();
			while(hasInnn.hasNext()) {
				String hasInnnkey=(String)(hasInnn.next());
				if(hasInn.get(hasInnnkey)==0) {
					allHasIO = false;
					break;
				}
				
			}
			Iterator hasOuttt=hasOutt.keySet().iterator();
			while(hasOuttt.hasNext()) {
				String hasOutttkey=(String)(hasOuttt.next());
				if(hasInn.get(hasOutttkey)==0) {
					allHasIO = false;
					break;
				}
			}
			if(allHasIO) {
				checkRes = "���ڽڵ�ֻ���ӳ��ڻ�ֻ���ӽ���";
				return ;
			}
			hm.put("checkRes", checkRes);
			System.out.println(checkRes);
/************************������֤��ϣ��������ɼ���ģ����Ҫ���ı��ļ� *********************************/	
			//int [][] devCon = new int [graphNum+1][graphNum+1];

			int [][] A_matrix = new int [nodeNum][doublegNum];
			Map<String,Object> resFile = new HashMap<String,Object>();
			ArrayList<String>col = new  ArrayList<String>();
			ArrayList<String>row = new  ArrayList<String>();
			
			for(int i=0;i<cellsArray.size();i++) {
				String cid = cellsArray.getJSONObject(i).getString("id").toString();
				//System.out.println(devices.get(i).get("type"));
				if(devices.get(cid).get("type").equals("link")) {
					//���Դid
					String sourceInfo = JSON.toJSONString((devices.get(cid).get("source")));
					String targetInfo = JSON.toJSONString((devices.get(cid).get("target")));
					String sid = JSON.parseObject(sourceInfo).get("id").toString();
					String tid = JSON.parseObject(targetInfo).get("id").toString();
					String port = null;
					System.out.println(JSON.parseObject(targetInfo));
					System.out.println(sid+"---->"+tid);
					
					if(devices.get(sid).get("type").equals("app.Connector")) {	
						
						if(JSON.parseObject(targetInfo).get("port").toString().equals("����")){
							
							if(  (!devices.get(JSON.parseObject(targetInfo).get("id")).get("type").equals("devs.MyInsump"))&&( !devices.get(JSON.parseObject(targetInfo).get("id")).get("type").equals("devs.MyOutpool")))
							
							A_matrix[nodeNo.get(sid)-1][graphNo.get(tid)-1] = -1;
							
						}else if(JSON.parseObject(targetInfo).get("port").toString().equals("����")) {
							
							if(  (!devices.get(JSON.parseObject(targetInfo).get("id")).get("type").equals("devs.MyInsump"))&&( !devices.get(JSON.parseObject(targetInfo).get("id")).get("type").equals("devs.MyOutpool")))
										
							A_matrix[nodeNo.get(sid)-1][graphNo.get(tid)-1] = 1;
						}
						
					}else if(devices.get(tid).get("type").equals("app.Connector")) {
						if(JSON.parseObject(sourceInfo).get("port").toString().equals("����")){
							if(  (!devices.get(JSON.parseObject(sourceInfo).get("id")).get("type").equals("devs.MyInsump"))&&( !devices.get(JSON.parseObject(sourceInfo).get("id")).get("type").equals("devs.MyOutpool")))
							A_matrix[nodeNo.get(tid)-1][graphNo.get(sid)-1] = -1;
							
						}else if(JSON.parseObject(sourceInfo).get("port").toString().equals("����")) {
							if(  (!devices.get(JSON.parseObject(sourceInfo).get("id")).get("type").equals("devs.MyInsump"))&&( !devices.get(JSON.parseObject(sourceInfo).get("id")).get("type").equals("devs.MyOutpool")))	
							A_matrix[nodeNo.get(tid)-1][graphNo.get(sid)-1] = 1;
						}
					}
				}else if(devices.get(cid).get("type").equals("app.Connector")) {
					row.add(cid);
				}else {
					col.add(cid);
				}
				
			}
			System.out.println("����row:"+row);
			System.out.println("����col:"+col);
			System.out.println("����connectOneNodeDeivce:"+connectOneNodeDeivce);
			System.out.println("����A_matrix:"+A_matrix);
			for(int B = 0;B<A_matrix.length;B++) {
				for(int A = 0;A<A_matrix[0].length;A++) {
					System.out.print(A_matrix[B][A]+" ");
				}
				System.out.println("");
			}
			
			resFile.put("AMatrix",A_matrix);
			resFile.put("col", col);
			
			resFile.put("connectOneNodeDeivce", connectOneNodeDeivce);
			resFile.put("row", row);
			String res = JSON.toJSONString(resFile);
			System.out.println("res:"+res);
			
			FileWriter writer;
	        try {
	            writer = new FileWriter("F:\\graphData\\"+"d8992f6b-742b-4dfa-bcc6-e050e17989f1"+"_AMatrix_0.txt");
	            writer.write(res);
	            writer.flush();
	            writer.close();
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
			
			
	        for(int i=0;i<cellsArray.size();i++) {
				String cid = cellsArray.getJSONObject(i).getString("id").toString();
				
	        }
	        
			
			
			
			
			
			
			
			
			
	
			//return JSON.toJSONString(hm);
	}
/***************************��������֤���˵�*******************************************/	
	//���Ҹ��ڵ�
	public int find(int x)                        
	{ 
	    int r=x;
	  //���ظ��ڵ� r
	    while ( father[r ] != r ) 
	          r=father[r ];
	    int i=x , j ;
	    //·��ѹ��
	    while( i != r )                        
	    {
	         j = father[ i ]; // �ڸı��ϼ�֮ǰ����ʱ����  j ��¼������ֵ 
	         father[ i ]= r ; //���ϼ���Ϊ���ڵ�
	         i=j;
	    }
	    return r ;
	}
	//�ж�x y�Ƿ���ͨ��    
	//����Ѿ���ͨ���Ͳ��ù��� //�������ͨ���Ͱ��������ڵ���ͨ��֧�ϲ���,
	public void join(int x,int y)                                                                                      
	
	{
	    int fx=find(x),fy=find(y);
	    if(fx!=fy)
	        father[fx ]=fy;
	}
/********************������֤�����õ��Ĳ��鼯*******************************************/	
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
