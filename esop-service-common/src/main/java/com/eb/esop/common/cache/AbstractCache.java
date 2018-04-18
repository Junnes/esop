package com.eb.esop.common.cache;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.eb.esop.common.exception.BusinessException;
import com.eb.esop.common.model.ErrorCode;
import com.google.common.collect.Lists;

public abstract class AbstractCache<T> implements Cache<T> {
	private Log logger = LogFactory.getLog(AbstractCache.class);

	private Map<String, List<T>> cacheMap = new HashMap<>();
	protected String tablename;
	protected String cacheKey;

	public void initTableName() {
		this.tablename = getTableName();
	}

	public void initCacheKey() {
		this.cacheKey = getCacheKey();
	}

	/**
	 * 配置缓存对应的数据表名
	 */
	public abstract String getTableName();

	/**
	 * 配置缓存对应的key规则,以多个列组成，:分割
	 */
	public abstract String getCacheKey();

	/**
	 * 查询缓存数据
	 */
	public abstract List<?> loadCacheData();

	/**
	 * 将查询结果转换为缓存实体
	 */
	public abstract List<T> convertCache(List<?> list);

	@SuppressWarnings("unchecked")
	public void refreshCache() {
		// 查询数据
		List<?> list = loadCacheData();
		// 转换数据
		List<T> cacheList = convertCache(list);

		// 按照key划分
		String[] keys = cacheKey.split(":");
		Class<T> clazz = null;
		for (T obj : cacheList) {
			clazz = (Class<T>) obj.getClass();
			String targetKey = "";
			for (String key : keys) {
				try {
					Field field = clazz.getDeclaredField(key);
					field.setAccessible(true);
					targetKey += String.valueOf(field.get(obj)) + '_';
				} catch (Exception e) {
					logger.error("cache key is not the field of class[" + clazz.getName() + "]:", e);
				}
			}
			targetKey = targetKey.substring(0, targetKey.length()-1);
			if (cacheMap.containsKey(targetKey)) {
				cacheMap.get(targetKey).add(obj);
			} else {
				cacheMap.put(targetKey, Lists.newArrayList(obj));
			}
		}
	}

	public List<T> get(String key) {
		return cacheMap.get(key);
	}

	public T load(String key) {
		List<T> list = get(key);
		return list == null || list.isEmpty() ? null : list.get(0);
	}

	@SuppressWarnings("unchecked")
	public void put(String key, T obj) {
		if (cacheMap.containsKey(key)) {
			cacheMap.get(key).add(obj);
		} else {
			cacheMap.put(key, Lists.newArrayList(obj));
		}
	}

	public void put(String key, List<T> obj) {
		if (cacheMap.containsKey(key)) {
			cacheMap.get(key).addAll(obj);
		} else {
			cacheMap.put(key, Lists.newArrayList(obj));
		}
	}

	public String getText(String key, Integer val) {
		throw new BusinessException(ErrorCode.METHOD_NOT_SUPPORT);
	}

	public void init() {
		initTableName();
		initCacheKey();
		refreshCache();
	}
}
