# Equity Research Vertical

The `equity-research` plugin automates the coverage lifecycle — from initiating coverage through ongoing earnings tracking and daily market commentary.

---

## Skills

| Command | What it produces |
|---|---|
| `/initiating-coverage` | Full initiating coverage report (25-40 pages) with investment thesis, financial model, valuation, risks, and rating |
| `/earnings-analysis` | Post-earnings update report (8-12 pages) with results vs. estimates, guidance analysis, and model revisions |
| `/earnings-preview` | Pre-earnings preview (4-6 pages) with consensus expectations, key debates, and what to watch |
| `/morning-note` | Daily morning note (1-2 pages) covering overnight developments for covered names |
| `/model-update` | Structured model revision memo after a data event |
| `/sector-overview` | Industry sector overview (10-15 pages) for thematic or top-of-funnel research |
| `/catalyst-calendar` | Forward-looking catalyst calendar for a covered universe |
| `/idea-generation` | Systematic idea generation based on screen criteria, sector views, or thematic angle |
| `/thesis-tracker` | Thesis monitoring — tracks how a thesis is playing out against original expectations |

---

## Install

```bash
claude plugin install anthropic/equity-research
```

---

## Example workflow — earnings season

```
# Before earnings
/earnings-preview NVDA Q2 2025 — consensus $0.64 EPS, key debate: datacenter TAM sustainability

# Day of earnings (after release)
/earnings-analysis Attached: NVDA Q2 2025 press release + transcript. Prior model attached.

# Model revision
/model-update Revise FY2025 estimates by +8% based on datacenter upside guidance

# Morning note next day
/morning-note NVDA — post-earnings takeaways, revised price target $160, reiterate Buy
```

---

## Output quality notes

- **Initiating coverage** reports require a financial model in context for the valuation section. Provide a DCF or comps output from `/dcf` or `/comps`.
- **Earnings analysis** works best with the earnings transcript, press release, and your prior model all provided in context.
- **Morning notes** are intentionally brief — 400-600 words. If you need a longer format, specify in the prompt.
- All ratings and price targets in output are illustrative. Actual research must be reviewed by licensed analysts under your firm's compliance framework.

---

## Data connectors

- **FactSet** — estimates and actuals for earnings analysis
- **Aiera** — earnings call transcripts
- **MT Newswires** — overnight news for morning notes
- **Morningstar** — fund flow and ratings data for sector overviews
