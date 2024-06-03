
const create_html = require("./indexhtml").default
const dev = require("vite")

const feature_flags = require("./flags").default
const tsConfigPathsPlugin = require("vite-tsconfig-paths").default

async function runDevServer() {
    create_html(feature_flags.Test_Fixture)
    const s = await dev.createServer({
        plugins: [tsConfigPathsPlugin()],
        publicDir: "assets",
    })

    r = await s.listen(5173)

    r.printUrls()
    
}

runDevServer()