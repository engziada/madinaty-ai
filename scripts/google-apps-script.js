// Google Apps Script for Enrollment Form
// IMPORTANT: You MUST create this script from INSIDE your Google Sheet!
// 1. Open your Google Sheet workbook.
// 2. Click "Extensions" > "Apps Script" in the top menu.
// 3. Paste this code, replacing everything.
// 4. Click "Deploy" > "New deployment"
// 5. Select type "Web App" (Execute as: Me, Access: Anyone)
// 6. Copy the Web App URL and set as GOOGLE_SHEETS_SCRIPT_URL in .env.local

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const sheetName = data.courseSlug ? data.courseSlug : "Registrations";

    // Get or create sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(sheetName);

    const ignoreKeys = []; // Don't ignore any keys so we capture courseSlug

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      
      // Generate headers from the keys of the JSON payload
      const headers = Object.keys(data).filter(k => !ignoreKeys.includes(k));
      sheet.appendRow(headers);
    }

    // Get existing headers to map the data correctly
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    const row = headers.map(header => {
      let val = data[header];
      if (Array.isArray(val)) return val.join(", ");
      return val === undefined ? "" : val;
    });

    sheet.appendRow(row);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
