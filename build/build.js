const { entries } = require("./entries");
const build = require("vite").build
const rimraf = require("rimraf").rimraf
const tsConfigPathsPlugin = require("vite-tsconfig-paths").default

const create_html = require("./indexhtml").default

const feature_flags = require("./flags").default

async function buildAll() {
    if(feature_flags.Clean == true) {
        console.log("Cleaning /dist.")
        rimraf('dist')
    }
    for(let [key, val] of Object.entries(entries)) {
        console.log(`Building ${key} from ${val}`)
        create_html(val)
        await build({
            plugins: [tsConfigPathsPlugin()],
            publicDir: "assets",
            build: {
                minify: false,
                sourcemap: feature_flags.SourceMaps,
                emptyOutDir: false,
                rollupOptions: {
                    output: {
                        dir: "dist",
                        entryFileNames: `js/${key}.js`,
                        assetFileNames: `assets/[name].[extname]`,
                        compact: false,
                        
                    },                    
                },
                
            }
        })
    }
}

buildAll()