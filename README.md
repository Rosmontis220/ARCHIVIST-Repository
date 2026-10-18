# ARCHIVIST REPOSITORY

档案文明的档案库。框架阶段——骨架照搬 [SILVERFISH_0-Archive](../SILVERFISH_0-Archive)，内容模块陆续入库。

## 目录

- ABANDON / RETAIN / GROUP / TRADE / REVIEW / DOWNLOAD / MISC —— 7 个占位模块（`0 RECORDS`，卡片未入库）
- 首页：加载页 → 幕布入场 → hero（ARCHIVIST / REPOSITORY 解密效果）→ 模块滚动
- viewer.html：`?path=archive/xxx/index.html` 打开归档页面，注入「← BACK TO ARCHIVE」返回入口与音效

## 结构

```text
ARCHIVIST-Repository/
├── index.html          # 首页（hero + 7 个占位模块）
├── viewer.html         # 归档网页 iframe 外壳
├── 404.html            # 统一回首页
├── .nojekyll
├── archive/            # 归档页面与游戏网页版（已接入 REVIEW / TRADE 网页版）
└── resources/
    ├── fonts/          # 4 份子集化 woff2（沿用 SF 字符集，内容定稿后需重新子集化）
    ├── music/          # Soul Sanctum.mp3（暗）/ Whispering Vaults.mp3（亮），随主题换曲
    ├── sfx/            # UI 音效（legacy 目录 + sources.json）
    ├── images/         # avatar_archivist.jpg（头像）
    └── scripts/        # 站点脚本（见下）
```

## 脚本清单

| 脚本 | 作用 | 状态 |
| --- | --- | --- |
| `lenis.min.js`（vendor） | 平滑滚动 | 原样沿用 |
| `scroll-engine.js` | 视差滚动、`--p/--hp` 进度、模块 HUD 里程计 | 原样沿用 |
| `boot.js` | 加载页进度条、点击入场、幕布动画 | **已改**：预加载列表只剩字体与 crimson 背景图 |
| `theme.js` | 双主题（暗/亮）+ 主题曲联动 | **已改**：移除 SF 的黑红主题（含连点解锁与「不需要……」彩蛋表），曲目文件名待 BGM 入库后同步 |
| `modules.js` | 侧边栏目录、移动端面板、键盘导航、会话位置记忆 | 存储键 `sf-*` → `ar-*` |
| `decrypt-text.js` | hero 标题逐字解密 | 原样沿用 |
| `hero-clock.js` / `hero-effects.js` | 角落 HUD 时钟 / hero 右侧参数列 | **已改**：REF 改 `AR-OS-001`，MOD 数量改为按模块数自动计算 |
| `home.js` | 站内 `a.entry-card` 自动走 viewer 外壳 | 原样沿用 |
| `mobile-carousel.js` | 移动端卡片横向轮播 | 原样沿用 |
| `sound-toggle.js` / `music-lifecycle.js` / `sfx-home.js` / `sfx.js` | 音效与音乐生命周期 | 存储键改名，其余原样 |
| `archive-return.js` | viewer 注入的返回入口 | 原样沿用 |
| `viewer.js` | viewer 外壳逻辑 | **已改**：路径白名单放宽为 `archive/**/*.html`，移除邮路控制台注入 |
| `downloads.js` | 文件下载模块（搜索/分页/计数） | **未引用**，做 DOWNLOAD 模块时重新挂回 index.html |

已从 SF 删除的组件：`postal-picker.js`、`postal-console/`（邮路终端专属）、`resources/localized/`（SF 汉化页）、`archive-manifest.json`、`CNAME`。

## 加卡片

每个模块的 card-grid 里放 `a.entry-card`，站内页面自动走 viewer 外壳：

```html
<a href="archive/review-web/index.html" class="entry-card">
  <div class="card-kicker">REVIEW // WEB</div>
  <h3 class="card-title">REVIEW 网页版</h3>
  <p class="card-desc">选关版 · 可直接在浏览器游玩</p>
  <div class="card-enter">Open Record <span>→</span></div>
</a>
```

- 站内静态页放 `archive/` 下，`home.js` 会把 `archive/` 开头的链接改写进 `viewer.html?path=...`
- Godot 网页版（`index.html + .js + .wasm + .pck`）整个目录丢进 `archive/` 即可，既可以走 viewer iframe（同源没问题），也可以直链
- `series-count`（如 `0 RECORDS`）手写；编号 `.no` 与目录、HUD 里程计由 `modules.js` 按模块顺序自动算

## 待办

- [ ] 字体子集化：现有 woff2 是 SF 的字符集，首页文案定稿后用 `fonttools` 重新子集化
- [ ] DOWNLOAD 模块开工时把 `downloads.js` 重新挂回 index.html 底部

## 部署

仓库：https://github.com/Rosmontis220/ARCHIVIST-Repository

GitHub Pages 已从 main 分支根目录开启：https://rosmontis220.github.io/ARCHIVIST-Repository/ 。`.nojekyll` 已就位。不需要 COOP/COEP 之类特殊响应头（Godot 网页版默认无 pthreads，wasm 走普通流体）。
