const html = `
<div class="mdui-theme-primary-blue">
    <slot id="appbar" name="appbar"></slot>
    <div style="height: calc(100vh - 104px)">
        <slot name="pager"></slot>
    </div>
</div>
`

export class Scaffold extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({mode: 'open'})
        shadow.innerHTML = html
    }
}
