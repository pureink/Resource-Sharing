# 资源管理系统
## frontend
- 使用next.js框架(基于react.js)
- 服务端渲染减少白屏时间
- 通过借助formik和yup提供创建表单并加以验证
- 使用next-auth库以及auth0提供注册登录
- 部署在vercel

### 本地开发
克隆本仓库,进入frontend文件夹,安装相关依赖
```sh
cd frontend
npm i
npm run dev
```
## backend
- 基于node.js开发使用express.js框架
- restful接口
- 部署在heroku(https)
- https://api.hezh.fail

### 本地开发
克隆本仓库进入backend文件夹,安装相关依赖
```sh
cd backend
npm i
npm start
```
##数据库
使用mysql(MariaDB in CentOS7)
