package com.eb.esop.common.component;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import com.eb.esop.common.annotation.DateFormat;
import com.eb.esop.common.annotation.EnumCache;
import com.eb.esop.common.annotation.EnumField;
import com.eb.esop.common.annotation.RowId;
import com.eb.esop.common.cache.Cache;
import com.eb.esop.common.util.DateUtil;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

import javassist.Modifier;

public class TableComp extends ComponentAdapter {
	private Log logger = LogFactory.getLog(TableComp.class);

	@Override
	protected Object innerConvert() {//处理分页数据转换为前台table组件需要的数据格式
		List<?> list = ((PageImpl<?>)obj).getContent();
		List<List<Map<String, String>>> tableContent = Lists.newArrayList();
		for(Object o : list) {
			Class<?> clazz = o.getClass();
			Field[] fields = clazz.getDeclaredFields();
			List<Map<String, String>> rowContent = Lists.newArrayList();
			String rowId = null;
			Map<String, String> colContent = null;
			for(Field field : fields) {
				if("serialVersionUID".equals(field.getName()) || Modifier.isFinal(field.getModifiers())) {
					continue;
				}
				Object val = null;
				try {
					field.setAccessible(true);
					val = field.get(o);
				} catch (IllegalArgumentException | IllegalAccessException e) {
					logger.error("pageImpl class responseBody translate happened error:", e);
				}

				//为了获取get方法
				PropertyDescriptor pd = null;
				try {
					pd = new PropertyDescriptor(field.getName(), clazz);
				} catch (IntrospectionException e) {
					logger.warn("pageImpl class responseBody translate happened error:", e);
				}
				
				String value = null;
				if(val == null) {
					value = "";
				} else if(val.getClass().isPrimitive() || val instanceof Number || val instanceof Boolean) {
					if(val instanceof Byte || val instanceof Short || val instanceof Integer || val instanceof Long
							|| val instanceof BigInteger) {
						value = intFormatter.format(val);
					} else if(val instanceof Float || val instanceof Double || val instanceof BigDecimal) {
						value = decimalFormatter.format(val);
					} else if(val instanceof Boolean || val instanceof Character) {
						value = val.toString();
					} else {
						value = val.toString();
					}
					
					//处理枚举转换
					if(val instanceof Number || val instanceof Boolean) {
						String tableName = null;
						String colName = null;
						if(field.getAnnotation(EnumField.class) != null) {
							tableName = field.getAnnotation(EnumField.class).table();
							colName = field.getAnnotation(EnumField.class).column();
							if(StringUtils.isBlank(tableName) || StringUtils.isBlank(colName)) {
								String[] config = entityDefault(pd, clazz, field);
								tableName = config[0];
								colName = config[1];
							}
						} else if(pd != null && pd.getReadMethod().getAnnotation(EnumField.class) != null) {
							tableName = pd.getReadMethod().getAnnotation(EnumField.class).table();
							colName = pd.getReadMethod().getAnnotation(EnumField.class).column();
							if(StringUtils.isBlank(tableName) || StringUtils.isBlank(colName)) {
								String[] config = entityDefault(pd, clazz, field);
								tableName = config[0];
								colName = config[1];
							}
						}
						
						if(!StringUtils.isBlank(tableName) && !StringUtils.isBlank(colName)) {
							String[] enumCacheBeans = applicationContext.getBeanNamesForAnnotation(EnumCache.class);
							if(enumCacheBeans.length != 0) {
								Cache<?> enumCache = (Cache<?>) applicationContext.getBean(enumCacheBeans[0]);
								String text = enumCache.getText(StringUtils.join(Lists.newArrayList(tableName, colName), '_'),
										val instanceof Number ? ((Number) val).intValue() : (((Boolean)val)?1:0));
								if(text != null) {
									value = text;
								}
							}
						}
					}
					
				} else if(val instanceof Date){
					//时间类型的字段，默认格式为yyyy-MM-dd HH:mm:ss, 可以在对应实体字段上加注解@DateFormat来定义输出格式
					String formatter = DateUtil.BASE_FORMAT;
					if(field.getAnnotation(DateFormat.class) != null) {
						formatter = field.getAnnotation(DateFormat.class).format();
					}
					if(pd != null && pd.getReadMethod().getAnnotation(DateFormat.class) != null) {
						formatter = pd.getReadMethod().getAnnotation(DateFormat.class).format();
					}
					dateFormatter.applyPattern(formatter);
					value = dateFormatter.format(val);
				} else {
					value = val.toString();
				}
				//对于table组件，每行记录需要有一个id标识，目前支持两种：1.用户自己传rowId字段  2.对应实体内有@Id或@RowId注解
				if("rowId".equalsIgnoreCase(field.getName()) || field.getAnnotation(Id.class) != null
						|| (pd != null && pd.getReadMethod().getAnnotation(Id.class) != null)
						|| field.getAnnotation(RowId.class) != null
						|| (pd != null && pd.getReadMethod().getAnnotation(RowId.class) != null)) {
					rowId = value;
				}
				colContent = Maps.newHashMap();
				colContent.put("colId", field.getName());
				colContent.put("value", value);
				rowContent.add(colContent);
			}
			
			if(!StringUtils.isBlank(rowId)) {
				for(Map<String, String> col : rowContent) {
					col.put("rowId", rowId);
				}
			}
			
			tableContent.add(rowContent);
		}
		PageRequest pageRequest = new PageRequest(((PageImpl<?>) obj).getNumber(), ((PageImpl<?>) obj).getSize(), ((PageImpl<?>) obj).getSort());
		return new PageImpl<>(tableContent, pageRequest, ((PageImpl<?>) obj).getTotalElements());
	}

	private String[] entityDefault(PropertyDescriptor pd, Class<?> clazz, Field field) {
		String tableName = null;
		String colName = null;
		Table tableAnno = null;
		Column columnAnno = null;
		if(StringUtils.isBlank(tableName) && (tableAnno = clazz.getAnnotation(Table.class)) != null) {
			tableName = tableAnno.name();
		}
		if(StringUtils.isBlank(colName) && ((columnAnno = field.getAnnotation(Column.class)) != null
				|| (pd != null && (columnAnno = pd.getReadMethod().getAnnotation(Column.class)) != null))) {
			colName = columnAnno.name();
		}
		
		return new String[]{tableName, colName};
	}

}
