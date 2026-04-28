# Investment Banking Vertical

The `investment-banking` plugin covers the full M&A and capital markets deal workflow — from initial pitch through to close documentation.

---

## Skills

| Command | What it produces |
|---|---|
| `/pitch-deck` | Full sell-side or buy-side pitch deck (20-40 slides) with situation overview, process, valuation, and transaction structure |
| `/cim-builder` | Confidential Information Memorandum (50-80 pages) — business overview, financial analysis, growth strategy, and appendices |
| `/buyer-list` | Curated strategic and financial buyer list with rationale for each party |
| `/merger-model` | Accretion/dilution merger model in Excel with sources & uses, pro forma income statement, and EPS impact |
| `/teaser` | 2-4 page anonymous teaser for initial buyer outreach |
| `/process-letter` | First-round or final-round process letter with bid instructions and timeline |
| `/deal-tracker` | Deal process tracker with milestones, counterparty status, and next steps |
| `/strip-profile` | Comparable transaction strip with deal multiples and terms |
| `/datapack-builder` | Financial data pack for buyer diligence — historical financials, KPIs, and projections |

---

## Install

```bash
claude plugin install anthropic/investment-banking
```

Requires `financial-analysis` to be installed first (provides `/xlsx-author` and `/pptx-author` used by this vertical).

---

## Example workflows

### Sell-side M&A process

```
1. /teaser        → Anonymous 2-pager for initial outreach
2. /process-letter → First-round process letter with NDA instructions
3. /cim-builder   → Full CIM once NDAs are signed
4. /datapack-builder → Financial data pack for management presentations
5. /process-letter → Final-round bid instructions
6. /merger-model  → Accretion/dilution model for each finalist bid
```

### Buy-side pitch

```
1. /comps         → Trading comps for target (from financial-analysis)
2. /strip-profile → Precedent transactions
3. /lbo-model     → LBO returns (from financial-analysis)
4. /pitch-deck    → Buy-side pitch with investment thesis and valuation
```

---

## Output quality notes

- **Pitch decks** are structured as editable PowerPoint files. Specify the bank name, target company, and deal type in your prompt for branded output.
- **CIMs** follow the standard IB format. Financial tables pull from whatever Excel model or 10-K/10-Q you provide in context.
- **Merger models** output to Excel. Provide the buyer's and target's financial statements for the most accurate accretion/dilution analysis.
- All output is draft work product. Have an analyst review financial calculations before distributing to counterparties.

---

## Data connectors

This vertical benefits from the following MCP connectors (configured in `financial-analysis`):

- **PitchBook** — comparable transaction data for `/strip-profile`
- **S&P Capital IQ** — public company financials for comps and merger model inputs
- **Daloopa** — structured earnings data for target company analysis
