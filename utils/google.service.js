// Google secret
const creds = require("../client_seceret.json");
const { GoogleSpreadsheet } = require("google-spreadsheet");

 class GoogleService {
  getSpreadsheetId() {
    return process.env.SPREADSHEET_ID;
  }

  async getDoc() {
    const docId = this.getSpreadsheetId();

    const doc = new GoogleSpreadsheet(docId);

    // Verify Identity with google credentials
    await doc.useServiceAccountAuth(creds);
    // Get doc information
    return doc.getInfo();
  }

 async getSheetByTitle(title, doc) {
    try {
      return await doc.sheetsByTitle[title];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addSheet(doc, title, headers) {
    const sheet = await doc.addSheet({
      title,
      headerValues: headers,
    });

    return sheet;
  }

  async addRows(sheet, rows) {
    await sheet.addRow(rows);
  }
}

module.exports = new GoogleService()