import type { Hexagram, TiYongResult } from './types.js';
/**
 * Determine the 体用 (subject-object) relationship from a hexagram.
 *
 * Rules:
 * 1. Moving yaos only in upper trigram → upper = 用, lower = 体
 * 2. Moving yaos only in lower trigram → lower = 用, upper = 体
 * 3. Moving yaos in both → lowest-moving yao's trigram = 用, other = 体
 * 4. No moving yaos → lower = 体, upper = 用
 */
export declare function determineTiYong(hexagram: Hexagram): TiYongResult;
//# sourceMappingURL=tiyong.d.ts.map