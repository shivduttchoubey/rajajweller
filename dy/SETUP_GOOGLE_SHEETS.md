# 📊 Raja Jewellers - Google Sheets & Excel Lead Integration Guide

This website is pre-configured with Google Apps Script to seamlessly collect customer leads, VIP appointments, custom jewellery requests, and daily gold rate subscribers directly into **Google Sheets** and sync or export to **Microsoft Excel**.

---

## ⚡ 3-Minute Quick Setup

### Step 1: Create a Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com).
2. Click **Blank spreadsheet** and name it:  
   `Raja Jewellers - Customer Inquiries & Leads`.

### Step 2: Open Apps Script Editor
1. In the top menu of your Google Sheet, click **Extensions** > **Apps Script**.
2. A new code editor window will open.
3. Delete any default code in `Code.gs`.
4. Open the file [google-apps-script.js](file:///c:/S/Projects%20and%20researches/Website/rajajweller/google-apps-script.js) from this repository, copy all the code, and paste it into the Apps Script editor.
5. Click the **Save** button (Floppy disk icon or `Ctrl + S`).

### Step 3: Deploy as Web App
1. At the top right of Apps Script, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `Raja Jewellers Lead Collector`
   - **Execute as**: `Me (your google account)`
   - **Who has access**: `Anyone` *(Crucial so website visitors can submit inquiries without logging in)*
4. Click **Deploy**.
5. Grant permissions if prompted (Click *Review Permissions* > Choose your account > Click *Advanced* > Click *Go to (Untitled project) (unsafe)* > Click *Allow*).
6. Copy the generated **Web App URL** (starts with `https://script.google.com/macros/s/.../exec`).

### Step 4: Link URL into the Website
1. Open [app.js](file:///c:/S/Projects%20and%20researches/Website/rajajweller/app.js) in your project.
2. Locate the first configuration line:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = "YOUR_PASTED_WEB_APP_URL_HERE";
   ```
3. Replace the placeholder with your copied Web App URL and save the file.
4. *Tip*: You can also test and update the URL directly inside the website in the "Sheet Settings" dialog at the bottom of the page!

---

## 📁 Automatic Sheets Created
When visitors submit forms, the script automatically generates structured tabs:
1. **VIP Appointments**: Name, Phone, Category, Appointment Date, Time Slot, Notes.
2. **Custom Jewellery**: Customer requests for bespoke karigari, budget, gold karat, design specifications.
3. **Gold Rate Subscribers**: WhatsApp numbers subscribing to daily 22K/24K gold rates.
4. **All Inquiries**: Comprehensive master log with timestamps in Indian Standard Time (IST).

---

## 📥 How to Open & Sync in Microsoft Excel (.xlsx)

1. **One-Time Export**:
   - In your Google Sheet, click **File** > **Download** > **Microsoft Excel (.xlsx)**.

2. **Live Auto-Sync to Excel (Power Query)**:
   - In Google Sheets, click **File** > **Share** > **Publish to web**.
   - Choose `Entire Document` and format as `Microsoft Excel (.xlsx)`.
   - Copy the published link.
   - Open Microsoft Excel on your computer > Go to **Data** tab > **Get Data** > **From Other Sources** > **From Web**.
   - Paste the link. Excel will now automatically refresh with new website leads on demand!
