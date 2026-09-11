# Security Contract

```yaml
id: security-contract
name: Admin Security and Access Control Specification
version: "1.0.0"
schema_version: "1.0.0"
status: VERIFIED
confidence: HIGH
```

## Security Posture
1. **Authentication Token**:
   - Session data is stored in `localStorage` under `tecnomart_admin_session`.
   - Token contains cryptographically structured format: `tkn_tm_[randomHex]_[timestamp]`.
   - Automatic expiry after 8 hours of inactivity.
2. **Rate Limiting Mechanism**:
   - Maximum 5 consecutive failed login attempts within 15 minutes.
   - Upon 5 failed attempts, the IP/client session is locked out for 15 minutes with a countdown timer displayed on the UI.
3. **Password Security**:
   - Minimum 8 characters, requiring at least one number, one uppercase character, and one special symbol.
   - Stored in hashed/salt representation (`tm_hash_...`) within the local mock staff database.
4. **Destructive Action Safety**:
   - Hard deletion of any record (product, category, user, blog, repair service) is strictly prohibited without explicit user confirmation via the `AdminConfirmModal`.
   - The modal states the exact item name, consequence, and requires a distinct confirmation click.
5. **Input Sanitization**:
   - All string inputs (names, descriptions, blog content) are trimmed and stripped of malicious HTML script tags before insertion into the store.
