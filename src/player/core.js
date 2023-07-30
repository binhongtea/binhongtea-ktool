const audioCore = document.createElement('audio')

export function load(src) {
    audioCore.src = src

    return new Promise(res => {
        audioCore.oncanplay = () => res()
    })
}

export async function play() {
    return await audioCore.play()
}

export function pause() {
    audioCore.pause()
}

export function current(time) {
    if (typeof time === 'number') {
        audioCore.currentTime = time
        return
    }

    return audioCore.currentTime
}