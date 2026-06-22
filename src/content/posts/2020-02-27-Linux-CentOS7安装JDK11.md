---
title: "Linux-CentOS7安装JDK11"
date: "2020-02-27T03:15:19.000Z"
description: "官网下载JDK11，macOS终端上传到centOS虚拟机root目录下： scp 文件路径 root@ip地址:~ 上传完成后解压并将解压后的文件夹移动到/opt/下 tar zxvf jdk-11.0.6_linux-x64_bin.tar.gz mv jdk-11.0.5 /opt/ 然后配置"
legacyPath: "2020/02/27/Linux-CentOS7安装JDK11"
tags:
  - "Linux"
tagSlugs:
  - "Linux"
---
官网下载JDK11，macOS终端上传到centOS虚拟机root目录下：

```
scp 文件路径 root@ip地址:~
```

上传完成后解压并将解压后的文件夹移动到/opt/下

```
tar zxvf jdk-11.0.6_linux-x64_bin.tar.gz
mv jdk-11.0.5 /opt/
```

然后配置环境变量：

```
vim /etc/profile
```

添加如下配置

```
export JAVA_HOME=/opt/jdk-11.0.6
export JRE_HOME=$JAVA_HOME/jre
export CLASSPATH=.:$JAVA_HOME/lib:$JRE_HOME/lib
export PATH=$JAVA_HOME/bin:$PATH
```

保存后退出，执行：

```
source /etc/profile
```

Java -version 检查是否安装成功：

```
java version "11.0.6" 2020-01-14 LTS
Java(TM) SE Runtime Environment 18.9 (build 11.0.6+8-LTS)
Java HotSpot(TM) 64-Bit Server VM 18.9 (build 11.0.6+8-LTS, mixed mode)
```
