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
 * 
 * @author Lwj
 *
 */
@Entity
@Table(name="SMALL_KEY_SELECT",schema="pig",catalog="")

public class SmallKeySelect implements Serializable{

	private static final long serialVersionUID = 1L;

	public static final String FIELD_KEY_SELECT_PHONE = "keyPhone";
	public static final String FIELD_KEY_SELECT_CNAME = "keyCname";
	public static final String FIELD_KEY_SELECT_DID = "keyDid";
	public static final String FIELD_KEY_SELECT_DNAME = "keyDname";
	public static final String FIELD_KEY_SELECT_IF_CONTACT = "keyIfContact";
	public static final String FIELD_KEY_SELECT_IF_PEOPLE = "keyIfPeople";
	public static final String FIELD_KEY_LEVEL = "keyLevel";
	public static final String FIELD_KEY_JOIN_TIME = "keyJoinTime";
	public static final String FIELD_KEY_TYPE = "keType";

	
	private String employeeName;
	private Long employeeId;
	private boolean gender;
	private Integer age;
	private String departmentName;
	private Date entryDate;
	

	@Id
	@Column(name = "EMPLOYEE_ID", nullable = false, precision = 0)
	public Long getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}
	
	@Basic
	@Column(name = "EMPLOYEE_NAME", nullable = true, length = 200)
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	
	
	@Basic
	@Column(name = "GENDER")
	public boolean isGender() {
		return gender;
	}
	public void setGender(boolean gender) {
		this.gender = gender;
	}
	

	@Basic
	@Column(name = "AGE")
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}
	

	@Basic
	@Column(name = "DEPARTMENT_NAME")
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	

	@Basic
	@Column(name = "ENTRY_DATE")
	@DateFormat
	public Date getEntryDate() {
		return entryDate;
	}
	public void setEntryDate(Date entryDate) {
		this.entryDate = entryDate;
	}
	

	public void merge(SmallKeySelect smallEmployee) {
		setDepartmentName(smallEmployee.getDepartmentName());
		setEmployeeName(smallEmployee.getEmployeeName());
		setAge(smallEmployee.getAge());
		setGender(smallEmployee.isGender());
	}
	
	
	
}
