const { entries } = require("./entries");
const build = require("vite").build
const rimraf = require("rimraf").rimraf

const feature_flags = require("./flags").default

async function buildAll() {
    if(feature_flags.Clean == true) {
        console.log("Cleaning /dist.")
        rimraf('dist')
    }
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