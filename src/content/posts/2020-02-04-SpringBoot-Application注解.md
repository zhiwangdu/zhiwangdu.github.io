---
title: "@SpringBootApplication注解"
date: "2020-02-04T06:38:27.000Z"
description: "org.springframework.boot @Target({ElementType.TYPE})@Retention(RetentionPolicy.RUNTIME)@Documented@Configurationpublic interface SpringBootConfigurati"
legacyPath: "2020/02/04/SpringBoot-Application注解"
tags:
  - "Spring Boot"
tagSlugs:
  - "Spring-Boot"
---
> org.springframework.boot @Target({ElementType.TYPE})  
> @Retention(RetentionPolicy.RUNTIME)  
> @Documented  
> @Configuration  
> public interface SpringBootConfiguration  
> extends annotation.Annotation

> Indicates a configuration class that declares one or more @Bean methods and also triggers auto-configuration and component scanning. This is a convenience annotation that is equivalent to declaring @Configuration, @EnableAutoConfiguration and @ComponentScan

## @SpringBootConfiguration

> org.springframework.boot @Target(ElementType.TYPE)  
> @Retention(RetentionPolicy.RUNTIME)  
> @Documented  
> @Configuration  
> public interface SpringBootConfiguration  
> extends annotation.Annotation

> Indicates that a class provides Spring Boot application @Configuration. Can be used as an alternative to the Spring’s standard @Configuration annotation so that configuration can be found automatically (for example in tests).  
> Application should only ever include one @SpringBootConfiguration and most idiomatic Spring Boot applications will inherit it from @SpringBootApplication.

### @Configuration

> Indicates that a class declares one or more @Bean methods and may be processed by the Spring container to generate bean definitions and service requests for those beans at runtime,

for example

```
@Configuration
   public class AppConfig {
  
       @Bean
       public MyBean myBean() {
           // instantiate, configure and return bean ...
       }
   }
```

## @EnableAutoConfiguration

## @ComponentScan
