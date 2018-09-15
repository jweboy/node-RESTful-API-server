# Node-RESTful-API-Server

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.com/jweboy/node-resful-server.svg?branch=master)](https://travis-ci.com/jweboy/node-resful-server)
[![Coverage Status](https://coveralls.io/repos/github/jweboy/node-resful-server/badge.svg?branch=master)](https://coveralls.io/github/jweboy/node-resful-server?branch=master)

## Introduction

> 项目基于nodejs v8.0.0及以上,并结合轻量的服务端框架fastify实现的一个node server端。项目内容是对RESTful API规范、架构的理解与实践。采用fastify作为基础框架，不仅因为它性能好,还因为它原生内置了JSON Schema的validation和serialization,这一点对于熟悉Schema的开发者来说相对比较友好, 而且它的serialization甚至可以做到 2x faster than JSON.stringify()。

## Documentation

- 项目结合Swagger来编写API的规范,具体内容点击[swagger-docs](http://118.24.155.105/docs)

## Implemented

目前已经实现了以下几个功能点

> /upload 部分的API目前基于[七牛云](https://developer.qiniu.com/?ref=www.qiniu.com)开发。

| method  | url | description |
| --------| ----|------------ |
| POST | /user/signup | 用户注册 |
| POST | /user/signin | 用户登录 |
| POST | /upload/picture | 图片上传 |
| POST | /upload/picture/{fileKey} | 图片删除 |
| POST | /upload/picture/list | 图片列表 |

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2017-present jweboy