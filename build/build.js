const { entries } = require("./entries");
const build = require("vite").build


async function buildAll() {
    for(let [key, val] of Object.entries(entries)) {
        console.log(`Building ${key} from ${val}`)
        await build({
            publicDir: "assets",
            build: {
                emptyOutDir: false,
                rollupOptions: {
                    output: {
                        dir: "dist",
                        entryFileNames: `js/${key}.js`,
                        assetFileNames: `assets/[name].[extname]`
                    },
                    
                },
                
            }
        })
    }
}

buildAll()