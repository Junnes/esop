package com.eb.esop.common.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.eb.esop.common.annotation.DateFormat;

/**
* @author Created by tools
* @since 2017-12-26 12:01:52
*/
@Entity
@Table(name = "SMALL_CUSTOMER", schema = "pig", catalog = "")
public class SmallCustomer implements Serializable {
	private static final long serialVersionUID = 1L;
	
	public static final String FIELD_CUSTOM_NAME = "customName";
	public static final String FIELD_CUSTOM_ID = "customId";
	public static final String FIELD_CREATE_TIME = "createTime";
	public static final String FIELD_CUSTOM_TYPE = "customType";
	public static final String FIELD_STATUS = "status";
	public static final String FIELD_CUSTOM_LADER_NAME = "customLaderName";
	
	private String customName;
	private Long customId;
	private Date createTime;
	private Integer customType;
	private boolean status;
	private String customLaderName;
	
	@Id
	@Column(name = "CUSTOM_ID", nullable = false, precision = 0)
	public Long getCustomId() {
		return customId;
	}
	
	public void setCustomId(Long customId) {
		this.customId = customId;
	}
	
	@Basic
	@Column(name = "CUSTOM_NAME", nullable = true, length = 200)
	public String getCustomName() {
		return customName;
	}
	
	public void setCustomName(String customName) {
		this.customName = customName;
	}
	
	@Basic
	@Column(name = "CREATE_TIME")
	@DateFormat
	public Date getCreateTime() {
		return createTime;
	}
	
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	@Basic
	@Column(name = "CUSTOM_TYPE")
	public Integer getCustomType() {
		return customType;
	}
	
	public void setCustomType(Integer customType) {
		this.customType = customType;
	}
	
	@Basic
	@Column(name = "STATUS")
	public boolean getStatus() {
		return status;
	}
	
	public void setStatus(boolean status) {
		this.status = status;
	}
	
	@Basic
	@Column(name = "CUSTOM_LADER_NAME")
	public String getCustomLaderName() {
		return customLaderName;
	}
	
	public void setCustomLaderName(String customLaderName) {
		this.customLaderName = customLaderName;
	}

	public void merge(SmallCustomer smallCustomer) {
		setCustomLaderName(smallCustomer.getCustomLaderName());
		setCustomName(smallCustomer.getCustomName());
		setCustomType(smallCustomer.getCustomType());
		setStatus(smallCustomer.getStatus());
	}
	
}