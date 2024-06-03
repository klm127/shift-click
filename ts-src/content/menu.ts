import { expandSelection, startSelection } from "./selection"

const Menu = document.createElement("div")
Menu.style.position = "fixed"
Menu.style.bottom = "0"
Menu.style.left = "0"
Menu.style.width = "100%"
Menu.style.display = "none"
Menu.style.justifyContent = "center"
Menu.style.padding = "2px"
Menu.style.margin = "0px"
Menu.style.zIndex = "5000"


const StartSelection = document.createElement("button")
StartSelection.textContent = "Start Selection"
StartSelection.style.fontSize = "1.5em"
Menu.append(StartSelection)

StartSelection.addEventListener("click", () => {
    startSelection()
    Menu.style.display = "none"
})

const ExpandSelection = document.createElement("button")
ExpandSelection.textContent = "Expand Selection"
ExpandSelection.style.fontSize = "1.5em"
ExpandSelection.addEventListener("click", () => {
    expandSelection()
    Menu.style.display = "none"
})
Menu.append(ExpandSelection)

document.body.append(Menu)

export default Menu