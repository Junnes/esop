package com.eb.esop.common.component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.data.domain.PageImpl;

import com.eb.esop.common.annotation.Component;
import com.eb.esop.common.model.Holder;

public class ComponentFactory {
	
	private static Map<Class<?>, ComponentAdapter> componentAdapterMap = new HashMap<>(10); 

	public static ComponentAdapter get(ApplicationContext applicationContext, Component componentAnno, Object body) {
		ComponentAdapter adapter = null;
		if(body == null) {
			adapter = componentAdapterMap.get(NullComp.class);
		} if(body instanceof PageImpl) {//处理分页数据转换为前台table组件需要的数据格式
			adapter = componentAdapterMap.get(TableComp.class);
		} else if(body instanceof List && componentAnno != null && "select".equals(componentAnno.value())){
			adapter = componentAdapterMap.get(SelectComp.class);
		} else if(body instanceof Holder){
			adapter = componentAdapterMap.get(HolderComp.class);
		} else {
			adapter = componentAdapterMap.get(OtherComp.class);
		}
		
		adapter.setObj(body);
		adapter.setApplicationContext(applicationContext);
		return adapter;
	}
	
	static {
		componentAdapterMap.put(TableComp.class, new TableComp());
		componentAdapterMap.put(HolderComp.class, new HolderComp());
		componentAdapterMap.put(SelectComp.class, new SelectComp());
		componentAdapterMap.put(NullComp.class, new NullComp());
		componentAdapterMap.put(OtherComp.class, new OtherComp());
	}
}
