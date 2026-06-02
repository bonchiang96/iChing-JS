/**
 * Maps remainder (N mod 4) to yao properties.
 *
 * | Remainder | Four Symbol | Polarity | Mutability |
 * |-----------|-------------|----------|------------|
 * | 1         | 老阳        | yang     | moving     |
 * | 2         | 少阴        | yin      | static     |
 * | 3         | 少阳        | yang     | static     |
 * | 0         | 老阴        | yin      | moving     |
 */
const REMAINDER_MAP = {
    1: { polarity: 'yang', mutability: 'moving', fourSymbol: '老阳' },
    2: { polarity: 'yin', mutability: 'static', fourSymbol: '少阴' },
    3: { polarity: 'yang', mutability: 'static', fourSymbol: '少阳' },
    0: { polarity: 'yin', mutability: 'moving', fourSymbol: '老阴' },
};
/**
 * Process a single number into a Yao.
 * @param number - The input number (positive integer)
 * @param position - Yao position 1-6 (1 = bottom)
 */
export function processYao(number, position) {
    if (!Number.isInteger(number) || number <= 0) {
        throw new Error(`Invalid input number: ${number}. Must be a positive integer.`);
    }
    if (position < 1 || position > 6) {
        throw new Error(`Invalid yao position: ${position}. Must be 1-6.`);
    }
    const remainder = number % 4;
    const mapped = REMAINDER_MAP[remainder];
    return {
        position,
        polarity: mapped.polarity,
        mutability: mapped.mutability,
        symbol: mapped.polarity === 'yang' ? '—' : '- -',
        fourSymbol: mapped.fourSymbol,
        input: number,
    };
}
/**
 * Process all 6 numbers into yao lines.
 * @param numbers - Array of 6 positive integers
 * @returns Array of 6 Yao objects, index 0 = bottom (position 1)
 */
export function processYaos(numbers) {
    if (numbers.length !== 6) {
        throw new Error(`Expected 6 numbers, got ${numbers.length}.`);
    }
    return numbers.map((n, i) => processYao(n, i + 1));
}
//# sourceMappingURL=yao.js.map