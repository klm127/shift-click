import { ID_StartSelection, ID_ExpandSelection } from "@/const"
import Menu from "./menu"
import { expandSelection, startSelection } from "./selection"


let t_out : number | undefined

export function Init() {
    
    document.addEventListener("contextmenu", (e) => {
        Menu.style.display = "flex"
        if(t_out) {
            clearTimeout(t_out)
        }
        t_out = setTimeout(() => {
            t_out = undefined
            Menu.style.display = "none"
        }, 5000)
    })
}