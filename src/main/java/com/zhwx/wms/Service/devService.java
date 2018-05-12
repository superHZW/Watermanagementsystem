package com.zhwx.wms.Service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;

import com.zhwx.wms.dao.IntakesumpMapper;
import com.zhwx.wms.dao.OutpoolMapper;
import com.zhwx.wms.dao.PipeMapper;
import com.zhwx.wms.dao.ValveMapper;
import com.zhwx.wms.entity.Intakesump;

public class devService {
	@Autowired
	public PipeMapper pm;
	@Autowired
	public IntakesumpMapper im;
	@Autowired
	public OutpoolMapper om;
	@Autowired
	public ValveMapper vm;
	public ArrayList fetAllDev() {
		
		String devType = "devs.MyInsump";
		ArrayList al = null;
		//根据类型查询不同的表
		if(devType.equals("devs.Mypipe")) al = pm.selectAll();
		else if(devType.equals("devs.MyInsump"))al = im.selectAll();
		else if(devType.equals("devs.MyOutpool"))al = om.selectAll();
		else {
			if(devType.equals("devs.MyValuen"))al = vm.selectByType("valve_n");
			else if(devType.equals("devs.MyValuef"))al = vm.selectByType("valve_f"); 
			else if(devType.equals("devs.MyValueb"))al = vm.selectByType("valve_b");
		}
		
		System.out.println(  ((Intakesump)al.get(0)).getDeviceName()  );
		return al;
	}
	
	
	
	
	
	
	
	

	
	
}
