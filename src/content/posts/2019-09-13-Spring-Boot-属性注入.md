---
title: "Spring Boot学习笔记①：属性注入"
date: "2019-09-13T14:50:00.000Z"
description: "Spring Boot属性注入第一种方式注解@Configeration @EableConfigurationProperties() @Bean @ConfigurationProperties(profix = \"\"//前缀名) @Data //@Getter和@Setter等注解的组合，他可"
legacyPath: "2019/09/13/Spring-Boot-属性注入"
tags:
  - "Spring Boot"
tagSlugs:
  - "Spring-Boot"
---
# Spring Boot属性注入

## 第一种方式

## 注解

```
@Configeration
@EableConfigurationProperties()
@Bean
@ConfigurationProperties(profix = ""//前缀名)
@Data
//@Getter和@Setter等注解的组合，他可以自动生成get、set、hashcode、toString、构造，在编译的时候就产生，而不是在运行的时候才会声称这些方法
```

## 配置文件application.properties

-   必须命名为application

```
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/o2o
jdbc.username=root
jdbc.password=root
```

或者

```
jdbc:
	driver: com.mysql.jdbc.Driver
	url: jdbc:mysql://localhost:3306/o2o
	username: root
	password: root
	//可以定义集合
	user:
		name: jack
		age: 21
		language:
			- java
			- php
			- ios
```

**如果两个文件都有，取它们的并集，如果有冲突，以properties为准**

## 类JdbcProperties.java配置属性

```
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "jdbc")//配置前缀名为jdbc的属性，给类中有set方法的属性赋值
@Data //自动生成get，set，tostring，构造方法
public class JdbcProperties {
    String url;
    String driver;
    String username;
    String password;
}
```

## 类JdbcConfigure.java使用属性

```
import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
@EnableConfigurationProperties(JdbcProperties.class)、
//注入配置属性，使用括号中的类中的属性
//注入之后在此类中的任何位置都可以使用
public class JdbcConfig {
    @Bean
    public DataSource dataSource(JdbcProperties prop) {
        DruidDataSource druidDataSource = new DruidDataSource();
        druidDataSource.setDriverClassName(prop.getDriver());
        druidDataSource.setUrl(prop.getUrl());
        druidDataSource.setUsername(prop.getUsername());
        druidDataSource.setPassword(prop.getPassword());

        return druidDataSource;
    }
}
```

## 第二种方式

-   不需要JdbcProperties.java
-   第二种方式要注意application.yaml中的属性名称要和规定的一样，不能自己定义

## 类JdbcConfigure.java使用属性

```
import com.alibaba.druid.pool.DruidDataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class JdbcConfig {
    /**
    @Bean
    public DataSource dataSource(JdbcProperties prop) {
        DruidDataSource druidDataSource = new DruidDataSource();
        druidDataSource.setDriverClassName(prop.getDriver());
        druidDataSource.setUrl(prop.getUrl());
        druidDataSource.setUsername(prop.getUsername());
        druidDataSource.setPassword(prop.getPassword());

        return druidDataSource;
    }
    **/
    @Bean
    @ConfigurationProperties(profix = "jdbc")
    public DataSource dataSource(JdbcProperties prop) {
        return new DruidDataSource();
    }
    
}
```
