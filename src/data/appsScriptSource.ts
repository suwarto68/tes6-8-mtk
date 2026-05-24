export const googleAppsScriptCode = `/**
 * Google Apps Script untuk Integrasi Ujian Matematika SMPN 1 Wanaraya
 * Tempelkan skrip ini pada menu "Ekstensi" > "Apps Script" di Google Spreadsheet Anda.
 * 
 * URL Spreadsheet Anda:
 * https://docs.google.com/spreadsheets/d/1i9hDmdON_V8vYwRt9dr47_YN4OJ3yQOVzgDELNCWby0/edit
 * 
 * Pastikan Anda melakukan:
 * 1. Klik tombol "Terapkan" (Deploy) > "Penerapan Baru" (New Deployment).
 * 2. Pilih jenis "Aplikasi Web" (Web App).
 * 3. Ubah akses "Siapa saja yang memiliki akses" menjadi "Siapa Saja" (Anyone).
 * 4. Salin URL Aplikasi Web yang diberikan dan masukkan ke panel pengaturan di aplikasi ini.
 */

// Menangani pengiriman data ujian saat siswa mengklik Kirim (POST)
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    
    // Urutan Kolom: tanggal dan waktu | nama | kelas | benar | salah | terjawab | ragu ragu | belum terjawab | nilai
    // Format tanggal WIB (UTC+7)
    var formattedDate = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");
    
    var row = [
      formattedDate,
      data.nama || "Tanpa Nama",
      data.kelas || "8A",
      Number(data.benar) || 0,
      Number(data.salah) || 0,
      Number(data.terjawab) || 0,
      Number(data.raguRagu) || 0,
      Number(data.belumTerjawab) || 0,
      Number(data.nilai) || 0
    ];
    
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "success", 
      "message": "Data ujian peserta " + data.nama + " berhasil disimpan ke spreadsheet!" 
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "error", 
      "message": err.toString() 
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
  }
}

// Menangani permintaan data rekap nilai 10 peringkat teratas (GET)
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rows = sheet.getDataRange().getValues();
  
  try {
    var list = [];
    // Mulai baris ke-2 (index 1) untuk melewatkan header sheet
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      if (row[1]) { // Jika kolom nama ada isinya
        list.push({
          tanggalDanWaktu: row[0] ? row[0].toString() : "",
          nama: row[1],
          kelas: row[2],
          benar: Number(row[3]) || 0,
          salah: Number(row[4]) || 0,
          terjawab: Number(row[5]) || 0,
          raguRagu: Number(row[6]) || 0,
          belumTerjawab: Number(row[7]) || 0,
          nilai: Number(row[8]) || 0
        });
      }
    }
    
    // Urutkan berdasarkan Nilai terbesar (descending)
    list.sort(function(a, b) {
      return b.nilai - a.nilai;
    });
    
    // Ambil 10 peringkat teratas
    var top10 = list.slice(0, 10);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "success", 
      "data": top10 
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "error", 
      "message": err.toString() 
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
  }
}

// Menangani CORS preflight
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}
`;
