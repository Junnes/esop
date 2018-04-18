package com.eb.esop.common.model;

public enum ErrorCode {

	SUCCESS("0000", "请求成功"),
	ERROR("0001", "请求失败"),
	
	CUSTOMER_INFO_NOT_FOUND("1001","客户信息不存在"),
	EMPLOYEE_INFO_NOT_FOUND("1001","客户信息不存在"),
	
	/**
	 * 框架异常编码 8XXX
	 */
	ENUM_CACHE_NOT_UNIQUE("8000", "枚举缓存实现类最多存在一个"),
	METHOD_NOT_SUPPORT("8001", "当前实现类不支持该方法"),
	
	SIGN_WRONG("9995", "签名错误"),
	NOAUTH_REQ("9996", "非法请求"),
	CONNECT_TIMEOUT("9997", "连接超时"),
	POOR_URL("9998", "不合法的URL"),
	UNKNOW("9999", "未知异常");
	
	
	private String status;
	private String message;

	private ErrorCode(String status, String message) {
		this.status = status;
		this.message = message;
	}

	public String getStatus() {
		return status;
	}

	public String getMessage() {
		return message;
	}

	public String getMessage(String[] args) {
		int index = 0;
		String tempMsg = message;
		for(String arg : args) {
			tempMsg=tempMsg.replace("{"+index+++"}", arg);
		}
		return tempMsg;
	}

}
