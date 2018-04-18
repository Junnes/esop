package com.eb.esop.service.demo.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.eb.esop.common.entity.SmallCustomer;
import com.eb.esop.common.entity.SmallEmployee;
import com.eb.esop.common.exception.BusinessException;
import com.eb.esop.common.model.ErrorCode;
import com.eb.esop.service.demo.model.SmallEmployeeQueryParam;
import com.eb.esop.service.demo.repository.MyDemoPersonRepository;




@Service
public class MyDemoService {
    
	@Resource
	private MyDemoPersonRepository demoPersonRepository1;
	
	public Page<SmallEmployee> loadSmallEmployee(SmallEmployeeQueryParam queryParam) {
		return demoPersonRepository1.findAll(new Specification<SmallEmployee>() {

			@Override
			public Predicate toPredicate(Root<SmallEmployee> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> list = new ArrayList<Predicate>();

				if(queryParam != null) {
					if (queryParam.getEmployeeId() != null) {
						list.add(cb.equal(root.get(SmallEmployee.FIELD_EMPLOYEE_ID).as(Long.class), queryParam.getEmployeeId()));
					}
					
					if (!StringUtils.isBlank(queryParam.getEmployeeName())) {
						list.add(cb.like(root.get(SmallEmployee.FIELD_EMPLOYEE_NAME).as(String.class), "%"+queryParam.getEmployeeName()+"%"));
					}
					
					if (!StringUtils.isBlank(queryParam.getDepartmentName())) {
						list.add(cb.like(root.get(SmallEmployee.FIELD_DEPARTMENT_NAME).as(String.class), "%"+queryParam.getDepartmentName()+"%"));
					}
				}

				Predicate[] p = new Predicate[list.size()];
				return cb.and(list.toArray(p));
			}

		}, new PageRequest(queryParam.getPage(), queryParam.getPageSize()));
	}
	
	public void deleteSmallEmployee(Long employeeId){
		SmallEmployee smallEmployee = demoPersonRepository1.getOne(employeeId);
		if(smallEmployee != null) {
			demoPersonRepository1.delete(smallEmployee);
		}
	}
	
	public SmallEmployee addSmallEmployee(SmallEmployee smallEmployee){
		return demoPersonRepository1.save(smallEmployee);
	}
	
	public SmallEmployee updateSmallCustomer(SmallEmployee smallEmployee){
		SmallEmployee oldEmployee = demoPersonRepository1.getOne(smallEmployee.getEmployeeId());
		if(oldEmployee == null) {
			throw new BusinessException(ErrorCode.EMPLOYEE_INFO_NOT_FOUND);
		}
		oldEmployee.merge(smallEmployee);
		return demoPersonRepository1.save(oldEmployee);
	}
	 public SmallEmployee findId(Long id){
	    	return demoPersonRepository1.findOne(id);
	    }
}
