# CBANK — Design System Guide

Canonical reference for design tokens, typography, and component patterns.
Ground truth lives in `web/app/globals.css` and `web/tailwind.config.ts`.

---

## Color tokens (`web/app/globals.css` `:root`)

```css
/* Surfaces */
--bg:         #FFFFFF
--s1:         #F5F9F7        /* card / section tint */
--s2:         #EBF3EE        /* hover surface, chips */
--s3:         #DCEEe4        /* deep tint */

/* Borders */
--b0:         rgba(0,0,0,0.07)
--b1:         rgba(0,0,0,0.11)
--b2:         rgba(0,0,0,0.20)

/* Brand — Sea Green #2E8B57 */
--accent:     #2E8B57
--accent-dim: rgba(46,139,87,0.09)   /* chip / badge background */
--accent-mid: rgba(46,139,87,0.22)   /* hover border, left-accent stripe */

/* Text */
--text:       #0D1F14        /* primary — also used as dark section background */
--text-muted: #527A62        /* secondary */
--text-faint: #B8D4C2        /* decorative / disabled */
--text-fade:  rgba(13,31,20,0.32)   /* two-tone heading second clause */
```

Tailwind aliases are defined in `tailwind.config.ts` as `primary`, `primary-dark`,
`primary-light`, `surface`, `surface-alt`, `border`, `text`, `text-muted`, `text-subtle`.

---

## Typography

| Role | Font variable | Size | Weight | Tracking |
|---|---|---|---|---|
| Hero h1 | `--font-sans` | `clamp(48px,7vw,82px)` | 800 | `-0.05em` |
| Section h2 | `--font-sans` | 20–32px | 800 | `-0.04em` |
| Card h3 | `--font-sans` | 13–16px | 600–700 | `-0.02em` |
| Body | `--font-sans` | 13–15px | 300–400 | normal |
| Mono eyebrow | `--font-mono` | 9–10px | 400 | `0.14em` + uppercase |
| Command chip | `--font-mono` | 9–12px | 400 | normal |

**Fonts loaded in `web/app/layout.tsx`:**
- `--font-sans` → Inter (Google Fonts)
- `--font-mono` → Geist Mono (geist/font/mono)
- `--font-serif` → Instrument Serif (Google Fonts, italic accent only)

### Eyebrow + heading pattern
```
◆ Section label    font-mono 10px 0.14em uppercase --accent
Section Heading    font-sans 800 -0.04em
```

### Two-tone heading
```jsx
<h1>
  Primary text.{" "}
  <span style={{ color: "var(--text-fade)" }}>Faded second clause.</span>
</h1>
```

---

## Backgrounds

### `.hero-bg` — light isometric diamond tile
Two-layer SVG at 52×28px, staggered 26×14px. Applied on `PageHeader` and hero section.
```css
/* fill-opacity: 0.07, stroke-opacity: 0.15 */
background-position: 0 0, 26px 14px;
background-size: 52px 28px, 52px 28px;
```

### `.bg-diamond-dark` — dark surface tile
Same SVG but `fill-opacity: 0.04, stroke-opacity: 0.08`. Used on dark cards and sections.

---

## Component patterns

### Default card
```jsx
<div style={{
  background: "var(--s1)",
  border: "1px solid var(--b0)",
  borderRadius: 10,
  padding: "16px 18px",
}}>
```
Hover → add class `.skill-card`: border-color `--accent-mid`, bg `--s2`, `translateY(-2px)`.

### Left-accent info box
```jsx
<div style={{
  background: "var(--s1)",
  border: "1px solid var(--b0)",
  borderLeft: "2px solid var(--accent-mid)",
  borderRadius: 10,
  padding: "18px 22px",
}}>
```

### Dark terminal block
```jsx
<div style={{
  background: "#0D1F14",
  border: "1px solid rgba(46,139,87,0.18)",
  borderLeft: "2px solid rgba(46,139,87,0.45)",
  borderRadius: 8,
  padding: "13px 18px",
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  color: "#fff",
}}>
  <span style={{ color: "var(--accent)", marginRight: 10 }}>›</span>
  /command prompt here
</div>
```

### Command chip (inline)
```jsx
<code style={{
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  color: "var(--accent)",
  background: "var(--accent-dim)",
  padding: "2px 6px",
  borderRadius: 3,
}}>
  /slug
</code>
```

### Dark CTA section
```jsx
<div className="bg-diamond-dark" style={{
  background: "var(--text)",   /* #0D1F14 */
  borderRadius: 14,
  padding: "48px 40px",
  textAlign: "center",
}}>
```

### Diamond divider
```jsx
const DiamondDivider = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}>
    <div style={{ flex: 1, height: 1, background: "var(--b0)" }} />
    <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--accent)", opacity: 0.4 }}>◆</span>
    <div style={{ flex: 1, height: 1, background: "var(--b0)" }} />
  </div>
);
```

---

## Spacing rhythm

| Context | Value |
|---|---|
| Top-level sections | `padding: 80px 0` |
| Card interior | `16–24px` |
| Section-to-section gap | `48–64px` |
| Sticky nav height | `60px` |
| Page max-width | `max-w-6xl` (1152px) |
| Focused pages (docs) | `max-w-5xl` |

---

## CSS animation classes

| Class | Effect |
|---|---|
| `.anim` + `.visible` | `fadeUp`: opacity 0→1, translateY 20px→0, 0.55s ease |
| `.anim-d1`–`.anim-d5` | Stagger delays: 0.05 / 0.13 / 0.22 / 0.32 / 0.42s |
| `.skill-card` | hover → translateY(-2px), border + bg change, 0.2s |
| `.marquee-track` | scroll left, 26s linear infinite |
| `::view-transition-new(root)` | zoom-in scale(0.92)→1, 550ms spring |
| `.page-enter` | same zoom-in (CSS fallback) |
| `dropdownIn` | translateY(-8px) scale(0.97)→identity, 160ms |

---

## Nav conventions

- Sticky, `height: 60px`, frosted glass `rgba(255,255,255,0.92)` + `backdrop-filter: blur(20px)`
- Nav links: `.nav-link-item` (muted) → hover `.nav-link-item:hover` (text bg-s1) → active `.nav-link-active` (accent bg-s2)
- Active state wins over hover via `.nav-link-item.nav-link-active:hover` (specificity 0,3,0)
- Dropdown hover gap fix: transparent 12px bridge div fills the space between trigger and panel

---

## Page-specific notes

**`/` Landing** — hero: `.hero-bg` + radial gradient fade + floating 3D cube SVG; dark sections use `var(--text)` bg + `.bg-diamond-dark`.

**`/skills/[slug]/[skill]`** — `DiamondDivider` between sections; `◆` prefix on all mono eyebrows; sidebar CTA uses `var(--text)` bg + `.bg-diamond-dark`.

**`/enterprise`** — dark use-case card row; step numbers styled with `-webkit-text-stroke: 1px var(--accent-mid)`.

**`/docs`** — two-column layout `lg:grid-cols-[200px_1fr]`; sticky sidebar with `.docs-nav-link` anchor links.
