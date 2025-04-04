# Travel Planning Web System

✅ 项目总结如下：

---

### 🌐 项目名称：旅行计划网页系统

---

### 🧱 技术栈

- **前端**：React，Axios，Cloudflare Pages 部署
- **后端**：Express.js，MongoDB Atlas，Render 部署
- **数据库**：MongoDB Atlas（test.users 集合）
- **认证**：Bcrypt 密码加密，JWT 登录验证

---

### ✅ 实现功能

- [x]  注册功能（注册成功后跳转登录）
- [x]  登录功能（登录成功跳转 dashboard）
- [x]  数据存入 MongoDB Atlas
- [x]  后端 `/api/register`、`/api/login` 接口部署成功
- [x]  前后端联通，支持跨域
- [x]  在线部署地址运行稳定

---

### 🌐 项目部署地址

- **前端页面**（用户可访问）
    
    👉 https://travel-planner-37o.pages.dev/
    
- **后端 API**（Render 服务）
    
    👉 [https://travel-planner-yx07.onrender.com](https://travel-planner-yx07.onrender.com/)
    
    - 根路径响应：`API running`
    - POST `/api/register`
    - POST `/api/login`

---

### 🛠️ 开发记录亮点

- 成功通过 `curl` 与浏览器调试验证接口稳定性
- 解决多个 Render 服务地址混乱问题
- 通过 `.env` 动态配置 API 地址并重新打包部署
- 完整测试前端注册、登录流程并联调数据库

---

需要我帮你补充更多内容（比如：README 模板、部署说明、截图整理等）也可以说一声！💪