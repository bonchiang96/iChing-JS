import { HEXAGRAM_TABLE, HEXAGRAM_LOOKUP } from './constants.js';
/**
 * Look up a hexagram by its upper and lower trigrams.
 * @param upper - Upper (outer) trigram
 * @param lower - Lower (inner) trigram
 * @param yaos - The 6 yao lines (bottom to top)
 * @returns Full Hexagram object
 * @throws If the trigram pair doesn't map to a known hexagram
 */
export function lookupHexagram(upper, lower, yaos) {
    const key = `${upper.binary}-${lower.binary}`;
    const number = HEXAGRAM_LOOKUP[key];
    if (number === undefined) {
        throw new Error(`No hexagram found for upper=${upper.binary} (${upper.name}), lower=${lower.binary} (${lower.name})`);
    }
    const data = HEXAGRAM_TABLE[number - 1];
    return {
        number,
        name: data.name,
        pinyin: data.pinyin,
        character: data.character,
        upperTrigram: upper,
        lowerTrigram: lower,
        yaos: [...yaos],
    };
}
/**
 * Get hexagram data by King Wen number (1-64).
 * Note: this returns raw data without trigram objects or yao lines.
 */
export function getHexagramByNumber(number) {
    if (number < 1 || number > 64) {
        throw new Error(`Hexagram number must be 1-64, got ${number}.`);
    }
    return HEXAGRAM_TABLE[number - 1];
}
//# sourceMappingURL=hexagram.js.map