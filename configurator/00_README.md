# PC Custom Setup Configurator - Implementation Pack

## Purpose

Build a premium, low-cognitive-load PC configurator for a PC-focused wholesale/reseller mart landing page.

The landing page contains a CTA/section named **Build Your Custom Setup**. Clicking it opens a dedicated configurator page where the user can build one of three products:

1. Gaming PC
2. Workstation PC
3. Complete Gaming Setup

The configurator must show only three meaningful options per step, use normal customer language, dynamically filter later choices based on earlier choices, provide a recommendation path, keep the selected build in `localStorage`, calculate the final estimated total only at the end, and finish with a build-request form.

## What is included

- Complete product/UX flow
- Screen-by-screen decision tree
- Recommendation logic
- Compatibility rules
- Product data schema
- Starter catalog structure
- Local-storage schema
- Final request payload
- WhatsApp message template
- Backend handoff contract
- Validation and acceptance tests
- Master coding-agent prompt
- Current hardware research notes and sources

## Important

The sample component catalog is a **starter seed**, not an inventory guarantee. Real store SKUs, local pricing, availability, warranty, and exact PSU/case/cooler compatibility must be verified before production use.

The compatibility engine is deliberately rule-based. Do not invent compatibility at runtime with an LLM. Keep compatibility deterministic and testable.

## Recommended implementation architecture

- Frontend: use the site's existing framework if available. The feature itself should be framework-agnostic at the data/logic layer.
- State persistence: `localStorage`.
- Product catalog: JSON/data module initially. Later replaceable by API/database.
- Compatibility: deterministic filtering functions.
- Lead capture: POST a normalized payload to backend.
- Optional sales notification: generate a WhatsApp-ready message from the same normalized payload.

## Suggested routes

- Landing page: existing route
- Configurator: `/build-your-setup`
- Request confirmation: `/build-your-setup/requested` or modal/state, depending on the existing app

## Core principle

The customer should feel like they are answering simple questions to get a PC that fits them. They should not feel like they are filling out a hardware compatibility spreadsheet.
