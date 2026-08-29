# Health Home Wholesale

基于 Next.js App Router 的 B2B 健康产品询盘站。站点用于展示商品、收集报价/样品/MOQ 需求，并把 WhatsApp 点击归因回内部 CRM；它不是零售商城，不提供购物车、固定价格或在线付款。

## 本地运行

```bash
pnpm install
pnpm dev
```

默认地址为 `http://localhost:3000`。复制 `.env.example` 为本地环境文件并按需配置站点名称、域名、WhatsApp 和支持邮箱；不要提交真实密钥。

## B2B 路径

- `/search`：产品目录，统一显示 `Wholesale pricing by quote`。
- `/product/[handle]`：商品详情，提供报价、样品与 MOQ 三类询盘入口。
- `/pulse-oximeter-wholesale`：批发采购落地页。
- `/offer/[slug]`：产品 × 国家 × 买家类型的有限个性化落地页。
- `/go/whatsapp`：内部 WhatsApp 跳转和可选 CRM 归因。
- `/checkout` 与 `/checkout/success`：保留旧链接兼容，但只重定向到批发询盘页，不渲染结账或付款。

Offer 的规范格式是：

```text
/offer/{product-handle}-{known-country}-{known-buyer-type}
```

未知组合返回 404；合法但顺序不规范或省略维度的旧链接会永久重定向到唯一 canonical。只有 `lib/offer.ts` 中选定的有限组合进入 sitemap，其余合法个性化页为 `noindex,follow`。

## CRM 追踪安全

跨站事件默认关闭。启用时必须同时配置：

```bash
CRM_TRACKING_ENDPOINT="https://crm.example.com/api/tracking/ingest"
CRM_TRACKING_ALLOWED_ORIGINS="https://crm.example.com"
CRM_TRACKING_TOKEN="replace-me"
```

- 生产环境只接受 HTTPS endpoint。
- HTTP 只允许开发环境的 loopback 地址，并且不会附带 bearer token。
- endpoint origin 必须出现在 allowlist 中；重定向和非 2xx 响应都视为投递失败。
- 追踪失败不会阻断买家跳转 WhatsApp，也不会在日志中输出 token 或事件详情。

## 验证

```bash
pnpm test
pnpm exec tsc --noEmit
pnpm build
```

`pnpm test` 包含格式检查与 B2B 路径安全契约回归。
