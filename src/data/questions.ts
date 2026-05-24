import { Question } from '../types';

export const questions: Question[] = [
  // ==================== PILIHAN GANDA (15 SOAL, ID 1-15) ====================
  {
    id: 1,
    type: 'Pilihan Ganda',
    difficulty: 'Mudah',
    topic: 'Relasi dan Fungsi',
    illustrationType: 'relation_graph',
    stimulus: 'Di SMPN 1 Wanaraya, koperasi sekolah merupakan tempat favorit siswa saat jam istirahat untuk membeli peralatan belajar. Bu Ani, pengelola koperasi, membuat sebuah sistem penyajian data sederhana untuk melayani pembelian alat tulis. Beliau mengelompokkan siswa berdasarkan barang yang paling sering mereka beli agar stok barang selalu terjaga. Terdapat empat siswa teladan: Anton, Budi, Citra, dan Dewi. Anton membeli buku tulis dan pulpen, Budi membeli penggaris dan pensil, Citra membeli buku tulis, sedangkan Dewi hanya membeli pulpen. Hubungan relasi "barang yang dibeli" ini disajikan dalam bentuk diagram agar memudahkan inventori koperasi.',
    questionText: 'Berdasarkan informasi di atas, jika disajikan dalam himpunan pasangan berurutan (Nama, Barang), pasangan yang paling tepat untuk Citra dan Dewi adalah...',
    options: [
      'A. {(Citra, buku tulis), (Dewi, pulpen)}',
      'B. {(Citra, pulpen), (Dewi, buku tulis)}',
      'C. {(Citra, buku tulis), (Dewi, penggaris)}',
      'D. {(Citra, pensil), (Dewi, pulpen)}'
    ],
    correctAnswer: 'A',
    scoreValue: 2
  },
  {
    id: 2,
    type: 'Pilihan Ganda',
    difficulty: 'Mudah',
    topic: 'Relasi dan Fungsi',
    illustrationType: 'none',
    stimulus: 'Pemetaan atau fungsi merupakan konsep dasar dalam matematika yang menghubungkan dua himpunan dengan aturan tertentu. Himpunan daerah asal (domain) dipetakan ke daerah kawan (kodomain), sehingga menghasilkan daerah hasil (range). Di SMPN 1 Wanaraya, guru matematika menjelaskan bahwa setiap siswa hanya boleh memilih tepat satu nomor induk siswa nasional (NISN). Hal ini merupakan contoh fungsi satu-satu di dunia nyata. Jika kita memiliki himpunan P = {1, 2, 3} dan himpunan Q = {a, b}, guru meminta siswa menentukan apakah relasi tertentu merupakan fungsi atau bukan.',
    questionText: 'Dari himpunan pasangan berurutan berikut, manakah yang merupakan FUNGSI dari himpunan P ke Q?',
    options: [
      'A. {(1, a), (2, a), (3, b)}',
      'B. {(1, a), (1, b), (2, a), (3, b)}',
      'C. {(1, a), (2, b)}',
      'D. {(2, a), (3, b), (3, a)}'
    ],
    correctAnswer: 'A',
    scoreValue: 2
  },
  {
    id: 3,
    type: 'Pilihan Ganda',
    difficulty: 'Sedang',
    topic: 'Relasi dan Fungsi',
    illustrationType: 'none',
    stimulus: 'Sebuah perusahaan telekomunikasi lokal di Kalimantan Barat, "WanaConnect", menerapkan tarif panggilan khusus untuk pelanggan di pedesaan termasuk wilayah Wanaraya. Tarif percakapan telepon ditentukan dengan fungsi linier f(x) = ax + b, di mana f(x) menyatakan total biaya panggilan dalam rupiah dan x menyatakan durasi panggilan dalam menit. Pelanggan mendapati bahwa untuk panggilan selama 3 menit dikenakan biaya Rp 4.500, sedangkan panggilan selama 7 menit dikenakan biaya Rp 9.500. Guru matematika mengasosiasikan perhitungan ini dengan materi menghitung nilai fungsi linier.',
    questionText: 'Tentukan rumus fungsi f(x) yang paling tepat untuk menghitung tarif telepon pada perusahaan WanaConnect tersebut!',
    options: [
      'A. f(x) = 1.250x + 750',
      'B. f(x) = 1.000x + 1.500',
      'C. f(x) = 1.250x + 1.250',
      'D. f(x) = 1.500x + 500'
    ],
    correctAnswer: 'A',
    scoreValue: 3
  },
  {
    id: 4,
    type: 'Pilihan Ganda',
    difficulty: 'Sedang',
    topic: 'Persamaan Garis Lurus',
    illustrationType: 'cartesian_line',
    stimulus: 'Di daerah transmigrasi Wanaraya, kemiringan jalan raya sangat memengaruhi keselamatan berkendara, terutama bagi truk pengangkut kelapa sawit yang bermuatan berat. Dinas Pekerjaan Umum merancang jalan menanjak dengan tingkat kemiringan tertentu yang diuji menggunakan koordinat Kartesius. Sebuah jalan menanjak digambarkan melewati dua titik utama yang dipasang patok penanda, yaitu patok A berkoordinat (2, 5) dan patok B berkoordinat (6, 17). Gradien jalan pemicu gesekan roda ini harus dihitung secara akurat agar terhindar dari slip kendaraan.',
    questionText: 'Berdasarkan koordinat patok A dan B di atas, gradien (kemiringan) dari jalur tanjakan tersebut adalah...',
    options: [
      'A. 3',
      'B. 4',
      'C. 2',
      'D. 1.5'
    ],
    correctAnswer: 'A',
    scoreValue: 3
  },
  {
    id: 5,
    type: 'Pilihan Ganda',
    difficulty: 'Sedang',
    topic: 'Persamaan Garis Lurus',
    illustrationType: 'none',
    stimulus: 'Seorang petani sawit di Wanaraya menggunakan sistem penyiraman otomatis berbasis tekanan air pipa. Tekanan air (P, dalam bar) di dalam pipa utama berkurang secara linear seiring bertambahnya jarak dari stasiun pompa (d, dalam meter). Pada jarak 10 meter dari pompa, tekanan air adalah 4 bar. Pada jarak 30 meter dari pompa, tekanan air menyusut hingga menjadi 2 bar. Hubungan linear antara tekanan air dan jarak ini dapat dituliskan dalam rumus persamaan garis lurus y - y1 = m(x - x1).',
    questionText: 'Persamaan garis lurus yang menyatakan hubungan antara jarak (x) dan tekanan air (y) adalah...',
    options: [
      'A. x + 10y = 50',
      'B. x + 20y = 90',
      'C. x + y = 14',
      'D. 2x + 10y = 60'
    ],
    correctAnswer: 'B',
    scoreValue: 3
  },
  {
    id: 6,
    type: 'Pilihan Ganda',
    difficulty: 'Sedang',
    topic: 'Persamaan Garis Lurus',
    illustrationType: 'none',
    stimulus: 'Pada teknik tata ruang perkebunan modern di Wanaraya, penanaman batas pohon kelapa sawit diatur menggunakan barisan lurus sejajar untuk mengoptimalkan penyerapan sinar matahari. Batas baris pertama dimodelkan sebagai persamaan garis lurus 3x - 4y + 12 = 0. Diketahui baris kedua sejajar dengan baris pertama dan harus melewati kantor pusat perkebunan yang berada tepat di koordinat (8, -2) demi kerapian jalur irigasi.',
    questionText: 'Persamaan garis lurus baru yang menggambarkan jalur batas baris kedua di perkebunan tersebut adalah...',
    options: [
      'A. 3x - 4y - 32 = 0',
      'B. 3x + 4y - 16 = 0',
      'C. 4x - 3y - 38 = 0',
      'D. 3x - 4y + 32 = 0'
    ],
    correctAnswer: 'A',
    scoreValue: 3
  },
  {
    id: 7,
    type: 'Pilihan Ganda',
    difficulty: 'Sulit',
    topic: 'Statistika',
    illustrationType: 'infographic_pie',
    stimulus: 'Dalam memperingati Hari Pendidikan Nasional, SMPN 1 Wanaraya menyelenggarakan survei literasi membaca untuk seluruh siswa kelas 8. Data berupa jumlah buku fiksi yang dibaca siswa dalam satu semester terakhir dikumpulkan dan direpresentasikan dalam bentuk data tunggal frekuensi. Guru ingin menemukan nilai rata-rata (mean), nilai tengah (median), dan nilai yang paling sering muncul (modus). Total siswa kelas 8 yang disurvei sebanyak 20 orang dengan catatan data: 3 buku dibaca oleh 4 siswa, 4 buku dibaca oleh 5 siswa, 5 buku dibaca oleh 6 siswa, dan 6 buku dibaca oleh 5 siswa.',
    questionText: 'Berdasarkan data tunggal frekuensi di atas, hitunglah nilai mean (rata-rata) jumlah buku yang dibaca oleh siswa kelas 8!',
    options: [
      'A. 4.6',
      'B. 4.5',
      'C. 4.8',
      'D. 5.0'
    ],
    correctAnswer: 'A',
    scoreValue: 3
  },
  {
    id: 8,
    type: 'Pilihan Ganda',
    difficulty: 'Sedang',
    topic: 'Statistika',
    illustrationType: 'none',
    stimulus: 'Pengukuran nilai pemusatan data (mean, median, modus) memiliki fungsi analisis yang berbeda dalam memecahkan masalah kehidupan sehari-hari. Pada rapat komite SMPN 1 Wanaraya, kepala sekolah memaparkan dana bantuan sosial untuk siswa kurang mampu. Beliau memaparkan data pendapatan orang tua siswa yang sangat timpang: sebagian besar bekerja sebagai buruh tani dengan pendapatan Rp 1.500.000 per bulan, namun ada 2 orang tua yang berprofesi sebagai pengusaha kelapa sawit sukses dengan pendapatan Rp 45.000.000 per bulan. Angka rata-rata pendapatan ditarik sangat naik ke atas karena dua nilai ekstrem tersebut.',
    questionText: 'Ukuran pemusatan data manakah yang PALING ADIL dan tepat untuk menggambarkan tingkat ekonomi mayoritas orang tua siswa jika terdapat nilai ekstrem yang mencolok pada data?',
    options: [
      'A. Median (Nilai Tengah)',
      'B. Mean (Rata-rata)',
      'C. Modus',
      'D. Jangkauan'
    ],
    correctAnswer: 'A',
    scoreValue: 3
  },
  {
    id: 9,
    type: 'Pilihan Ganda',
    difficulty: 'Sulit',
    topic: 'Statistika',
    illustrationType: 'none',
    stimulus: 'Ukuran penyebaran data menjelaskan seberapa jauh sebaran data dari nilai pusatnya. Salah satu komponen penting adalah jangkauan kuartil yang membagi data menjadi empat bagian sama banyak. Puskesmas Wanaraya mencatat berat badan (dalam kg) dari sekelompok balita di Posyandu Melati. Berat badan balita tersebut adalah: 8, 9, 11, 12, 14, 15, 17, 18, 20. Dokter ingin mengetahui hamparan atau jangkauan semi antar kuartil untuk merancang program nutrisi anak.',
    questionText: 'Nilai Kuartil Bawah (Q1) dan Kuartil Atas (Q3) dari data berat badan balita di atas berturut-turut adalah...',
    options: [
      'A. 10 kg dan 17.5 kg',
      'B. 9.5 kg dan 18 kg',
      'C. 10 kg dan 18 kg',
      'D. 11 kg dan 17 kg'
    ],
    correctAnswer: 'A',
    scoreValue: 3
  },
  {
    id: 10,
    type: 'Pilihan Ganda',
    difficulty: 'Sulit',
    topic: 'Relasi dan Fungsi',
    illustrationType: 'none',
    stimulus: 'Fungsi kuadrat dan linear sering memodelkan keuntungan finansial UMKM keripik pisang di Wanaraya. Biaya produksi total bulanan dinyatakan dengan fungsi C(x) = 2.000x + 15.000 rupiah, dengan x menyatakan banyak bungkus keripik yang diproduksi. Penerimaan hasil penjualan dinyatakan dalam R(x) = 4.500x rupiah. Keuntungan bersih UMKM dirumuskan sebagai fungsi baru, yaitu f(x) = R(x) - C(x). Pengurus koperasi ingin menganalisis domain daerah asal minimum agar usaha tidak mengalami kerugian finansial.',
    questionText: 'Jika target keuntungan bersih (f(x)) minimal adalah Rp 60.000 per bulan, daerah asal (domain) nilai x yang memenuhi adalah...',
    options: [
      'A. x >= 30 bungkus',
      'B. x >= 15 bungkus',
      'C. x >= 25 bungkus',
      'D. x >= 20 bungkus'
    ],
    correctAnswer: 'A',
    scoreValue: 4
  },
  {
    id: 11,
    type: 'Pilihan Ganda',
    difficulty: 'Sulit',
    topic: 'Persamaan Garis Lurus',
    illustrationType: 'cartesian_line',
    stimulus: 'Dua buah pipa air bersih di desa Wanaraya dipasang sejajar untuk mengalirkan air ke RT yang berbeda. Pipa pertama melewati koordinat (2, 4) dan (5, 10). Pipa kedua dipasang dengan kemiringan yang tepat sama (sejajar) namun harus melalui titik saluran pusat cadangan air di koordinat (-1, 3). Tim teknis menggunakan persamaan garis lurus untuk memastikan tidak ada persimpangan fisik yang memicu kebocoran pipa.',
    questionText: 'Berdasarkan kondisi pipa yang sejajar tersebut, tentukan persamaan garis pipa kedua!',
    options: [
      'A. 2x - y + 5 = 0',
      'B. 2x + y - 5 = 0',
      'C. 3x - y + 6 = 0',
      'D. y - 2x = 3'
    ],
    correctAnswer: 'A',
    scoreValue: 4
  },
  {
    id: 12,
    type: 'Pilihan Ganda',
    difficulty: 'Sulit',
    topic: 'Persamaan Garis Lurus',
    illustrationType: 'none',
    stimulus: 'Dalam arsitektur pembangunan gedung serbaguna SMPN 1 Wanaraya, dipasang penyangga atap dari baja ringan yang saling tegak lurus untuk menahan berat atap genting metal. Penyangga utama dimodelkan dengan persamaan garis y = -2/3 x + 8. Penyangga silang dipasang tepat tegak lurus dengan penyangga utama dan harus bertumpu pada tiang beton yang terletak di koordinat (4, 1).',
    questionText: 'Tentukan persamaan garis lurus penopang penyangga silang baja ringan tersebut!',
    options: [
      'A. 3x - 2y - 10 = 0',
      'B. 2x + 3y - 11 = 0',
      'C. 3x + 2y - 14 = 0',
      'D. 3x - 2y + 10 = 0'
    ],
    correctAnswer: 'A',
    scoreValue: 4
  },
  {
    id: 13,
    type: 'Pilihan Ganda',
    difficulty: 'Mudah',
    topic: 'Relasi dan Fungsi',
    illustrationType: 'none',
    stimulus: 'Sebuah fungsi f didefinisikan dari himpunan A ke himpunan B dengan aturan mengasosiakan x dengan nilai f(x). Di kelas 8 SMPN 1 Wanaraya, Pak Guru Sutrisno mengenalkan pemetaan linear sederhana menggunakan persamaan f(x) = 3x - 4. Anggota daerah asal (domain) dibatasi dalam rentang bilangan bulat {1, 2, 3, 4}. Siswa diminta menuliskan daerah hasil atau range fungsi tersebut agar dapat menggambar grafik fungsi linear dengan rapi di buku kotak-kotak.',
    questionText: 'Berdasarkan domain daerah asal tersebut, daerah hasil (range) dari fungsi f(x) = 3x - 4 adalah...',
    options: [
      'A. {-1, 2, 5, 8}',
      'B. {-1, 1, 4, 7}',
      'C. {1, 4, 7, 10}',
      'D. {0, 3, 6, 9}'
    ],
    correctAnswer: 'A',
    scoreValue: 2
  },
  {
    id: 14,
    type: 'Pilihan Ganda',
    difficulty: 'Mudah',
    topic: 'Persamaan Garis Lurus',
    illustrationType: 'cartesian_line',
    stimulus: 'Pada grafik sistem koordinat Kartesius 2 dimensi, gradien menyatakan rasio perubahan komponen vertikal (sumbu y) terhadap komponen horizontal (sumbu x). Jika sebuah garis memotong sumbu y tepat di angka (0, 3) dan condong ke kanan atas melintasi titik (2, 7), gradien garis dapat ditentukan secara cepat menggunakan pengurangan ordinat dibagi selisih absis.',
    questionText: 'Gradien garis lurus yang melalui titik (0, 3) dan (2, 7) adalah...',
    options: [
      'A. 2',
      'B. -2',
      'C. 4',
      'D. 0.5'
    ],
    correctAnswer: 'A',
    scoreValue: 2
  },
  {
    id: 15,
    type: 'Pilihan Ganda',
    difficulty: 'Sedang',
    topic: 'Statistika',
    illustrationType: 'none',
    stimulus: 'Nilai rata-rata raport ujian tengah semester matematika kelas 8 SMPN 1 Wanaraya adalah 72. Ketika guru melakukan perekaman ulang, ternyata ada 2 orang siswa yang susulan belum dimasukkan nilainya. Kedua siswa tersebut masing-masing beroleh nilai 85 dan 90. Jika sebelum kedua nilai siswa tersebut dimasukkan, rata-rata nilai matematika dari 28 siswa adalah 72.',
    questionText: 'Berapakah rata-rata nilai setelah kedua nilai siswa susulan tersebut digabungkan?',
    options: [
      'A. 73',
      'B. 74',
      'C. 72.8',
      'D. 75'
    ],
    correctAnswer: 'A',
    scoreValue: 3
  },

  // ==================== PILIHAN GANDA KOMPLEKS (10 SOAL, ID 16-25, CHECKBOXES) ====================
  {
    id: 16,
    type: 'Pilihan Ganda Kompleks',
    difficulty: 'Sedang',
    topic: 'Relasi dan Fungsi',
    illustrationType: 'relation_graph',
    stimulus: 'Pada mata pelajaran Informatika kelompok matematika, siswa kls 8 SMPN 1 Wanaraya mendemonstrasikan relasi pemetaan menggunakan grafik garis lurus. Diketahui relasi R memasangkan anggota himpunan A = {2, 4, 6} ke himpunan B = {1, 2, 3, 4, 5, 6} dengan aturan "dua kali dari". Siswa diajak meneliti pasangan berurutan mana saja yang sahih memenuhi hukum fungsi ini.',
    questionText: 'Manakah dari pasangan berurutan berikut yang BENAR merupakan bagian dari relasi "dua kali dari" tersebut? (Pilih semua yang benar)',
    complexOptions: [
      'A. (2, 1)',
      'B. (4, 2)',
      'C. (6, 3)',
      'D. (2, 4)'
    ],
    correctAnswer: ['A', 'B', 'C'],
    scoreValue: 3
  },
  {
    id: 17,
    type: 'Pilihan Ganda Kompleks',
    difficulty: 'Sedang',
    topic: 'Relasi dan Fungsi',
    illustrationType: 'none',
    stimulus: 'Siswa kelas 8 mengkaji konsep domain, kodomain, dan range pada fungsi kuadrat harian f(x) = x^2 - 1 dengan domain bilangan bulat terbatas Df = {-2, -1, 0, 1, 2}. Anggota rentang nilai hasil atau range dipetakan satu per satu ke koordinat Kartesius untuk menemukan kecocokan sebaran daerah hasil kuadrat.',
    questionText: 'Manakah dari nilai-nilai berikut yang merupakan anggota daerah hasil (range) dari fungsi tersebut? (Pilih semua jawaban yang benar)',
    complexOptions: [
      'A. -1',
      'B. 0',
      'C. 3',
      'D. 4'
    ],
    correctAnswer: ['A', 'B', 'C'],
    scoreValue: 3
  },
  {
    id: 18,
    type: 'Pilihan Ganda Kompleks',
    difficulty: 'Sedang',
    topic: 'Relasi dan Fungsi',
    illustrationType: 'none',
    stimulus: 'Grafik fungsi linear sederhana f(x) = -2x + 6 digambarkan pada bidang koordinat Kartesius. Siswa kelas 8 memeriksa titik potong grafik tersebut terhadap sumbu x (saat y = 0) dan terhadap sumbu y (saat x = 0). Titik potong ini merupakan titik kunci dalam menggambarkan sebaran garis lurus secara presisi.',
    questionText: 'Manakah pernyataan koordinat titik potong berikut yang BENAR terkait grafik fungsi f(x) = -2x + 6? (Pilih semua yang benar)',
    complexOptions: [
      'A. Grafik memotong sumbu x di titik (3, 0)',
      'B. Grafik memotong sumbu y di titik (0, 6)',
      'C. Grafik melewati titik (1, 4)',
      'D. Grafik memotong sumbu x di titik (0, 3)'
    ],
    correctAnswer: ['A', 'B', 'C'],
    scoreValue: 3
  },
  {
    id: 19,
    type: 'Pilihan Ganda Kompleks',
    difficulty: 'Sedang',
    topic: 'Persamaan Garis Lurus',
    illustrationType: 'none',
    stimulus: 'Siswa SMPN 1 Wanaraya mendiskusikan sifat-sifat gradien atau kemiringan dari berbagai persamaan garis lurus yang tertulis di papan tulis. Persamaan-persamaan tersebut adalah: (i) y = 4x - 5, (ii) 2y = 8x + 10, (iii) 4x - y + 12 = 0, (iv) x + 4y - 8 = 0. Guru menanyakan persamaan mana saja yang memiliki kemiringan atau gradien m = 4.',
    questionText: 'Persamaan garis manakah yang memiliki gradien m = 4? (Pilih semua jawaban yang benar)',
    complexOptions: [
      'A. y = 4x - 5',
      'B. 2y = 8x + 10',
      'C. 4x - y + 12 = 0',
      'D. x + 4y - 8 = 0'
    ],
    correctAnswer: ['A', 'B', 'C'],
    scoreValue: 3
  },
  {
    id: 20,
    type: 'Pilihan Ganda Kompleks',
    difficulty: 'Sulit',
    topic: 'Persamaan Garis Lurus',
    illustrationType: 'cartesian_line',
    stimulus: 'Dalam proyek pemetaan lahan persawahan di desa Wanaraya, surveyor memetakan batas parit pengairan dengan persaman garis lurus. Diketahui sebuah batas parit digambar berupa garis lurus passing through titik P(3, 4) dengan gradien m = -2. Pengawas mengecek beberapa koordinat titik lain untuk memastikan aliran parit lurus dan sejajar jalan desa.',
    questionText: 'Manakah titik-titik koordinat berikut yang juga BERADA pada jalur persamaan garis parit tersebut? (Pilih semua yang benar)',
    complexOptions: [
      'A. Titik (1, 8)',
      'B. Titik (4, 2)',
      'C. Titik (0, 10)',
      'D. Titik (2, 5)'
    ],
    correctAnswer: ['A', 'B', 'C'],
    scoreValue: 4
  },
  {
    id: 21,
    type: 'Pilihan Ganda Kompleks',
    difficulty: 'Sulit',
    topic: 'Persamaan Garis Lurus',
    illustrationType: 'none',
    stimulus: 'Menganalisis kemiringan dua garis lurus merupakan kompetensi esensial. Dua buah garis k dan l diskusikan di kelas matematika. Diketahui garis k memiliki persamaan 2x - 3y + 6 = 0. Siswa harus menentukan sifat-sifat garis l yang sejajar atau tegak lurus dengan garis k agar dapat merancang konstruksi yang kokoh.',
    questionText: 'Pernyataan manakah yang BENAR mengenai gradien hubungan antar garis tersebut? (Pilih semua yang benar)',
    complexOptions: [
      'A. Gradien garis k adalah m = 2/3',
      'B. Garis l yang sejajar dengan k memiliki gradien m = 2/3',
      'C. Garis n yang tegak lurus dengan k memiliki gradien m = -3/2',
      'D. Gradien garis k adalah m = 3/2'
    ],
    correctAnswer: ['A', 'B', 'C'],
    scoreValue: 4
  },
  {
    id: 22,
    type: 'Pilihan Ganda Kompleks',
    difficulty: 'Sedang',
    topic: 'Statistika',
    illustrationType: 'infographic_pie',
    stimulus: 'Di SMPN 1 Wanaraya, hasil nilai tes harian statistika siswa kelas 8B dicatat dalam list berikut: 70, 80, 75, 80, 85, 90, 70, 80, 85, 75. Guru ingin membimbing siswa mengambil kesimpulan statistika deskriptif dari data tunggal di atas meliputi jangkauan data, median, modus, dan rata-ratanya.',
    questionText: 'Tentukan pernyataan statistika manakah yang BENAR berdasarkan data nilai tersebut! (Pilih semua yang benar)',
    complexOptions: [
      'A. Nilai Modus dari data tersebut adalah 80',
      'B. Nilai Median dari data harian tersebut adalah 80',
      'C. Jangkauan (range) data tersebut adalah 20',
      'D. Rerata (mean) dari data tersebut adalah 79'
    ],
    correctAnswer: ['A', 'B', 'C', 'D'],
    scoreValue: 3
  },
  {
    id: 23,
    type: 'Pilihan Ganda Kompleks',
    difficulty: 'Sulit',
    topic: 'Statistika',
    illustrationType: 'none',
    stimulus: 'Badan Statistik Wanaraya merilis data tinggi badan sebaran tim basket muda kls 8 SMPN 1 Wanaraya (dalam cm): 165, 172, 168, 175, 170, 162, 180, 175, 165, 170. Tim penyeleksi KONI daerah ingin memetakan kuartil atas (Q3), kuartil bawah (Q1), dan simpangan jangkauan kuartil interkuartil dari postur tubuh pemain.',
    questionText: 'Manakah nilai parameter penyebaran data berikut yang BENAR dari data tinggi badan di atas? (Pilih semua yang benar)',
    complexOptions: [
      'A. Kuartil Bawah Q1 adalah 165 cm',
      'B. Kuartil Atas Q3 adalah 175 cm',
      'C. Jangkauan Antar Kuartil (IQR) adalah 10 cm',
      'D. Kuartil Tengah Q2 (Median) adalah 170 cm'
    ],
    correctAnswer: ['A', 'B', 'C', 'D'],
    scoreValue: 4
  },
  {
    id: 24,
    type: 'Pilihan Ganda Kompleks',
    difficulty: 'Sulit',
    topic: 'Statistika',
    illustrationType: 'none',
    stimulus: 'Pada sebuah penelitian pertanian buah naga di Wanaraya, petani mengelompokkan berat panen harian buah naga (dalam gram): 300, 350, 320, 450, 300, 310, 500, 330, 350, 400. Berat ekstrem 500 gram mempengaruhi fluktuasi statistik penentuan kualitas ekspor. Petani berdiskusi mengenai pengaruh nilai ekstrem tersebut kepada mean, median, dan modus.',
    questionText: 'Pernyataan manakah yang BENAR tentang pengaruh penambahan nilai ekstrem ke dalam distribusi data? (Pilih semua yang benar)',
    complexOptions: [
      'A. Nilai Mean sensitif terhadap nilai ekstrem dan akan tergeser naik.',
      'B. Nilai Median lebih stabil dan tangguh terhadap pengaruh nilai pencilan ekstrem.',
      'C. Nilai Modus sama sekali tidak terpengaruh oleh satu atau dua nilai pencilan ekstrem.',
      'D. Nilai Mean dan Median selalu berubah dalam jumlah angka yang tepat sama ketika ada nilai ekstrem.'
    ],
    correctAnswer: ['A', 'B', 'C'],
    scoreValue: 4
  },
  {
    id: 25,
    type: 'Pilihan Ganda Kompleks',
    difficulty: 'Sulit',
    topic: 'Relasi dan Fungsi',
    illustrationType: 'none',
    stimulus: 'Evaluasi fungsi linier f(x) = y di SMPN 1 Wanaraya dikembangkan dalam aplikasi praktis. Diketahui f(x) = 5x - c, di mana c adalah konstanta bilangan bulat positif. Bila f(3) = 11, siswa diminta mencari nilai konstanta c dan mengecek kesetimbangan pemetaan fungsi pada input bernilai ganjil.',
    questionText: 'Pernyataan matematika manakah yang BENAR mengenai fungsi di atas? (Pilih semua yang benar)',
    complexOptions: [
      'A. Nilai konstanta c adalah 4',
      'B. Rumus fungsi yang lengkap adalah f(x) = 5x - 4',
      'C. Nilai fungsi f(2) adalah 6',
      'D. Nilai fungsi f(-1) adalah -9'
    ],
    correctAnswer: ['A', 'B', 'C', 'D'],
    scoreValue: 4
  },

  // ==================== BENAR SALAH (5 SOAL, ID 26-30, TRUE/FALSE DIRECT RADIO) ====================
  {
    id: 26,
    type: 'Benar Salah',
    difficulty: 'Mudah',
    topic: 'Relasi dan Fungsi',
    illustrationType: 'none',
    stimulus: 'Konsep dasar fungsi menjelaskan bahwa fungsi adalah bentuk relasi khusus. Di SMPN 1 Wanaraya, guru matematika membuat kesimpulan: "Setiap fungsi atau pemetaan pasti merupakan relasi, namun tidak setiap relasi selalu merupakan fungsi". Pernyataan ini diuji kebenarannya dalam pemahaman logika himpunan para siswa kelas 8.',
    questionText: 'Pernyataan: "Setiap fungsi dari himpunan A ke B sudah pasti merupakan relasi dari himpunan A ke B, namun tidak semua relasi otomatis menjadi fungsi."',
    correctAnswer: true, // true means "BENAR", false means "SALAH"
    scoreValue: 2
  },
  {
    id: 27,
    type: 'Benar Salah',
    difficulty: 'Mudah',
    topic: 'Persamaan Garis Lurus',
    illustrationType: 'none',
    stimulus: 'Gradien dari suatu persamaan garis lurus menentukan arah kemiringan garis tersebut pada sumbu koordinat Kartesius. Jika nilai gradien m bernilai positif, maka arah kemiringan garis condong naik ke kanan atas. Sebaliknya, jika gradien m bernilai negatif, garis condong turun ke kanan bawah (atau naik ke kiri atas).',
    questionText: 'Pernyataan: "Garis dengan persamaan y = -3x + 10 memiliki gradien m = -3, yang berarti arah grafik garis tersebut condong turun ke kanan bawah."',
    correctAnswer: true,
    scoreValue: 2
  },
  {
    id: 28,
    type: 'Benar Salah',
    difficulty: 'Sedang',
    topic: 'Persamaan Garis Lurus',
    illustrationType: 'cartesian_line',
    stimulus: 'Hubungan dua garis lurus di perkotaan dan perdesaan dapat digambarkan dengan gradien. Kita mengetahui bahwa dua buah garis lurus dikatakan saling tegak lurus jika hasil kali dari gradien kedua garis tersebut sama dengan -1 (m1 x m2 = -1). Sedangkan bila kedua garis tersebut sejajar, nilai gradiennya sama besar (m1 = m2).',
    questionText: 'Pernyataan: "Garis g1 yang memiliki persamaan y = 2x - 5 dan garis g2 dengan persamaan 2x - y + 8 = 0 adalah dua garis yang saling tegak lurus."',
    correctAnswer: false, // they are parallel (both m = 2), so false
    scoreValue: 3
  },
  {
    id: 29,
    type: 'Benar Salah',
    difficulty: 'Sedang',
    topic: 'Statistika',
    illustrationType: 'none',
    stimulus: 'Penghitungan statistik ukuran pemusatan sangat dipengaruhi oleh persebaran frekuensi data. Diketahui sekumpulan nilai siswa kelas 8A sebagai berikut: 80, 85, 80, 90, 80, 75, 80. Siswa ingin membuktikan apakah modus nilai matematika yang paling dominan di kelas tersebut adalah 80.',
    questionText: 'Pernyataan: "Modus dari kumpulan nilai matematika tersebut adalah 80, karena angka 80 muncul sebanyak 4 kali, mewakili frekuensi kemunculan tertinggi."',
    correctAnswer: true,
    scoreValue: 3
  },
  {
    id: 30,
    type: 'Benar Salah',
    difficulty: 'Sulit',
    topic: 'Statistika',
    illustrationType: 'none',
    stimulus: 'Dalam kajian statistika tingkat lanjut, ukuran penyebaran data membantu peneliti mengetahui konsistensi data. Pembagian kuartil memecah data tunggal menjadi 4 segmen. Guru mengumumkan formula jangkauan interkuartil (hamparan) didefinisikan sebagai selisih antara Kuartil Atas (Q3) dengan Kuartil Bawah (Q1), yaitu H = Q3 - Q1.',
    questionText: 'Pernyataan: "Jika diberikan data tunggal terurut: 2, 4, 6, 8, 10, 12, 14, maka nilai jangkauan interkuartil (hamparan) data tersebut adalah 8."',
    correctAnswer: true, // Q1 = 4, Q3 = 12, IQR = 12 - 4 = 8. True!
    scoreValue: 4
  },

  // ==================== MENJODOHKAN (5 SOAL, ID 31-35, MATCH LEFT OPTIONS TO RIGHT SELECT) ====================
  {
    id: 31,
    type: 'Menjodohkan',
    difficulty: 'Mudah',
    topic: 'Relasi dan Fungsi',
    illustrationType: 'none',
    stimulus: 'Pada pelajaran fungsi, guru memberikan beberapa fungsi sederhana f(x) dan meminta siswa menjodohkan nilai fungsi untuk suatu input x tertentu. Ini adalah latihan dasar menghitung nilai fungsi dengan substitusi nilai variabel langsung.',
    questionText: 'Jodohkanlah nilai fungsi f(x) = 2x + 3 di kolom kiri dengan hasilnya di kolom kanan sesuai nilai input x yang diberikan!',
    matchingLeft: [
      'f(1)',
      'f(3)',
      'f(-1)',
      'f(0)'
    ],
    matchingRight: [
      '5',
      '9',
      '1',
      '3',
      '7'
    ],
    correctAnswer: {
      'f(1)': '5',
      'f(3)': '9',
      'f(-1)': '1',
      'f(0)': '3'
    },
    scoreValue: 2
  },
  {
    id: 32,
    type: 'Menjodohkan',
    difficulty: 'Sedang',
    topic: 'Persamaan Garis Lurus',
    illustrationType: 'none',
    stimulus: 'Dalam bab Persamaan Garis Lurus, siswa diajarkan mengenali gradien (m) secara langsung dari berbagai bentuk penulisan persamaan garis. Bentuk umum ax + by + c = 0 atau y = mx + c memiliki ciri khas yang berbeda untuk ditarik nilainya.',
    questionText: 'Jodohkanlah persamaan garis di sebelah kiri dengan nilai gradien (m) yang tepat di sebelah kanan!',
    matchingLeft: [
      'y = 3x - 5',
      'y = -2x + 7',
      '2x - 4y + 8 = 0',
      '3x + y - 4 = 0'
    ],
    matchingRight: [
      '3',
      '-2',
      '0.5',
      '-3',
      '2'
    ],
    correctAnswer: {
      'y = 3x - 5': '3',
      'y = -2x + 7': '-2',
      '2x - 4y + 8 = 0': '0.5',
      '3x + y - 4 = 0': '-3'
    },
    scoreValue: 3
  },
  {
    id: 33,
    type: 'Menjodohkan',
    difficulty: 'Sedang',
    topic: 'Persamaan Garis Lurus',
    illustrationType: 'cartesian_line',
    stimulus: 'Surveyor merumuskan persamaan garis lurus dari informasi titik koordinat yang disediakan. Rumus penyusunan bervariasi bergantung pada ketersediaan titik potong koordinat maupun kemiringan lereng sawit.',
    questionText: 'Jodohkanlah informasi garis di sebelah kiri dengan rumus persamaan garis lurus yang tepat di sebelah kanan!',
    matchingLeft: [
      'Melalui (0,0) dengan gradien -2',
      'Melalui (1,3) dan (2,5)',
      'Melalui (0,4) sejajar garis y = 3x',
      'Melalui (2,2) tegak lurus y = -x'
    ],
    matchingRight: [
      'y = -2x',
      'y = 2x + 1',
      'y = 3x + 4',
      'y = x',
      'y = 3x'
    ],
    correctAnswer: {
      'Melalui (0,0) dengan gradien -2': 'y = -2x',
      'Melalui (1,3) dan (2,5)': 'y = 2x + 1',
      'Melalui (0,4) sejajar garis y = 3x': 'y = 3x + 4',
      'Melalui (2,2) tegak lurus y = -x': 'y = x'
    },
    scoreValue: 3
  },
  {
    id: 34,
    type: 'Menjodohkan',
    difficulty: 'Sulit',
    topic: 'Statistika',
    illustrationType: 'none',
    stimulus: 'Saat menganalisis data tunggal hasil panen karet petani transmigran di Kecamatan Wanaraya, guru menyajikan data acak: 12, 10, 15, 12, 18. Siswa diminta menentukan ukuran pemusatan yang cocok demi kemaslahatan pembagian pupuk subsidi di wilayah tersebut.',
    questionText: 'Cocokkanlah nama ukuran pemusatan di sebelah kiri dengan nilai hitung aktual dari data hasil panen {12, 10, 15, 12, 18} di sebelah kanan!',
    matchingLeft: [
      'Mean (Rata-rata)',
      'Median (Nilai Tengah)',
      'Modus',
      'Jangkauan (Range)'
    ],
    matchingRight: [
      '13.4',
      '12',
      '12',
      '8',
      '15'
    ],
    correctAnswer: {
      'Mean (Rata-rata)': '13.4',
      'Median (Nilai Tengah)': '12',
      'Modus': '12',
      'Jangkauan (Range)': '8'
    },
    scoreValue: 3
  },
  {
    id: 35,
    type: 'Menjodohkan',
    difficulty: 'Sulit',
    topic: 'Statistika',
    illustrationType: 'none',
    stimulus: 'Seorang penilai mutu beras di lumbung padi desa Wanaraya mengambil sampel acak sebaran bobot karung padi dalam kg: 42, 45, 48, 50, 52, 55, 60. Kuartil Atas Q3, Kuartil Bawah Q1, Median Q2, dan ukuran penyebaran jangkauan interkuartil harus ditentukan demi standarisasi ekspor.',
    questionText: 'Jodohkanlah komponen ukuran penyebaran di kiri dengan nilai hitung yang tepat di sebelah kanan berdasarkan data bobot karung tersebut!',
    matchingLeft: [
      'Kuartil Bawah Q1',
      'Median Q2',
      'Kuartil Atas Q3',
      'Jangkauan Antar Kuartil'
    ],
    matchingRight: [
      '45',
      '50',
      '55',
      '10',
      '18'
    ],
    correctAnswer: {
      'Kuartil Bawah Q1': '45',
      'Median Q2': '50',
      'Kuartil Atas Q3': '55',
      'Jangkauan Antar Kuartil': '10'
    },
    scoreValue: 4
  }
];
