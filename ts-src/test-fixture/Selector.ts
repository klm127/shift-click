
export class Selector {

    selectionStart: HTMLButtonElement
    selectionExpand: HTMLButtonElement
    err_el: HTMLElement

    start_anchor: Node | undefined
    anchor_offset : number | undefined

    constructor() {
        this.selectionStart = document.createElement("button")
        this.selectionExpand = document.createElement("button")
        this.err_el = document.createElement("pre")
        this.err_el.style.display = "block"
        this.selStartClick = this.selStartClick.bind(this)
        this.selExpandClick = this.selExpandClick.bind(this)
        this.selectionStart.addEventListener("click", this.selStartClick)
        this.selectionExpand.addEventListener("click", this.selExpandClick)
        this.selectionStart.textContent = "Start Selection"
        this.selectionExpand.textContent = "Expand Selection"
        document.body.append(this.selectionStart, this.selectionExpand, this.err_el)
    }
    set err(to: string | any) {
        if(typeof to === "string") {
            this.err_el.textContent = to
        } else {
            this.err_el.textContent = JSON.stringify(to, undefined, 4)
        }
    }

    selStartClick() {
        const selection = window.getSelection()
        if(!selection) {
            this.err = "No selection."
            return 
        }
        if(selection.anchorNode === null) {
            this.err = "No anchor node."
            return 
        }
        this.start_anchor = selection.anchorNode
        this.anchor_offset = selection.anchorOffset
        this.err = "Set anchor node and offset"
        if(selection) {
            console.log(selection)
        }
        this.err = ""

    }
    selExpandClick() {
        this.err = {"what":3,"how":4}
        const saved_range = document.createRange()
        console.log(saved_range)
        if(!this.start_anchor || !this.anchor_offset) { 
            this.err = "No start anchor"
            return
        }
        saved_range.setStart(this.start_anchor!, this.anchor_offset!)

        const sel = window.getSelection()
        if(!sel) {
            this.err = "No selection."
            return
        }
        if(!sel?.anchorNode) {
            this.err = "No anchor node."
            return 
        }
        const second_range = sel.getRangeAt(sel.rangeCount - 1)

        let start_range : Range
        let end_range : Range

        const compare = saved_range.compareBoundaryPoints(Range.START_TO_START, second_range)

        if(compare < 0) {
            start_range = saved_range
            end_range = second_range
        } else {
            start_range = second_range
            end_range = saved_range
        }

        start_range.setEnd(end_range.endContainer, end_range.endOffset)

        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(start_range)

    }
}