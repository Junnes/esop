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
import com.eb.esop.common.entity.SmallEmployee;
import com.eb.esop.common.exception.BusinessException;
import com.eb.esop.common.model.AjaxResult;
import com.eb.esop.common.model.ErrorCode;
import com.eb.esop.service.demo.model.SmallEmployeeQueryParam;
import com.eb.esop.service.demo.service.MyDemoService;

@RestController
public class MyDemoController {

    @Autowired
    private DiscoveryClient client1;

    @Autowired
    private MyDemoService mydemoService;

   /* @SuppressWarnings("deprecation")
    @RequestMapping(value="/hello",method = RequestMethod.GET)
    public String hello(){
        ServiceInstance instance = client1.getLocalServiceInstance();
        return instance.getHost()+":"+instance.getPort()+"  hello world";
    }*/
  
    @PostMapping("/loadSmallEmployee")
    public Page<SmallEmployee> loadSmallEmployee(SmallEmployeeQueryParam queryParam){
    	System.out.println("---------------------**********************");
    	return mydemoService.loadSmallEmployee(queryParam);
    }
    @PostMapping("/deleteSmallEmployee")
    public Object deleteSmallEmployee(Long id){
    	mydemoService.deleteSmallEmployee(id);
    	return AjaxResult.success("success");
    }
    @PostMapping("/addSmallEmployee")
    public Object addSmallEmployee(SmallEmployee employee){
    	System.out.println("++++：     "+employee);
        mydemoService.addSmallEmployee(employee);
        return  AjaxResult.success("success");
    }
    
    @PostMapping("/findEmployeeId")
    public SmallEmployee findId(Long id){
    	return mydemoService.findId(id);
    }
    @PostMapping("/updateSmallEmployee")
    public Object updateSmallCustomer(SmallEmployee employee){
    	 mydemoService.updateSmallCustomer(employee);
    	 return AjaxResult.success("success");
    }
    /*@PostMapping("/exception")
    public Page<SmallEmployee> throwException(){
    	throw new BusinessException(ErrorCode.CUSTOMER_INFO_NOT_FOUND);
    }*/
}
