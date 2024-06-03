import { ID_ExpandSelection, ID_StartSelection } from "@/const"



let first_anchor : Node | undefined
let first_anchor_offset : number | undefined


chrome.runtime.onMessage.addListener((message) => {
    if(message.type == ID_StartSelection) {
        startSelection()
    } else if(message.type == ID_ExpandSelection) {
        expandSelection()
    }
})

function startSelection() {
    const sel = window.getSelection()
    if(!sel) {
        first_anchor = undefined
        first_anchor_offset = undefined
        return 
    }
    if(sel.anchorNode === null) {
        first_anchor = undefined
        first_anchor_offset = undefined
        return
    }
    first_anchor = sel.anchorNode
    first_anchor_offset = sel.anchorOffset
}

function expandSelection() {
    if(!first_anchor || first_anchor_offset === undefined) {
        return
    }
    const saved_range = document.createRange()
    saved_range.setStart(first_anchor, first_anchor_offset)

    const cur_sel = window.getSelection()
    if(!cur_sel) {
        return 
    }
    if(!cur_sel.anchorNode) {
        return 
    }
    const cur_range = cur_sel.getRangeAt(cur_sel.rangeCount - 1)

    let start_range : Range
    let end_range : Range
    const compare = saved_range.compareBoundaryPoints(Range.START_TO_START, cur_range)

    if(compare < 0) {
        start_range = saved_range
        end_range = cur_range
    } else {
        start_range = cur_range
        end_range = saved_range
    }
    start_range.setEnd(end_range.endContainer, end_range.endOffset)
    
    cur_sel.removeAllRanges()
    cur_sel.addRange(start_range)

}