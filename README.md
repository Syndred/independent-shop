# Health Home Wholesale

基于既有 Next.js Commerce / Tailwind / Headless UI 模板改造的 B2B 产品目录与询价站。生产域名 `https://homehealthwholesale.com`，Vercel 项目 `syndreds-projects/independent-shop`，生产分支 `feature/mvp-setup`。

## 运行与验证

使用 Node.js 22，仓库固定 pnpm 10.30.3。

```bash
corepack pnpm install --frozen-lockfile
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm start --port 3100
# 保持本地生产服务运行，再执行
pnpm test:smoke
# 发布后回读
TEST_ORIGIN=https://homehealthwholesale.com pnpm test:smoke
```

`lint` 沿用仓库 Prettier 格式检查；本项目未配置 ESLint。`test` 包括既有 B2B 契约检查与 RFQ 实际验证函数回归。`test:smoke` 检查全部 sitemap 页面、站内链接、规范地址、结构化数据、真实 404、旧链接跳转、WhatsApp 目标及目录接口，证据输出到 `docs/verification/`。

## 页面与产品事实

- `/`：采购首页；`/search`：六款产品目录。
- `/search/blood-pressure-monitors`、`/search/pulse-oximeters`、`/search/mesh-nebulizers`：三类采购目录。
- `/product/[handle]`：上臂式、腕式血压计；LK87/LK89 指夹血氧仪；SY108/ZS101 网式雾化器。
- `/about`：真实供应链说明；`/quality-compliance`：资料与验收要求。
- 四个采购指南：`/pulse-oximeter-wholesale`、`/mesh-nebulizer-supplier`、`/blood-pressure-monitor-wholesale`、`/low-moq-home-health-devices`。
- `/contact`：完整 RFQ；`/shipping`、`/privacy`、`/terms`：运输、隐私、询价条款。
- 旧产品链接 308 到正确产品或分类。旧 checkout 仅跳转；已有个性化 Offer 保留 CRM 使用，但全量 noindex，不进 sitemap。

产品事实集中在 `lib/data/products.ts`。原有四组图片均是雾化器，无法可靠确认具体型号，已撤下公开页面；源文件保留备查。未核实的图片、型号、规格、MOQ、库存、OEM/ODM、证书、质保和交期必须标注询价确认。不能把占位图加入 Product 图像标记，不能恢复未经证明的库存、价格、评论或 Merchant Offer。

## 询价工作方式

表单收集姓名、公司、目的地、邮箱或 WhatsApp、产品、数量与需求，在浏览器生成完整预览。买家选择 WhatsApp 或邮件并在对应应用中发送；也可复制请求。**准备、打开应用和点击不等于消息送达。** 当前没有自动邮件发送服务或询盘数据库，不显示虚假成功，不持久保存表单内容。需要站内自动收件时应另接明确授权的邮箱/CRM 收件服务并验证真实收件。

联系信息从 `.env.example` 读取，默认已用现有业务联系信息。不要提交真实密钥。SEO 域名使用 `SITE_URL` 或 `NEXT_PUBLIC_SITE_URL`，不会自动回退到 Vercel 预览域名。

## 既有 CRM 归因

`/go/whatsapp` 可记录直接询价按钮点击，跨站事件默认关闭。启用时配置：

```bash
CRM_TRACKING_ENDPOINT="https://crm.example.com/api/tracking/ingest"
CRM_TRACKING_ALLOWED_ORIGINS="https://crm.example.com"
CRM_TRACKING_TOKEN="replace-me"
```

只允许 HTTPS 与白名单 origin；HTTP 仅允许开发 loopback 且不附 token。拒绝外部重定向、检查非 2xx、三次重试复用事件 ID。追踪失败不阻断 WhatsApp。完整 RFQ 使用直接联系链接，不经该接口传送表单内容。

## 发布与回滚

实际生产分支以 Vercel 项目面板为准，目前为 `feature/mvp-setup`。本次工作在 `codex/b2b-catalog-rebuild`，继承了生产功能分支原先未推送的四个 B2B 提交。验证通过后快进到生产分支，禁止强推覆盖他人工作。

发布完成需要 Vercel 显示 Ready 并在真实域名通过 HTTP 与浏览器检查。回滚使用 Vercel 项目中的前一已验证部署，或审核后回退代码。详细状态见 [B2B-HANDOFF.md](B2B-HANDOFF.md)。
