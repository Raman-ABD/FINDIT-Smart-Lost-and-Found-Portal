# FINDIT Database Guide

## Before running scripts
- Use your own Oracle application schema, not SYS/SYSDBA.
- Run scripts in this order: 01, 02, 03, 04.
- If you already created objects with the same names, inspect them before rerunning table-creation scripts.

## Main relationships
- USERS 1-to-many LOST_ITEMS
- USERS 1-to-many FOUND_ITEMS
- CATEGORIES 1-to-many LOST_ITEMS
- CATEGORIES 1-to-many FOUND_ITEMS
- FOUND_ITEMS 1-to-many CLAIMS
- USERS 1-to-many CLAIMS

## Useful verification queries
```sql
SELECT * FROM USERS;
SELECT * FROM CATEGORIES;
SELECT * FROM LOST_ITEMS;
SELECT * FROM FOUND_ITEMS;
SELECT * FROM CLAIMS;

SELECT FINDIT_PKG.COUNT_OPEN_LOST_ITEMS AS OPEN_LOST
FROM DUAL;

SELECT FINDIT_PKG.COUNT_OPEN_FOUND_ITEMS AS OPEN_FOUND
FROM DUAL;

SELECT l.ITEM_NAME, l.LOST_LOCATION, f.FOUND_LOCATION,
       l.LOST_DATE, f.FOUND_DATE
FROM LOST_ITEMS l
JOIN FOUND_ITEMS f
  ON l.CATEGORY_ID = f.CATEGORY_ID
 AND UPPER(l.ITEM_NAME) LIKE '%' || UPPER(f.ITEM_NAME) || '%'
WHERE l.ITEM_STATUS = 'OPEN'
  AND f.ITEM_STATUS = 'OPEN';
```

## PL/SQL procedure test
```sql
SET SERVEROUTPUT ON;

DECLARE
    V_NEW_ID NUMBER;
BEGIN
    FINDIT_PKG.ADD_LOST_ITEM(
        P_USER_ID => 1,
        P_CATEGORY_ID => 2,
        P_ITEM_NAME => 'College ID Card',
        P_DESCRIPTION => 'Blue ID card',
        P_LOCATION => 'Main Gate',
        P_LOST_DATE => TRUNC(SYSDATE),
        P_CONTACT => 'student@example.com',
        P_NEW_ID => V_NEW_ID
    );
    DBMS_OUTPUT.PUT_LINE('New lost report ID: ' || V_NEW_ID);
    COMMIT;
END;
/
```

## Important security note
The sample password values are placeholders and must not be used for real accounts. The browser demo stores demo passwords in localStorage solely to help test the page flow. For a real portal, implement password hashing and session/token authentication in a server-side layer, validate all input on the server, and restrict users to their own records.
