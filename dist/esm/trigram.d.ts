import type { Yao, Trigram } from './types.js';
/**
 * Identify the trigram from 3 yao lines.
 * @param yaos - Array of exactly 3 Yao objects (bottom to top)
 * @returns The matching Trigram
 * @throws If the combination doesn't match any known trigram
 */
export declare function identifyTrigram(yaos: [Yao, Yao, Yao]): Trigram;
/**
 * Look up a trigram by its binary key.
 * @param binary - 3-char binary string (e.g. '111')
 */
export declare function trigramFromBinary(binary: string): Trigram;
/**
 * Look up a trigram by its name.
 * @param name - Chinese name (e.g. '乾')
 */
export declare function trigramByName(name: string): Trigram | undefined;
//# sourceMappingURL=trigram.d.ts.map