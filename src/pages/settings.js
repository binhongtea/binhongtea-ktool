import {open} from '../store/idb-keyval.js'
import {template, use} from '../template.js'
import {Lib} from './lib.js'

const lib = open('lib')
const songs = open('songs')

function requestClearData() {
    let abort = false

    mdui.snackbar({
        message: '已清除数据',
        buttonText: '撤回',
        onButtonClick: () => abort = true,
        onClosed: () => {
            if (abort) {
                return
            }

            clearData()
        }
    })
}

function clearData() {
    lib.clear()
    songs.clear()

    Lib.instance.freshContent()
}

const html = template`
<ul class="mdui-list" id="settings">
  <li class="mdui-list-item mdui-ripple" on:click="${requestClearData}">清除数据</li>
</ul>`

export class Settings extends HTMLElement {
    constructor() {
        super()

        use(this, html)
    }
}