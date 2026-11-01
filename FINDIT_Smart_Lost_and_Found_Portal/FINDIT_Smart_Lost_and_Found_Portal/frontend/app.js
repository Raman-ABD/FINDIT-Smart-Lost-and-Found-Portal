// FINDIT - Smart Lost & Found Portal

const USERS_KEY = "findit_demo_users";
const ITEMS_KEY = "findit_demo_items";
const CURRENT_KEY = "findit_demo_current_user";

// Oracle ORDS APIs
const LOST_API_URL = "http://localhost:8081/ords/findit/api/lost-items/";
const FOUND_API_URL = "http://localhost:8081/ords/findit/api/found-items/";
const REGISTER_API_URL =
    "http://localhost:8081/ords/findit/api/register/";
const LOGIN_API_URL =
    "http://localhost:8081/ords/findit/api/login/";


    const CATEGORY_IDS = {
    "electronics": 1,
    "documents": 2,
    "keys": 3,
    "clothing": 4,
    "accessories": 5,
    "other": 6,
    "bags wallet": 7,
    "bags & wallets": 7
};


// Temporary database user for testing
const DB_USER_ID = 1;

// Category name to Oracle CATEGORY_ID mapping
const CATEGORY_NAMES = {
    1: "Electronics",
    2: "Documents",
    3: "Keys",
    4: "Clothing",
    5: "Accessories",
    6: "Other",
    7: "Bags & Wallets"
};

// GET DATA FROM LOCAL STORAGE

function getData(key) {
    try {
        return JSON.parse(localStorage.getItem(key) || "[]");
    } catch {
        return [];
    }
}


// SAVE DATA IN LOCAL STORAGE

function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


// GET CURRENT USER

function currentUser() {
    return JSON.parse(localStorage.getItem(CURRENT_KEY) || "null");
}


// SHOW MESSAGE

function showMessage(text, error = false) {
    const box = document.getElementById("message");

    if (box) {
        box.textContent = text;
        box.className = error ? "message error" : "message";
    }
}


// CHECK LOGIN

function requireLogin() {
    if (!currentUser()) {
        window.location.href = "login.html";
        return false;
    }

    return true;
}


// LOGOUT

function logout() {
    localStorage.removeItem(CURRENT_KEY);
    window.location.href = "index.html";
}


// REGISTRATION - ORACLE DATABASE

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async e => {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        try {

            showMessage("Creating your account...");

            const response = await fetch(REGISTER_API_URL, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    P_FULL_NAME: name,
                    P_EMAIL: email,
                    P_PASSWORD: password
                })

            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Registration failed.");
            }

            showMessage("Account created successfully! You can now log in.");

            registerForm.reset();

        } catch (error) {

            console.error("Registration Error:", error);

            showMessage(error.message, true);

        }

    });

}

// LOGIN - ORACLE DATABASE

const loginForm = document.getElementById("loginForm");

if (loginForm) {


loginForm.addEventListener("submit", async e => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        showMessage("Checking login details...");

        const response = await fetch(LOGIN_API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                P_EMAIL: email,
                P_PASSWORD: password
            })

        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Invalid email or password.");
        }

        // Save logged-in user
        localStorage.setItem(CURRENT_KEY, JSON.stringify({
            id: result.user_id,
            name: result.full_name,
            email: email,
            role: result.role
        }));

        // Open dashboard
        window.location.href = "dashboard.html";

    } catch (error) {

        console.error("Login Error:", error);

        showMessage(error.message, true);

    }

});


}


// DASHBOARD

if (location.pathname.endsWith("dashboard.html")) {

    if (requireLogin()) {

        const user = currentUser();

        document.getElementById("welcomeText").textContent =
            `Welcome, ${user.name}. What would you like to do today?`;

        loadDashboardStats();

        loadRecentReports();
    }
}

// LOAD DASHBOARD STATISTICS

async function loadDashboardStats() {
// LOAD RECENT COMMUNITY REPORTS FROM ORACLE

async function loadRecentReports() {

    const container = document.getElementById("recentItems");

    if (!container) return;

    const categories = {
        1: "Electronics",
        2: "Documents",
        3: "Keys",
        4: "Clothing",
        5: "Accessories",
        6: "Other",
        7: "Bags & Wallets"
    };

    try {

        const [lostResponse, foundResponse] = await Promise.all([
            fetch(LOST_API_URL),
            fetch(FOUND_API_URL)
        ]);

        if (!lostResponse.ok || !foundResponse.ok) {
            throw new Error("Unable to load reports.");
        }

        const lostData = await lostResponse.json();
        const foundData = await foundResponse.json();

        const lostItems = (lostData.items || []).map(item => ({
            id: item.lost_id,
            type: "LOST",
            name: item.item_name,
            category: categories[item.category_id] || "Other",
            location: item.lost_location,
            date: item.lost_date
        }));

        const foundItems = (foundData.items || []).map(item => ({
            id: item.found_id,
            type: "FOUND",
            name: item.item_name,
            category: categories[item.category_id] || "Other",
            location: item.found_location,
            date: item.found_date
        }));

        const allItems = [...lostItems, ...foundItems];

        allItems.sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );

        const recentItems = allItems.slice(0, 5);

        container.innerHTML = recentItems.length
            ? recentItems.map(itemRow).join("")
            : '<div class="empty">No reports available.</div>';

    } catch (error) {

        console.error("Recent Reports Error:", error);

        container.innerHTML =
            '<div class="empty">Unable to load community reports.</div>';
    }
}

try {

    const [lostResponse, foundResponse] = await Promise.all([

        fetch(LOST_API_URL),

        fetch(FOUND_API_URL)

    ]);

    if (!lostResponse.ok || !foundResponse.ok) {
        throw new Error("Unable to fetch dashboard data.");
    }

    const lostData = await lostResponse.json();

    const foundData = await foundResponse.json();

    const lostItems = lostData.items || [];

    const foundItems = foundData.items || [];

    const totalLost = lostItems.length;

    const totalFound = foundItems.length;

    const totalReports = totalLost + totalFound;

    const openLost = lostItems.filter(
        item => item.item_status === "OPEN"
    ).length;

    const openFound = foundItems.filter(
        item => item.item_status === "OPEN"
    ).length;

    const openReports = openLost + openFound;


    document.getElementById("totalLost").textContent = totalLost;

    document.getElementById("totalFound").textContent = totalFound;

    document.getElementById("totalReports").textContent = totalReports;

    document.getElementById("openReports").textContent = openReports;


} catch (error) {

    console.error("Dashboard Error:", error);

    document.getElementById("totalLost").textContent = "Error";

    document.getElementById("totalFound").textContent = "Error";

    document.getElementById("totalReports").textContent = "Error";

    document.getElementById("openReports").textContent = "Error";

}

}


// ITEM DISPLAY

function itemRow(item) {

    return `
        <div class="item-row">
            <div>
                <strong>${escapeHtml(item.name)}</strong>
                <p>${escapeHtml(item.category)} · ${escapeHtml(item.location)} · ${escapeHtml(item.date)}</p>
            </div>

            <span class="badge ${item.type === "FOUND" ? "found" : ""}">
                ${item.type}
            </span>
        </div>
    `;

}


function itemCard(item) {

    return `
        <article class="item-card">

            <span class="badge ${item.type === "FOUND" ? "found" : ""}">
                ${item.type}
            </span>

            <h3>${escapeHtml(item.name)}</h3>

            <p><b>Category:</b> ${CATEGORY_NAMES[item.category] || item.category}</p>

            <p><b>Location:</b> ${escapeHtml(item.location)}</p>

            <p><b>Date:</b> ${escapeHtml(item.date)}</p>

            <p>${escapeHtml(item.description || "No extra description provided.")}</p>

            <p><b>Contact:</b> ${escapeHtml(item.contact)}</p>

        </article>
    `;

}


// HTML SECURITY

function escapeHtml(value) {

    return String(value ?? "").replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[c]));

}


// REPORT LOST AND FOUND ITEMS

function setupReport(formId, type) {

    const form = document.getElementById(formId);

    if (!form) return;

    form.addEventListener("submit", async e => {

        e.preventDefault();

        if (!requireLogin()) return;


        // GET CATEGORY NAME

        const categoryName = document.getElementById("category").value;

        const categoryKey = categoryName.trim().toLowerCase();

        const categoryId = CATEGORY_IDS[categoryKey];

        if (!categoryId) {
            return showMessage("Please select a valid category.", true);
        }


        // GET ITEM DETAILS

        const item = {

            id: Date.now(),

            type,

            userId: currentUser().id,

            name: document.getElementById("itemName").value.trim(),

            category: categoryName,

            location: document.getElementById("location").value.trim(),

            date: document.getElementById("itemDate").value,

            description: document.getElementById("description").value.trim(),

            contact: document.getElementById("contact").value.trim(),

            status: "OPEN"

        };


        // SELECT API URL

        const apiUrl = type === "LOST"
            ? LOST_API_URL
            : FOUND_API_URL;


        // PREPARE DATA FOR ORACLE

        const requestData = {

           P_USER_ID: currentUser().id,

            P_CATEGORY_ID: categoryId,

            P_ITEM_NAME: item.name,

            P_DESCRIPTION: item.description,

            P_LOCATION: item.location,

            P_CONTACT: item.contact

        };


        // DIFFERENT DATE FIELD FOR LOST AND FOUND

        if (type === "LOST") {

            requestData.P_LOST_DATE = item.date;

        } else {

            requestData.P_FOUND_DATE = item.date;

        }


        // SAVE ITEM IN ORACLE DATABASE

        try {

            showMessage(`Submitting your ${type.toLowerCase()} item...`);

            const response = await fetch(apiUrl, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(requestData)

            });


            // CHECK RESPONSE

            if (!response.ok) {

                const errorText = await response.text();

                throw new Error(errorText || "Unable to save item in Oracle Database.");

            }


            const result = await response.json();


            // SAVE LOCAL COPY FOR DASHBOARD AND SEARCH

            const items = getData(ITEMS_KEY);

            items.push(item);

            saveData(ITEMS_KEY, items);


            // SUCCESS MESSAGE

            showMessage(
                result.message || `${type} item saved successfully!`
            );


            // CLEAR FORM

            form.reset();


        } catch (error) {

            console.error("FINDIT API Error:", error);

            showMessage(
                `Could not save ${type.toLowerCase()} item. Check browser console and ORDS connection.`,
                true
            );

        }

    });

}


// ACTIVATE BOTH FORMS

setupReport("lostForm", "LOST");

setupReport("foundForm", "FOUND");


// SEARCH ITEMS

function renderSearch() {

    const container = document.getElementById("searchResults");

    if (!container) return;


    const term = (
        document.getElementById("searchInput").value || ""
    ).toLowerCase().trim();


    const type = document.getElementById("typeFilter").value;


    const results = getData(ITEMS_KEY).filter(i =>

        (type === "ALL" || i.type === type) &&

        [i.name, i.category, i.location, i.description]
            .join(" ")
            .toLowerCase()
            .includes(term)

    ).sort((a, b) => b.id - a.id);


    container.innerHTML = results.length

        ? results.map(itemCard).join("")

        : '<div class="empty">No matching reports found in this browser demo.</div>';

}

const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");

if (searchInput && typeFilter) {
    searchInput.addEventListener("input", renderSearch);
    typeFilter.addEventListener("change", renderSearch);
}


// MY REPORTS - FETCH FROM ORACLE DATABASE

async function loadMyReports() {

    const container = document.getElementById("myReports");

    if (!container) return;

    if (!requireLogin()) return;

    try {

        const [lostResponse, foundResponse] = await Promise.all([
            fetch(LOST_API_URL),
            fetch(FOUND_API_URL)
        ]);

        if (!lostResponse.ok || !foundResponse.ok) {
            throw new Error("Unable to fetch reports.");
        }

        const lostData = await lostResponse.json();
        const foundData = await foundResponse.json();

        const lostItems = (lostData.items || []).map(item => ({
            id: item.lost_id,
            userId: item.user_id,
            type: "LOST",
            name: item.item_name,
            category: item.category_id,
            location: item.lost_location,
            date: item.lost_date,
            description: item.item_description,
          contact: item.contact_details || ""
        }));

        const foundItems = (foundData.items || []).map(item => ({
            id: item.found_id,
            userId: item.user_id,
            type: "FOUND",
            name: item.item_name,
            category: item.category_id,
            location: item.found_location,
            date: item.found_date,
            description: item.item_description,
            contact: ""
        }));

        const mine = [...lostItems, ...foundItems]
            .filter(item => item.userId === currentUser().id)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        container.innerHTML = mine.length
            ? mine.map(itemCard).join("")
            : '<div class="empty">You have not submitted any reports yet.</div>';

    } catch (error) {

        console.error("My Reports Error:", error);

        container.innerHTML =
            '<div class="empty">Unable to load your reports.</div>';
    }
}


// RUN MY REPORTS

if (document.getElementById("myReports")) {
    loadMyReports();
}

// SEARCH REPORTS FROM ORACLE DATABASE

async function renderSearch() {


const input = document.getElementById("searchInput");
const filter = document.getElementById("typeFilter");
const results = document.getElementById("searchResults");

if (!input || !filter || !results) return;

const keyword = input.value.trim().toLowerCase();
const selectedType = filter.value;

results.innerHTML = "<p>Loading reports...</p>";

try {

    const [lostResponse, foundResponse] = await Promise.all([
        fetch(LOST_API_URL),
        fetch(FOUND_API_URL)
    ]);

    if (!lostResponse.ok || !foundResponse.ok) {
        throw new Error("Unable to load reports.");
    }

    const lostData = await lostResponse.json();
    const foundData = await foundResponse.json();

    const lostItems = (lostData.items || []).map(item => ({
        id: item.lost_id,
        type: "LOST",
        name: item.item_name,
        category: CATEGORY_NAMES[item.category_id] || item.category_id,
        location: item.lost_location,
        date: item.lost_date,
        description: item.item_description,
        contact: item.contact_details
    }));

    const foundItems = (foundData.items || []).map(item => ({
        id: item.found_id,
        type: "FOUND",
        name: item.item_name,
        category: CATEGORY_NAMES[item.category_id] || item.category_id,
        location: item.found_location,
        date: item.found_date,
        description: item.item_description,
        contact: item.contact_details
    }));

    const allItems = [...lostItems, ...foundItems];

    const filteredItems = allItems.filter(item => {

        const matchesType =
            selectedType === "ALL" || item.type === selectedType;

        const searchableText = [
            item.name,
            item.category,
            item.location,
            item.description
        ].join(" ").toLowerCase();

        return matchesType && searchableText.includes(keyword);

    });

    results.innerHTML = filteredItems.length
        ? filteredItems.map(itemCard).join("")
        : '<div class="empty">No matching reports found.</div>';

} catch (error) {

    console.error("Search Error:", error);

    results.innerHTML =
        '<div class="empty">Unable to load reports. Please try again.</div>';

}


}

// Load all reports when Search page opens

if (document.getElementById("searchResults")) {
renderSearch();
}
