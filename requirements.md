# iChing-Pro — Requirements

## 1. Overview

**iChing-Pro** is a complete I Ching (易经) divination engine that:

1. Takes 6 random numbers and produces a full hexagram reading with all derived hexagrams.
2. Ships as a **reusable, zero-dependency JavaScript/TypeScript library** (`iching-pro`).
3. Includes a **single-file HTML page** (`index.html`) that anyone can open in a browser for an interactive divination experience — no server, no build step.

---

## 2. Core Divination Logic

### 2.1 Input

- 6 positive integers: `N₁, N₂, N₃, N₄, N₅, N₆`
- Each maps to a yao (爻) position from bottom to top: N₁ = 初爻 … N₆ = 上爻

### 2.2 Yao Determination (四象 Mapping)

For each number `N`, compute `R = N mod 4`:

| Remainder | Four-Symbol (四象) | Yin/Yang | Line | Mutability |
|-----------|-------------------|----------|------|------------|
| 1         | 老阳 (Old Yang)   | Yang     | `—`  | **Moving (动)** |
| 2         | 少阴 (Young Yin)  | Yin      | `- -` | Static (静) |
| 3         | 少阳 (Young Yang) | Yang     | `—`  | Static (静) |
| 0         | 老阴 (Old Yin)    | Yin      | `- -` | **Moving (动)** |

### 2.3 Trigram Mapping

Every 3-yao combination maps to one of 8 trigrams:

| Yao (bottom→top) | Trigram | Symbol | Element | Binary |
|-------------------|---------|--------|---------|--------|
| Yang-Yang-Yang   | 乾 Qián | ☰ | Metal (金) | 111 |
| Yin-Yin-Yin      | 坤 Kūn  | ☷ | Earth (土) | 000 |
| Yang-Yin-Yin     | 震 Zhèn | ☳ | Wood (木) | 100 |
| Yin-Yin-Yang     | 巽 Xùn  | ☴ | Wood (木) | 011 |
| Yang-Yang-Yin    | 坎 Kǎn  | ☵ | Water (水)| 010 |
| Yin-Yang-Yang    | 离 Lí   | ☲ | Fire (火) | 101 |
| Yin-Yin-Yang     | 艮 Gèn  | ☶ | Earth (土) | 001 |
| Yang-Yin-Yang    | 兑 Duì  | ☱ | Metal (金) | 110 |

> **Note:** Binary encoding uses Yang=1, Yin=0, bottom-to-top order.

### 2.4 Hexagram Lookup

- The lower trigram (positions 1-3) + upper trigram (positions 4-6) produce one of the 64 hexagrams.
- A complete lookup table mapping `(upper_trigram, lower_trigram)` → hexagram number (1–64) is required.

### 2.5 Derived Hexagrams

From the 本卦 (Primary Hexagram), derive six results:

#### 2.5.1 体卦 (Tǐ Guà — Subject) & 用卦 (Yòng Guà — Object)

| Condition | 体卦 (Subject) | 用卦 (Object) |
|-----------|----------------|---------------|
| Moving yaos only in upper trigram | Lower trigram | Upper trigram |
| Moving yaos only in lower trigram | Upper trigram | Lower trigram |
| Moving yaos in both trigrams | Trigram **without** the lowest-moving yao | Trigram **with** the lowest-moving yao |
| No moving yaos (all static) | Lower trigram | Upper trigram |

#### 2.5.2 变卦 (Biàn Guà — Changed Hexagram)

- Static yaos remain unchanged.
- Moving yaos flip: Yang ↔ Yin.
- The resulting 6 yao positions form the Changed Hexagram.

#### 2.5.3 互卦 (Hù Guà — Nuclear Hexagram)

- **Lower nuclear**: yao 2, 3, 4 of the Primary Hexagram → new lower trigram.
- **Upper nuclear**: yao 3, 4, 5 of the Primary Hexagram → new upper trigram.

#### 2.5.4 错卦 (Cuò Guà — Opposite Hexagram)

- Flip **all 6** yaos of the Primary Hexagram: Yang ↔ Yin.

#### 2.5.5 综卦 (Zōng Guà — Reversed Hexagram)

- Reverse the **order** of all 6 yaos (rotate 180°): yao 1↔6, 2↔5, 3↔4.

### 2.6 五行生克 (Wǔxíng — Five Elements Relationships)

The 体卦 element and 用卦 element interact via the production/control cycle:

| Relationship | Meaning | Implication |
|---|---|---|
| 体克用 (Subject controls Object) | You dominate the situation | Favourable — you have the upper hand |
| 用克体 (Object controls Subject) | Situation overwhelms you | Unfavourable — obstacles, resistance |
| 体生用 (Subject produces Object) | You drain yourself for the situation | Effort required — you give energy away |
| 用生体 (Object produces Subject) | Situation nourishes you | Very favourable — support comes naturally |
| 体用同 (Same element) | Balance, mutual support | Neutral to favourable — stable, companionable |

---

## 3. Library Package (`iching-pro`)

### 3.1 Goals

- **Zero dependencies** — pure TypeScript/JavaScript.
- **Tree-shakeable** — import only what you need.
- **Types-first** — full TypeScript types exported.
- **Platform-agnostic** — works in Node.js, Deno, Bun, browser, edge runtimes.

### 3.2 Module Structure

```
iching-pro/
├── src/
│   ├── index.ts            # Public API barrel export
│   ├── types.ts            # All type definitions
│   ├── constants.ts        # Trigram table, hexagram table, Wuxing table
│   ├── yao.ts              # mod-4 → Four Symbol mapping
│   ├── trigram.ts          # 3-yaos → trigram identification
│   ├── hexagram.ts         # 64-hexagram lookup + metadata
│   ├── derive.ts           # 变卦, 互卦, 错卦, 综卦 derivations
│   ├── tiyong.ts           # 体用 determination logic
│   └── wuxing.ts           # Five-element relationship analysis
├── dist/                   # Built output (ESM + CJS)
├── package.json
├── tsconfig.json
└── README.md
```

### 3.3 Public API

```typescript
// --- Core types ---
export type Element = '金' | '木' | '水' | '火' | '土';
export type Mutability = 'moving' | 'static';
export type YaoPolarity = 'yang' | 'yin';

export interface Yao {
  position: number;       // 1-6 (bottom to top)
  polarity: YaoPolarity;
  mutability: Mutability;
  symbol: string;         // '—' or '- -'
  fourSymbol: string;     // '老阳' | '少阴' | '少阳' | '老阴'
}

export interface Trigram {
  name: string;           // e.g. '乾'
  symbol: string;         // e.g. '☰'
  element: Element;
  binary: string;         // e.g. '111'
}

export interface Hexagram {
  number: number;         // 1-64
  name: string;           // e.g. '丰'
  pinyin: string;         // e.g. 'Fēng'
  character: string;      // e.g. '䷶'
  upperTrigram: Trigram;
  lowerTrigram: Trigram;
  yaos: Yao[];            // 6 yaos, index 0 = bottom
}

export type WuxingRelation =
  | 'subject-controls'    // 体克用
  | 'object-controls'     // 用克体
  | 'subject-produces'    // 体生用
  | 'object-produces'     // 用生体
  | 'same-element';       // 体用同

export interface TiYongResult {
  subject: Trigram;       // 体卦
  object: Trigram;        // 用卦
  relation: WuxingRelation;
  interpretation: string; // Human-readable meaning
}

export interface DivinationResult {
  input: number[];
  yaos: Yao[];
  primary: Hexagram;      // 本卦
  changed: Hexagram;      // 变卦
  nuclear: Hexagram;      // 互卦
  opposite: Hexagram;     // 错卦
  reversed: Hexagram;     // 综卦
  tiYong: TiYongResult;   // 体用分析
}

// --- Core functions ---
export function processYaos(numbers: number[]): Yao[];
export function identifyTrigram(yaos: [Yao, Yao, Yao]): Trigram;
export function lookupHexagram(upper: Trigram, lower: Trigram): Hexagram;
export function deriveChanged(primary: Hexagram): Hexagram;
export function deriveNuclear(primary: Hexagram): Hexagram;
export function deriveOpposite(primary: Hexagram): Hexagram;
export function deriveReversed(primary: Hexagram): Hexagram;
export function determineTiYong(primary: Hexagram): TiYongResult;

/** Main entry — full divination from 6 numbers */
export function divine(numbers: number[]): DivinationResult;
```

### 3.4 Data Files

The library embeds the following data (as typed constants):

1. **64 Hexagram Table** — Maps `(upper, lower)` trigram pair → full hexagram metadata (number, name, pinyin, Unicode character ䷀–䷿, and the Judgement/彖 text if desired).
2. **8 Trigram Table** — Name, symbol, element, binary pattern.
3. **Wuxing Cycle** — Production and control relationships for all 5 elements.
4. **Interpretation Templates** — Human-readable strings for each `WuxingRelation`.

---

## 4. Single-Page HTML (`index.html`)

### 4.1 Goals

- **Zero build step** — open the file directly in any modern browser.
- **Zero external dependencies** — all JS/CSS inlined or bundled.
- **Beautiful, responsive design** — works on mobile and desktop.
- **Self-contained educational tool** — explains the process as you go.

### 4.2 Features

| Feature | Description |
|---------|-------------|
| **Random number generation** | Generate 6 numbers using `crypto.getRandomValues()` or let user enter manually |
| **Manual number input** | 6 input fields for users who want to enter their own numbers |
| **Step-by-step revelation** | Animate or progressively reveal: yaos → 本卦 → 体用 → 变卦 → 互卦 → 错卦 → 综卦 |
| **Full hexagram display** | Visual yao rendering (solid/broken lines with moving yao highlight), trigram symbols, hexagram Unicode characters |
| **体用 analysis** | Show subject/object trigrams, Wuxing relationship with explanation |
| **All 5 derived hexagrams** | Display 本卦, 变卦, 互卦, 错卦, 综卦 in a comparative layout |
| **Hexagram dictionary** | Click any hexagram to see its name, number, traditional meaning |
| **Responsive layout** | Mobile-first design, hexagram lines render clearly on all sizes |
| **Dark/light theme** | Respect `prefers-color-scheme`, with manual toggle |
| **i18n-ready** | Labels in Chinese with English tooltips (or bilingual toggle) |

### 4.3 Visual Design Guidelines

- **Hexagram lines**: Solid `—` in bold, broken `- -` with clear gap. Moving yaos should pulse or glow.
- **Color palette**: Traditional ink-wash aesthetic — dark ink on light paper (light mode), reversed for dark mode.
- **Typography**: Use system serif (e.g. `Georgia, "Noto Serif SC", serif`) for Chinese characters; clean sans-serif for UI.
- **Layout**: Single column on mobile; multi-column hexagram comparison on desktop.

### 4.4 Technical Approach

- The library source is **inlined** into `index.html` as a `<script>` module (tree-shaken or manually copied).
- CSS is embedded in a `<style>` block.
- No bundler required — the HTML file is the entire deliverable.

---

## 5. Testing

### 5.1 Library Unit Tests

- **Yao mapping**: Verify all 4 remainder cases (0, 1, 2, 3).
- **Trigram identification**: All 8 trigrams.
- **Hexagram lookup**: At least one test per trigram pair (representative sample).
- **变卦**: Moving yaos flip, static yaos don't.
- **互卦**: Correct 2-3-4 and 3-4-5 extraction.
- **错卦**: All 6 yaos inverted.
- **综卦**: All 6 yaos reversed in order.
- **体用**: All 4 conditions (upper-only, lower-only, both, none).
- **五行**: All 5 relationship types.
- **Integration**: The provided example (11, 20, 5, 14, 3, 7) → 雷火丰 with expected derived hexagrams.

### 5.2 HTML Smoke Test

- Open in Chrome, Safari, Firefox — no console errors.
- Generate random reading — all hexagrams display correctly.
- Enter the example numbers (11, 20, 5, 14, 3, 7) — verify against known result.
- Mobile viewport — layout not broken.

---

## 6. Future Extensions (Out of Scope for v1)

These are explicitly **not** in v1 but noted for awareness:

- [ ] Time-based divination (以时间起卦)
- [ ] Coin-toss simulation (三币法)
- [ ] Yarrow stalk method (蓍草法)
- [ ] Full 64-hexagram text library (卦辞/爻辞)
- [ ] Historical reading log / saved readings
- [ ] PWA support (offline install)
- [ ] npm package publication
- [ ] Animated yao drawing ceremony

---

## 7. Deliverables Summary

| Deliverable | Format | Description |
|-------------|--------|-------------|
| `iching-pro` library | TypeScript source + built JS | Reusable, typed, zero-dependency divination engine |
| `index.html` | Single HTML file | Interactive, beautiful, self-contained divination tool |
| `requirements.md` | This file | Requirements & design specification |
