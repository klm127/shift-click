import { ID_ExpandSelection, ID_StartSelection } from "@/const"

/** Create Context Menu Items */
export function InitBGScript() {
    
    console.log("background script initialized")

    chrome.contextMenus.create({
        id: ID_StartSelection,
        title: "Start Selection",
    })

    chrome.contextMenus.create({
        id: ID_ExpandSelection,
        title: "Expand Selection"
    })

    chrome.contextMenus.onClicked.addListener(ListenForContextClicks)
}

/** Listen for clicks on Context Menu items; send corresponding message to content script */
function ListenForContextClicks(info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab | undefined) {
    if(tab === undefined || tab.id === undefined) {
        return 
    }
    if(info.menuItemId === ID_StartSelection) {
        chrome.tabs.sendMessage(tab.id, {type: ID_StartSelection})

    } else if(info.menuItemId === ID_ExpandSelection) {
        chrome.tabs.sendMessage(tab.id, {type: ID_ExpandSelection})
    }
}