package com.eb.esop.common.entity;

import java.io.Serializable;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.eb.esop.common.annotation.BindField;
import com.eb.esop.common.annotation.EnumText;
import com.eb.esop.common.annotation.EnumValue;

/**
* @author Created by tools
* @since 2018-01-04 16:53:22
*/
@Entity
@Table(name = "SYS_ENUM_DATA")
public class SysEnumData implements Serializable {
	private static final long serialVersionUID = 1L;
	
	public static final String FIELD_TABLE_NAME = "tableName";
	public static final String FIELD_ENUM_TEXT = "enumText";
	public static final String FIELD_COL_NAME = "colName";
	public static final String FIELD_ENUM_VAL = "enumVal";
	
	private String tableName;
	private String enumText;
	private String colName;
	private Integer enumVal;
	private Long id;
	
	@Id
	@Column(name = "ID")
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Basic
	@Column(name = "TABLE_NAME")
	public String getTableName() {
		return tableName;
	}
	
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	
	@Basic
	@Column(name = "ENUM_TEXT")
	@BindField("text")
	@EnumText
	public String getEnumText() {
		return enumText;
	}
	
	public void setEnumText(String enumText) {
		this.enumText = enumText;
	}
	
	@Basic
	@Column(name = "COL_NAME")
	public String getColName() {
		return colName;
	}
	
	public void setColName(String colName) {
		this.colName = colName;
	}
	
	@Basic
	@Column(name = "ENUM_VAL")
	@BindField("value")
	@EnumValue
	public Integer getEnumVal() {
		return enumVal;
	}
	
	public void setEnumVal(Integer enumVal) {
		this.enumVal = enumVal;
	}
	
}