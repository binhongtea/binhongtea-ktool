/**
 * @param {string} str 
 * @returns 
 */
function StringLike(str) {
    return {
        toString: () => str
    }
}

const crypto = {
    id: 0,
    randomUUID() {
        return crypto.id++
    }
}

/**
 * @param {string[]} strs 
 * @param {any[]} args 
 * @returns
 */
export function template(strs, ...args) {
    let templateStr = ''
    let handlersMap = {}

    templateStr = strs.reduce((pre, cur, i) => {
        i--

        const val = args[i]
        if (!val) {
            return pre + cur
        }

        if (Array.isArray(val)) {
            const arrStr = val.reduce((pre, cur) => {
                if (cur.toString && cur.map) {
                    handlersMap = Object.assign(handlersMap, cur.map)
                }

                return pre + cur
            }, '')

            return pre + arrStr + cur
        }

        if (val.toString && val.map) {
            handlersMap = Object.assign(handlersMap, val.map)
            return pre + val + cur
        }

        if (typeof val === 'function') {
            const uuid = crypto.randomUUID()
            handlersMap[uuid] = val
            return pre + uuid + cur
        }

        return pre + val + cur
        
    }, '')

    const strObj = StringLike(templateStr)
    strObj.map = handlersMap

    return strObj
}

/**
 * @param {HTMLElement} ele 
 * @param {{toString: () => string}} template 
 * @returns 
 */
export function use(ele, template) {
    ele.innerHTML = template

    if (!template.map) {
        return
    }

    bindEvents(ele, template.map)
}

/**
 * @param {HTMLElement} root 
 * @param {(el: HTMLElement) => void} callback 
 */
function traverse(root, callback) {
    [...root.children].forEach(el => {
        callback.call(root, el)
        traverse(el, callback)
    })
}

/**
 * @param {HTMLElements} ele
 */
function bindEvents(ele, map) {
    traverse(ele, ele => {
        const keys = Reflect.ownKeys(ele.attributes).filter(k => k.startsWith('on:'))

        for (const k of keys) {
            const uuid = ele.getAttribute(k)
            if (!uuid) {
                continue
            }

            const [_, evName] = k.split(':')
            ele.addEventListener(evName, map[uuid])
            ele.removeAttribute(k)
        }
    })
}