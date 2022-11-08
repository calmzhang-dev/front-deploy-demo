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
- docker cli 因为windows安装docker繁琐, 我使用了centos虚拟机
```javascript
# 安装 docker:  curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
# 进入centos 中如果docker未启动 启动服务 service docker start

# 使用 docker 命令行工具去构建及运行容器

# 构建一个名为 simple-node-app 的镜像 // dockerfile 文件目录下执行
$ docker build -f node.Dockerfile /**(node.Dockerfile是文件名)*/ -t simple-node-app .

# 通过docker文件中 -lah 打印关键信息方便调试
$ docker build -f node.Dockerfile /**(node.Dockerfile是文件名)*/ -t simple-node-app . --progress plain --no-cache .

# 根据该镜像运行容器
$ docker run -d --rm -p 3000:3000 simple-node-app
```

# 03 使用 docker-compose

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
- 
