# Google Sheets Enrollment Web App Setup

1. Create a Google Sheet named `Madinaty Enrollments` or similar. Keep only the default tab.
2. Open **Extensions → Apps Script**.
3. Replace the boilerplate `Code.gs` with the contents of `enrollment-apps-script.gs` (ensure `SHEET_NAME` matches the sheet tab name).
4. From the Apps Script editor: **Deploy → New deployment → Web app**.
   * Execute as: **Me**
   * Who has access: **Anyone**
5. Click **Deploy** (authenticate if prompted) and copy the Web App URL (it looks like `https://script.google.com/macros/s/ABC123/exec`).
6. In your Next.js project, add `.env.local` with:
   ```
   NEXT_PUBLIC_SHEETS_ENDPOINT=https://script.google.com/macros/s/ABC123/exec
   ```
7. Restart `npm run dev` so the form picks up the endpoint.
8. The enrollment modal writes each submission directly to the spreadsheet with a timestamp.

If you rotate or redeploy the script later, update `NEXT_PUBLIC_SHEETS_ENDPOINT` accordingly.
