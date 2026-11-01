# FINDIT – Smart Lost & Found Portal

**Tagline:** Lost Something? Find It with FINDIT!

## Technology stack
- HTML – page structure
- CSS – styling
- JavaScript – browser interactions and demo-mode data
- Oracle SQL – relational database
- PL/SQL – stored program logic
- ORDS – optional connection layer between the browser and Oracle Database

## Important status
This is the **FINDIT starter project pack (Milestone 1)**. The frontend can be opened and explored in demo mode. The Oracle database scripts create the initial schema, sample data, package, and trigger.

The browser demo currently uses `localStorage`; it is **not yet connected to Oracle**. A real connection requires ORDS configuration and endpoint setup on your Oracle environment. Do not treat demo-mode records as database records.

## Folder structure
```text
FINDIT_Smart_Lost_and_Found_Portal/
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── dashboard.html
│   ├── report-lost.html
│   ├── report-found.html
│   ├── search.html
│   ├── my-reports.html
│   ├── style.css
│   └── app.js
├── database/
│   ├── 01_create_tables.sql
│   ├── 02_sample_data.sql
│   ├── 03_package.sql
│   └── 04_triggers.sql
└── documentation/
    ├── DEVELOPMENT_PLAN.md
    └── DATABASE_GUIDE.md
```

## Run the frontend demo
1. Extract the ZIP.
2. Open the `frontend` folder.
3. Double-click `index.html`.
4. Register a demo user, then log in.
5. Try reporting lost/found items and searching.

Demo login data is stored only in the browser's local storage. Clearing browser storage removes it.

## Create the Oracle database objects
1. Open Oracle SQL Developer and connect to your own application schema (do not use SYS for project tables).
2. Open and run `database/01_create_tables.sql`.
3. Run `database/02_sample_data.sql`.
4. Run `database/03_package.sql`.
5. Run `database/04_triggers.sql`.
6. Check the tables using:
   ```sql
   SELECT * FROM USERS;
   SELECT * FROM LOST_ITEMS;
   SELECT * FROM FOUND_ITEMS;
   ```

Run scripts in the order shown. Review `documentation/DATABASE_GUIDE.md` first.

## Next development milestone
After the first database scripts run successfully, we will configure ORDS endpoints and replace demo-mode JavaScript storage with real Oracle-backed requests. ORDS is needed as the HTTP bridge; HTML/JavaScript in a browser should not connect directly to Oracle using database credentials.

## Security note
This is an educational starter. The demo login is not production authentication. Before real deployment, implement secure password hashing, session/token handling, authorization checks, input validation, and privacy controls through a properly configured backend.


## New backend extensions
Run `database/05_portal_package.sql` and `database/06_smart_matching.sql` as FINDIT. Read `documentation/API_INTEGRATION_STATUS.md` before creating the additional ORDS handlers. The added procedures do not by themselves create REST endpoints.
