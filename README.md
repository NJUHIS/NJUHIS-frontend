# NJUHIS-frontend

---

## 环境

```
node >=12
```

## 安装

```
cd app && npm install
```

## 开发HMR/预览

```
 cd app && npm run serve
```

## 打包

```
cd app && npm run build
```

## 风格化

```
cd app && npm run lint
```

---

## 流程

clone下来后 先**安装**，开发时用**HMR**开启前端服务器，需要部署时**打包**，并把`dist`文件下内容部署到服务器对应文件夹下

## 注意⚠️

1. 在自己个人分支进行开发

2. 开发前从**master**分支merge到自己分支，获取最新内容

3. 开发完成后，将**master**分支代码merge到自己分支解决冲突，再merge回master分支确保master分支是最新代码

4. master分支上的代码必须可运行，可以根据需要自己创建develop分支

5. 代码提交前，必须运行**风格化**