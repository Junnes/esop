package com.eb.esop.common.interceptor;

import java.util.Map;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import com.eb.esop.common.annotation.Component;
import com.eb.esop.common.annotation.Ignore;
import com.eb.esop.common.component.ComponentAdapter;
import com.eb.esop.common.component.ComponentFactory;
import com.eb.esop.common.exception.BusinessException;
import com.eb.esop.common.model.AjaxResult;
import com.eb.esop.common.model.ErrorCode;

@ControllerAdvice
public class ResponseBodyInterceptor implements ResponseBodyAdvice<Object>, ApplicationContextAware {
	private ApplicationContext applicationContext;

	@Override
	public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
		return true;
	}

	@Override
	public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType,
			Class<? extends HttpMessageConverter<?>> selectedConverterType, ServerHttpRequest request, ServerHttpResponse response) {
		Object newBody = body;
		
		//是否忽略封装返回值
		Ignore ignoreAnno = returnType.getMethodAnnotation(Ignore.class);
		//组件类型-转换对应数据结构
		Component componentAnno = returnType.getMethodAnnotation(Component.class);
		
		//保证http请求正常返回
		response.setStatusCode(HttpStatus.OK);
		
		if(body instanceof Map && BusinessException.class.getName().equals(((Map<?, ?>) body).get("exception"))){//业务异常
			return AjaxResult.fail(String.valueOf(((Map<?, ?>) body).get("message")));
		} else if(body instanceof Map && ((Map<?, ?>) body).containsKey("exception")){//业务异常
			return AjaxResult.error(ErrorCode.ERROR);
		} else if(body instanceof String){
			return AjaxResult.successJson(newBody);
		}
		
		//获得组件转换器
		ComponentAdapter componentAdapter = ComponentFactory.get(applicationContext, componentAnno, body);
		newBody = componentAdapter.convert();
		
		return ignoreAnno == null ? AjaxResult.success(newBody) : newBody;
	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.applicationContext = applicationContext;
	}

}
