package com.eb.esop.common.model;

public class Holder<T>{

	private T data;
	
	public Holder() {
		
	}
	
	public Holder(T data) {
		this.data = data;
	}
	
	public Object getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}
}
