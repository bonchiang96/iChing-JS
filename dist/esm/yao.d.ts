import type { Yao } from './types.js';
/**
 * Process a single number into a Yao.
 * @param number - The input number (positive integer)
 * @param position - Yao position 1-6 (1 = bottom)
 */
export declare function processYao(number: number, position: number): Yao;
/**
 * Process all 6 numbers into yao lines.
 * @param numbers - Array of 6 positive integers
 * @returns Array of 6 Yao objects, index 0 = bottom (position 1)
 */
export declare function processYaos(numbers: number[]): Yao[];
//# sourceMappingURL=yao.d.ts.map