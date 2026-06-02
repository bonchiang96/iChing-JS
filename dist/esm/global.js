/**
 * Browser global entry point.
 * Bundled by esbuild into iChing.js for <script> tag usage.
 * All exports are attached to `window` so they can be called directly.
 */
import { divine, TRIGRAMS, TRIGRAM_LIST, HEXAGRAM_TABLE, HEXAGRAM_LOOKUP, WUXING_CONTROLS, WUXING_PRODUCES, WUXING_INTERPRETATIONS, processYao, processYaos, identifyTrigram, trigramFromBinary, trigramByName, lookupHexagram, getHexagramByNumber, deriveChanged, deriveNuclear, deriveOpposite, deriveReversed, determineTiYong, determineWuxingRelation, } from './index.js';
// Attach to window for non-module <script> usage
Object.assign(window, {
    divine,
    TRIGRAMS,
    TRIGRAM_LIST,
    HEXAGRAM_TABLE,
    HEXAGRAM_LOOKUP,
    WUXING_CONTROLS,
    WUXING_PRODUCES,
    WUXING_INTERPRETATIONS,
    processYao,
    processYaos,
    identifyTrigram,
    trigramFromBinary,
    trigramByName,
    lookupHexagram,
    getHexagramByNumber,
    deriveChanged,
    deriveNuclear,
    deriveOpposite,
    deriveReversed,
    determineTiYong,
    determineWuxingRelation,
});
//# sourceMappingURL=global.js.map