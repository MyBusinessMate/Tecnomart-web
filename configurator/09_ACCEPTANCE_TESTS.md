# Acceptance Tests

## Entry

- [ ] Landing page shows Build your custom setup.
- [ ] CTA routes to `/build-your-setup`.
- [ ] Existing site navigation remains intact.

## Build-type selection

- [ ] Exactly 3 build types are shown.
- [ ] Each has a clear customer-friendly description.
- [ ] Selection is persisted.

## Recommendation

- [ ] Best Value works.
- [ ] Balanced - Recommended works.
- [ ] Maximum Performance works.
- [ ] Recommendation path auto-selects valid products.
- [ ] User can switch to Customize.

## Compatibility

- [ ] CPU filters motherboards.
- [ ] Motherboard filters memory.
- [ ] Motherboard filters storage.
- [ ] CPU + GPU determine suitable PSU options.
- [ ] CPU filters cooling options.
- [ ] Motherboard + GPU + cooler + PSU filter cabinets.
- [ ] Complete Gaming Setup filters monitors/peripherals appropriately.
- [ ] No technically invalid option appears.

## Navigation

- [ ] Back keeps valid choices.
- [ ] Changing CPU updates downstream choices.
- [ ] Only invalid downstream choices are cleared.
- [ ] User receives a friendly compatibility notice.

## UX

- [ ] Three options max per choice step.
- [ ] Recommended badge is obvious.
- [ ] No prices appear before final summary.
- [ ] Desktop has persistent build summary.
- [ ] Mobile has sticky summary bar.
- [ ] Loading states are clean.
- [ ] Empty states are actionable.

## Persistence

- [ ] Refreshing the page restores the draft.
- [ ] Continue draft works.
- [ ] Start over clears the draft.
- [ ] Customer PII is not stored in build draft localStorage.

## Final summary

- [ ] All selected components appear.
- [ ] Estimated price is calculated correctly.
- [ ] Edit buttons return to relevant steps.
- [ ] Request this build opens the form.

## Lead form

- [ ] Name validation works.
- [ ] Phone validation works.
- [ ] Email validation works.
- [ ] City is required.
- [ ] Notes remain optional.
- [ ] Configuration summary is visible.
- [ ] Submit button prevents double-submits.

## Backend

- [ ] Payload matches schema.
- [ ] Backend error produces a usable user message.
- [ ] Successful submission produces a success state.

## WhatsApp

- [ ] Message is generated from normalized configuration.
- [ ] All selected parts are present.
- [ ] Customer details are correct.
- [ ] Total is correct.
- [ ] WhatsApp URL is properly encoded.

## Responsive

- [ ] 320px wide mobile screen works.
- [ ] 375px works.
- [ ] 430px works.
- [ ] Tablet works.
- [ ] Desktop works.
- [ ] Sticky controls do not cover content.

## Accessibility

- [ ] Keyboard-only navigation works.
- [ ] Focus states visible.
- [ ] Form fields labeled.
- [ ] Errors announced/accessibly associated.
- [ ] Reduced motion respected.
