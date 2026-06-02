"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyTrigram = identifyTrigram;
exports.trigramFromBinary = trigramFromBinary;
exports.trigramByName = trigramByName;
const constants_js_1 = require("./constants.js");
/**
 * Build the binary key for a trigram from 3 yaos.
 * Binary string uses yang=1, yin=0, BOTTOM-TO-TOP order.
 * Yao array is already bottom-to-top (index 0 = bottom).
 */
function yaosToBinary(yaos) {
    return yaos.map(y => y.polarity === 'yang' ? '1' : '0').join('');
}
/**
 * Identify the trigram from 3 yao lines.
 * @param yaos - Array of exactly 3 Yao objects (bottom to top)
 * @returns The matching Trigram
 * @throws If the combination doesn't match any known trigram
 */
function identifyTrigram(yaos) {
    const binary = yaosToBinary(yaos);
    const trigram = constants_js_1.TRIGRAMS[binary];
    if (!trigram) {
        throw new Error(`Unknown trigram binary: ${binary}`);
    }
    return trigram;
}
/**
 * Look up a trigram by its binary key.
 * @param binary - 3-char binary string (e.g. '111')
 */
function trigramFromBinary(binary) {
    const trigram = constants_js_1.TRIGRAMS[binary];
    if (!trigram) {
        throw new Error(`Unknown trigram binary: ${binary}`);
    }
    return trigram;
}
/**
 * Look up a trigram by its name.
 * @param name - Chinese name (e.g. '乾')
 */
function trigramByName(name) {
    return Object.values(constants_js_1.TRIGRAMS).find(t => t.name === name);
}
//# sourceMappingURL=trigram.js.map