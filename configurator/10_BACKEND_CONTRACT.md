# Backend Contract

## Endpoint

Recommended:
`POST /api/custom-build-requests`

The frontend should read the actual endpoint from config/environment.

## Request

Content-Type: `application/json`

Body follows the normalized lead schema in `05_DATA_SCHEMA.md`.

## Recommended server behavior

1. Validate all customer fields.
2. Validate selected product IDs against the server-side product source.
3. Recalculate/verify pricing server-side.
4. Re-run compatibility validation server-side for trust.
5. Create a lead record.
6. Store the structured configuration.
7. Return a request/reference ID.
8. Optionally enqueue email/WhatsApp sales notification.

## Response

Success:

```json
{
  "success": true,
  "requestId": "REQ-2026-000001",
  "message": "Request received"
}
```

Failure:

```json
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "message": "Please check the highlighted fields."
}
```

## Security

- Never trust client-side prices.
- Never trust client-side compatibility.
- Do not expose internal supplier costs.
- Rate-limit lead submission.
- Validate and sanitize free-text notes.
- Use CSRF protection where applicable.
- Keep any WhatsApp destination/contact number server-configurable.
