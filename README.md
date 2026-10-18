# ARCHIVIST REPOSITORY

档案文明留档处。骨架照搬 [SILVERFISH_0-Archive](../SILVERFISH_0-Archive)，内容模块陆续入库。

## 模块现状

| # | 模块 | 计数 | 内容 |
| --- | --- | --- | --- |
| 01 | ABANDON | 3 RECORDS | FORM（原 macOS 版单文件 HTML）/ ORDER（原 Windows 版）/ WITNESS（Android **原生** APK，仅下载） |
| 02 | RETAIN | 1 RECORD | THRESHOLD v0（原 macOS 版，`index.html` + `merge_state.js`） |
| 03 | GROUP | 1 RECORD | 撤销版 v0（单文件 HTML，含底部撤销工具条） |
| 04 | TRADE | 1 RECORD | Godot 网页版（`archive/trade-web/`） |
| 05 | REVIEW | 1 RECORD | Godot 网页版（`archive/review-web/`） |
| 06 | DOWNLOAD | 4 RECORDS | WEST_EDGE 备份包 + 3 份 PDF（筛选/搜索/分页见下） |
| 07 | MISC | 8 LINKS | 照搬 SF 的 7 条外链 + 友链（archive.rosmontis220.top） |

- 首页：加载页 → 幕布入场 → hero（ARCHIVIST / REPOSITORY 解密效果）→ 模块滚动
- viewer.html：`?path=archive/xxx/index.html` 打开归档页面；普通归档页注入「← BACK TO REPOSITORY // 返回存档索引」浮动按钮与点击音效
- 游戏页（路径含 `-web/`）不注入返回按钮：**游戏内退出键直接回首页**（见下）

## 网页版游戏退出 → 回首页

两套保险，都在用：

1. 游戏壳 `index.html` 的 `GODOT_CONFIG` 带 `onExit`：游戏退出时把父页面导航回 `../../index.html`
2. 游戏内 GDScript：`entry.gd` 的 `_quit()`（TRADE 叫 `_q()`）在网页版先经 `Engine.get_singleton("JavaScriptBridge")` 调 `eval` 导航父页面，拿不到桥才回退 `get_tree().quit()`

重新导出游戏会覆盖第 1 条补丁，需要重打（见任一 `-web/index.html` 的配置行）。返回首页时会回到离开时所在的模块位置（modules.js 的会话位置记忆）。

## 结构

```text
ARCHIVIST-Repository/
├── index.html                 # 首页（hero + 7 个模块）
├── viewer.html                # 归档网页 iframe 外壳
├── 404.html                   # 统一回首页
├── .nojekyll
├── archive/
│   ├── abandon/{form,order}/  # ABANDON 单文件网页版
│   ├── abandon/witness/       # WITNESS 的 Android 原生 APK（下载用）
│   ├── retain/                # THRESHOLD：index.html + merge_state.js
│   ├── group/                 # GROUP 撤销版单文件
│   ├── review-web/, trade-web/  # Godot 网页版（.html/.js/.wasm/.pck 整目录）
│   └── download/              # 随档文件（zip / pdf）
└── resources/
    ├── fonts/                 # 4 份子集化 woff2（本站用字 655 字形，见下）
    ├── music/                 # Soul Sanctum（暗）/ Whispering Vaults（亮），随主题换曲
    ├── sfx/                   # UI 音效（legacy 目录 + sources.json）
    ├── images/                # avatar_archivist.jpg（头像）
    └── scripts/               # 站点脚本（见下）
```

## 脚本清单

| 脚本 | 作用 | 状态 |
| --- | --- | --- |
| `lenis.min.js`（vendor） | 平滑滚动 | 原样沿用 |
| `scroll-engine.js` | 视差滚动、`--p/--hp` 进度、模块 HUD 里程计 | 原样沿用 |
| `boot.js` | 加载页进度条、点击入场、幕布动画 | **已改**：预加载列表只剩字体 |
| `theme-init.js` | 首屏前确定主题，防闪烁 | **已改**：默认改为**亮色**（无存储时） |
| `theme.js` | 双主题（暗/亮）+ 主题曲联动 | **已改**：移除 SF 黑红主题，曲目按站内两首 |
| `modules.js` | 侧边栏目录、移动端面板、键盘导航、会话位置记忆 | 存储键 `sf-*` → `ar-*` |
| `decrypt-text.js` | hero 标题逐字解密 | 原样沿用 |
| `hero-clock.js` / `hero-effects.js` | 角落 HUD 时钟 / hero 右侧参数列 | **已改**：REF 改 `AR-OS-001`，MOD 数量按模块数自动算 |
| `home.js` | 站内 `a.entry-card` 自动走 viewer 外壳 | 原样沿用 |
| `mobile-carousel.js` | 移动端卡片横向轮播 | 原样沿用 |
| `sound-toggle.js` / `music-lifecycle.js` / `sfx-home.js` / `sfx.js` | 音效与音乐生命周期 | 存储键改名，其余原样 |
| `archive-return.js` | viewer 注入的返回入口 | **已改**：文案 `BACK TO REPOSITORY`，悬停色用 `--ef-yellow` |
| `viewer.js` | viewer 外壳逻辑 | **已改**：白名单 `archive/**/*.html`；游戏页（`-web/`）跳过返回按钮注入 |
| `downloads.js` | DOWNLOAD 模块筛选/搜索/分页 | **已挂回**：配合 `download-tools` 标记，移动端轮播接管 |

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
- Godot 网页版整个目录丢进 `archive/xxx-web/`，同时记得：① 给游戏壳打 `onExit` 补丁；② GDScript 退出经 JS 桥导航（见上节）
- 纯下载文件（非 `.html`）不会被改写，直接给 `<a download>` 即可（WITNESS 的 APK、`download/` 下所有文件都这样）
- `series-count`（如 `3 RECORDS`）手写；编号 `.no` 与目录、HUD 里程计由 `modules.js` 按模块顺序自动算
- DOWNLOAD 模块用 `download-tools` 那一套标记（筛选按钮 `data-download-filter`、卡片 `data-download-type` / `data-download-search`），`downloads.js` 接管搜索/分页/空态

## 字体

`resources/fonts/` 四份 woff2 已按本站实际用字重新子集化（`charset.txt` = index/viewer/404 + 全部脚本的字符并集 + ASCII）：

- `source-han-sans-cn-medium.woff2` 174 → 92 KB，`source-han-serif-cn-heavy.woff2` 220 → 125 KB（各 655 字形）
- 只保留 `tnum`（数字等宽）与 `ccmp` 特性，去 hinting
- emoji（🌙☀🔇等）不在字体里，按预期走系统 emoji 回退
- **文案继续增加新字后要重跑子集化**，否则新字回退系统字体；脚本在 `_tmp/`（collect_charset.py + pyftsubset）

## 待办

- [ ] WITNESS 网页复刻（研究 native `.so` 中，详见 `_tmp/so_strings.js` / `disasm.py`）

## 部署

仓库：https://github.com/Rosmontis220/ARCHIVIST-Repository

GitHub Pages 已从 main 分支根目录开启：https://rosmontis220.github.io/ARCHIVIST-Repository/ 。`.nojekyll` 已就位。不需要 COOP/COEP 之类特殊响应头（Godot 网页版默认无 pthreads，wasm 走普通流体）。仓库已约 200MB（两个游戏的 wasm 为主），GitHub Pages 站点软上限 1GB。
