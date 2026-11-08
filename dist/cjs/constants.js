"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WUXING_INTERPRETATIONS = exports.WUXING_CONTROLS = exports.WUXING_PRODUCES = exports.HEXAGRAM_LOOKUP = exports.HEXAGRAM_TABLE = exports.TRIGRAM_LIST = exports.TRIGRAMS = void 0;
// ─── 8 Trigrams ────────────────────────────────────────────────────────
// Binary encoding: yang=1, yin=0, read BOTTOM-TO-TOP
// (bit0 = bottom line, bit1 = middle line, bit2 = top line)
// This matches the Unicode standard (U+2630-U+2637) and the King Wen order:
//
//   乾 ☰: — — —          → 111  Metal
//   兑 ☱: — — - -         → 110  Metal
//   离 ☲: — - - —         → 101  Fire
//   震 ☳: — - - - -       → 100  Wood
//   巽 ☴: - - - - —       → 011  Wood
//   坎 ☵: - - — - -       → 010  Water
//   艮 ☶: - - - - —       → 001  Earth
//   坤 ☷: - - - - - -     → 000  Earth
exports.TRIGRAMS = {
    '111': { name: '乾', symbol: '☰', element: '金', binary: '111' },
    '110': { name: '兑', symbol: '☱', element: '金', binary: '110' },
    '101': { name: '离', symbol: '☲', element: '火', binary: '101' },
    '100': { name: '震', symbol: '☳', element: '木', binary: '100' },
    '011': { name: '巽', symbol: '☴', element: '木', binary: '011' },
    '010': { name: '坎', symbol: '☵', element: '水', binary: '010' },
    '001': { name: '艮', symbol: '☶', element: '土', binary: '001' },
    '000': { name: '坤', symbol: '☷', element: '土', binary: '000' },
};
/**
 * Ordered list of all 8 trigrams for iteration
 */
exports.TRIGRAM_LIST = Object.values(exports.TRIGRAMS);
/**
 * King Wen sequence: index 0 = hexagram 1, index 63 = hexagram 64.
 * Trigram binary values are BOTTOM-TO-TOP (bit0 = bottom line).
 */
exports.HEXAGRAM_TABLE = [
    /*  1 */ { name: '乾', pinyin: 'Qián', character: '䷀', upper: '111', lower: '111' },
    /*  2 */ { name: '坤', pinyin: 'Kūn', character: '䷁', upper: '000', lower: '000' },
    /*  3 */ { name: '屯', pinyin: 'Zhūn', character: '䷂', upper: '010', lower: '100' },
    /*  4 */ { name: '蒙', pinyin: 'Méng', character: '䷃', upper: '001', lower: '010' },
    /*  5 */ { name: '需', pinyin: 'Xū', character: '䷄', upper: '010', lower: '111' },
    /*  6 */ { name: '讼', pinyin: 'Sòng', character: '䷅', upper: '111', lower: '010' },
    /*  7 */ { name: '师', pinyin: 'Shī', character: '䷆', upper: '000', lower: '010' },
    /*  8 */ { name: '比', pinyin: 'Bǐ', character: '䷇', upper: '010', lower: '000' },
    /*  9 */ { name: '小畜', pinyin: 'Xiǎo Xù', character: '䷈', upper: '011', lower: '111' },
    /* 10 */ { name: '履', pinyin: 'Lǚ', character: '䷉', upper: '111', lower: '110' },
    /* 11 */ { name: '泰', pinyin: 'Tài', character: '䷊', upper: '000', lower: '111' },
    /* 12 */ { name: '否', pinyin: 'Pǐ', character: '䷋', upper: '111', lower: '000' },
    /* 13 */ { name: '同人', pinyin: 'Tóng Rén', character: '䷌', upper: '111', lower: '101' },
    /* 14 */ { name: '大有', pinyin: 'Dà Yǒu', character: '䷍', upper: '101', lower: '111' },
    /* 15 */ { name: '谦', pinyin: 'Qiān', character: '䷎', upper: '000', lower: '001' },
    /* 16 */ { name: '豫', pinyin: 'Yù', character: '䷏', upper: '100', lower: '000' },
    /* 17 */ { name: '随', pinyin: 'Suí', character: '䷐', upper: '110', lower: '100' },
    /* 18 */ { name: '蛊', pinyin: 'Gǔ', character: '䷑', upper: '001', lower: '011' },
    /* 19 */ { name: '临', pinyin: 'Lín', character: '䷒', upper: '000', lower: '110' },
    /* 20 */ { name: '观', pinyin: 'Guān', character: '䷓', upper: '011', lower: '000' },
    /* 21 */ { name: '噬嗑', pinyin: 'Shì Kè', character: '䷔', upper: '101', lower: '100' },
    /* 22 */ { name: '贲', pinyin: 'Bì', character: '䷕', upper: '001', lower: '101' },
    /* 23 */ { name: '剥', pinyin: 'Bō', character: '䷖', upper: '001', lower: '000' },
    /* 24 */ { name: '复', pinyin: 'Fù', character: '䷗', upper: '000', lower: '100' },
    /* 25 */ { name: '无妄', pinyin: 'Wú Wàng', character: '䷘', upper: '111', lower: '100' },
    /* 26 */ { name: '大畜', pinyin: 'Dà Xù', character: '䷙', upper: '001', lower: '111' },
    /* 27 */ { name: '颐', pinyin: 'Yí', character: '䷚', upper: '001', lower: '100' },
    /* 28 */ { name: '大过', pinyin: 'Dà Guò', character: '䷛', upper: '110', lower: '011' },
    /* 29 */ { name: '坎', pinyin: 'Kǎn', character: '䷜', upper: '010', lower: '010' },
    /* 30 */ { name: '离', pinyin: 'Lí', character: '䷝', upper: '101', lower: '101' },
    /* 31 */ { name: '咸', pinyin: 'Xián', character: '䷞', upper: '110', lower: '001' },
    /* 32 */ { name: '恒', pinyin: 'Héng', character: '䷟', upper: '100', lower: '011' },
    /* 33 */ { name: '遁', pinyin: 'Dùn', character: '䷠', upper: '111', lower: '001' },
    /* 34 */ { name: '大壮', pinyin: 'Dà Zhuàng', character: '䷡', upper: '100', lower: '111' },
    /* 35 */ { name: '晋', pinyin: 'Jìn', character: '䷢', upper: '101', lower: '000' },
    /* 36 */ { name: '明夷', pinyin: 'Míng Yí', character: '䷣', upper: '000', lower: '101' },
    /* 37 */ { name: '家人', pinyin: 'Jiā Rén', character: '䷤', upper: '011', lower: '101' },
    /* 38 */ { name: '睽', pinyin: 'Kuí', character: '䷥', upper: '101', lower: '110' },
    /* 39 */ { name: '蹇', pinyin: 'Jiǎn', character: '䷦', upper: '010', lower: '001' },
    /* 40 */ { name: '解', pinyin: 'Xiè', character: '䷧', upper: '100', lower: '010' },
    /* 41 */ { name: '损', pinyin: 'Sǔn', character: '䷨', upper: '001', lower: '110' },
    /* 42 */ { name: '益', pinyin: 'Yì', character: '䷩', upper: '011', lower: '100' },
    /* 43 */ { name: '夬', pinyin: 'Guài', character: '䷪', upper: '110', lower: '111' },
    /* 44 */ { name: '姤', pinyin: 'Gòu', character: '䷫', upper: '111', lower: '011' },
    /* 45 */ { name: '萃', pinyin: 'Cuì', character: '䷬', upper: '110', lower: '000' },
    /* 46 */ { name: '升', pinyin: 'Shēng', character: '䷭', upper: '000', lower: '011' },
    /* 47 */ { name: '困', pinyin: 'Kùn', character: '䷮', upper: '110', lower: '010' },
    /* 48 */ { name: '井', pinyin: 'Jǐng', character: '䷯', upper: '010', lower: '011' },
    /* 49 */ { name: '革', pinyin: 'Gé', character: '䷰', upper: '110', lower: '101' },
    /* 50 */ { name: '鼎', pinyin: 'Dǐng', character: '䷱', upper: '101', lower: '011' },
    /* 51 */ { name: '震', pinyin: 'Zhèn', character: '䷲', upper: '100', lower: '100' },
    /* 52 */ { name: '艮', pinyin: 'Gèn', character: '䷳', upper: '001', lower: '001' },
    /* 53 */ { name: '渐', pinyin: 'Jiàn', character: '䷴', upper: '011', lower: '001' },
    /* 54 */ { name: '归妹', pinyin: 'Guī Mèi', character: '䷵', upper: '100', lower: '110' },
    /* 55 */ { name: '丰', pinyin: 'Fēng', character: '䷶', upper: '100', lower: '101' },
    /* 56 */ { name: '旅', pinyin: 'Lǚ', character: '䷷', upper: '101', lower: '001' },
    /* 57 */ { name: '巽', pinyin: 'Xùn', character: '䷸', upper: '011', lower: '011' },
    /* 58 */ { name: '兑', pinyin: 'Duì', character: '䷹', upper: '110', lower: '110' },
    /* 59 */ { name: '涣', pinyin: 'Huàn', character: '䷺', upper: '011', lower: '010' },
    /* 60 */ { name: '节', pinyin: 'Jié', character: '䷻', upper: '010', lower: '110' },
    /* 61 */ { name: '中孚', pinyin: 'Zhōng Fú', character: '䷼', upper: '011', lower: '110' },
    /* 62 */ { name: '小过', pinyin: 'Xiǎo Guò', character: '䷽', upper: '100', lower: '001' },
    /* 63 */ { name: '既济', pinyin: 'Jì Jì', character: '䷾', upper: '010', lower: '101' },
    /* 64 */ { name: '未济', pinyin: 'Wèi Jì', character: '䷿', upper: '101', lower: '010' },
];
/**
 * Lookup map: "upperBinary-lowerBinary" → hexagram number (1-64)
 */
exports.HEXAGRAM_LOOKUP = {};
exports.HEXAGRAM_TABLE.forEach((h, i) => {
    exports.HEXAGRAM_LOOKUP[`${h.upper}-${h.lower}`] = i + 1;
});
// ─── 五行 Wuxing relationships ─────────────────────────────────────────
/**
 * Production cycle (相生): element → what it produces
 * 木生火, 火生土, 土生金, 金生水, 水生木
 */
exports.WUXING_PRODUCES = {
    '木': '火',
    '火': '土',
    '土': '金',
    '金': '水',
    '水': '木',
};
/**
 * Control cycle (相克): element → what it controls
 * 木克土, 土克水, 水克火, 火克金, 金克木
 */
exports.WUXING_CONTROLS = {
    '木': '土',
    '土': '水',
    '水': '火',
    '火': '金',
    '金': '木',
};
/**
 * Interpretation text for each 五行 relationship
 */
exports.WUXING_INTERPRETATIONS = {
    'subject-controls': '体克用 — You dominate the situation. Favourable — you have the upper hand and can overcome obstacles through your own strength.',
    'object-controls': '用克体 — The situation overwhelms you. Unfavourable — expect obstacles and resistance. Proceed with caution.',
    'subject-produces': '体生用 — You drain yourself for the situation. Effort required — you give energy away. Be mindful of overextending.',
    'object-produces': '用生体 — The situation nourishes you. Very favourable — support comes naturally. Opportunities flow toward you.',
    'same-element': '体用同 — Balance and mutual support. Neutral to favourable — stable energies, companionable flow. Things proceed in harmony.',
};
//# sourceMappingURL=constants.js.map