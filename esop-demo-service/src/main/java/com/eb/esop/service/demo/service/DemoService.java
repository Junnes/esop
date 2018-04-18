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
import com.eb.esop.common.entity.SysEnumData;
import com.eb.esop.common.exception.BusinessException;
import com.eb.esop.common.model.ErrorCode;
import com.eb.esop.service.demo.model.SmallCustomerQueryParam;
import com.eb.esop.service.demo.repository.DemoPersonRepository;
import com.eb.esop.service.demo.repository.SysEnumDataRepository;

@Service
public class DemoService {

	@Resource
	private DemoPersonRepository demoPersonRepository;
	@Resource
	private SysEnumDataRepository sysEnumDataRepository;

	public Page<SmallCustomer> loadSmallCustomer(SmallCustomerQueryParam queryParam) {
		return demoPersonRepository.findAll(new Specification<SmallCustomer>() {

			@Override
			public Predicate toPredicate(Root<SmallCustomer> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> list = new ArrayList<Predicate>();

				if(queryParam != null) {
					if (queryParam.getCustomId() != null) {
						list.add(cb.equal(root.get(SmallCustomer.FIELD_CUSTOM_ID).as(Long.class), queryParam.getCustomId()));
					}
					
					if (!StringUtils.isBlank(queryParam.getCustomName())) {
						list.add(cb.like(root.get(SmallCustomer.FIELD_CUSTOM_NAME).as(String.class), "%"+queryParam.getCustomName()+"%"));
					}
					
					if (!StringUtils.isBlank(queryParam.getCustomLaderName())) {
						list.add(cb.like(root.get(SmallCustomer.FIELD_CUSTOM_LADER_NAME).as(String.class), "%"+queryParam.getCustomLaderName()+"%"));
					}
				}

				Predicate[] p = new Predicate[list.size()];
				return cb.and(list.toArray(p));
			}

		}, new PageRequest(queryParam.getPage(), queryParam.getPageSize()));
	}
	
	public void deleteSmallCustomer(Long customId){
		SmallCustomer smallCustomer = demoPersonRepository.getOne(customId);
		if(smallCustomer != null) {
			demoPersonRepository.delete(smallCustomer);
		}
	}
	
	public SmallCustomer addSmallCustomer(SmallCustomer smallCustomer){
		return demoPersonRepository.save(smallCustomer);
	}
	
	public SmallCustomer updateSmallCustomer(SmallCustomer smallCustomer){
		SmallCustomer oldCustomer = demoPersonRepository.getOne(smallCustomer.getCustomId());
		if(oldCustomer == null) {
			throw new BusinessException(ErrorCode.CUSTOMER_INFO_NOT_FOUND);
		}
		oldCustomer.merge(smallCustomer);
		return demoPersonRepository.save(smallCustomer);
		
	}
	 public SmallCustomer findId(Long id){
	    	return demoPersonRepository.findOne(id);
	    }
	
	public List<SysEnumData> loadAllEnum() {
		return sysEnumDataRepository.findAll();
	}
}
