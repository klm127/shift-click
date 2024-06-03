
const fs = require('fs')

function createTempIndexHtml(entry_ts) {
    const s = `<!DOCTYPE html>
    <html lang="en">
        <body>
        <script type="module" src="${entry_ts}"></script>
        </body>
    </html>`

    fs.writeFileSync("index.html", s)
    
}

exports.default = createTempIndexHtml