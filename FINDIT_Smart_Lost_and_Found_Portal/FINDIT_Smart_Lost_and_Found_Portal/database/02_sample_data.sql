-- Sample categories and educational demo users.
SET DEFINE OFF;
INSERT INTO CATEGORIES (CATEGORY_NAME) VALUES ('Electronics');
INSERT INTO CATEGORIES (CATEGORY_NAME) VALUES ('Documents');
INSERT INTO CATEGORIES (CATEGORY_NAME) VALUES ('Bags & Wallets');
INSERT INTO CATEGORIES (CATEGORY_NAME) VALUES ('Keys');
INSERT INTO CATEGORIES (CATEGORY_NAME) VALUES ('Clothing');
INSERT INTO CATEGORIES (CATEGORY_NAME) VALUES ('Accessories');
INSERT INTO CATEGORIES (CATEGORY_NAME) VALUES ('Other');

-- Password values below are placeholders for database testing only.
-- Replace them with properly generated password hashes before deployment.
INSERT INTO USERS (FULL_NAME, EMAIL, PASSWORD_HASH, ROLE)
VALUES ('Demo Student', 'student@example.com', 'DEMO_HASH_ONLY', 'USER');

INSERT INTO USERS (FULL_NAME, EMAIL, PASSWORD_HASH, ROLE)
VALUES ('FINDIT Administrator', 'admin@example.com', 'DEMO_HASH_ONLY', 'ADMIN');

INSERT INTO LOST_ITEMS
(USER_ID, CATEGORY_ID, ITEM_NAME, ITEM_DESCRIPTION, LOST_LOCATION, LOST_DATE, CONTACT_DETAILS)
VALUES (1, 3, 'Black Wallet', 'Small black wallet with a plain design', 'College Library',
        DATE '2026-11-01', 'student@example.com');

INSERT INTO FOUND_ITEMS
(USER_ID, CATEGORY_ID, ITEM_NAME, ITEM_DESCRIPTION, FOUND_LOCATION, FOUND_DATE, CONTACT_DETAILS)
VALUES (2, 3, 'Black Wallet', 'Black wallet found near the reading area', 'College Library',
        DATE '2026-11-01', 'admin@example.com');

COMMIT;
