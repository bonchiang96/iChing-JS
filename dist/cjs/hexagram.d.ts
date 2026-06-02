import type { Yao, Trigram, Hexagram } from './types.js';
/**
 * Look up a hexagram by its upper and lower trigrams.
 * @param upper - Upper (outer) trigram
 * @param lower - Lower (inner) trigram
 * @param yaos - The 6 yao lines (bottom to top)
 * @returns Full Hexagram object
 * @throws If the trigram pair doesn't map to a known hexagram
 */
export declare function lookupHexagram(upper: Trigram, lower: Trigram, yaos: Yao[]): Hexagram;
/**
 * Get hexagram data by King Wen number (1-64).
 * Note: this returns raw data without trigram objects or yao lines.
 */
export declare function getHexagramByNumber(number: number): import("./constants.js").HexagramData;
//# sourceMappingURL=hexagram.d.ts.map