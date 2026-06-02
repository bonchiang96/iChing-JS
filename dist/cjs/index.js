"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.determineWuxingRelation = exports.determineTiYong = exports.deriveReversed = exports.deriveOpposite = exports.deriveNuclear = exports.deriveChanged = exports.getHexagramByNumber = exports.lookupHexagram = exports.trigramByName = exports.trigramFromBinary = exports.identifyTrigram = exports.processYaos = exports.processYao = exports.WUXING_INTERPRETATIONS = exports.WUXING_CONTROLS = exports.WUXING_PRODUCES = exports.HEXAGRAM_LOOKUP = exports.HEXAGRAM_TABLE = exports.TRIGRAM_LIST = exports.TRIGRAMS = void 0;
exports.divine = divine;
// ─── Constants ─────────────────────────────────────────────────────────
var constants_js_1 = require("./constants.js");
Object.defineProperty(exports, "TRIGRAMS", { enumerable: true, get: function () { return constants_js_1.TRIGRAMS; } });
Object.defineProperty(exports, "TRIGRAM_LIST", { enumerable: true, get: function () { return constants_js_1.TRIGRAM_LIST; } });
Object.defineProperty(exports, "HEXAGRAM_TABLE", { enumerable: true, get: function () { return constants_js_1.HEXAGRAM_TABLE; } });
Object.defineProperty(exports, "HEXAGRAM_LOOKUP", { enumerable: true, get: function () { return constants_js_1.HEXAGRAM_LOOKUP; } });
Object.defineProperty(exports, "WUXING_PRODUCES", { enumerable: true, get: function () { return constants_js_1.WUXING_PRODUCES; } });
Object.defineProperty(exports, "WUXING_CONTROLS", { enumerable: true, get: function () { return constants_js_1.WUXING_CONTROLS; } });
Object.defineProperty(exports, "WUXING_INTERPRETATIONS", { enumerable: true, get: function () { return constants_js_1.WUXING_INTERPRETATIONS; } });
// ─── Core functions ────────────────────────────────────────────────────
var yao_js_1 = require("./yao.js");
Object.defineProperty(exports, "processYao", { enumerable: true, get: function () { return yao_js_1.processYao; } });
Object.defineProperty(exports, "processYaos", { enumerable: true, get: function () { return yao_js_1.processYaos; } });
var trigram_js_1 = require("./trigram.js");
Object.defineProperty(exports, "identifyTrigram", { enumerable: true, get: function () { return trigram_js_1.identifyTrigram; } });
Object.defineProperty(exports, "trigramFromBinary", { enumerable: true, get: function () { return trigram_js_1.trigramFromBinary; } });
Object.defineProperty(exports, "trigramByName", { enumerable: true, get: function () { return trigram_js_1.trigramByName; } });
var hexagram_js_1 = require("./hexagram.js");
Object.defineProperty(exports, "lookupHexagram", { enumerable: true, get: function () { return hexagram_js_1.lookupHexagram; } });
Object.defineProperty(exports, "getHexagramByNumber", { enumerable: true, get: function () { return hexagram_js_1.getHexagramByNumber; } });
var derive_js_1 = require("./derive.js");
Object.defineProperty(exports, "deriveChanged", { enumerable: true, get: function () { return derive_js_1.deriveChanged; } });
Object.defineProperty(exports, "deriveNuclear", { enumerable: true, get: function () { return derive_js_1.deriveNuclear; } });
Object.defineProperty(exports, "deriveOpposite", { enumerable: true, get: function () { return derive_js_1.deriveOpposite; } });
Object.defineProperty(exports, "deriveReversed", { enumerable: true, get: function () { return derive_js_1.deriveReversed; } });
var tiyong_js_1 = require("./tiyong.js");
Object.defineProperty(exports, "determineTiYong", { enumerable: true, get: function () { return tiyong_js_1.determineTiYong; } });
var wuxing_js_1 = require("./wuxing.js");
Object.defineProperty(exports, "determineWuxingRelation", { enumerable: true, get: function () { return wuxing_js_1.determineWuxingRelation; } });
const yao_js_2 = require("./yao.js");
const trigram_js_2 = require("./trigram.js");
const hexagram_js_2 = require("./hexagram.js");
const derive_js_2 = require("./derive.js");
const tiyong_js_2 = require("./tiyong.js");
/**
 * Perform a complete I Ching divination from 6 input numbers.
 *
 * @param numbers - Array of 6 positive integers
 * @returns Complete DivinationResult with all derived hexagrams and analysis
 *
 * @example
 * ```ts
 * import { divine } from 'iching-pro';
 * const result = divine([11, 20, 5, 14, 3, 7]);
 * console.log(result.primary.name);    // '丰'
 * console.log(result.changed.name);    // '归妹'
 * console.log(result.tiYong.relation); // 'subject-produces'
 * ```
 */
function divine(numbers) {
    // Step 1: Process yaos
    const yaos = (0, yao_js_2.processYaos)(numbers);
    // Step 2: Identify trigrams and look up primary hexagram
    // Binary is bottom-to-top: yao array is already in this order
    const lowerBin = yaos.slice(0, 3).map(y => y.polarity === 'yang' ? '1' : '0').join('');
    const upperBin = yaos.slice(3, 6).map(y => y.polarity === 'yang' ? '1' : '0').join('');
    const lowerTrigram = (0, trigram_js_2.trigramFromBinary)(lowerBin);
    const upperTrigram = (0, trigram_js_2.trigramFromBinary)(upperBin);
    const primary = (0, hexagram_js_2.lookupHexagram)(upperTrigram, lowerTrigram, yaos);
    // Step 3: Derive all hexagrams
    const changed = (0, derive_js_2.deriveChanged)(primary);
    const nuclear = (0, derive_js_2.deriveNuclear)(primary);
    const opposite = (0, derive_js_2.deriveOpposite)(primary);
    const reversed = (0, derive_js_2.deriveReversed)(primary);
    // Step 4: 体用 analysis
    const tiYong = (0, tiyong_js_2.determineTiYong)(primary);
    return {
        input: numbers,
        yaos,
        primary,
        changed,
        nuclear,
        opposite,
        reversed,
        tiYong,
    };
}
//# sourceMappingURL=index.js.map