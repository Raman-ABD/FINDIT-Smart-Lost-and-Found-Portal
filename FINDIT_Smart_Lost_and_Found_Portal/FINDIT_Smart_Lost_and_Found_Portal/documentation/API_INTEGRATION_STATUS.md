# FINDIT API integration status and setup

The existing Lost/Found GET and POST endpoints remain unchanged:
- `GET/POST http://localhost:8081/ords/findit/api/lost-items/`
- `GET/POST http://localhost:8081/ords/findit/api/found-items/`

## New database logic
Run `05_portal_package.sql` as schema `FINDIT` for registration, login, claim submission and claim review procedures.
Run `06_smart_matching.sql` for fuzzy matching. This is rule-based fuzzy matching, not machine-learning AI.

## Important deployment note
The new procedures are database-side logic only. They are **not automatically exposed as ORDS endpoints** by these scripts. Create and test the ORDS handlers before switching the browser app to them. This avoids pretending the frontend is connected when an endpoint does not exist.

Suggested endpoint contracts:
| Method | URI | Request/response purpose |
|---|---|---|
| POST | `/ords/findit/api/register/` | `P_FULL_NAME`, `P_EMAIL`, `P_PASSWORD`; returns new user id |
| POST | `/ords/findit/api/login/` | `P_EMAIL`, `P_PASSWORD`; returns user id, full name and role |
| GET | `/ords/findit/api/search-items/` | Returns OPEN lost and found items |
| GET | `/ords/findit/api/my-reports/?user_id=1` | Returns that user's lost and found reports |
| GET | `/ords/findit/api/dashboard/` | Returns open lost/found counts |
| POST | `/ords/findit/api/claims/` | `P_FOUND_ID`, `P_USER_ID`, `P_MESSAGE`; creates a claim |
| GET | `/ords/findit/api/admin/claims/` | Admin-only pending claims |
| POST | `/ords/findit/api/admin/review-claim/` | `P_CLAIM_ID`, `P_STATUS`; approves/rejects |

## Security limitations for this academic local demo
- Do not expose this local ORDS instance to the public internet.
- The current item-report JavaScript still uses a temporary `DB_USER_ID = 1`. Replace it with the authenticated user id after login integration.
- Browser `localStorage` is not a secure authentication/session mechanism. The login procedure here is a basic academic demonstration, not production authentication. For a real deployment, use server-side sessions, HTTPS, rate limiting, and a password hashing function designed for passwords (salted, slow KDF).
- Never put database credentials in HTML or JavaScript.
