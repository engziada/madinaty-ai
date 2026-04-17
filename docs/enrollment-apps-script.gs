const SHEET_NAME = "Enrollments";
const HEADERS = [
  "Timestamp",
  "Child Name",
  "Child Age",
  "Parent Name",
  "Phone",
  "Email",
  "District",
  "Referral Source"
];

function ensureSheet(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME) ??
      SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);

    ensureSheet(sheet);

    const row = [
      new Date(),
      payload.childName || "",
      payload.childAge || "",
      payload.parentName || "",
      payload.phone || "",
      payload.email || "",
      payload.district || "",
      payload.referral || ""
    ];

    sheet.appendRow(row);
    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
