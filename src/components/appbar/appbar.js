const html = `
<div class="mdui-toolbar mdui-color-theme">
  <span class="mdui-typo-title">REM Lite</span>
</div>
<div class="mdui-tab mdui-color-theme" mdui-tab>
    <a href="#lib" class="mdui-ripple mdui-ripple-white">库</a>
    <a href="#playing" class="mdui-ripple mdui-ripple-white">正在播放</a>
    <a href="#settings" class="mdui-ripple mdui-ripple-white">设置</a>
</div>
`

export class Appbar extends HTMLElement {
    constructor() {
        super()

        this.innerHTML = html
    }
}
