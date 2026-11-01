# FINDIT Development Plan

## Project title
SMART LOST & FOUND PORTAL (FINDIT)

## Objective
To provide a central portal where users can report lost belongings, report found belongings, search reports, and submit claims for found items.

## User roles
- User: registers, logs in, submits lost/found reports, searches items, and submits claims.
- Admin: reviews reports and manages claims and item status.

## Planned modules
1. Registration and login
2. User dashboard
3. Lost-item reporting
4. Found-item reporting
5. Search and filtering
6. Possible-match identification
7. Claim management
8. Admin management
9. Report and status tracking

## Technology responsibilities
- HTML: page structure and forms.
- CSS: layout and visual design.
- JavaScript: form validation and browser interactions.
- Oracle SQL: tables, constraints, relationships and queries.
- PL/SQL: procedures, functions, triggers, cursors and exception handling.
- ORDS: HTTP bridge for connecting the browser to Oracle Database.

## Development sequence
1. Requirement analysis
2. ER/database design
3. Table creation and constraints
4. Sample data
5. PL/SQL package, procedures and functions
6. Triggers and exception handling
7. Frontend pages
8. ORDS API configuration
9. Connect frontend to Oracle
10. Smart matching and claims
11. Testing and documentation

## Scope and limitation
The supplied frontend is currently a browser-only demo using localStorage. Oracle scripts are separate and must be executed in Oracle SQL Developer. The next milestone is connecting the frontend to Oracle through ORDS.
