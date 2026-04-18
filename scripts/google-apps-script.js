// Google Apps Script for Enrollment Form
// 1. Go to https://script.google.com
// 2. Create new project
// 3. Paste this code
// 4. Deploy as Web App (Execute as: Me, Access: Anyone)
// 5. Copy the Web App URL and set as GOOGLE_SHEETS_SCRIPT_URL in .env.local

const SHEET_NAME = "Registrations";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Get or create sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Add headers
      sheet.appendRow([
        "Registration Number",
        "Child Name",
        "Child Age",
        "Child Gender",
        "Child Grade",
        "School Name",
        "Parent Name",
        "Parent National ID",
        "Phone",
        "Email",
        "Madinaty Address",
        "Interests",
        "Hobbies",
        "Locale",
        "Submitted At"
      ]);
    }

    // Append row
    sheet.appendRow([
      data.registrationNumber,
      data.childName,
      data.childAge,
      data.childGender,
      data.childGrade,
      data.schoolName,
      data.parentName,
      data.parentNationalId,
      data.phone,
      data.email,
      data.madinatyAddress,
      data.interests?.join(", "),
      data.hobbies,
      data.locale,
      new Date().toISOString()
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
