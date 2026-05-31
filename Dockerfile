FROM node:lts-alpine as build-stage

WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci

# 复制项目文件
COPY . .

# 构建应用
RUN npm run build

# 生产环境阶段
FROM nginx:stable-alpine as production-stage

# 从构建阶段复制构建好的文件到nginx
COPY --from=build-stage /app/docs /usr/share/nginx/html

# 暴露80端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
