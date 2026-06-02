export type { WuxingElement, Polarity, Mutability, FourSymbol, Yao, Trigram, Hexagram, WuxingRelation, TiYongResult, DivinationResult, } from './types.js';
export { TRIGRAMS, TRIGRAM_LIST, HEXAGRAM_TABLE, HEXAGRAM_LOOKUP, WUXING_PRODUCES, WUXING_CONTROLS, WUXING_INTERPRETATIONS, } from './constants.js';
export type { HexagramData } from './constants.js';
export { processYao, processYaos } from './yao.js';
export { identifyTrigram, trigramFromBinary, trigramByName } from './trigram.js';
export { lookupHexagram, getHexagramByNumber } from './hexagram.js';
export { deriveChanged, deriveNuclear, deriveOpposite, deriveReversed } from './derive.js';
export { determineTiYong } from './tiyong.js';
export { determineWuxingRelation } from './wuxing.js';
import type { DivinationResult } from './types.js';
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
export declare function divine(numbers: number[]): DivinationResult;
//# sourceMappingURL=index.d.ts.map