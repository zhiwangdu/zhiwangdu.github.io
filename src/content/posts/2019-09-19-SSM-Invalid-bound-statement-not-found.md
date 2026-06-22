---
title: "SSM-Invalid bound statement (not found)"
date: "2019-09-19T07:34:29.000Z"
description: "Invalid bound statement (not found)org.apache.ibatis.binding.BindingException: Invalid bound statement (not found): com.shopssm.dao.IShopDao.insertSho"
legacyPath: "2019/09/19/SSM-Invalid-bound-statement-not-found"
tags:
  - "SSM框架"
tagSlugs:
  - "SSM框架"
---
# Invalid bound statement (not found)

```
org.apache.ibatis.binding.BindingException: Invalid bound statement (not found): com.shopssm.dao.IShopDao.insertShop
```

## 问题分析

-   SQL语句有没有写错，没有问题。
-   方法名称与映射器接口是否一致，没有问题。
-   配置文件中的路径，发现映射器配置出错。

## 解决

将sping-dao.xml中的配置进行更正

```
<!--映射器-->
        <property name="mapperLocations" value="classpath:mapper/AreaMapper.xml"/>
```

改为

```
<!--映射器-->
        <property name="mapperLocations" value="classpath:mapper/*Mapper.xml"/>
```

问题解决。
