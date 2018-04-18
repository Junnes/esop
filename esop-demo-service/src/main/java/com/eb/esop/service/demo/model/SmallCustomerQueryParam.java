package com.eb.esop.service.demo.model;

import java.util.Date;

public class SmallCustomerQueryParam {

	private Long customId;
	private String customName;
	private String customLaderName;
	private Date date;
	private int page;
	private int pageSize;

	public Long getCustomId() {
		return customId;
	}

	public void setCustomId(Long customId) {
		this.customId = customId;
	}

	public String getCustomName() {
		return customName;
	}

	public void setCustomName(String customName) {
		this.customName = customName;
	}

	public String getCustomLaderName() {
		return customLaderName;
	}

	public void setCustomLaderName(String customLaderName) {
		this.customLaderName = customLaderName;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

}
