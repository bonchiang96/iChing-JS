import type { Yao, Hexagram } from './types.js';
import { trigramFromBinary } from './trigram.js';
import { lookupHexagram } from './hexagram.js';

/**
 * Helper: build a trigram binary string from 3 yaos.
 * Binary is BOTTOM-TO-TOP: yao array is already in this order.
 */
function yaosToBinary3(yaos: Yao[]): string {
  return yaos.map(y => y.polarity === 'yang' ? '1' : '0').join('');
}

/**
 * Helper: create a new Yao with flipped polarity (for moving yaos or 错卦).
 */
function flipYao(yao: Yao): Yao {
  return {
    ...yao,
    polarity: yao.polarity === 'yang' ? 'yin' : 'yang',
    symbol: yao.polarity === 'yang' ? '- -' : '—',
    fourSymbol: yao.polarity === 'yang' ? '老阴' : '老阳',
  };
}

// ─── 变卦 (Changed Hexagram) ──────────────────────────────────────────

/**
 * Derive the Changed Hexagram (变卦).
 * Moving yaos flip polarity; static yaos stay the same.
 */
export function deriveChanged(primary: Hexagram): Hexagram {
  const newYaos = primary.yaos.map(y =>
    y.mutability === 'moving' ? flipYao(y) : { ...y }
  );

  const lowerBin = yaosToBinary3(newYaos.slice(0, 3));
  const upperBin = yaosToBinary3(newYaos.slice(3, 6));
  const lower = trigramFromBinary(lowerBin);
  const upper = trigramFromBinary(upperBin);

  return lookupHexagram(upper, lower, newYaos);
}

// ─── 互卦 (Nuclear Hexagram) ──────────────────────────────────────────

/**
 * Derive the Nuclear Hexagram (互卦).
 * - Lower nuclear: yaos 2, 3, 4 (indices 1, 2, 3)
 * - Upper nuclear: yaos 3, 4, 5 (indices 2, 3, 4)
 */
export function deriveNuclear(primary: Hexagram): Hexagram {
  const yaos = primary.yaos;

  // Lower nuclear trigram: yaos 2, 3, 4
  const lowerNuclear = [yaos[1], yaos[2], yaos[3]];
  // Upper nuclear trigram: yaos 3, 4, 5
  const upperNuclear = [yaos[2], yaos[3], yaos[4]];

  const lowerBin = yaosToBinary3(lowerNuclear);
  const upperBin = yaosToBinary3(upperNuclear);
  const lower = trigramFromBinary(lowerBin);
  const upper = trigramFromBinary(upperBin);

  // Nuclear hexagram yaos: 6 lines built from the two trigrams
  const newYaos: Yao[] = [
    { ...yaos[1], position: 1 },
    { ...yaos[2], position: 2 },
    { ...yaos[3], position: 3 },
    { ...yaos[2], position: 4 },
    { ...yaos[3], position: 5 },
    { ...yaos[4], position: 6 },
  ];

  return lookupHexagram(upper, lower, newYaos);
}

// ─── 错卦 (Opposite Hexagram) ─────────────────────────────────────────

/**
 * Derive the Opposite Hexagram (错卦 / 旁通卦).
 * All 6 yaos flip polarity.
 */
export function deriveOpposite(primary: Hexagram): Hexagram {
  const newYaos = primary.yaos.map(y => flipYao(y));

  const lowerBin = yaosToBinary3(newYaos.slice(0, 3));
  const upperBin = yaosToBinary3(newYaos.slice(3, 6));
  const lower = trigramFromBinary(lowerBin);
  const upper = trigramFromBinary(upperBin);

  return lookupHexagram(upper, lower, newYaos);
}

// ─── 综卦 (Reversed Hexagram) ─────────────────────────────────────────

/**
 * Derive the Reversed Hexagram (综卦 / 覆卦).
 * Reverse the order of all 6 yaos (rotate 180°).
 */
export function deriveReversed(primary: Hexagram): Hexagram {
  // Reverse the yao order and reassign positions
  const newYaos: Yao[] = [...primary.yaos]
    .reverse()
    .map((y, i) => ({ ...y, position: i + 1 }));

  const lowerBin = yaosToBinary3(newYaos.slice(0, 3));
  const upperBin = yaosToBinary3(newYaos.slice(3, 6));
  const lower = trigramFromBinary(lowerBin);
  const upper = trigramFromBinary(upperBin);

  return lookupHexagram(upper, lower, newYaos);
}
