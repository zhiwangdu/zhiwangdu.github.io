---
title: "github速度提高"
date: "2020-02-24T10:17:01.000Z"
description: "查找域名对应的ip地址，并修改hosts文件，依次输入以下命令： nslookup github.global.ssl.fastly.Net nslookup github.com 将得到的adderss加入到/etc/hosts文件中，如下： 151.101.76.249 http://globa"
legacyPath: "2020/02/24/git-github速度提高"
tags:
  - "git"
tagSlugs:
  - "git"
---
1.  查找域名对应的ip地址，并修改hosts文件，依次输入以下命令：

```
nslookup github.global.ssl.fastly.Net
nslookup github.com
```

2.  将得到的adderss加入到/etc/hosts文件中，如下：

```
151.101.76.249 http://global-ssl.fastly.net
192.30.255.113 http://github.com
```

3.  刷新DNS缓存

linux：

`sudo /etc/init.d/networking restart`

Windows:

`ipconfig /flushdns`

macOS：

`sudo killall -HUP mDNSResponder`

4.  完成，git clone速度显著提升。
