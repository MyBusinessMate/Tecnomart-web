# Quality Contract

```yaml
id: quality-contract
name: Quality, Verification and Integrity Contract
version: "1.0.0"
schema_version: "1.0.0"
status: VERIFIED
confidence: HIGH
```

## Quality Invariants
1. **Compilation Guarantee**: `npm run build` must succeed with 0 syntax or type errors.
2. **Delete Safety**: No destructive delete operation can ever execute without affirmative confirmation from `AdminConfirmModal`.
3. **Filter Determinism**: Every filter combination on storefront catalogs must evaluate without JavaScript exceptions, NaN prices, or broken images.
4. **Minimal Aesthetics Compliance**: 100% adherence to warm monochrome styling, `1px solid #EAEAEA` borders, muted pastels, and zero emojis.
5. **Session Safety**: Unauthenticated users cannot view or manipulate administrative data.
