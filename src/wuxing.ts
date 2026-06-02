import type { WuxingElement, WuxingRelation } from './types.js';
import { WUXING_PRODUCES, WUXING_CONTROLS } from './constants.js';

/**
 * Determine the five-element relationship between subject and object.
 * @param subjectElement - Element of the 体卦 (subject trigram)
 * @param objectElement - Element of the 用卦 (object trigram)
 * @returns The Wuxing relationship
 */
export function determineWuxingRelation(
  subjectElement: WuxingElement,
  objectElement: WuxingElement
): WuxingRelation {
  // Same element
  if (subjectElement === objectElement) {
    return 'same-element';
  }

  // Subject produces object (体生用)
  if (WUXING_PRODUCES[subjectElement] === objectElement) {
    return 'subject-produces';
  }

  // Object produces subject (用生体)
  if (WUXING_PRODUCES[objectElement] === subjectElement) {
    return 'object-produces';
  }

  // Subject controls object (体克用)
  if (WUXING_CONTROLS[subjectElement] === objectElement) {
    return 'subject-controls';
  }

  // Object controls subject (用克体)
  if (WUXING_CONTROLS[objectElement] === subjectElement) {
    return 'object-controls';
  }

  // Should never reach here with valid elements
  throw new Error(`No relationship found between ${subjectElement} and ${objectElement}`);
}
