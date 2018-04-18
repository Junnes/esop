package com.eb.esop.common.cache;

import java.util.Map;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import com.eb.esop.common.annotation.EnumCache;
import com.eb.esop.common.exception.InitFrameworkException;
import com.eb.esop.common.model.ErrorCode;

@Component
public class CacheBeanContext implements ApplicationContextAware{
	
	private ApplicationContext applicationContext;
	
	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.applicationContext = applicationContext;
		refreshCache();
	}
	
	@SuppressWarnings("rawtypes")
	private void refreshCache() {
		Map<String, Cache> map = this.applicationContext.getBeansOfType(Cache.class);
		int enumCacheCnt = 0;
		for(String key : map.keySet()) {
			map.get(key).init();
			if(isEnumCache(map.get(key))) {
				enumCacheCnt ++;
			}
		}
		
		if(enumCacheCnt > 1) {
			throw new InitFrameworkException(ErrorCode.ENUM_CACHE_NOT_UNIQUE);
		}
	}

	private boolean isEnumCache(Cache<?> cache) {
		return cache.getClass().getAnnotation(EnumCache.class) != null;
	}
	
}