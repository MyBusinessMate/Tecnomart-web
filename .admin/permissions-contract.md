# Permissions Contract

```yaml
id: permissions-contract
name: Role-Based Access Control (RBAC) Specification
version: "1.0.0"
schema_version: "1.0.0"
status: VERIFIED
confidence: HIGH
```

## Roles Definition

| Role | Description | Capabilities |
|---|---|---|
| `superadmin` | Executive Owner / CTO | Unrestricted CRUD on all resources, user management, system configs, spin system overrides, destructive purge. |
| `manager` | Store Operations Manager | Full CRUD on products, pricing, repairs, configurator, and blog posts. Cannot delete staff users. |
| `editor` | Content & Catalog Specialist | Can add and edit products, update blog copy and landing text. Cannot alter store contact, users, or spin odds. |
| `viewer` | Support & In-Store Cashier | Read-only access across all modules; can view products and verify customer spin coupons. Cannot edit or delete. |

## Permission Matrix

| Resource | Action | superadmin | manager | editor | viewer |
|---|---|---|---|---|---|
| `products` | create / update | YES | YES | YES | NO |
| `products` | delete | YES | YES | NO | NO |
| `pricing` | update | YES | YES | NO | NO |
| `repairs` | manage | YES | YES | NO | NO |
| `configurator` | manage | YES | YES | NO | NO |
| `blogs` | manage | YES | YES | YES | NO |
| `store_info` | update | YES | YES | NO | NO |
| `spin_odds` | update | YES | NO | NO | NO |
| `users` | manage | YES | NO | NO | NO |
