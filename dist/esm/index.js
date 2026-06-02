// ─── Constants ─────────────────────────────────────────────────────────
export { TRIGRAMS, TRIGRAM_LIST, HEXAGRAM_TABLE, HEXAGRAM_LOOKUP, WUXING_PRODUCES, WUXING_CONTROLS, WUXING_INTERPRETATIONS, } from './constants.js';
// ─── Core functions ────────────────────────────────────────────────────
export { processYao, processYaos } from './yao.js';
export { identifyTrigram, trigramFromBinary, trigramByName } from './trigram.js';
export { lookupHexagram, getHexagramByNumber } from './hexagram.js';
export { deriveChanged, deriveNuclear, deriveOpposite, deriveReversed } from './derive.js';
export { determineTiYong } from './tiyong.js';
export { determineWuxingRelation } from './wuxing.js';
import { processYaos } from './yao.js';
import { trigramFromBinary } from './trigram.js';
import { lookupHexagram } from './hexagram.js';
import { deriveChanged, deriveNuclear, deriveOpposite, deriveReversed } from './derive.js';
import { determineTiYong } from './tiyong.js';
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
export function divine(numbers) {
    // Step 1: Process yaos
    const yaos = processYaos(numbers);
    // Step 2: Identify trigrams and look up primary hexagram
    // Binary is bottom-to-top: yao array is already in this order
    const lowerBin = yaos.slice(0, 3).map(y => y.polarity === 'yang' ? '1' : '0').join('');
    const upperBin = yaos.slice(3, 6).map(y => y.polarity === 'yang' ? '1' : '0').join('');
    const lowerTrigram = trigramFromBinary(lowerBin);
    const upperTrigram = trigramFromBinary(upperBin);
    const primary = lookupHexagram(upperTrigram, lowerTrigram, yaos);
    // Step 3: Derive all hexagrams
    const changed = deriveChanged(primary);
    const nuclear = deriveNuclear(primary);
    const opposite = deriveOpposite(primary);
    const reversed = deriveReversed(primary);
    // Step 4: 体用 analysis
    const tiYong = determineTiYong(primary);
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