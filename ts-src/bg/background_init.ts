
export function InitBGScript() {
    
    console.log("background script initialized")

    chrome.contextMenus.create({
        id: "start-selection",
        title: "Start Selection",
    })

    chrome.contextMenus.create({
        id: "expand-selection",
        title: "Expand Selection",
        contexts: ["selection"]
    })
}