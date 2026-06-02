"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Browser global entry point.
 * Bundled by esbuild into iChing.js for <script> tag usage.
 * All exports are attached to `window` so they can be called directly.
 */
const index_js_1 = require("./index.js");
// Attach to window for non-module <script> usage
Object.assign(window, {
    divine: index_js_1.divine,
    TRIGRAMS: index_js_1.TRIGRAMS,
    TRIGRAM_LIST: index_js_1.TRIGRAM_LIST,
    HEXAGRAM_TABLE: index_js_1.HEXAGRAM_TABLE,
    HEXAGRAM_LOOKUP: index_js_1.HEXAGRAM_LOOKUP,
    WUXING_CONTROLS: index_js_1.WUXING_CONTROLS,
    WUXING_PRODUCES: index_js_1.WUXING_PRODUCES,
    WUXING_INTERPRETATIONS: index_js_1.WUXING_INTERPRETATIONS,
    processYao: index_js_1.processYao,
    processYaos: index_js_1.processYaos,
    identifyTrigram: index_js_1.identifyTrigram,
    trigramFromBinary: index_js_1.trigramFromBinary,
    trigramByName: index_js_1.trigramByName,
    lookupHexagram: index_js_1.lookupHexagram,
    getHexagramByNumber: index_js_1.getHexagramByNumber,
    deriveChanged: index_js_1.deriveChanged,
    deriveNuclear: index_js_1.deriveNuclear,
    deriveOpposite: index_js_1.deriveOpposite,
    deriveReversed: index_js_1.deriveReversed,
    determineTiYong: index_js_1.determineTiYong,
    determineWuxingRelation: index_js_1.determineWuxingRelation,
});
//# sourceMappingURL=global.js.map