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
//验证拓扑图的合理性
	public void checkGraph() {
		
			String checkRes = "Yes";
		    Map<String,Object>hm =new HashMap<String,Object>();
	        String graphStr = null;
	        String msg = null;
	        boolean hasIn = false;
	        boolean hasOut = false;
			try {
					//尝试打开工程ID对应的拓扑图存储文件
					File file = new File("F:\\graphData\\"+"d8992f6b-742b-4dfa-bcc6-e050e17989f1"+".txt");
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

//			hm.put("graphData", graphStr);
//			hm.put("newKey", "1");
//			hm.put("error", "none");
			
			
			// 形成 cells 图元数组  方便使用
			JSONObject sjo = JSON.parseObject(graphStr);
			JSONArray cellsArray = sjo.getJSONArray("cells");
//			HashMap<String,Object> graphgInfo = new HashMap<String,Object>();

			
			//1.判断连通开始
			//获得非link的元件 包括节点 个数
			//得到判断是否连通所需要邻接矩阵lt
			
			//   通过 图元id  取图元 编号
			HashMap<String,Integer>mark = new HashMap<String,Integer>();
			int devAndp=0;
			for(int i=0;i<cellsArray.size();i++) {
				String type = cellsArray.getJSONObject(i).getString("type");
				if(!type.equals("link")) {
					devAndp++;
					//根据图元给图元赋上标号1 2 3 ...
					mark.put(cellsArray.getJSONObject(i).getString("id"),devAndp);
				}
				
			}
			
			//单接节点设备标志数组    存对应id设备所连接的节点数
			HashMap<String,Integer>SingleCon = new HashMap<String,Integer>();
			
			//双接节点设备标志数组 存对应id设备所连接的节点id数组
			HashMap<String,ArrayList<String>>DoubleCon = new HashMap<String,ArrayList<String>>();
			
			//不用判断是否形成环  用上面去判断
			HashMap<String,ArrayList<String>>Node = new HashMap<String,ArrayList<String>>();
			
			//水管设备标志数组
			HashMap<String,Integer>isPipe = new HashMap<String,Integer>();
			
			//调流阀标志数组
			HashMap<String,Integer>isValven = new HashMap<String,Integer>();
			
			//判断连通用的二维矩阵
			int [][] lt = new int [devAndp+1][devAndp+1];
			
			
			//遍历 图元 ArrayList 包括 边 节点 设备
			for(int i=0;i<cellsArray.size();i++) {
				//System.out.println(cellsArray.getJSONObject(i).getString("type"));
				JSONObject cai = cellsArray.getJSONObject(i);
				
				//得到图元的类型
				String type = cai.getString("type");
				
				//jointjs默认把 link放在最后？
				
				//这步可以遍历所有的边
				if(type.equals("link")) {
					//遍历数组第一步            
//					System.out.println(cellsArray.getJSONObject(i).getString("z"));
					String target = cai.getString("target");
					String source = cai.getString("source");
//					System.out.println(JSON.parseObject(target).getString("id"));
//					System.out.println(JSON.parseObject(source).getString("id"));
					
					//这里源 和 目的反了  但是好像没差
					String sid = JSON.parseObject(target).getString("id");
					String tid = JSON.parseObject(source).getString("id");
					
					//得到图元对应的标号
					int a = mark.get(sid);
					int b = mark.get(tid);
					
					//连通两个图元  标志为1    取上三角矩阵
					if(a>b)lt[b][a]=1;
					else lt[a][b]=1;
					
					//源a是 节点
					if(Node.get(sid)!=null){
							
							// 源是节点 目的也是节点 是不合法的 ***********①
							if(Node.get(tid)!=null) {
								checkRes="存在相邻连接的节点，不合法！";
								//可以直接返回错误
								return ;
							}
							//若不是
							else {
								
								//  获得编码是 sid 的节点  所连接的所有设备
								Node.get(sid).add(tid);
								
								//若目的b是单接节点的设备  放入单接节点 map  
								if((SingleCon.get(tid)!=null)){
									int SingleConCount = SingleCon.get(tid);
									//并使改单接节点设备 连接节点数+1
									SingleCon.put(tid, ++SingleConCount);
								}
								//若目的是双接节点的设备
								else if((DoubleCon.get(tid)!=null)) {
									//把对应节点 放入 改双接节点设备 的节点数组
									DoubleCon.get(tid).add(sid);
								}
								
							}
					}
					//目的b是节点   与上面 只是 源 目的相反状况的判断
					else if(Node.get(tid)!=null) {
						//若源 也是 节点
						if(Node.get(sid)!=null) {
							checkRes="存在相邻连接的节点，不合法！";
						}
						//若不是
						else {
							
							Node.get(tid).add(sid);
							//若源a是单接节点的设备
							if((SingleCon.get(sid)!=null)){
								int SingleConCount = SingleCon.get(sid)+1;
								SingleCon.put(sid, SingleConCount);
							}
							//若源a是双接节点的设备
							else if((DoubleCon.get(sid)!=null)) {
								DoubleCon.get(sid).add(tid);
							}
							
						}
					}
				}
				
				
				
				//是其他六个元件
				else {	
					//是进水池 或 出水池的话
					if(type.equals("devs.MyInsump")||type.equals("devs.MyOutpool")) {
						
						//标志 该工程图是否有进有出
						if(type.equals("devs.MyInsump"))hasIn = true;
						if(type.equals("devs.MyOutpool"))hasOut = true;
						
						//单接节点设备被初次扫描到的时候  置它所连接的节点数为0
						int a = 0;
						SingleCon.put(cai.getString("id"), a);
					}
					//是阀门 或者 水管的话
					else if(type.equals("devs.MyValuen")||type.equals("devs.MyValuef")||type.equals("devs.MyValueb")||type.equals("devs.Mypipe")) {
						//初始化双接节点设备的 对应节点数组
						ArrayList<String> al = new ArrayList<String>();
						DoubleCon.put(cai.getString("id"),al);
						
						//是调流阀的话  标志一下
						if(type.equals("devs.MyValuen")) {
							isValven.put(cai.getString("id"), 1);
						}
						//是水管的话 标志一下
						else if(type.equals("devs.Mypipe")) {
							isPipe.put(cai.getString("id"), 1);
						}
					}
					//是节点的话
					else if(type.equals("app.Connector")) {
						//初始化 节点所连接的设备数组 
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
			//初始化 father数组
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
		
			//有空研究下这边的路径压缩
			for(int i=1;i<devAndp;i++) {
				//System.out.println(find(i));
				if(find(i)!=find(i+1)) {
					checkRes = "拓扑图未连通,请检查！";
					//直接return
					return ;
				}
			}
			
//			1、所有存在的设备都应该连着节点：
//			·所有单接节点设备都只能连一个节点
//			·所有非单接节点设备都至少要连两个节点√  
//			  项目中  只有管道、阀门都是双接节点设备 两边各只接一个节点
			
			
			//开始检查          不要漏了对应迭代器的it
			Iterator SingleConit=SingleCon.keySet().iterator();
			while(SingleConit.hasNext()) {
				String key=(String)SingleConit.next();
				if(SingleCon.get(key)!=1) {
					System.out.println(SingleCon.get(key));
					checkRes = "单接节点元件未连接节点或连接节点过多,请检查！";
					return ;
				}
			}
			//遍历双接节点设备
			Iterator DoubleConit=DoubleCon.keySet().iterator();
			while(DoubleConit.hasNext()) {
				String key=(String)(DoubleConit.next());
				//上面过滤 不连通的
				if(DoubleCon.get(key).size()!=2) {
					checkRes = "双接节点元件未连接两个节点或连接节点过多,请检查！";
					return;
				}
				else if(DoubleCon.get(key).get(0).equals(DoubleCon.get(key).get(1))){
					checkRes = "双接节点元件两端连接同一个节点,请检查！";
					return ;
				}
			}
			
			//判断节点周围设备
			Iterator Nodeit=Node.keySet().iterator();
			boolean flag = true;
			while(Nodeit.hasNext()) {
				String key=(String)(Nodeit.next());
				//节点周围设备数 大于等于4   只能全是 水管
				if(Node.get(key).size()>=4) {
						for(int n=0;n<Node.get(key).size();n++) {
							if(isPipe.get(Node.get(key).get(n))==null) {
								checkRes = "节点周围连接4个及以上设备时,都只能连接水管！";
								flag = false;
								break;
							}
						}
				}
				//节点周围设备数 等于3时 只能全是水管 或者 一个水池 两个水管
				else if(Node.get(key).size()==3) {
					int countPipe = 0;
					int countSingle = 0;
				
					for(int n=0;n<Node.get(key).size();n++) {
						//对水管进行计数
						if(isPipe.get(Node.get(key).get(n))!=null) {
							countPipe++;
						}
						//对水池数进行计数
						else if(SingleCon.get(Node.get(key).get(n))!=null) {
							countSingle++;
						}
					}
					
					if(countPipe==3||(countPipe==2&&countSingle==1)) {
						;
					}else {
						checkRes = "节点周围连接3个设备时,只能全连接水管或是连接两个水管和一个水池！";
						return;
					}
				}
				//一个节点只接两个设备时
				else if(Node.get(key).size()==2) {
					//一个节点只连两个进水池 或 出水池之后在说
					
					//如果 一个是 水池
					if(SingleCon.get(Node.get(key).get(0))!=null) {
						//另一个设备只能是单接节点设备 水管  或者调流阀
						if(SingleCon.get(Node.get(key).get(1))!=null||isPipe.get(Node.get(key).get(1))!=null||isValven.get(Node.get(key).get(1))!=null) {
							;
						}
						//不是上面两种情况 说明 水池 连了蝶阀或是球阀
						else {
							checkRes = "蝶阀和球阀不能与水池相连！";
							break;
						}
					}
					//如果一个是水管  则 另一个可以是任何设备
					else if(isPipe.get(Node.get(key).get(0))!=null) {
						;
					}
					//如果一个是调流阀
					else if(isValven.get(Node.get(key).get(0))!=null) {
						
						//另一个可以是 水管或者水池
						if(SingleCon.get(Node.get(key).get(1))!=null||isPipe.get(Node.get(key).get(1))!=null) {
							;
						}
						//否则说明调流阀 连了不该连的设备
						else {
							checkRes = "调流阀只能与水池或者管道相连！";
							return ;
						}
					}
					//两个设备中 其中一个是球阀或者蝶阀
					else if(isPipe.get(Node.get(key).get(1))==null){
						//另一个不是管道就不行
						checkRes = "球阀、蝶阀只能与管道相连！";
						return ;
					}
						
				}
				//连接设备数小于2  绝对不行
				else if(Node.get(key).size()<2) {
					checkRes = "节点周围必须连接两个及以上设备！";
					return ;
				}
				//说明连接四个设备时  不是全连接水管
				if(flag==false)return ;
			}
			
			
			
			
			
			
			
/*************************上面方法太傻了，有新的方法，有时间再重写吧********************************************/
/*************************用的是新的方法********************************************/
			//判断节点是否同时 有进有出
			int graphNum = 0;
			
			int doublegNum=0;
			Map<String,Map<String,String>>devices = new HashMap();
			
			Map<String,Integer>graphNo = new HashMap();
			
			Map<String,Integer>hasInn = new HashMap<String,Integer>();
			
			Map<String,Integer>hasOutt = new HashMap<String,Integer>();
			
			Map<String,Integer>nodeNo = new HashMap<String,Integer>();
			int nodeNum = 0;
			
			for(int i=0;i<cellsArray.size();i++) {
				//当前图元的id
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
					//获得源id
					String sourceInfo = JSON.toJSONString((devices.get(cid).get("source")));
					String targetInfo = JSON.toJSONString((devices.get(cid).get("target")));
					String sid = JSON.parseObject(sourceInfo).get("id").toString();
					String tid = JSON.parseObject(targetInfo).get("id").toString();
					String port = null;
					System.out.println(JSON.parseObject(targetInfo));
					System.out.println(sid+"---->"+tid);
					
					if(devices.get(sid).get("type").equals("app.Connector")) {	
						
						if(JSON.parseObject(targetInfo).get("port").toString().equals("出口")){
							hasInn.put(sid, 1);							
						}else if(JSON.parseObject(targetInfo).get("port").toString().equals("进口")) {
							hasOutt.put(sid, 1);
						}
						
					}else if(devices.get(sid).get("type").equals("devs.MyInsump")||devices.get(sid).get("type").equals("devs.MyOutpool")) {
						if(devices.get(JSON.parseObject(targetInfo).get("id").toString()).get("type").equals("app.Connector")){
							//获取单接节点的设备 id 与 对应节点id的关系
							System.out.println("源 是 进水池    目的 是 节点");
							Map conOne = new HashMap ();
							conOne.put(JSON.parseObject(targetInfo).get("id").toString(), sid);
							connectOneNodeDeivce.add(conOne);
						}
					}
					if(devices.get(tid).get("type").equals("app.Connector")) {
						if(JSON.parseObject(sourceInfo).get("port").toString().equals("出口")){
							hasInn.put(sid, 1);							
						}else if(JSON.parseObject(sourceInfo).get("port").toString().equals("进口")) {
							hasOutt.put(sid, 1);
						}
					}else if(devices.get(tid).get("type").equals("devs.MyInsump")||devices.get(tid).get("type").equals("devs.MyOutpool")) {
						if(devices.get(JSON.parseObject(sourceInfo).get("id").toString()).get("type").equals("app.Connector")){
							System.out.println("源 是 节点    目的 是 出水池");
							//获取单接节点的设备 id 与 对应节点id的关系
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
				checkRes = "存在节点只连接出口或只连接进口";
				return ;
			}
			hm.put("checkRes", checkRes);
			System.out.println(checkRes);
/************************拓扑验证完毕，下面生成计算模块需要的文本文件 *********************************/	
			//int [][] devCon = new int [graphNum+1][graphNum+1];

			int [][] A_matrix = new int [nodeNum][doublegNum];
			Map<String,Object> resFile = new HashMap<String,Object>();
			ArrayList<String>col = new  ArrayList<String>();
			ArrayList<String>row = new  ArrayList<String>();
			
			for(int i=0;i<cellsArray.size();i++) {
				String cid = cellsArray.getJSONObject(i).getString("id").toString();
				//System.out.println(devices.get(i).get("type"));
				if(devices.get(cid).get("type").equals("link")) {
					//获得源id
					String sourceInfo = JSON.toJSONString((devices.get(cid).get("source")));
					String targetInfo = JSON.toJSONString((devices.get(cid).get("target")));
					String sid = JSON.parseObject(sourceInfo).get("id").toString();
					String tid = JSON.parseObject(targetInfo).get("id").toString();
					String port = null;
					System.out.println(JSON.parseObject(targetInfo));
					System.out.println(sid+"---->"+tid);
					
					if(devices.get(sid).get("type").equals("app.Connector")) {	
						
						if(JSON.parseObject(targetInfo).get("port").toString().equals("出口")){
							
							if(  (!devices.get(JSON.parseObject(targetInfo).get("id")).get("type").equals("devs.MyInsump"))&&( !devices.get(JSON.parseObject(targetInfo).get("id")).get("type").equals("devs.MyOutpool")))
							
							A_matrix[nodeNo.get(sid)-1][graphNo.get(tid)-1] = -1;
							
						}else if(JSON.parseObject(targetInfo).get("port").toString().equals("进口")) {
							
							if(  (!devices.get(JSON.parseObject(targetInfo).get("id")).get("type").equals("devs.MyInsump"))&&( !devices.get(JSON.parseObject(targetInfo).get("id")).get("type").equals("devs.MyOutpool")))
										
							A_matrix[nodeNo.get(sid)-1][graphNo.get(tid)-1] = 1;
						}
						
					}else if(devices.get(tid).get("type").equals("app.Connector")) {
						if(JSON.parseObject(sourceInfo).get("port").toString().equals("出口")){
							if(  (!devices.get(JSON.parseObject(sourceInfo).get("id")).get("type").equals("devs.MyInsump"))&&( !devices.get(JSON.parseObject(sourceInfo).get("id")).get("type").equals("devs.MyOutpool")))
							A_matrix[nodeNo.get(tid)-1][graphNo.get(sid)-1] = -1;
							
						}else if(JSON.parseObject(sourceInfo).get("port").toString().equals("进口")) {
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
			System.out.println("我是row:"+row);
			System.out.println("我是col:"+col);
			System.out.println("我是connectOneNodeDeivce:"+connectOneNodeDeivce);
			System.out.println("我是A_matrix:"+A_matrix);
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
/***************************以上是验证拓扑的*******************************************/	
	//查找根节点
	public int find(int x)                        
	{ 
	    int r=x;
	  //返回根节点 r
	    while ( father[r ] != r ) 
	          r=father[r ];
	    int i=x , j ;
	    //路径压缩
	    while( i != r )                        
	    {
	         j = father[ i ]; // 在改变上级之前用临时变量  j 记录下他的值 
	         father[ i ]= r ; //把上级改为根节点
	         i=j;
	    }
	    return r ;
	}
	//判断x y是否连通，    
	//如果已经连通，就不用管了 //如果不连通，就把它们所在的连通分支合并起,
	public void join(int x,int y)                                                                                      
	
	{
	    int fx=find(x),fy=find(y);
	    if(fx!=fy)
	        father[fx ]=fy;
	}
/********************以上验证拓扑用到的并查集*******************************************/	
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
