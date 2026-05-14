# 女性体态训练打卡 PWA

这是一个单人自用的手机 PWA：女性体态训练、日常姿势提醒、经期状态调整、8 周打卡和每周复盘。应用不需要登录，不需要后端，数据保存在当前手机浏览器本地。

## 本地运行

```bash
npm install
npm run dev
```

由于项目部署在 GitHub Pages 子路径，Vite 已设置：

```ts
base: '/posture-training-pwa/'
```

本地预览构建结果：

```bash
npm run build
npm run preview
```

## GitHub Pages 自动部署

仓库地址：

https://github.com/qx94pz8pzx-coder/posture-training-pwa

已经包含 GitHub Actions 工作流：

```text
.github/workflows/deploy.yml
```

每次 push 到 `main` 后会自动执行：

- `npm ci`
- `npm run build`
- 上传 `dist`
- 部署到 GitHub Pages

首次使用时，在 GitHub 仓库里检查：

1. 进入仓库 `Settings`。
2. 打开 `Pages`。
3. `Build and deployment` 的 `Source` 选择 `GitHub Actions`。
4. push 到 `main` 后，等待 `Actions` 里的部署完成。

部署完成后访问：

```text
https://qx94pz8pzx-coder.github.io/posture-training-pwa/
```

## 手机上添加到主屏幕

iPhone Safari：

1. 用 Safari 打开 GitHub Pages 地址。
2. 点底部分享按钮。
3. 选择“添加到主屏幕”。
4. 以后从桌面图标打开。

Android Chrome：

1. 用 Chrome 打开 GitHub Pages 地址。
2. 点右上角菜单。
3. 选择“添加到主屏幕”或“安装应用”。

## 数据说明

打卡、经期、复盘和自定义视频链接都保存在手机浏览器本地。换手机不会自动同步，清理浏览器网站数据会删除记录。需要备份时，请在应用“复盘”页导出 JSON。
