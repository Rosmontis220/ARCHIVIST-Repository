# archive/

归档页面与游戏网页版放在这里，由首页卡片或 `viewer.html?path=archive/xxx/index.html` 打开。

约定：

- 静态网页：`archive/<系列>/<版本>/index.html`
- Godot 网页版：`archive/<游戏>-web/`（整个目录拷入，含 index.html / .js / .wasm / .pck）
- viewer 白名单：`archive/**/*.html`（见 `resources/scripts/viewer.js`）
- **游戏页（路径含 `-web/`）不注入悬浮返回按钮**：退出键回首页是通过游戏壳 `index.html` 里 `GODOT_CONFIG` 的 `onExit` 实现的——游戏内退出时把父页面导航回档案库首页。重新导出游戏后需要给新壳补上这个 `onExit`（见任一现有 `-web/index.html` 第 114 行）

当前内容：

- `abandon/form/` —— ABANDON · FORM v0（原 macOS 版，单文件 HTML）
- `abandon/order/` —— ABANDON · ORDER v0（原 Windows 版，单文件 HTML）
- `abandon/witness/` —— ABANDON · WITNESS v0（Android **原生**应用，不是网页转包；内容为 NativeActivity 渲染的解谜玩法，只能下载 APK 安装）
- `retain/` —— RETAIN · THRESHOLD v0（原 macOS 版，index.html + merge_state.js）
- `group/` —— GROUP · 撤销版 v0（单文件 HTML，底部含撤销工具条）
- `review-web/` —— REVIEW 网页版（54.6MB）
- `trade-web/` —— TRADE 网页版（44.1MB）

