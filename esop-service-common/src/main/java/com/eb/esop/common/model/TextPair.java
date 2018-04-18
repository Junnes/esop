package com.eb.esop.common.model;

import java.io.Serializable;

public class TextPair implements Serializable {

	private static final long serialVersionUID = 1L;

	private String text;
	private String value;

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
