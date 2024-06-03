const fs = require("fs")

/** Populated from the files in ts-src/entries folder */
exports.entries = {}

function removeDebugEntry() {
	delete exports.entries.debug
}

/** Returns whether debug mode is active. ALSO mutates entires; deletes the debug entry if debug mode is NOT on. So it should be called prior to actual build step. */
exports.getFeatureFlagsAndSetEntry = async function(){
	const ff = await import("../ts-src/const/featflags.mjs")
	if(!ff.featureFlags.DB_Mode) {
		console.log("🐛 Debug mode is off, removing debug entry point.")
		removeDebugEntry()
	} else {
		console.log("🐛 Debug mode is on, preserving debug entry point.")
	}
	return ff.featureFlags
}


/** @param {string[]} files */
function processFiles(files) {
	for(let f of files) {
		const fname = f.split(".")[0]
		exports.entries[fname] = `ts-src/entry/${f}`
	}
}

const files = fs.readdirSync("ts-src/entry")
processFiles(files)
