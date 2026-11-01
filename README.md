FINDIT – Smart Lost & Found Portal
Tagline: Lost Something? Find It with FINDIT!

📌 Project Overview
FINDIT is a web-based Smart Lost & Found Portal designed to help students and college communities report, search, and recover lost and found items.

The platform provides a centralized system where users can register, log in, report lost or found items, and search for matching reports.

The application uses Oracle Database to store user and item information, while Oracle REST Data Services (ORDS) connects the frontend with the database.

🎯 Project Objectives
Provide a centralized platform for lost and found items.
Allow users to report lost and found belongings.
Make searching for reported items easier.
Maintain user-specific reports.
Store information securely in an Oracle Database.
Reduce the difficulty of recovering lost belongings.
✨ Key Features
User Registration: New users can create accounts.
User Login: Registered users can log in.
Dashboard: Displays lost, found, and total report statistics.
Report Lost Item: Users can submit details about lost belongings.
Report Found Item: Users can report items they have found.
Search Reports: Search items by name, category, location, and description.
Lost/Found Filters: Filter reports by item type.
My Reports: View reports submitted by the logged-in user.
Logout: Allows users to end their session.
Login Protection: Restricts dashboard access to logged-in users.
🛠️ Technology Stack
Technology	Purpose
HTML	Structure of web pages
CSS	Website styling and layout
JavaScript	Frontend functionality and API requests
Oracle SQL	Database creation and management
PL/SQL	Stored procedures and database operations
Oracle REST Data Services (ORDS)	Connects frontend with Oracle Database
🏗️ Project Architecture
The application follows this communication flow:

User → HTML/CSS → JavaScript → ORDS REST APIs → PL/SQL → Oracle Database

HTML and CSS provide the user interface.
JavaScript handles user interactions and sends HTTP requests.
ORDS exposes REST API endpoints.
PL/SQL procedures perform database operations.
Oracle Database stores user accounts and item reports.
🗄️ Database Design
The project uses Oracle Database with the following main tables:

1. USERS
Stores registered user information.

Main columns:

USER_ID
FULL_NAME
EMAIL
PASSWORD_HASH
ROLE
CREATED_AT
2. LOST_ITEMS
Stores information about lost belongings.

Main columns:

LOST_ID
USER_ID
CATEGORY_ID
ITEM_NAME
ITEM_DESCRIPTION
LOST_LOCATION
LOST_DATE
CONTACT_DETAILS
ITEM_STATUS
3. FOUND_ITEMS
Stores information about found belongings.

Main columns:

FOUND_ID
USER_ID
CATEGORY_ID
ITEM_NAME
ITEM_DESCRIPTION
FOUND_LOCATION
FOUND_DATE
CONTACT_DETAILS
ITEM_STATUS
🔗 API Endpoints
The application uses the following ORDS endpoints:

Method	Endpoint	Purpose
POST	/ords/findit/api/register/	User registration
POST	/ords/findit/api/login/	User login
GET	/ords/findit/api/lost-items/	Retrieve lost items
POST	/ords/findit/api/lost-items/	Submit lost item
GET	/ords/findit/api/found-items/	Retrieve found items
POST	/ords/findit/api/found-items/	Submit found item
⚙️ Installation and Setup
Requirements
Oracle Database XE
Oracle SQL Developer
Oracle REST Data Services (ORDS)
Python (for running the local frontend server)
Web browser
Step 1: Clone Repository
git clone https://github.com/Raman-ABD/FINDIT-Smart-Lost-and-Found-Portal.git
Step 2: Open Frontend
Open the project folder and navigate to the frontend directory.

Step 3: Start Frontend Server
Run this command in the terminal:

python -m http.server 5500
Open the browser:

http://localhost:5500/
Step 4: Start ORDS
Configure ORDS with your Oracle Database and start the server using your local configuration:

ords --config YOUR_ORDS_CONFIG_PATH serve --port 8081
Step 5: Database Connection
Create and configure the FINDIT schema in Oracle Database. Run the required SQL scripts and configure the ORDS module and REST handlers.

Note: Database credentials and local configuration files are not included in this repository. Configure your own Oracle environment before running the application.

🧪 Testing
The following functional tests have been performed successfully:

User registration
User login
Lost item submission
Found item submission
Dashboard statistics
My Reports
Search functionality
Lost and Found filters
Logout
Dashboard login protection
Oracle Database record verification
🔮 Future Scope
Automatic matching of lost and found items.
Email notifications when matching items are found.
Image uploads for lost and found belongings.
Advanced search and filtering.
Admin dashboard for managing reports.
Improved authentication and security.
🔐 Security Note
This project is developed for educational purposes. Passwords are stored as SHA-256 hashes in the current implementation. Production deployment should use stronger password hashing, secure session management, authorization checks, HTTPS, and appropriate privacy controls.

👨‍💻 Author
Raman

MCA – Data Science Mini Project – Semester 1

📄 License
This project is developed for academic and educational purposes.
