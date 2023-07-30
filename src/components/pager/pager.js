const html = `
<style>
.container {
    width: 100%;
    height: 100%;
    contain: paint;
}
</style>

<div id="container" class="container">
    <slot></slot>
</div>
`

export class Pager extends HTMLElement {
    constructor() {
        super()

        const shadow = this.attachShadow({mode: 'open'})
        shadow.innerHTML = html
    }

    connectedCallback() {
        
    }
}