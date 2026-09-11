# UI Contract

```yaml
id: ui-contract
name: Utilitarian Minimalist Admin UI Specification
version: "1.0.0"
schema_version: "1.0.0"
status: VERIFIED
confidence: HIGH
```

## Design Principles
Following `/minimalist-ui`, `/minimal-interface-design`, and `/bencium-controlled-ux-designer`:
1. **Warm Monochrome Palette**:
   - Canvas / Background: Pure White `#FFFFFF` or Off-White `#F7F6F3` / `#FAFAFA`
   - Surfaces: `#FFFFFF` with `1px solid #EAEAEA` borders
   - Primary Text: Off-Black `#111111` or `#1E1E1E`
   - Secondary Text: Slate `#6B7280` or Muted `#787774`
2. **Muted Pastels for Semantic Status Badges**:
   - Success / Active: `#EDF3EC` background, `#346538` text
   - Warning / In-Progress: `#FBF3DB` background, `#956400` text
   - Error / Danger: `#FDEBEC` background, `#9F2F2D` text
   - Informational / Draft: `#E1F3FE` background, `#1F6C9F` text
3. **Typography**:
   - Clean, geometric sans-serif (`font-sans`), tight tracking on headings (`tracking-tight`), crisp uppercase labels (`tracking-wider`, `text-[11px]`).
4. **Negative Constraints (Absolute Rules)**:
   - ZERO emojis anywhere in markup, tables, status pills, or notification toasts.
   - NO heavy drop shadows (no `shadow-xl` or `shadow-2xl` on cards). Borders (`1px solid #EAEAEA`) create clean contrast.
   - NO bright colored backgrounds across full screens.
   - NO destructive action without a confirmation dialog.
5. **Interactive Controls**:
   - Data tables feature search inputs, category dropdown filters, sorting controls, pagination/view-more to prevent infinite page lag.
   - Inline edit drawers and modal forms with full validation feedback.
