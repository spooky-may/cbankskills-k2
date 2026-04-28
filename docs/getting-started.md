# Getting Started

This guide covers the two ways to deploy CN Finance skills: as **Claude for Work plugins** (no-code install) or as **Managed Agents** via the Anthropic API.

---

## Option 1 — Claude for Work plugins

The simplest path. Skills install directly into Claude's UI as slash commands.

### Prerequisites

- A Claude for Work (Teams or Enterprise) account
- Admin or plugin-install permissions in your workspace

### Install

```bash
# Core financial analysis vertical (required first)
claude plugin install anthropic/financial-analysis

# Add any vertical you need
claude plugin install anthropic/investment-banking
claude plugin install anthropic/equity-research
claude plugin install anthropic/private-equity
claude plugin install anthropic/fund-admin
claude plugin install anthropic/wealth-management
claude plugin install anthropic/operations
```

Alternatively, install from a local clone:

```bash
git clone https://github.com/cn-finance/cn-finance
claude plugin install ./cn-finance/skills/plugins/vertical-plugins/investment-banking
```

### Using skills

After install, skills appear as slash commands in Claude:

```
/dcf Attached 10-K — build a 5-year DCF with WACC sensitivity table
/comps Build comps for US mid-cap payments processors
/morning-note Prepare pre-earnings morning note for MSFT
```

---

## Option 2 — Managed Agents (Anthropic API)

For teams that want to call skills programmatically or build custom interfaces on top of them.

### Prerequisites

- Anthropic API key with access to Claude 3 Sonnet or Opus
- Python 3.10+ or Node.js 18+

### Deploy

The `skills/managed-agent-cookbooks/` directory contains ready-to-use deployment templates.

```bash
cd skills/managed-agent-cookbooks

# Install Python dependencies
pip install anthropic

# Set your API key
export ANTHROPIC_API_KEY=sk-ant-...

# Run the example agent
python examples/pitch_agent.py
```

### Example: calling a skill via API

```python
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-4-7",
    max_tokens=8096,
    system=open("skills/plugins/vertical-plugins/investment-banking/skills/pitch-deck/SKILL.md").read(),
    messages=[
        {
            "role": "user",
            "content": "Build a pitch deck for TechCo acquisition by MegaCorp. Target: $2.4B. "
                       "Sector: enterprise SaaS. Attached: CIM, model, and public comps."
        }
    ]
)

print(response.content[0].text)
```

---

## Data connectors (MCP)

The `financial-analysis` vertical ships with MCP connectors for live market data. These require separate credentials from each data provider.

| Connector | Setup guide |
|---|---|
| FactSet | `docs/connectors/factset.md` |
| LSEG / Refinitiv | `docs/connectors/lseg.md` |
| S&P Global | `docs/connectors/spglobal.md` |
| PitchBook | `docs/connectors/pitchbook.md` |
| Morningstar | `docs/connectors/morningstar.md` |

Each connector is optional — skills work without live data, using whatever documents you provide in context.

---

## Next steps

- Browse [available verticals](../README.md#whats-inside)
- Read the [architecture guide](architecture.md)
- [Contribute a new skill](../CONTRIBUTING.md)
