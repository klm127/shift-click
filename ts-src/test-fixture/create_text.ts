
export function createText(n: number) {
    let s = ""
    for(let i = 0; i < n; i++) {
        s += randWord() + " "
    }
    const div = document.createElement("div")
    div.textContent = s
    div.classList.add("rand-text")
    document.body.append(div)
}

function randWord() {
    let w_length = Math.floor(Math.random() * 10)
    const rtext = randText(w_length)
    return rtext
}

function randText(n: number) {
    let s = ""
    for(let i = 0; i < n; i++) {
        s += randChar()
    }
    return s 
}

function randChar() {
    return String.fromCharCode(65 + Math.floor(Math.random() * 26))
}