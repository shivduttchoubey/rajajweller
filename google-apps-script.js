/**
 * =========================================================================
 * RAJA JEWELLERS, JABALPUR - GOOGLE APPS SCRIPT BACKEND
 * =========================================================================
 * Inspired by QubiSafe.com form handling technical stack.
 * Accepts FormData POST requests from GitHub Pages / static hosting and
 * records every lead into designated Google Sheet tabs with Excel sync.
 * 
 * =========================================================================
 * QUICK DEPLOYMENT (3 Steps):
 * 1. Open Google Sheets (sheets.google.com) -> Create sheet "Raja Jewellers Leads".
 * 2. Extensions -> Apps Script -> Paste this code -> Click Save.
 * 3. Deploy -> New deployment -> Select "Web app":
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 4. Copy the Web App URL (or the ID inside it: AKfycb...) and paste it in app.js!
 * =========================================================================
 */

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(30000);

  try {
    const params = e.parameter || {};
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    
    const formType = params.form_type || params.formType || "General Inquiry";
    
    // Choose sheet tab
    let sheetName = "All Inquiries";
    if (formType.indexOf("Appointment") !== -1) {
      sheetName = "VIP Appointments";
    } else if (formType.indexOf("Custom") !== -1 || formType.indexOf("Job Work") !== -1) {
      sheetName = "Custom Jewellery";
    } else if (formType.indexOf("Gold Rate") !== -1) {
      sheetName = "Gold Rate Subscribers";
    }

    let sheet = doc.getSheetByName(sheetName);
    if (!sheet) {
      sheet = doc.insertSheet(sheetName);
      createHeaders(sheet, sheetName);
    }

    const timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");

    const row = [
      timestamp,
      formType,
      params.full_name || params.name || "-",
      params.phone || "-",
      params.email || "-",
      params.service_or_category || params.category || params.service || "-",
      params.date || "-",
      params.time_slot || params.timeSlot || "-",
      params.budget || "-",
      params.purity || "-",
      params.message || params.notes || "-",
      params.source || "GitHub Pages Static Site",
      "New Lead"
    ];

    sheet.appendRow(row);
    const lastRow = sheet.getLastRow();

    // Return QubiSafe-compatible JSON output
    return ContentService
      .createTextOutput(JSON.stringify({
        result: "success",
        status: "success",
        message: "Your inquiry has been recorded successfully. Raja Jewellers will contact you soon.",
        rowId: lastRow,
        timestamp: timestamp
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        result: "error",
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
      result: "success",
      status: "online",
      brand: "Raja Jewellers Jabalpur",
      service: "Google Sheets & Excel Web App Endpoint"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function createHeaders(sheet, sheetName) {
  const headers = [
    "Timestamp (IST)",
    "Form Type",
    "Customer Name",
    "Phone / WhatsApp",
    "Email",
    "Jewellery Category",
    "Preferred Date",
    "Time Slot",
    "Budget",
    "Purity Preference",
    "Message / Specs",
    "Source",
    "Status"
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#D4AF37");
  headerRange.setFontColor("#1B0A08");
  headerRange.setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
  for (let i = 1; i <= headers.length; i++) {
    sheet.setColumnWidth(i, 160);
  }
}
