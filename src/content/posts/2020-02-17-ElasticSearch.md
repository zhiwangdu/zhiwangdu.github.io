---
title: "ElasticSearch"
date: "2020-02-17T13:37:43.000Z"
description: "#ElasticSearch简介 1. 什么是ElasticSearchElasticsearch是一个基于Lucene库的搜索引擎。它提供了一个分布式、支持多租户的全文搜索引擎，具有HTTP Web接口和无模式JSON文档。Elasticsearch是用Java开发的，并在Apache许可证下作为"
legacyPath: "2020/02/17/ElasticSearch"
tags:
  - "ElasticSearch"
tagSlugs:
  - "ElasticSearch"
---
#ElasticSearch简介

## 1\. 什么是ElasticSearch

**Elasticsearch**是一个基于[Lucene](https://zh.wikipedia.org/wiki/Lucene)库的[搜索引擎](https://zh.wikipedia.org/wiki/搜索引擎)。它提供了一个分布式、支持多租户的[全文搜索](https://zh.wikipedia.org/wiki/全文檢索)引擎，具有[HTTP](https://zh.wikipedia.org/wiki/HTTP) Web接口和无模式[JSON](https://zh.wikipedia.org/wiki/JSON)文档。Elasticsearch是用[Java](https://zh.wikipedia.org/wiki/Java)开发的，并在[Apache许可证](https://zh.wikipedia.org/wiki/Apache许可证)下作为开源软件发布。官方客户端在[Java](https://zh.wikipedia.org/wiki/Java)、[.NET](https://zh.wikipedia.org/wiki/.NET框架)（[C#](https://zh.wikipedia.org/wiki/C♯)）、[PHP](https://zh.wikipedia.org/wiki/PHP)、[Python](https://zh.wikipedia.org/wiki/Python)、[Apache Groovy](https://zh.wikipedia.org/wiki/Groovy)、[Ruby](https://zh.wikipedia.org/wiki/Ruby)和许多其他语言中都是可用的。[\[5\]](https://zh.wikipedia.org/wiki/Elasticsearch#cite_note-offizsite-5)根据DB-Engines的排名显示，Elasticsearch是最受欢迎的企业搜索引擎，其次是[Apache Solr](https://zh.wikipedia.org/wiki/Apache_Solr)，也是基于Lucene。

Elasticsearch可以用于搜索各种文档。它提供可扩展的搜索，具有接近实时的搜索，并支持多租户。[\[5\]](https://zh.wikipedia.org/wiki/Elasticsearch#cite_note-offizsite-5)”Elasticsearch是分布式的，这意味着索引可以被分成分片，每个分片可以有0个或多个副本。每个节点托管一个或多个分片，并充当协调器将操作委托给正确的分片。再平衡和路由是自动完成的。“[\[5\]](https://zh.wikipedia.org/wiki/Elasticsearch#cite_note-offizsite-5)相关数据通常存储在同一个索引中，该索引由一个或多个主分片和零个或多个复制分片组成。一旦创建了索引，就不能更改主分片的数量。

##2. ElasticSearch特点

(1) 可以作为一个大型分布式集群(数百台服务器)技术，处理PB级数据，服务大公

司;也可以运行在单机上

(2) 将全文检索、数据分析以及分布式技术，合并在了一起，才形成了独一无二的ES;

(3) 开箱即用的，部署简单

(4)全文检索，同义词处理，相关度排名，复杂数据分析，海量数据的近实时处理

# 走进ElasticSearch

##1. ElasticSearch部署与启动

官网下载ElasticSearch，无需安装，解压安装包后即可使用

在命令提示符下，进入ElasticSearch安装目录下的bin目录,执行命令(macOS环境)：

```
./elasticsearch
```

即可启动。

打开浏览器，在地址栏输入：

```
localhost:9200
```

即可看到输出结果

```
{
name: "macbook.local",
cluster_name: "elasticsearch",
cluster_uuid: "y-QBAI5_QtW69ip5g8tZbA",
version: {
number: "7.6.0",
build_flavor: "default",
build_type: "tar",
build_hash: "7f634e9f44834fbc12724506cc1da681b0c3b1e3",
build_date: "2020-02-06T00:09:00.449973Z",
build_snapshot: false,
lucene_version: "8.4.0",
minimum_wire_compatibility_version: "6.8.0",
minimum_index_compatibility_version: "6.0.0-beta1"
},
tagline: "You Know, for Search"
}
```

## 2\. Postman调用RestAPI

### 1\. 新建索引

例如要创建一个叫test的索引 ,就以put方式提交:

```
http://localhost:9200/test/
```

### 2\. 新建文档

新建article文档，以post方式提交

```
http://localhost:9200/test/article
```

Body:

```
{
	"title":"SpringBoot2.0",
	"content":"发布啦"
}
```

返回结果为：

```
{
    "_index": "test",
    "_type": "article",
    "_id": "GHyBVnAB4PDPv2i4fr5Q",
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 0,
    "_primary_term": 1
}
```

\_id是由系统自动生成的。

### 3\. 查询全部文档

查询某索引某类型的全部数据，以get方式请求

```
http://localhost:9200/test/article/_search
```

返回结果如下:

```
{
	"took": 605,
	"timed_out": false,
	"_shards": {
		"total": 1,
		"successful": 1,
		"skipped": 0,
		"failed": 0
	},
	"hits": {
		"total": {
			"value": 1,
			"relation": "eq"
		},
		"max_score": 1.0,
		"hits": [
			{
				"_index": "test",
				"_type": "article",
				"_id": "GHyBVnAB4PDPv2i4fr5Q",
				"_score": 1.0,
				"_source": {
					"title": "SpringBoot2.0",
					"content": "发布啦"
				}
			}
		]
	}
}
```

### 4\. 修改文档

以put形式提交以下地址：

```
http://localhost:9200/test/article/GHyBVnAB4PDPv2i4fr5Q
```

Body:

```
{
	"title":"SpringBoot3.0",
	"content":"发布了吗"
}
```

返回结果如下：

```
{
    "_index": "test",
    "_type": "article",
    "_id": "GHyBVnAB4PDPv2i4fr5Q",
    "_version": 2,
    "result": "updated",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 1,
    "_primary_term": 1
}
```

如果地址中所填的id不存在，则会创建新文档。

### 5\. 按ID查询文档

GET方式请求：

```
http://localhost:9200/test/article/GHyBVnAB4PDPv2i4fr5Q
```

###6. 基本匹配查询

根据某列进行查询，GET方式提交下列地址：

```
http://localhost:9200/test/article/_search?q=content:框
```

返回结果：

```
{
	"took": 2,
	"timed_out": false,
	"_shards": {
		"total": 1,
		"successful": 1,
		"skipped": 0,
		"failed": 0
	},
	"hits": {
		"total": {
			"value": 1,
			"relation": "eq"
		},
		"max_score": 0.9529822,
		"hits": [
			{
				"_index": "test",
				"_type": "article",
				"_id": "1",
				"_score": 0.9529822,
				"_source": {
					"title": "spring教程",
					"content": "spring框架教程"
				}
			}
		]
	}
}
```

###7. 模糊查询

用\*代表任意字符:

```
http://localhost:9200/test/article/_search?q=title:*pr*
```

### 8\. 删除

根据ID删除文档,删除ID为1的文档

DELETE方式提交

```
http://localhost:9200/test/article/1
```

## 使用head插件进行索引库的操作

在head目录下执行命令：

```
grunt server
```

后在浏览器中输入：

```
Localhost:9100
```

# ik分词器的使用

## 什么是IK分词器

我们在浏览器地址栏输入

[http://127.0.0.1:9200/\_analyze?analyzer=chinese&pretty=true&text=我是中国人](http://127.0.0.1:9200/_analyze?analyzer=chinese&pretty=true&text=我是中国人)

（ES7.x版本不能直接在地址栏输入，可以使用GET或者POST方法，但是分词器和查询词需要以json的形式写在body里。）

```
{
	"analyzer":"chinese",
	"text": "我是中国人"
}
```

浏览器显示效果如下

```
{
  "tokens": [
    {
      "token": "我",
      "start_offset": 0,
      "end_offset": 1,
      "type": "<IDEOGRAPHIC>",
      "position": 0
    },
    {
      "token": "是",
      "start_offset": 1,
      "end_offset": 2,
      "type": "<IDEOGRAPHIC>",
      "position": 1
    },
    {
      "token": "中",
      "start_offset": 2,
      "end_offset": 3,
      "type": "<IDEOGRAPHIC>",
      "position": 2
    },
    {
      "token": "国",
      "start_offset": 3,
      "end_offset": 4,
      "type": "<IDEOGRAPHIC>",
      "position": 3
    },
    {
      "token": "人",
      "start_offset": 4,
      "end_offset": 5,
      "type": "<IDEOGRAPHIC>",
      "position": 4
    }
  ]
}
```

默认的中文分词是将每个字看成一个词，这显然是不符合要求的，所以我们需要安装中 文分词器来解决这个问题。

IK分词是一款国人开发的相对简单的中文分词器。虽然开发者自2012年之后就不在维护 了，但在工程应用中IK算是比较流行的一款!我们今天就介绍一下IK中文分词器的使用。

### IK分词器的安装

下载地址:[https://github.com/medcl/elasticsearch-analysis-ik/releases](https://github.com/medcl/elasticsearch-analysis-ik/releases)

1.  先将其解压，将解压后的elasticsearch文件夹重命名文件夹为ik
2.  将ik文件夹拷贝到elasticsearch/plugins 目录下。
3.  重新启动，即可加载IK分词器

## IK分词器测试

IK提供了两个分词算法ik\_smart 和 ik\_max\_word，  
其中 ik\_smart 为最少切分，ik\_max\_word为最细粒度划分

### 最小切分

地址栏输入

```
http://localhost:9200/_analyze?pretty=true
```

以get或post方式，body中的json数据是

```
{
	"analyzer":"ik_smart",
	"text": "我是中国人"
}
```

结果为：

```
{
  "tokens": [
    {
      "token": "我",
      "start_offset": 0,
      "end_offset": 1,
      "type": "CN_CHAR",
      "position": 0
    },
    {
      "token": "是",
      "start_offset": 1,
      "end_offset": 2,
      "type": "CN_CHAR",
      "position": 1
    },
    {
      "token": "中国人",
      "start_offset": 2,
      "end_offset": 5,
      "type": "CN_WORD",
      "position": 2
    }
  ]
}
```

### 最细切分

地址栏输入

```
http://localhost:9200/_analyze?pretty=true
```

以get或post方式，body中的json数据是

```
{
	"analyzer":"ik_max_word",
	"text": "我是中国人"
}
```

结果为：

```
{
  "tokens": [
    {
      "token": "我",
      "start_offset": 0,
      "end_offset": 1,
      "type": "CN_CHAR",
      "position": 0
    },
    {
      "token": "是",
      "start_offset": 1,
      "end_offset": 2,
      "type": "CN_CHAR",
      "position": 1
    },
    {
      "token": "中国人",
      "start_offset": 2,
      "end_offset": 5,
      "type": "CN_WORD",
      "position": 2
    },
    {
      "token": "中国",
      "start_offset": 2,
      "end_offset": 4,
      "type": "CN_WORD",
      "position": 3
    },
    {
      "token": "国人",
      "start_offset": 3,
      "end_offset": 5,
      "type": "CN_WORD",
      "position": 4
    }
  ]
}
```

## 自定义词库

步骤：

1.  进入elasticsearch/plugins/ik/config目录
2.  新建一个my.dic文件，编辑内容:

```
课啊兽
```

3.  修改IKAnalyzer.cfg.xml(在ik/config目录下)

```
<properties>
      <comment>IK Analyzer 扩展配置</comment> 
      <!‐‐用户可以在这里配置自己的扩展字典 ‐‐> 
      <entry key="ext_dict">my.dic</entry>
      <!‐‐用户可以在这里配置自己的扩展停止词字典‐‐> 
      <entry key="ext_stopwords"></entry>
</properties>
```

4.  重新启动elasticsearch,通过浏览器测试分词效果

```
{
  "tokens": [
    {
      "token": "我",
      "start_offset": 0,
      "end_offset": 1,
      "type": "CN_CHAR",
      "position": 0
    },
    {
      "token": "是",
      "start_offset": 1,
      "end_offset": 2,
      "type": "CN_CHAR",
      "position": 1
    },
    {
      "token": "课啊兽",
      "start_offset": 2,
      "end_offset": 5,
      "type": "CN_WORD",
      "position": 2
    }
  ]
}
```
