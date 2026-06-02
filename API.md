# I Ching Pro — API Reference & Logic Documentation

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Quick Start](#quick-start)
4. [Core Concepts](#core-concepts)
   - [Yao (爻)](#yao-爻)
   - [Trigram (卦)](#trigram-卦)
   - [Hexagram (重卦)](#hexagram-重卦)
5. [The Divination Algorithm](#the-divination-algorithm)
   - [Step 1 — Yao Mapping](#step-1--yao-mapping)
   - [Step 2 — Trigram Identification](#step-2--trigram-identification)
   - [Step 3 — Hexagram Lookup](#step-3--hexagram-lookup)
   - [Step 4 — Derived Hexagrams](#step-4--derived-hexagrams)
   - [Step 5 — 体用 Analysis](#step-5--体用-analysis)
   - [Step 6 — Five Element Relations](#step-6--five-element-relations)
6. [API Reference](#api-reference)
   - [Functions](#functions)
   - [Types](#types)
   - [Constants](#constants)
7. [Complete Example](#complete-example)
8. [Known Limitations](#known-limitations)

---

## Overview

`iching-pro` is a zero-dependency TypeScript library that implements the complete I Ching (易经) divination pipeline. Given six positive integers, it computes all five standard hexagrams (本卦, 变卦, 互卦, 错卦, 综卦) and performs 体用 (subject-object) analysis with Five Element (五行) relationship interpretation.

**Design principles:**
- Zero runtime dependencies
- Full TypeScript types with JSDoc
- Tree-shakeable ESM exports
- Platform-agnostic (Node, Deno, Bun, browser)

---

## Installation

```bash
npm install iching-pro
```

Or use the standalone single file directly:

```html
<script type="module">
  import { divine } from './iChing.js';
</script>
```

```javascript
// CommonJS
const { divine } = require('./iChing.js');
```

---

## Quick Start

```typescript
import { divine } from 'iching-pro';

const result = divine([11, 20, 5, 14, 3, 7]);

result.primary.name;       // '家人'
result.primary.character;  // '䷤'
result.primary.number;     // 37
result.primary.upperTrigram.name; // '巽'
result.primary.lowerTrigram.name; // '离'

result.changed.name;       // '中孚'
result.nuclear.name;       // '未济'
result.opposite.name;      // '解'
result.reversed.name;      // '睽'

result.tiYong.subject.name;   // '巽'
result.tiYong.object.name;    // '离'
result.tiYong.relation;       // 'subject-produces'
result.tiYong.interpretation; // '体生用 — You drain yourself...'
```

---

## Core Concepts

### Yao (爻)

A **yao** is a single line in a hexagram. Each yao has:

| Property | Description |
|----------|-------------|
| `position` | 1–6 (1 = bottom/初爻, 6 = top/上爻) |
| `polarity` | `'yang'` (solid —) or `'yin'` (broken - -) |
| `mutability` | `'moving'` (will change) or `'static'` (fixed) |
| `symbol` | Visual: `'—'` or `'- -'` |
| `fourSymbol` | 四象 classification: 老阳, 少阴, 少阳, 老阴 |
| `input` | Original input number |

The **Four Symbols** (四象) classify each yao by polarity and mutability:

| Four Symbol | Polarity | Mutability | Meaning |
|-------------|----------|------------|---------|
| 老阳 (Old Yang) | yang | moving | Maximum yang — about to transform to yin |
| 少阴 (Young Yin) | yin | static | Stable yin |
| 少阳 (Young Yang) | yang | static | Stable yang |
| 老阴 (Old Yin) | yin | moving | Maximum yin — about to transform to yang |

### Trigram (卦)

A **trigram** is a group of 3 yaos. There are 8 possible trigrams, each associated with a Five Element:

| Trigram | Symbol | Binary | Element | Nature |
|---------|--------|--------|---------|--------|
| 乾 | ☰ | 111 | 金 Metal | Heaven |
| 兑 | ☱ | 110 | 金 Metal | Lake |
| 离 | ☲ | 101 | 火 Fire | Flame |
| 震 | ☳ | 100 | 木 Wood | Thunder |
| 巽 | ☴ | 011 | 木 Wood | Wind |
| 坎 | ☵ | 010 | 水 Water | Water |
| 艮 | ☶ | 001 | 土 Earth | Mountain |
| 坤 | ☷ | 000 | 土 Earth | Earth |

**Binary encoding:** `yang = 1`, `yin = 0`, read **bottom-to-top** (bit 0 = bottom line).

### Hexagram (重卦)

A **hexagram** is a pair of trigrams — upper (外卦) and lower (内卦) — producing one of 64 hexagrams in the King Wen sequence (周易). The lower trigram is also called the inner trigram; the upper is the outer trigram.

A hexagram contains:

| Property | Description |
|----------|-------------|
| `number` | King Wen sequence number (1–64) |
| `name` | Chinese name (e.g. '丰') |
| `pinyin` | Romanized name (e.g. 'Fēng') |
| `character` | Unicode symbol (e.g. '䷶') |
| `upperTrigram` | Upper trigram object |
| `lowerTrigram` | Lower trigram object |
| `yaos` | Array of 6 Yao objects |

---

## The Divination Algorithm

### Step 1 — Yao Mapping

Each input number `N` is converted to a yao via `N mod 4`:

| `N mod 4` | Polarity | Mutability | Four Symbol |
|-----------|----------|------------|-------------|
| 1 | yang | moving | 老阳 |
| 2 | yin | static | 少阴 |
| 3 | yang | static | 少阳 |
| 0 | yin | moving | 老阴 |

This is implemented by `processYao(number, position)` and `processYaos(numbers)`.

```typescript
import { processYaos } from 'iching-pro';

const yaos = processYaos([11, 20, 5, 14, 3, 7]);
// [
//   { position: 1, polarity: 'yang',  mutability: 'static',  fourSymbol: '少阳', ... }, // 11 % 4 = 3
//   { position: 2, polarity: 'yin',   mutability: 'moving',  fourSymbol: '老阴', ... }, // 20 % 4 = 0
//   { position: 3, polarity: 'yang',  mutability: 'moving',  fourSymbol: '老阳', ... }, //  5 % 4 = 1
//   { position: 4, polarity: 'yin',   mutability: 'static',  fourSymbol: '少阴', ... }, // 14 % 4 = 2
//   { position: 5, polarity: 'yang',  mutability: 'static',  fourSymbol: '少阳', ... }, //  3 % 4 = 3
//   { position: 6, polarity: 'yang',  mutability: 'static',  fourSymbol: '少阳', ... }, //  7 % 4 = 3
// ]
```

**Visual for this example:**

```
Position 6: —    少阳 (yang, static)     ← top
Position 5: —    少阳 (yang, static)
Position 4: - -  少阴 (yin,  static)
Position 3: —    老阳 (yang, moving) ← animated
Position 2: - -  老阴 (yin,  moving) ← animated
Position 1: —    少阳 (yang, static)     ← bottom
```

### Step 2 — Trigram Identification

The 6 yaos are split into two groups of 3:
- **Lower trigram:** yaos 1–3 (positions 1, 2, 3)
- **Upper trigram:** yaos 4–6 (positions 4, 5, 6)

Each group is converted to a binary string (yang=1, yin=0, bottom-to-top) and looked up against the 8 known trigrams.

```
Lower yaos:  —  (yang), - - (yin),  — (yang)  → binary '101' → 离 ☲ (Fire)
Upper yaos:  - -(yin),  — (yang),  — (yang)   → binary '011' → 巽 ☴ (Wind)
```

```typescript
import { identifyTrigram } from 'iching-pro';

const lower = identifyTrigram([yaos[0], yaos[1], yaos[2]]);
// { name: '离', symbol: '☲', element: '火', binary: '101' }
```

### Step 3 — Hexagram Lookup

The upper and lower trigram binary strings are combined into a lookup key (`'upper-lower'`) to find the hexagram in the King Wen table.

```
Upper: 巽 (011), Lower: 离 (101) → key '011-101' → Hexagram #37 → 家人 (Jiā Rén) ䷤
```

```typescript
import { lookupHexagram, trigramFromBinary } from 'iching-pro';

const upper = trigramFromBinary('011'); // 巽
const lower = trigramFromBinary('101'); // 离
const hex = lookupHexagram(upper, lower, yaos);
// { number: 37, name: '家人', pinyin: 'Jiā Rén', character: '䷤', ... }
```

### Step 4 — Derived Hexagrams

Four additional hexagrams are derived from the primary hexagram. Together they form the complete set:

| Hexagram | Chinese | Derivation |
|----------|---------|------------|
| 本卦 Primary | 本卦 | The hexagram from steps 2–3 |
| 变卦 Changed | 变卦 | Flip all moving yaos (老阳→阴, 老阴→阳) |
| 互卦 Nuclear | 互卦 | Lines 2,3,4 as lower trigram + lines 3,4,5 as upper trigram |
| 错卦 Opposite | 错卦 | Flip all 6 yaos polarity (阳→阴, 阴→阳) |
| 综卦 Reversed | 综卦 | Reverse the order of all 6 yaos (bottom↔top) |

#### 变卦 (Changed Hexagram)

Take the primary hexagram's 6 yaos. Every **moving** yao flips its polarity:

- 老阳 (yang, moving) → becomes **yin** in the changed hexagram
- 老阴 (yin, moving) → becomes **yang** in the changed hexagram
- Static yaos remain unchanged

```typescript
import { deriveChanged } from 'iching-pro';
const changed = deriveChanged(primary);
// For input [11,20,5,14,3,7]: yaos 2 and 3 are moving
// → 中孚 #61
```

#### 互卦 (Nuclear Hexagram)

The nuclear hexagram is formed from the **inner 4 lines** of the primary hexagram:

- **Nuclear lower trigram** = yaos 2, 3, 4 (from bottom)
- **Nuclear upper trigram** = yaos 3, 4, 5 (from bottom)

Note: yao 1 (bottom) and yao 6 (top) are excluded. Yaos 3 and 4 appear in both trigrams.

```typescript
import { deriveNuclear } from 'iching-pro';
const nuclear = deriveNuclear(primary);
// For input [11,20,5,14,3,7]: → 未济 #64
```

#### 错卦 (Opposite Hexagram)

Every yao in the hexagram flips polarity:

- Yang → Yin
- Yin → Yang

Mutability is preserved from the original yao (moving yaos remain moving in the opposite hexagram).

```typescript
import { deriveOpposite } from 'iching-pro';
const opposite = deriveOpposite(primary);
// For input [11,20,5,14,3,7]: → 解 #40
```

#### 综卦 (Reversed Hexagram)

The 6 yaos are reversed in order (bottom becomes top, top becomes bottom). This is the hexagram viewed from the opposite direction.

```typescript
import { deriveReversed } from 'iching-pro';
const reversed = deriveReversed(primary);
// For input [11,20,5,14,3,7]: → 睽 #38
```

### Step 5 — 体用 Analysis

The 体用 (subject-object) system determines which trigram represents **you** (体, subject) and which represents **the situation** (用, object).

**Rules:**

| Moving Yaos | 体 (Subject) | 用 (Object) |
|-------------|--------------|-------------|
| Only in upper trigram | Lower trigram | Upper trigram |
| Only in lower trigram | Upper trigram | Lower trigram |
| In both trigrams | The trigram that does NOT contain the lowest-moving yao | The trigram containing the lowest-moving yao |
| None (all static) | Lower trigram | Upper trigram |

**Logic detail for "both trigrams have moving yaos":**

Find the lowest-numbered moving yao (smallest position). Whichever trigram it belongs to becomes 用 (object), and the other becomes 体 (subject).

```typescript
import { determineTiYong } from 'iching-pro';

const tiYong = determineTiYong(primary);
// {
//   subject: { name: '巽', element: '木', ... },  // 体
//   object:  { name: '离', element: '火', ... },  // 用
//   relation: 'subject-produces',                  // 体生用
//   interpretation: '体生用 — You drain yourself...'
// }
```

### Step 6 — Five Element Relations

The relationship between the subject (体) and object (用) elements determines the reading.

**The Five Elements (五行):**

```
        木 Wood
       ↗       ↘
  水 Water      火 Fire
       ↑         ↓
  金 Metal ←  土 Earth
```

**Production cycle (相生):** 木→火→土→金→水→木

**Control cycle (相克):** 木→土→水→火→金→木

**The 5 possible relationships:**

| Relation | Chinese | Meaning | Favorability |
|----------|---------|---------|--------------|
| `subject-controls` | 体克用 | You dominate the situation | Favorable |
| `object-controls` | 用克体 | Situation overwhelms you | Unfavorable |
| `subject-produces` | 体生用 | You invest energy into it | Effort required |
| `object-produces` | 用生体 | Situation nourishes you | Very favorable |
| `same-element` | 体用同 | Balance, mutual support | Neutral/favorable |

```typescript
import { determineWuxingRelation } from 'iching-pro';

determineWuxingRelation('木', '火'); // 'subject-produces'  (木生火)
determineWuxingRelation('金', '木'); // 'subject-controls'  (金克木)
determineWuxingRelation('火', '火'); // 'same-element'
determineWuxingRelation('土', '金'); // 'subject-produces'  (土生金)
```

---

## API Reference

### Functions

#### `divine(numbers: number[]): DivinationResult`

The main entry point. Takes 6 positive integers and returns the complete divination result.

```typescript
const result = divine([11, 20, 5, 14, 3, 7]);
```

**Throws:** if `numbers.length !== 6` or any number is not a positive integer.

---

#### `processYao(number: number, position: number): Yao`

Convert a single number to a Yao. `position` is 1–6.

```typescript
const yao = processYao(11, 1);
// { position: 1, polarity: 'yang', mutability: 'static', symbol: '—', fourSymbol: '少阳', input: 11 }
```

---

#### `processYaos(numbers: number[]): Yao[]`

Convert 6 numbers into 6 Yao objects.

```typescript
const yaos = processYaos([11, 20, 5, 14, 3, 7]);
```

---

#### `identifyTrigram(yaos: [Yao, Yao, Yao]): Trigram`

Identify a trigram from 3 yaos. Used internally for upper/lower trigram identification.

---

#### `trigramFromBinary(binary: string): Trigram`

Look up a trigram by its 3-character binary string.

```typescript
trigramFromBinary('101'); // { name: '离', symbol: '☲', element: '火', ... }
```

---

#### `trigramByName(name: string): Trigram | undefined`

Look up a trigram by its Chinese name.

```typescript
trigramByName('乾'); // { name: '乾', symbol: '☰', element: '金', ... }
```

---

#### `lookupHexagram(upper: Trigram, lower: Trigram, yaos: Yao[]): Hexagram`

Look up a hexagram from its upper and lower trigrams.

---

#### `getHexagramByNumber(n: number): HexagramData | undefined`

Get raw hexagram data by King Wen number (1–64).

```typescript
import { getHexagramByNumber } from 'iching-pro';
getHexagramByNumber(49); // { name: '革', pinyin: 'Gé', character: '䷰', ... }
```

---

#### `deriveChanged(primary: Hexagram): Hexagram`

Compute the changed hexagram (变卦).

#### `deriveNuclear(primary: Hexagram): Hexagram`

Compute the nuclear hexagram (互卦).

#### `deriveOpposite(primary: Hexagram): Hexagram`

Compute the opposite hexagram (错卦).

#### `deriveReversed(primary: Hexagram): Hexagram`

Compute the reversed hexagram (综卦).

---

#### `determineTiYong(hexagram: Hexagram): TiYongResult`

Determine the subject-object (体用) relationship.

---

#### `determineWuxingRelation(subject: WuxingElement, object: WuxingElement): WuxingRelation`

Determine the five-element relationship between two elements.

---

### Types

#### `Yao`

```typescript
interface Yao {
  position: number;        // 1-6
  polarity: 'yang' | 'yin';
  mutability: 'moving' | 'static';
  symbol: '—' | '- -';
  fourSymbol: '老阳' | '少阴' | '少阳' | '老阴';
  input: number;           // original input
}
```

#### `Trigram`

```typescript
interface Trigram {
  name: string;        // '乾'
  symbol: string;      // '☰'
  element: WuxingElement; // '金'
  binary: string;      // '111' (bottom-to-top)
}
```

#### `Hexagram`

```typescript
interface Hexagram {
  number: number;            // 1-64
  name: string;              // '家人'
  pinyin: string;            // 'Jiā Rén'
  character: string;         // '䷤'
  upperTrigram: Trigram;
  lowerTrigram: Trigram;
  yaos: Yao[];               // 6 elements, index 0 = bottom
}
```

#### `DivinationResult`

```typescript
interface DivinationResult {
  input: number[];           // original 6 numbers
  yaos: Yao[];               // processed 6 yaos
  primary: Hexagram;         // 本卦
  changed: Hexagram;         // 变卦
  nuclear: Hexagram;         // 互卦
  opposite: Hexagram;        // 错卦
  reversed: Hexagram;        // 综卦
  tiYong: TiYongResult;      // 体用 analysis
}
```

#### `TiYongResult`

```typescript
interface TiYongResult {
  subject: Trigram;          // 体卦
  object: Trigram;           // 用卦
  relation: WuxingRelation;
  interpretation: string;    // English description
}
```

#### `WuxingElement`

```typescript
type WuxingElement = '金' | '木' | '水' | '火' | '土';
```

#### `WuxingRelation`

```typescript
type WuxingRelation =
  | 'subject-controls'   // 体克用
  | 'object-controls'    // 用克体
  | 'subject-produces'   // 体生用
  | 'object-produces'    // 用生体
  | 'same-element';      // 体用同
```

---

### Constants

#### `TRIGRAMS: Record<string, Trigram>`

Map of binary string → trigram. 8 entries.

```typescript
TRIGRAMS['111']; // 乾
TRIGRAMS['000']; // 坤
```

#### `TRIGRAM_LIST: Trigram[]`

All 8 trigrams as an array for iteration.

#### `HEXAGRAM_TABLE: HexagramData[]`

All 64 hexagrams in King Wen order. Index 0 = hexagram 1.

```typescript
HEXAGRAM_TABLE[0];  // { name: '乾', character: '䷀', upper: '111', lower: '111' }
HEXAGRAM_TABLE[48]; // { name: '革', character: '䷰', upper: '110', lower: '101' }
```

#### `HEXAGRAM_LOOKUP: Record<string, number>`

Map of `'upperBinary-lowerBinary'` → King Wen number.

```typescript
HEXAGRAM_LOOKUP['100-101']; // 55 (丰)
HEXAGRAM_LOOKUP['000-000']; // 2  (坤)
```

#### `WUXING_PRODUCES: Record<WuxingElement, WuxingElement>`

Production cycle: `WUXING_PRODUCES['木'] === '火'`

#### `WUXING_CONTROLS: Record<WuxingElement, WuxingElement>`

Control cycle: `WUXING_CONTROLS['金'] === '木'`

#### `WUXING_INTERPRETATIONS: Record<WuxingRelation, string>`

English interpretation text for each relationship.

---

## Complete Example

```typescript
import { divine } from 'iching-pro';

const r = divine([11, 20, 5, 14, 3, 7]);

// ── Input ──
console.log(r.input);  // [11, 20, 5, 14, 3, 7]

// ── 6 Yaos ──
r.yaos.forEach(y => {
  console.log(`Pos ${y.position}: ${y.symbol} ${y.fourSymbol} ${y.mutability}`);
});
// Pos 1: —     少阳 static
// Pos 2: - -   老阴 moving
// Pos 3: —     老阳 moving
// Pos 4: - -   少阴 static
// Pos 5: —     少阳 static
// Pos 6: —     少阳 static

// ── 本卦 (Primary) ──
console.log(r.primary.name);       // '家人'
console.log(r.primary.character);  // '䷤'
console.log(r.primary.number);     // 37
console.log(r.primary.upperTrigram.name); // '巽' ☴ (Wind)
console.log(r.primary.lowerTrigram.name); // '离' ☲ (Fire)

// ── 变卦 (Changed) ──
// Yaos 2 and 3 are moving; flipping them gives:
// - -  →  —  (pos 2: 老阴→少阳), —  →  - - (pos 3: 老阳→少阴)
console.log(r.changed.name);  // '中孚' #61
console.log(r.changed.upperTrigram.name); // '巽'
console.log(r.changed.lowerTrigram.name); // '兑'

// ── 互卦 (Nuclear) ──
// Lines 2,3,4 → lower: - - (2), — (3), - - (4) = 巽
// Lines 3,4,5 → upper: — (3), - - (4), — (5) = 离
console.log(r.nuclear.name);  // '未济' #64

// ── 错卦 (Opposite) ──
// All yaos flipped: yang↔yin
console.log(r.opposite.name);  // '解' #40

// ── 综卦 (Reversed) ──
// Yaos reversed: pos 6→1, 5→2, 4→3, 3→4, 2→5, 1→6
console.log(r.reversed.name);  // '睽' #38

// ── 体用 (Subject-Object) ──
// Moving yaos in both trigrams (pos 2 in lower, pos 3 in lower)
// → both in lower → lowest-moving (pos 2) is in lower → lower = 用, upper = 体
console.log(r.tiYong.subject.name);   // '巽' (体)
console.log(r.tiYong.object.name);    // '离' (用)
console.log(r.tiYong.relation);       // 'subject-produces'
console.log(r.tiYong.interpretation);
// '体生用 — You drain yourself for the situation. Effort required...'
```

---

## Known Limitations

1. **No divination interpretation text:** The library computes the structural result (hexagrams, trigrams, relationships). Hexagram-specific oracle text (爻辞, 象辞) is not included — this is intentionally left to consuming applications.

2. **No input validation beyond type checking:** The library validates that inputs are positive integers and that there are exactly 6 numbers. It does not validate the "meaning" of the numbers.

3. **English interpretation only:** The `interpretation` field in `TiYongResult` uses English. Chinese text constants are available via `WUXING_INTERPRETATIONS` for custom localization.
