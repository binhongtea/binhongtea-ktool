import {open} from '../store/idb-keyval.js'
import {template, use} from '../template.js'
import {play, load} from '../player/core.js'

const lib = open('lib')
const songs = open('songs')

let files = null

;(async() => {
    files = await lib.get('all')

    _fp = document.createElement('input')
    _fp.type = 'file'
    _fp.multiple = 'true'
    _fp.accept = 'audio/*'
})()

let _fp
function pickFiles() {
    return new Promise((res) => {
        _fp.onchange = () => res(_fp.files)
        _fp.click()
    })
}

async function selectFiles(ev) {
    files = await pickFiles()

    ev.target.style.display = 'none'
    await lib.set('all', files)
    Lib.instance.freshContent()

    await saveSongs(files)
}

function readFile(file) {
    const fr = new FileReader()
    fr.readAsArrayBuffer(file)
    
    return new Promise(res => {
        fr.onloadend = () => {
            res(fr.result)
        }
    })
}

async function saveSongs(files) {
    for (const file of files) {
        const buffer = await readFile(file)

        await songs.set(file.name, buffer)
    }
}

const selectedFiles = template`
<div style="height: 100%; width: 100%; display: flex; justify-content: center; align-items: center;">
    <button
        class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme"
        on:click="${selectFiles}"
    >选择文件</button>
</div>`

async function playSelected(i) {
    const buffer = await readFile(files[i])
    const url = URL.createObjectURL(new Blob([buffer]))
    await load(url)
    play()
}

const listTile = (name, i) => template`
<li class="mdui-list-item mdui-ripple" on:click="${
    () => playSelected(i)
}">${name}</li>`

const list = li => template`
<ul class="mdui-list">
    ${li.map(({name}, i) => listTile(name, i))}
</ul>`

async function renderContent() {
    const _list = await lib.get('all')
    if (!_list) {
        return selectedFiles
    }

    return list([..._list])
}

const html = async() => template`
<div style="height: 100%; width: 100%; overflow: auto;" id="lib">
    ${await renderContent()}
</div>
`

export class Lib extends HTMLElement {
    instance = null

    constructor() {
        super()

        this.id = 'lib'
        this.freshContent()

        Lib.instance = this
    }

    async freshContent() {
        use(this, await html())
    }
}