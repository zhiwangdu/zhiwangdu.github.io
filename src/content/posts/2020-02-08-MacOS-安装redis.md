---
title: "MacOS安装redis"
date: "2020-02-08T08:31:21.000Z"
description: "利用Homebrew安装Redis(1)安装命令$ brew install redis (2)进入安装目录$ cd /usr/local/Cellar/redis/4.0.6/bin (3)启动、关闭redis$ redis-server 以下命令即可关闭redis服务 redis 127.0.0"
legacyPath: "2020/02/08/MacOS-安装redis"
tags:
  - "redis"
tagSlugs:
  - "redis"
---
# 利用Homebrew安装Redis

##### (1)安装命令

$ brew install redis

##### (2)进入安装目录

$ cd /usr/local/Cellar/redis/4.0.6/bin

##### (3)启动、关闭redis

$ redis-server  
以下命令即可关闭redis服务  
redis 127.0.0.1:6379> SHUTDOWN

##### (4)连接redis服务

$ redis-cli -h 127.0.0.1（ip） -p 1234（端口号）  
示例：$ redis-cli -h 127.0.0.1 -p 1234

##### (5)键入授权登录密码

127.0.0.1:6379> AUTH 123456（密码）

##### (6)退出本次会话

127.0.0.1:6379> quit

# Redis其他常用命令及配置

开机启动redis命令  
$ ln -sfv /usr/local/opt/redis/\*.plist ~/Library/LaunchAgents

使用launchctl启动redis server  
$ launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist

使用配置文件启动redis server  
$ redis-server /usr/local/etc/redis.conf

停止redis server的自启动  
$ launchctl unload ~/Library/LaunchAgents/homebrew.mxcl.redis.plist

redis 配置文件的位置  
/usr/local/etc/redis.conf

卸载redis和它的文件  
brewuninstallredis rm ~/Library/LaunchAgents/homebrew.mxcl.redis.plist

测试redis server是否启动  
$ redis-cli ping
