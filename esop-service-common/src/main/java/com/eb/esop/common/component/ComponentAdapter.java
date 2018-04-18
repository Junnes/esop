package com.eb.esop.common.component;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;

import com.eb.esop.common.util.DateUtil;

public abstract class ComponentAdapter {
	
	protected DecimalFormat intFormatter = new DecimalFormat("######0");
	protected DecimalFormat decimalFormatter = new DecimalFormat("######0.00");
	protected SimpleDateFormat dateFormatter = new SimpleDateFormat(DateUtil.BASE_FORMAT);
	protected ApplicationContext applicationContext;
	
	public Object obj;

	protected abstract Object innerConvert();

	public Object convert() {
		if(obj == null) {
			return null;
		}
		return innerConvert();
	}
	
	public Object convert(Object obj) {
		this.obj = obj;
		return convert();
	}

	public void setObj(Object obj) {
		this.obj = obj;
	};
	
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.applicationContext = applicationContext;
	}
}
