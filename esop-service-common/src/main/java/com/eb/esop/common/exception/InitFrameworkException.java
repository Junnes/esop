package com.eb.esop.common.exception;

import com.eb.esop.common.model.ErrorCode;

public class InitFrameworkException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	
	private ErrorCode errorCode;

	public InitFrameworkException() {
		super();
	}

	public InitFrameworkException(String message) {
		super(message);
	}

	public InitFrameworkException(String message, Throwable cause) {
		super(message, cause);
	}

	public InitFrameworkException(Throwable cause) {
		super(cause);
	}
	
	public InitFrameworkException(ErrorCode errorCode) {
		super('['+errorCode.getStatus()+']'+errorCode.getMessage());
		this.errorCode = errorCode;
	}
	
	public ErrorCode getErrorCode() {
		return errorCode;
	}
}
