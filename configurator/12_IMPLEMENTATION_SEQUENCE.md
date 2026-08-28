# Implementation Sequence

## Phase 1 - Data

1. Create catalog module.
2. Normalize IDs and compatibility fields.
3. Add real store SKUs and prices.
4. Add product images.
5. Verify each SKU's current specifications.

## Phase 2 - Logic

1. Create build-state model.
2. Create localStorage persistence service.
3. Create filtering functions.
4. Create recommendation scorer.
5. Create price calculator.
6. Create final payload normalizer.
7. Create WhatsApp message builder.

## Phase 3 - UI

1. Landing section.
2. Configurator shell.
3. Progress UI.
4. Option cards.
5. Build summary.
6. Mobile sticky summary.
7. Final summary.
8. Request form.
9. Success state.

## Phase 4 - Backend

1. Create POST endpoint.
2. Validate payload.
3. Recalculate compatibility and price server-side.
4. Persist lead.
5. Return request ID.
6. Optional sales notification.

## Phase 5 - QA

Run every test in `09_ACCEPTANCE_TESTS.md`.

## Critical implementation order

Do not build the visual UI first and invent the data logic afterward.

Correct order:
`data -> compatibility -> recommendation -> state -> UI -> submission -> QA`

This prevents the common failure mode where the interface looks finished but the builder cannot reliably produce valid builds.
