# 浏览器实际验收记录

日期：2026-09-15。浏览器：用户真实 Chrome，经 Computer Use 操作。测试输入为 Example Trading / buyer@example.com 等测试数据，没有向业务联系人发送测试消息。

## 本地生产构建（localhost:3100）

- 桌面首页：查看真实截图，首页为浅色绿色 B2B 采购目录，三类产品入口与六款产品内容可见。
- 390px：点击首页 Mesh Nebulizers → SY108 产品 → Request a Quote，表单已预选 SY108 Mesh Nebulizer。
- RFQ：填写姓名、公司、国家、数量与两行需求，联系方式为空时出现错误并获得焦点。填入邮箱后预览显示完整型号、公司、国家、邮箱、数量和多行需求。
- WhatsApp href 的号码为 8615014135583；邮件 href 的收件人为 sales@homehealthwholesale.com，正文与预览一致，特殊符号和换行均保留。
- 点击 Copy request 显示复制成功。修改数量 120 → 150 后旧预览立即消失，防止发送过期信息。
- 320px：RFQ 文档宽度 320，产品文档宽度 320；采购指南文档宽度 320、表格宽度 288，无横向溢出。
- 菜单：点击打开显示 Headless UI 对话框；Esc 关闭后焦点回到 Open menu 按钮。
- 修复后再次查看 320px SY108 页面截图，标题与 Request a Quote 位于规格列表前；桌面保留左右两栏。

## 真实生产域名（homehealthwholesale.com）

- Vercel 面板确认 `7e77f353` 为 Production / Ready，部署 ID `6i2ZWCbCjhSJg7CdQXAmk7SVCFC3`。
- 实际点击首页 LK89 产品，再点击 Request a Quote，RFQ 预选 LK89 Fingertip Pulse Oximeter。
- 填写 QA Buyer、Example Trading - QA only、Singapore、buyer@example.com、120 和两行需求后，显示 “Request prepared — not sent yet”。预览完整保留产品、数量、联系方式、换行与 & 符号。
- 可见 WhatsApp 链接为 `wa.me/8615014135583`；邮件草稿收件人为 `sales@homehealthwholesale.com`，两者消息与预览一致。没有点击外部发送。
- 390px 截图中字段正常，文档宽度实测 390px。验收后撤销尺寸覆盖，浏览器保留真实域名首页。
- 部署切换中曾见旧 HTML 与新样式版本不一致、一次 React 418；重新加载最终部署后首页完整显示。进一步 HTTP 检查所有 18 个静态资源为 200，CSS 包含当前主题。
- 在线 HTTP 报告 `production-http.json`：21 个页面、30 个站内链接、18 个静态资源及元数据、跳转、404、六产品接口检查通过。

## 验收边界

这验证的是实际网页交互、请求内容和发送入口，未发送业务消息，未验证真实邮件/WhatsApp 收件。图片、设备规格和合规资料等待供应商确认。SEO 检查不等于 Google 已收录或取得排名。
