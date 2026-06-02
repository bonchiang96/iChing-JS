import type { Trigram, WuxingElement } from './types.js';
export declare const TRIGRAMS: Record<string, Trigram>;
/**
 * Ordered list of all 8 trigrams for iteration
 */
export declare const TRIGRAM_LIST: Trigram[];
export interface HexagramData {
    name: string;
    pinyin: string;
    character: string;
    upper: string;
    lower: string;
}
/**
 * King Wen sequence: index 0 = hexagram 1, index 63 = hexagram 64.
 * Trigram binary values are BOTTOM-TO-TOP (bit0 = bottom line).
 */
export declare const HEXAGRAM_TABLE: HexagramData[];
/**
 * Lookup map: "upperBinary-lowerBinary" → hexagram number (1-64)
 */
export declare const HEXAGRAM_LOOKUP: Record<string, number>;
/**
 * Production cycle (相生): element → what it produces
 * 木生火, 火生土, 土生金, 金生水, 水生木
 */
export declare const WUXING_PRODUCES: Record<WuxingElement, WuxingElement>;
/**
 * Control cycle (相克): element → what it controls
 * 木克土, 土克水, 水克火, 火克金, 金克木
 */
export declare const WUXING_CONTROLS: Record<WuxingElement, WuxingElement>;
/**
 * Interpretation text for each 五行 relationship
 */
export declare const WUXING_INTERPRETATIONS: Record<string, string>;
//# sourceMappingURL=constants.d.ts.map