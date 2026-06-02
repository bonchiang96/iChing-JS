import type { Hexagram, TiYongResult } from './types.js';
import { determineWuxingRelation } from './wuxing.js';
import { WUXING_INTERPRETATIONS } from './constants.js';

/**
 * Determine the 体用 (subject-object) relationship from a hexagram.
 *
 * Rules:
 * 1. Moving yaos only in upper trigram → upper = 用, lower = 体
 * 2. Moving yaos only in lower trigram → lower = 用, upper = 体
 * 3. Moving yaos in both → lowest-moving yao's trigram = 用, other = 体
 * 4. No moving yaos → lower = 体, upper = 用
 */
export function determineTiYong(hexagram: Hexagram): TiYongResult {
  const yaos = hexagram.yaos;

  // Moving yaos in lower trigram (positions 1-3, indices 0-2)
  const lowerMoving = yaos.slice(0, 3).some(y => y.mutability === 'moving');
  // Moving yaos in upper trigram (positions 4-6, indices 3-5)
  const upperMoving = yaos.slice(3, 6).some(y => y.mutability === 'moving');

  let subject = hexagram.lowerTrigram;
  let object = hexagram.upperTrigram;

  if (!lowerMoving && upperMoving) {
    // Case 1: Moving only in upper → upper = 用, lower = 体
    subject = hexagram.lowerTrigram;
    object = hexagram.upperTrigram;
  } else if (lowerMoving && !upperMoving) {
    // Case 2: Moving only in lower → lower = 用, upper = 体
    subject = hexagram.upperTrigram;
    object = hexagram.lowerTrigram;
  } else if (lowerMoving && upperMoving) {
    // Case 3: Both have moving → lowest-moving yao determines 用
    const lowestMovingIdx = yaos.findIndex(y => y.mutability === 'moving');
    if (lowestMovingIdx < 3) {
      // Lowest moving is in lower trigram → lower = 用
      subject = hexagram.upperTrigram;
      object = hexagram.lowerTrigram;
    } else {
      // Lowest moving is in upper trigram → upper = 用
      subject = hexagram.lowerTrigram;
      object = hexagram.upperTrigram;
    }
  }
  // Case 4: No moving yaos → defaults already set (lower = 体, upper = 用)

  const relation = determineWuxingRelation(subject.element, object.element);

  return {
    subject,
    object,
    relation,
    interpretation: WUXING_INTERPRETATIONS[relation],
  };
}
