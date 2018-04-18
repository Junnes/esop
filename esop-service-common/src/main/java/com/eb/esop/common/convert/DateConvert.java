package com.eb.esop.common.convert;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.convert.converter.Converter;

import com.eb.esop.common.util.DateUtil;

public class DateConvert implements Converter<String, Date>{
	private Log logger = LogFactory.getLog(DateConvert.class);
	
	private static Map<Integer, String> dateFormatMap = new HashMap<>();
	
	static {
		dateFormatMap.put(4, DateUtil.YEAR_FORMAT);
		dateFormatMap.put(6, DateUtil.SHORT_EN_FORMAT_MONTH);
		dateFormatMap.put(7, DateUtil.SHORT_FORMAT_MONTH);
		dateFormatMap.put(8, DateUtil.SHORT_FORMAT);
		dateFormatMap.put(10, DateUtil.SHORT_EN_FORMAT);
		dateFormatMap.put(12, DateUtil.MINUTE_FORMAT);
		dateFormatMap.put(14, DateUtil.EN_FORMAT_A);
		dateFormatMap.put(17, DateUtil.EN_NOSECOND_FORMAT);
		dateFormatMap.put(20, DateUtil.BASE_FORMAT);
	}
	
	@Override
	public Date convert(String source) {
		if(StringUtils.isBlank(source)) {
			return null;
		}
		SimpleDateFormat sdf = new SimpleDateFormat();
		String format = dateFormatMap.get(source.length());
		Date date = null;
		if(format != null) {
			sdf.applyPattern(format);
		}
		try {
			date = sdf.parse((String) source);
		} catch (Exception e) {
			logger.warn("spring boot request date type paramater translate happened error:", e);
			date = null;
		}
		return date;
	}
}
