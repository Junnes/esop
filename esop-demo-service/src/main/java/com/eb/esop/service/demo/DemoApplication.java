package com.eb.esop.service.demo;

import java.util.Date;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.core.convert.converter.Converter;

import com.eb.esop.common.convert.DateConvert;

@EnableDiscoveryClient
@EntityScan(basePackages = "com.eb.esop.common")
@SpringBootApplication(scanBasePackages = { "com.eb.esop.common", "com.eb.esop.service.demo" })
public class DemoApplication {

	@Bean
	public Converter<String, Date> dateConvert() {
		return new DateConvert();
	}

	public static void main(String[] args) {
		
		SpringApplication.run(DemoApplication.class, args);
	}
}
