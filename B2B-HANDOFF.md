# 独立站 B2B 收口交接

更新时间：2026-08-29

## 已完成

- 全站导航、商品卡、网格与商品详情移除购物车、Quick Add 和固定价格展示。
- 商品统一使用报价、样品、MOQ 三类 CTA；旧 checkout 路径只做兼容重定向。
- 商品描述和批发落地页移除固定批发价及未经逐单确认的 MOQ/物流承诺。
- WhatsApp 点击保留 CRM 归因能力，并加入生产 HTTPS、origin allowlist、禁止跨域重定向、非 2xx 检查和明文 HTTP 不带 token 的保护。
- Offer 组合改为严格解析：未知后缀 404，非规范顺序永久跳转，有限组合进 sitemap，其余合法组合 noindex。
- 新增 B2B 契约测试，并通过 TypeScript 与生产构建。

## 上线前配置

1. 在生产环境配置真实 `SITE_URL`、`WHATSAPP_NUMBER` 与 `SUPPORT_EMAIL`。
2. 如需把 WhatsApp 点击归因回 CRM，同时配置 `CRM_TRACKING_ENDPOINT`、`CRM_TRACKING_ALLOWED_ORIGINS`、`CRM_TRACKING_TOKEN`，其中 endpoint 必须是 HTTPS。
3. 用真实目标域名检查 `/sitemap.xml`、任一规范 Offer URL、商品 CTA 和 WhatsApp 跳转。
4. 商品供应状态、认证、MOQ、价格、样品、运输和付款条款仍须在每次报价前人工确认；站点文案不替代供应链证据。

## 回归命令

```bash
pnpm test
pnpm exec tsc --noEmit
pnpm build
```
