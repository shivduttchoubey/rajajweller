/**
 * =========================================================================
 * RAJA JEWELLERS, JABALPUR - GOOGLE APPS SCRIPT BACKEND
 * =========================================================================
 * This script accepts data submitted from the Raja Jewellers website forms
 * and automatically appends it to your Google Spreadsheet (Excel sync ready).
 * 
 * Forms supported:
 * 1. VIP Showroom Appointment Bookings
 * 2. Custom Jewellery & Karigar Job Work Requests
 * 3. Daily Gold Rate WhatsApp Alerts
 * 4. General Inquiries & Callbacks
 * 
 * =========================================================================
 * QUICK SETUP INSTRUCTIONS:
 * 1. Open Google Sheets (sheets.google.com) and create a new sheet: "Raja Jewellers Leads".
 * 2. Go to Extensions > Apps Script.
 * 3. Delete existing code and paste this entire file content.
 * 4. Click "Save" (Floppy icon).
 * 5. Click "Deploy" > "New deployment".
 * 6. Select type: "Web app".
 * 7. Set:
 *    - Description: "Raja Jewellers Form Handler"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (IMPORTANT!)
 * 8. Click "Deploy" and authorize permissions.
 * 9. Copy the "Web app URL" (looks like https://script.google.com/macros/s/.../exec).
 * 10. Open `app.js` in your website and paste this URL in `GOOGLE_APPS_SCRIPT_URL`.
 * =========================================================================
 */

// Optional: Enter your email address to receive immediate lead alerts
const STORE_NOTIFICATION_EMAIL = "rajajewellers.gwarighat@gmail.com";
const SEND_EMAIL_NOTIFICATIONS = false; // Change to true after verifying email

function doPost(e) {
  const lock = LockService.getScriptLock();
  // Wait up to 30 seconds for other concurrent requests to finish
  lock.tryLock(30000);

  try {
    let data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter;
      }
    } else {
      data = e.parameter || {};
    }

    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const formType = data.formType || "General Inquiry";
    
    // Choose or create target tab based on form type
    let sheetName = "All Inquiries";
    if (formType.includes("Appointment")) {
      sheetName = "VIP Appointments";
    } else if (formType.includes("Custom") || formType.includes("Job Work")) {
      sheetName = "Custom Jewellery";
    } else if (formType.includes("Gold Rate")) {
      sheetName = "Gold Rate Subscribers";
    }

    let sheet = doc.getSheetByName(sheetName);
    if (!sheet) {
      sheet = doc.insertSheet(sheetName);
      // Create headers
      createHeaders(sheet, sheetName);
    }

    // IST Formatted Timestamp
    const timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");

    // Prepare row data based on sheet
    const row = [
      timestamp,
      data.formType || "Website Lead",
      data.name || "-",
      data.phone || "-",
      data.email || "-",
      data.service || data.category || "-",
      data.date || "-",
      data.timeSlot || "-",
      data.budget || "-",
      data.purity || "-",
      data.message || data.notes || "-",
      data.source || "Raja Jewellers Website (Mobile/Desktop)",
      "New" // Status column for CRM workflow
    ];

    sheet.appendRow(row);

    // Format new row styling
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, row.length).setVerticalAlignment("middle");

    // Optional email notification to store manager
    if (SEND_EMAIL_NOTIFICATIONS && STORE_NOTIFICATION_EMAIL) {
      try {
        const subject = `✨ New Lead: ${data.name || "Customer"} (${data.formType || "Inquiry"})`;
        const body = `
New inquiry received from Raja Jewellers Website:

- Name: ${data.name || "-"}
- Phone: ${data.phone || "-"}
- Type: ${data.formType || "-"}
- Category: ${data.service || data.category || "-"}
- Date / Time: ${data.date || "-"} ${data.timeSlot || ""}
- Message: ${data.message || data.notes || "-"}
- Timestamp: ${timestamp} IST

Please check Google Sheets to follow up with the customer.
        `;
        MailApp.sendEmail(STORE_NOTIFICATION_EMAIL, subject, body);
      } catch (mailErr) {
        Logger.log("Mail notification error: " + mailErr);
      }
    }

    // Return success JSON
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Data recorded successfully in Google Sheets / Excel",
        rowId: lastRow,
        timestamp: timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "online",
      service: "Raja Jewellers Google Sheets Web App Endpoint",
      version: "2.0",
      location: "Gwarighat, Jabalpur"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function createHeaders(sheet, sheetName) {
  const headers = [
    "Timestamp (IST)",
    "Inquiry Type",
    "Customer Name",
    "Phone / WhatsApp",
    "Email",
    "Jewellery Category / Interest",
    "Preferred Date",
    "Time Slot",
    "Budget",
    "Purity Preference",
    "Message / Customization Details",
    "Source Device / Channel",
    "Lead Status"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#D4AF37"); // Royal Gold background
  headerRange.setFontColor("#1B0A08"); // Dark royal text
  headerRange.setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
  for (let i = 1; i <= headers.length; i++) {
    sheet.setColumnWidth(i, 160);
  }
}
