package com.eb.esop.common.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({
	ElementType.FIELD,
	ElementType.METHOD
})
public @interface EnumField {
	public String table() default "";
	public String column() default "";
}
