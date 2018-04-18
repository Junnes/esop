package com.eb.esop.common.exception;

import com.eb.esop.common.model.ErrorCode;

public class BusinessException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	
	private ErrorCode errorCode;

	public BusinessException() {
		super();
	}

	public BusinessException(String message) {
		super(message);
	}

	public BusinessException(String message, Throwable cause) {
		super(message, cause);
	}

	public BusinessException(Throwable cause) {
		super(cause);
	}
	
	public BusinessException(ErrorCode errorCode) {
		super('['+errorCode.getStatus()+']'+errorCode.getMessage());
		this.errorCode = errorCode;
	}
	
	public ErrorCode getErrorCode() {
		return errorCode;
	}
}
