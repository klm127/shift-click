
const feature_flags = {
    /** Whether to clean the dist directory. */
    Clean: false ,
    /** Path to entrypoint for test fixture */
    Test_Fixture: "ts-src/test-fixture/entry.ts",
    /** Whether to emit source maps */
    SourceMaps: false,
}

exports.default = feature_flags

