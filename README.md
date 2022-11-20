# front-deploy-demo

# 01 前端应用部署- 写一个简单服务 demo-1

- 这里我使用pnpm包管理
- 使用 ts 进行编写为了更好的提示 (tsc -init 初始化ts)

```javascript
// 运行项目
pnpm i
```

# 02 使用 docker 尝试部署

- 使用 serve 包启动一个服务 查看 package.josn -> script 命令
```
serve . -p 3000 监听3000端口
serve -s build 可以指定build目录 并且-s标识是单页应用, 防止刷新后历史栈空找不到url资源
```

- docker cli 因为windows安装docker繁琐, 我使用了centos虚拟机
```javascript
# 安装 docker:  curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
# 进入centos 中如果docker未启动 启动服务 service docker start

# 使用 docker 命令行工具去构建及运行容器

# 构建一个名为 simple-node-app 的镜像 // 在 dockerfile 文件目录下执行
$ docker build -f node.dockerfile  -t simple-node-app . // (node.Dockerfile是文件名)

# 通过docker文件中 -lah 打印关键信息方便调试
$ docker build -f node.dockerfile -t simple-node-app . --progress plain --no-cache .

# 根据该镜像运行容器
$ docker run -d --rm -p 3000:3000 simple-node-app
```

# 03 使用 docker-compose 
- 查看docker-compose 命令:
https://app.yinxiang.com/shard/s44/nl/35125454/da5acc2a-d388-4944-83a2-31b3e3056faf?title=8.%20docker-compose%20%E5%91%BD%E4%BB%A4

- 安装很简单，但是难免会遇到问题：
- 1、安装
```
curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
```

- 把下载的文件授权
```
sudo chmod +x /usr/local/bin/docker-compose
```

- 查看版本
```
docker-compose -version- 
```
- 使用docker-compose启动
```
docker-compose up --build node-app
```

这里遇到问题: 如果docker-compose.yaml文件只写了一个node-app 直接执行 
```
docker-compose up
```

# 04 因为是静态资源, 不必是nodejs环境, demo-4 使用 nginx(体积小,性能好)
- 执行命令构建镜像
```
docker build -f node.dockerfile /**(node.Dockerfile是文件名)*/ -t simple-node-app .
```

- 查看nginx首页
```
// -p 3000:80 nginx 默认启动80映射到3000端口，在本地 3000 端口访问 nginx 页面 
$ docker run -it --rm -p 3000:80 nginx:alpine
```
- 查看nginx配置文件
```
// 运行nginx容器 
$ docker run -it --rm nginx:alpine sh

// 需要退出容器输入 
$ exit

// 第一步运行可以看到nginx打印了配置文件的路径
$ docker run -it --rm nginx:alpine sh
$ cat /etc/nginx/conf.d/default.conf
```

- .dockerfile文件 指定 src/index.html 位置 , 使用 docker-compose 启动服务器
```
$ docker-compose up --build nginx-app // --build 是重构建服务器的意思
``` 

- 通过 volumes 映射本地 nginx 配置文件, 在本地学习配置

```
$ docker-compose -f learn-nginx.docker-compose.yaml up learn-nginx
```