# Database Contract

```yaml
id: database-contract
name: Client-Side Repository & Database Readiness Contract
version: "1.0.0"
schema_version: "1.0.0"
status: VERIFIED
confidence: HIGH
```

## Storage Architecture
The system employs an enterprise Repository Pattern (`adminStore.js`):
1. **Local Persistent Storage**: Keyed under `tecnomart_db_v1` in browser `localStorage`.
2. **Database-Ready Schemas**: All data entities follow strict relational tables and document IDs, allowing drop-in connection to Supabase / PostgreSQL / REST APIs whenever a cloud backend is connected.
3. **Automated Seed Initialization**: On first load or if storage is empty, `adminStore` hydrates from the canonical datasets (`MOBILES_DATA`, `LAPTOPS_DATA`, `GAMING_DATA`, `ACCESSORIES_DATA`, `REFURBISHED_DATA`) with zero data loss.
4. **Purge & Reset Capabilities**: Superadmins can reset the database back to clean factory seed state or export JSON snapshots.
