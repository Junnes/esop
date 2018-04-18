package com.eb.esop.common.cache;

import java.util.List;

public interface Cache<T> {
	
	public void init();
	
	public List<T> get(String key);
	
	public String getText(String key, Integer val);
	
	public T load(String key);
	
	public void put(String key, T obj);
	
	public void put(String key, List<T> obj);
}
