package com.eb.esop.service.demo.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.eb.esop.common.entity.SmallCustomer;
import com.eb.esop.common.exception.BusinessException;
import com.eb.esop.common.model.AjaxResult;
import com.eb.esop.common.model.ErrorCode;
import com.eb.esop.service.demo.model.SmallCustomerQueryParam;
import com.eb.esop.service.demo.service.DemoService;

@RestController
public class DemoController {

    @Autowired
    private DiscoveryClient client;

    @Autowired
    private DemoService demoService;
    
    @SuppressWarnings("deprecation")
	@RequestMapping(value="/hello",method = RequestMethod.GET)
    public String hello(){
        ServiceInstance instance = client.getLocalServiceInstance();
        return instance.getHost()+":"+instance.getPort()+"  hello world";
    }
    
    

    
    
    @PostMapping("/loadSmallCustomer")
    public Page<SmallCustomer> loadSmallCustomer(SmallCustomerQueryParam queryParam){
    	System.out.println("---------------------**********************");
    	return demoService.loadSmallCustomer(queryParam);
    }
    @PostMapping("/deleteSmallCustomer")
    public Object deleteSmallCustomer(Long id){
    	demoService.deleteSmallCustomer(id);
    	return AjaxResult.success("success");
    }
    @PostMapping("/addSmallCustomer")
    public Object addSmallCustomer(SmallCustomer customer){
    	System.out.println("++++：     "+customer);
        demoService.addSmallCustomer(customer);
        return  AjaxResult.success("success");
    }
    @PostMapping("/updateSmallCustomer")
    public Object updateSmallCustomer(SmallCustomer customer){
    	demoService.updateSmallCustomer(customer);
    	 return  AjaxResult.success("success");
    }
    
    @PostMapping("/findCustomerId")
    public SmallCustomer findId(Long id){
    	return demoService.findId(id);
    }
    
    @PostMapping("/exception")
    public Page<SmallCustomer> throwException(){
    	throw new BusinessException(ErrorCode.CUSTOMER_INFO_NOT_FOUND);
    }
}
