# 👑 Raja Jewellers - Static Website (GitHub Pages Ready)

A pure static-first (HTML, CSS, JS) luxury website for **Raja Jewellers** (Gwarighat, Jabalpur), engineered with the **QubiSafe.com** form integration architecture for direct **Google Sheets & Microsoft Excel** lead collection.

---

## 🚀 How to Deploy to GitHub Pages (2 Minutes)

### Option 1: Deploy from this folder
1. Initialize or push this repository to GitHub:
   ```bash
   git add rajastatic/
   git commit -m "Add Raja Jewellers static website"
   git push origin main
   ```
2. On GitHub, go to your repository **Settings** > **Pages**.
3. Under **Build and deployment**:
   - Source: `Deploy from a branch`
   - Branch: `main` / Folder: `/rajastatic` (or move files to root and select `/(root)`).
4. Click **Save**. Your website will be live at `https://<your-username>.github.io/<repo-name>/`!

---

## 📊 Google Apps Script & Excel (.xlsx) Add-on

Just like QubiSafe's web forms, all lead submissions (Showroom VIP Visits, Custom Karigari requests, and Daily WhatsApp Gold Rate Subscribers) are dispatched using native `FormData` via `fetch` POST directly to your Google Apps Script endpoint.

### ⚙️ How to Connect in 2 Lines of Code:
Open [`js/app.js`](file:///c:/S/Projects%20and%20researches/Website/rajajweller/rajastatic/js/app.js) and update the `CONFIG` object at the very top:

```javascript
const CONFIG = {
  // Paste your Google Apps Script Deployment ID (e.g., AKfycb...) or full Web App URL
  SCRIPT_ID_OR_URL: "YOUR_DEPLOYMENT_ID_OR_WEB_APP_URL",

  // Paste your Google Spreadsheet ID (or complete URL) to enable 1-click Excel download
  SPREADSHEET_ID_OR_XLS_LINK: "YOUR_GOOGLE_SPREADSHEET_ID"
};
```

*(You can also click the **"Edit Script / Sheet ID"** button at the bottom of the live website to update it directly in your browser without touching code!)*

### 📝 Google Apps Script Code
The complete, production-ready script code is provided in [`google-apps-script.js`](file:///c:/S/Projects%20and%20researches/Website/rajajweller/rajastatic/google-apps-script.js).
1. Open [sheets.google.com](https://sheets.google.com) and create a new sheet.
2. Go to **Extensions** > **Apps Script**, paste the code, and click Save.
3. Click **Deploy** > **New deployment** > Type: **Web app** > Access: **Anyone**.
4. Copy the Deployment ID and paste it into `CONFIG.SCRIPT_ID_OR_URL`.

---

## 📁 File Structure
```
rajastatic/
├── index.html                 # Main static HTML page
├── css/
│   └── styles.css             # Royal burgundy & gold responsive stylesheet
├── js/
│   └── app.js                 # QubiSafe-style Google Apps Script & Excel integration
├── media/                     # 100% Local images, hallmarks, and SVGs
├── google-apps-script.js      # Companion backend script for Google Sheets
└── README.md                  # This setup guide
```
