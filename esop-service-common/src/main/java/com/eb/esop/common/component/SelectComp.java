package com.eb.esop.common.component;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.eb.esop.common.annotation.BindField;
import com.eb.esop.common.model.TextPair;
import com.google.common.collect.Lists;

import javassist.Modifier;

public class SelectComp extends ComponentAdapter {
	private Log logger = LogFactory.getLog(SelectComp.class);

	@Override
	protected Object innerConvert() {
		List<TextPair> list = Lists.newArrayList();
		if(!((List<?>)obj).isEmpty()) {
			TextPair textPair = null;
			for(Object object : (List<?>)obj) {
				textPair = new TextPair();
				if(object == null) {
					continue;
				} else if(object.getClass().isPrimitive()) {
					textPair.setText(object.toString());
					textPair.setValue(object.toString());
				} else {
					Class<?> entityClass = object.getClass();
					if(entityClass.isAssignableFrom(TextPair.class)) {
						break;
					}
					Field[] fields = object.getClass().getDeclaredFields();
					String bindType = null;
					for(Field field : fields) {
						if("serialVersionUID".equals(field.getName()) || Modifier.isFinal(field.getModifiers())) {
							continue;
						}
						PropertyDescriptor pd = null;
						try {
							pd = new PropertyDescriptor(field.getName(), object.getClass());
						} catch (IntrospectionException e) {
							logger.warn("pageImpl class responseBody translate happened error:", e);
						}
						bindType = null;
						if(field.getAnnotation(BindField.class) != null) {
							bindType = field.getAnnotation(BindField.class).value();
						}else if(pd != null && pd.getReadMethod().getAnnotation(BindField.class) != null) {
							bindType = pd.getReadMethod().getAnnotation(BindField.class).value();
						}

						try {
							if ("text".equals(bindType)) {
								field.setAccessible(true);
								textPair.setText(field.get(object).toString());
								textPair.setValue(StringUtils.isBlank(textPair.getValue()) ? textPair.getText() : textPair.getValue());
							} else if("value".equals(bindType)) {
								field.setAccessible(true);
								textPair.setValue(field.get(object).toString());
								textPair.setText(StringUtils.isBlank(textPair.getText()) ? textPair.getValue() : textPair.getText());
							}
						} catch (IllegalArgumentException | IllegalAccessException e) {
							logger.error("pageImpl class responseBody translate happened error:", e);
						}
					}
					
				}
				list.add(textPair);
			}
		}
		return list;
	}

}
