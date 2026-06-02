/**
 * Five Elements (五行)
 */
export type WuxingElement = '金' | '木' | '水' | '火' | '土';

/**
 * Yin/Yang polarity
 */
export type Polarity = 'yang' | 'yin';

/**
 * Mutability state of a yao
 */
export type Mutability = 'moving' | 'static';

/**
 * The Four Symbols (四象)
 */
export type FourSymbol = '老阳' | '少阴' | '少阳' | '老阴';

/**
 * A single yao (爻) line
 */
export interface Yao {
  /** Position 1-6 (1 = bottom/初爻, 6 = top/上爻) */
  position: number;
  /** Yang or Yin */
  polarity: Polarity;
  /** Whether this yao is moving (will change) */
  mutability: Mutability;
  /** Visual symbol: '—' for yang, '- -' for yin */
  symbol: string;
  /** The Four Symbol classification */
  fourSymbol: FourSymbol;
  /** The original input number */
  input: number;
}

/**
 * A trigram (卦) composed of 3 yaos
 */
export interface Trigram {
  /** Chinese name (e.g. '乾') */
  name: string;
  /** Unicode symbol (e.g. '☰') */
  symbol: string;
  /** Associated element */
  element: WuxingElement;
  /** 3-char binary string, bottom-to-top (e.g. '111') */
  binary: string;
}

/**
 * A hexagram (重卦) composed of 6 yaos
 */
export interface Hexagram {
  /** King Wen number 1-64 */
  number: number;
  /** Chinese name (e.g. '丰') */
  name: string;
  /** Pinyin with tone marks (e.g. 'Fēng') */
  pinyin: string;
  /** Unicode character (e.g. '䷶') */
  character: string;
  /** Upper (outer) trigram */
  upperTrigram: Trigram;
  /** Lower (inner) trigram */
  lowerTrigram: Trigram;
  /** 6 yaos, index 0 = bottom yao */
  yaos: Yao[];
}

/**
 * Five-element relationship between subject (体) and object (用)
 */
export type WuxingRelation =
  | 'subject-controls'   // 体克用
  | 'object-controls'    // 用克体
  | 'subject-produces'   // 体生用
  | 'object-produces'    // 用生体
  | 'same-element';      // 体用同

/**
 * Result of the 体用 (subject-object) analysis
 */
export interface TiYongResult {
  /** Subject trigram (体卦) */
  subject: Trigram;
  /** Object trigram (用卦) */
  object: Trigram;
  /** The five-element relationship */
  relation: WuxingRelation;
  /** Human-readable interpretation */
  interpretation: string;
}

/**
 * Complete divination result
 */
export interface DivinationResult {
  /** The 6 input numbers */
  input: number[];
  /** The 6 processed yaos */
  yaos: Yao[];
  /** Primary hexagram (本卦) */
  primary: Hexagram;
  /** Changed hexagram (变卦) */
  changed: Hexagram;
  /** Nuclear hexagram (互卦) */
  nuclear: Hexagram;
  /** Opposite hexagram (错卦) */
  opposite: Hexagram;
  /** Reversed hexagram (综卦) */
  reversed: Hexagram;
  /** Subject-object analysis */
  tiYong: TiYongResult;
}
