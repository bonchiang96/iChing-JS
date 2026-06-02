import type { Hexagram } from './types.js';
/**
 * Derive the Changed Hexagram (变卦).
 * Moving yaos flip polarity; static yaos stay the same.
 */
export declare function deriveChanged(primary: Hexagram): Hexagram;
/**
 * Derive the Nuclear Hexagram (互卦).
 * - Lower nuclear: yaos 2, 3, 4 (indices 1, 2, 3)
 * - Upper nuclear: yaos 3, 4, 5 (indices 2, 3, 4)
 */
export declare function deriveNuclear(primary: Hexagram): Hexagram;
/**
 * Derive the Opposite Hexagram (错卦 / 旁通卦).
 * All 6 yaos flip polarity.
 */
export declare function deriveOpposite(primary: Hexagram): Hexagram;
/**
 * Derive the Reversed Hexagram (综卦 / 覆卦).
 * Reverse the order of all 6 yaos (rotate 180°).
 */
export declare function deriveReversed(primary: Hexagram): Hexagram;
//# sourceMappingURL=derive.d.ts.map