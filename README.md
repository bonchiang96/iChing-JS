# iChing Pro · 易经占卜

> A complete I Ching (易经) divination engine — zero dependency, fully typed.
> 完整的易经占卜引擎 — 零依赖，完整类型定义。

[English](#english) · [中文](#中文)

---

## English

### Quick Start

Open `index.html` in any modern browser. No server, no build step needed.

- Enter 6 positive integers or click **随机生成** (random)
- Click **开始占卜** (divine)
- View all five derived hexagrams: 本卦, 变卦, 互卦, 错卦, 综卦 + 体用 analysis

### Library Usage

```typescript
import { divine } from 'iching-pro';

const result = divine([11, 20, 5, 14, 3, 7]);

console.log(result.primary.name);    // e.g. '家人'
console.log(result.changed.name);    // e.g. '中孚'
console.log(result.nuclear.name);    // e.g. '未济'
console.log(result.tiYong.relation); // e.g. 'subject-produces'
```

#### Browser `<script>` Tag

The pre-built `iChing.js` is an IIFE bundle that attaches all exports to `window`:

```html
<script src="iChing.js"></script>
<script>
  const result = divine([11, 20, 5, 14, 3, 7]);
  console.log(result.primary.name);
</script>
```

### Result Structure

`divine()` returns a `DivinationResult` object with the following properties:

| Property | Type | Description |
|---|---|---|
| `input` | `number[]` | The original 6 input numbers |
| `yaos` | `Yao[]` | 6 processed yao objects (bottom → top) |
| `primary` | `Hexagram` | **本卦** — the primary hexagram derived from the 6 yaos |
| `changed` | `Hexagram` | **变卦** — moving yaos flipped polarity; static yaos unchanged |
| `nuclear` | `Hexagram` | **互卦** — inner 4 lines as new trigrams (yaos 2-3-4 / 3-4-5) |
| `opposite` | `Hexagram` | **错卦** — all 6 yaos flipped (yang↔yin) |
| `reversed` | `Hexagram` | **综卦** — yaos reversed bottom↔top (180° rotation) |
| `tiYong` | `TiYongResult` | **体用分析** — subject-object + Five Element relationship |

#### `Yao` — a single line

| Property | Type | Values |
|---|---|---|
| `position` | `number` | `1`–`6` (1 = bottom 初爻, 6 = top 上爻) |
| `polarity` | `string` | `'yang'` (—) or `'yin'` (- -) |
| `mutability` | `string` | `'moving'` (will change) or `'static'` (fixed) |
| `symbol` | `string` | `'—'` or `'- -'` |
| `fourSymbol` | `string` | `'老阳'` / `'少阴'` / `'少阳'` / `'老阴'` |
| `input` | `number` | The original input integer for this yao |

#### `Hexagram` — a 6-line figure

| Property | Type | Description |
|---|---|---|
| `number` | `number` | King Wen sequence number (`1`–`64`) |
| `name` | `string` | Chinese name, e.g. `'家人'` |
| `pinyin` | `string` | Romanized name, e.g. `'Jiā Rén'` |
| `character` | `string` | Unicode hexagram symbol, e.g. `'䷤'` |
| `upperTrigram` | `Trigram` | Upper trigram (外卦 / 上卦, lines 4–6) |
| `lowerTrigram` | `Trigram` | Lower trigram (内卦 / 下卦, lines 1–3) |
| `yaos` | `Yao[]` | 6 yao objects (index 0 = bottom line) |

#### `Trigram` — a 3-line figure

| Property | Type | Description |
|---|---|---|
| `name` | `string` | Chinese name: `'乾'` `'兑'` `'离'` `'震'` `'巽'` `'坎'` `'艮'` `'坤'` |
| `symbol` | `string` | Unicode: `'☰'` `'☱'` `'☲'` `'☳'` `'☴'` `'☵'` `'☶'` `'☷'` |
| `element` | `string` | Five Element: `'金'` `'水'` `'火'` `'木'` `'土'` |
| `binary` | `string` | 3-bit binary, bottom-to-top, e.g. `'111'` (乾) |

#### `TiYongResult` — 体用 analysis

| Property | Type | Description |
|---|---|---|
| `subject` | `Trigram` | **体卦** — represents **you** (the subject) |
| `object` | `Trigram` | **用卦** — represents **the situation** (the object) |
| `relation` | `string` | One of: `'subject-controls'` / `'object-controls'` / `'subject-produces'` / `'object-produces'` / `'same-element'` |
| `interpretation` | `string` | Human-readable English description of the relationship |

**Relation meanings:**

| Relation | Chinese | Meaning |
|---|---|---|
| `subject-controls` | 体克用 | You dominate the situation — favourable |
| `object-controls` | 用克体 | The situation overwhelms you — unfavourable |
| `subject-produces` | 体生用 | You drain yourself — effort required |
| `object-produces` | 用生体 | The situation nourishes you — very favourable |
| `same-element` | 体用同 | Balance and mutual support — neutral/favourable |

### API

```typescript
// Main entry
divine(numbers: number[]): DivinationResult

// Granular functions
processYao(number, position): Yao
processYaos(numbers): Yao[]
identifyTrigram(yaos): Trigram
trigramFromBinary(binary): Trigram
trigramByName(name): Trigram | undefined
lookupHexagram(upper, lower, yaos): Hexagram
getHexagramByNumber(n): HexagramData
deriveChanged(primary): Hexagram     // 变卦
deriveNuclear(primary): Hexagram     // 互卦
deriveOpposite(primary): Hexagram    // 错卦
deriveReversed(primary): Hexagram    // 综卦
determineTiYong(primary): TiYongResult
determineWuxingRelation(subject, object): WuxingRelation
```

### Install

```bash
npm install iching-pro
```

### Build

```bash
npm run build          # tsc (ESM + CJS + types) → esbuild (iChing.js bundle)
npm run build:esm      # ESM only
npm run build:cjs      # CJS only
npm run build:bundle   # Browser IIFE bundle only
npm run typecheck      # Type check without emitting
npm run clean          # Remove dist/
```

### How It Works

1. **Input**: 6 positive integers (N₁–N₆)
2. **Yao mapping**: `N mod 4` → Four Symbols (老阳 / 少阴 / 少阳 / 老阴)
3. **Trigram identification**: 3 yaos → one of 8 trigrams (binary encoding)
4. **Hexagram lookup**: upper + lower trigram → one of 64 hexagrams (King Wen sequence)
5. **Derivations**: Changed (变卦), Nuclear (互卦), Opposite (错卦), Reversed (综卦)
6. **体用 analysis**: Subject/Object determination + Five Element (五行) relationship

### King Wen Pairings

All 64 hexagrams in the King Wen sequence are arranged in 32 pairs. Each pair consists of hexagrams related by either:
- **Inversion (综卦)**: one hexagram flipped upside-down yields the other — used for 28 pairs
- **Opposition (错卦)**: all six lines flipped (yang↔yin) — used for the 4 pairs whose hexagrams are symmetric under inversion: 1↔2 (乾↔坤), 27↔28 (颐↔大过), 29↔30 (坎↔离), 61↔62 (中孚↔小过)

All 64 trigram pairs are unique — no collisions.

### Project Structure

```
src/
├── index.ts        # Public API + divine() entry point
├── global.ts       # Browser entry — bundles to iChing.js (window.* exports)
├── types.ts        # TypeScript type definitions
├── constants.ts    # Trigram & hexagram tables, Wuxing data
├── yao.ts          # N mod 4 → yao mapping
├── trigram.ts      # 3-yaos → trigram identification
├── hexagram.ts     # Trigram pair → hexagram lookup
├── derive.ts       # 变卦, 互卦, 错卦, 综卦 derivations
├── tiyong.ts       # 体用 determination
└── wuxing.ts       # Five Element relationships
index.html          # Self-contained interactive divination page
iChing.js           # Auto-generated browser IIFE bundle (via esbuild)
```

### License

MIT

---

## 中文

### 快速开始

用任意现代浏览器打开 `index.html`，无需服务器，无需构建。

- 输入 6 个正整数，或点击**随机生成**
- 点击**开始占卜**
- 查看全部卦象：本卦、变卦、互卦、错卦、综卦 + 体用分析

### 库的使用

```typescript
import { divine } from 'iching-pro';

const result = divine([11, 20, 5, 14, 3, 7]);

console.log(result.primary.name);    // 如 '家人'
console.log(result.changed.name);    // 如 '中孚'
console.log(result.nuclear.name);    // 如 '未济'
console.log(result.tiYong.relation); // 如 'subject-produces'
```

#### 浏览器 `<script>` 标签

预构建的 `iChing.js` 是一个 IIFE 打包文件，将所有导出挂载到 `window`：

```html
<script src="iChing.js"></script>
<script>
  const result = divine([11, 20, 5, 14, 3, 7]);
  console.log(result.primary.name);
</script>
```

### 返回结果结构

`divine()` 返回一个 `DivinationResult` 对象，包含以下属性：

| 属性 | 类型 | 说明 |
|---|---|---|
| `input` | `number[]` | 原始输入的 6 个数字 |
| `yaos` | `Yao[]` | 6 个爻对象（下→上） |
| `primary` | `Hexagram` | **本卦** — 由 6 爻推定的主卦 |
| `changed` | `Hexagram` | **变卦** — 动爻翻转阴阳，静爻不变 |
| `nuclear` | `Hexagram` | **互卦** — 取中间 4 爻为新上下卦（爻 2-3-4 / 3-4-5） |
| `opposite` | `Hexagram` | **错卦** — 六爻全变（阳↔阴） |
| `reversed` | `Hexagram` | **综卦** — 六爻颠倒（旋转 180°） |
| `tiYong` | `TiYongResult` | **体用分析** — 主客体 + 五行生克关系 |

#### `Yao` — 爻（单线）

| 属性 | 类型 | 值 |
|---|---|---|
| `position` | `number` | `1`–`6`（1 = 初爻在下，6 = 上爻在上） |
| `polarity` | `string` | `'yang'`（阳 —）或 `'yin'`（阴 - -） |
| `mutability` | `string` | `'moving'`（动爻，将变）或 `'static'`（静爻，不变） |
| `symbol` | `string` | `'—'` 或 `'- -'` |
| `fourSymbol` | `string` | 四象：`'老阳'` / `'少阴'` / `'少阳'` / `'老阴'` |
| `input` | `number` | 该爻对应的原始输入数字 |

#### `Hexagram` — 卦（六线重卦）

| 属性 | 类型 | 说明 |
|---|---|---|
| `number` | `number` | 文王序编号（`1`–`64`） |
| `name` | `string` | 中文名，如 `'家人'` |
| `pinyin` | `string` | 拼音，如 `'Jiā Rén'` |
| `character` | `string` | Unicode 卦符，如 `'䷤'` |
| `upperTrigram` | `Trigram` | 上卦（外卦，第 4–6 爻） |
| `lowerTrigram` | `Trigram` | 下卦（内卦，第 1–3 爻） |
| `yaos` | `Yao[]` | 6 个爻对象（索引 0 = 最下爻） |

#### `Trigram` — 经卦（三线）

| 属性 | 类型 | 说明 |
|---|---|---|
| `name` | `string` | 中文名：`'乾'` `'兑'` `'离'` `'震'` `'巽'` `'坎'` `'艮'` `'坤'` |
| `symbol` | `string` | Unicode 符号：`'☰'` `'☱'` `'☲'` `'☳'` `'☴'` `'☵'` `'☶'` `'☷'` |
| `element` | `string` | 五行属性：`'金'` `'水'` `'火'` `'木'` `'土'` |
| `binary` | `string` | 3 位二进制（下→上），如 `'111'`（乾） |

#### `TiYongResult` — 体用分析

| 属性 | 类型 | 说明 |
|---|---|---|
| `subject` | `Trigram` | **体卦** — 代表**你**（主体） |
| `object` | `Trigram` | **用卦** — 代表**事况**（客体） |
| `relation` | `string` | 五行关系，五选一：见下表 |
| `interpretation` | `string` | 关系的英文描述 |

**五行关系：**

| `relation` 值 | 中文 | 含义 |
|---|---|---|
| `subject-controls` | 体克用 | 你主导局势 — 吉 |
| `object-controls` | 用克体 | 局势压制你 — 凶 |
| `subject-produces` | 体生用 | 你在消耗自身 — 需努力 |
| `object-produces` | 用生体 | 局势滋养你 — 大吉 |
| `same-element` | 体用同 | 平衡互助 — 中平/吉 |

### API

```typescript
// 主入口
divine(numbers: number[]): DivinationResult

// 细粒度函数
processYao(number, position): Yao
processYaos(numbers): Yao[]
identifyTrigram(yaos): Trigram
trigramFromBinary(binary): Trigram
trigramByName(name): Trigram | undefined
lookupHexagram(upper, lower, yaos): Hexagram
getHexagramByNumber(n): HexagramData
deriveChanged(primary): Hexagram     // 变卦
deriveNuclear(primary): Hexagram     // 互卦
deriveOpposite(primary): Hexagram    // 错卦
deriveReversed(primary): Hexagram    // 综卦
determineTiYong(primary): TiYongResult
determineWuxingRelation(subject, object): WuxingRelation
```

### 安装

```bash
npm install iching-pro
```

### 构建

```bash
npm run build          # tsc (ESM + CJS + 类型) → esbuild (iChing.js)
npm run build:esm      # 仅 ESM
npm run build:cjs      # 仅 CJS
npm run build:bundle   # 仅浏览器 IIFE 打包
npm run typecheck      # 仅类型检查
npm run clean          # 清理 dist/
```

### 原理

1. **输入**：6 个正整数 (N₁–N₆)
2. **爻映射**：`N mod 4` → 四象（老阳 / 少阴 / 少阳 / 老阴）
3. **卦识别**：3 爻 → 八经卦之一（二进制编码）
4. **重卦查找**：上卦 + 下卦 → 六十四卦之一（文王序）
5. **衍生卦象**：变卦、互卦、错卦、综卦
6. **体用分析**：主客判定 + 五行生克关系

### 文王序配对

六十四卦按文王序排列为 32 对，每对之间满足：
- **综卦（覆）**：一卦倒转 180° 即得另一卦 — 28 对
- **错卦（变）**：六爻全变（阳↔阴）— 用于颠倒后仍为自身的 4 个对称卦对：1↔2（乾↔坤）、27↔28（颐↔大过）、29↔30（坎↔离）、61↔62（中孚↔小过）

全部 64 个卦象对唯一，无冲突。

### 项目结构

```
src/
├── index.ts        # 公共 API + divine() 入口
├── global.ts       # 浏览器入口 — 打包为 iChing.js（window.* 导出）
├── types.ts        # TypeScript 类型定义
├── constants.ts    # 八卦表、六十四卦表、五行数据
├── yao.ts          # N mod 4 → 爻映射
├── trigram.ts      # 3 爻 → 卦识别
├── hexagram.ts     # 上下卦对 → 重卦查找
├── derive.ts       # 变卦、互卦、错卦、综卦 衍生
├── tiyong.ts       # 体用判定
└── wuxing.ts       # 五行生克关系
index.html          # 独立交互式占卜页面
iChing.js           # 自动生成的浏览器 IIFE 打包文件（esbuild）
```

### 许可证

MIT
