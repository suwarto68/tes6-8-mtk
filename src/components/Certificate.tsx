import React from 'react';
import { Award, Printer, CheckCircle, MapPin, Feather } from 'lucide-react';
import { ExamStats } from '../types';

interface CertificateProps {
  stats: ExamStats;
  onReset: () => void;
}

export const Certificate: React.FC<CertificateProps> = ({ stats, onReset }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 py-6" id="certificate-view">
      {/* Printable Area Wrapper */}
      <div className="w-full max-w-[800px] p-2 bg-gradient-to-tr from-amber-200 via-amber-100 to-amber-300 rounded-2xl shadow-xl border border-amber-300 relative overflow-hidden print:p-0 print:border-0 print:shadow-none">
        
        {/* Anti-fraud background watermark design */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
          <svg width="600" height="600" viewBox="0 0 100 100">
            <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="#d97706" />
          </svg>
        </div>

        {/* Outer classic thick certificate border */}
        <div className="border-[8px] border-double border-amber-600 bg-white p-6 sm:p-12 rounded-xl text-center flex flex-col justify-between min-h-[500px]">
          
          {/* Header */}
          <div className="flex flex-col items-center">
            {/* School Crest Placeholder / Icons */}
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-12 h-12 text-amber-600 print:text-amber-800" />
              <div className="text-left">
                <h2 className="text-sm font-bold text-slate-800 tracking-widest uppercase">SMP NEGERI 1 WANARAYA</h2>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Kec. Wanaraya, Kab. Barito Kuala, Kalimantan Barat</p>
              </div>
            </div>
            
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-amber-600 to-transparent my-3"></div>
            
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-amber-900 tracking-wide mt-2">
              PIAGAM PENGHARGAAN
            </h1>
            <p className="text-xs font-mono text-amber-700 tracking-[0.2em] font-semibold uppercase mt-0.5">
              SERTIFIKAT KELULUSAN ASESMEN SUMATIF
            </p>
            <p className="text-[10px] font-mono text-slate-400 mt-1">No: SAS-MTK-VIII/{new Date().getFullYear()}/{Math.floor(1000 + Math.random() * 9000)}</p>
          </div>

          {/* Certificate Body */}
          <div className="my-8">
            <p className="text-sm italic text-slate-600">Dengan ini menyatakan bahwa siswa:</p>
            
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 border-b-2 border-slate-200 inline-block px-10 py-1.5 my-3 tracking-wide">
              {stats.nama.toUpperCase()}
            </h3>
            
            <p className="text-sm text-slate-700 leading-relaxed max-w-[600px] mx-auto px-4">
              Telah melaksanakan dan menyelesaikan asesmen <span className="font-semibold text-slate-800">Sumatif Akhir Semester (SAS)</span> mata pelajaran <span className="font-bold text-amber-800">Matematika Tingkat SMP Kelas VIII</span> di SMPN 1 Wanaraya dengan kriteria pencapaian sebagai berikut:
            </p>
          </div>

          {/* Metrics block */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-amber-50/50 p-4 rounded-xl border border-amber-100 max-w-[650px] mx-auto w-full my-4">
            <div className="text-center p-2">
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-mono">Nilai Akhir</span>
              <span className={`text-2xl font-serif font-black ${stats.nilai >= 75 ? 'text-emerald-700' : 'text-amber-700'}`}>{stats.nilai}</span>
              <span className="block text-[9px] text-slate-400 font-mono">(Skala 100)</span>
            </div>
            <div className="text-center p-2 border-l border-amber-200/50">
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-mono">Jawaban Benar</span>
              <span className="text-2xl font-serif font-bold text-blue-700">{stats.benar} Soal</span>
            </div>
            <div className="text-center p-2 border-l border-amber-200/50">
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-mono">Jawaban Salah</span>
              <span className="text-2xl font-serif font-bold text-rose-700">{stats.salah} Soal</span>
            </div>
            <div className="text-center p-2 border-l border-amber-200/50">
              <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-mono">Masa Ujian</span>
              <span className="text-[10px] font-mono font-bold text-slate-700 block mt-2 text-ellipsis overflow-hidden whitespace-nowrap" title={stats.tanggalDanWaktu}>
                {stats.tanggalDanWaktu.split(' ')[0]}
              </span>
            </div>
          </div>

          {/* Signatures and Seal */}
          <div className="flex justify-around items-end mt-6 flex-wrap gap-8">
            {/* Digital Seal */}
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-amber-500 animate-spin-slow opacity-80"></div>
                <div className="absolute w-16 h-16 rounded-full bg-amber-600 flex items-center justify-center shadow-lg border-2 border-amber-400">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <span className="text-[10px] font-bold text-amber-700 font-mono mt-1 uppercase tracking-wider">VERIFIED ONLINE</span>
            </div>

            {/* Signature of Developer/Examiner */}
            <div className="text-center w-[180px]">
              <span className="text-[10px] text-slate-500 font-mono uppercase block">Wanaraya, {stats.tanggalDanWaktu.split(' ')[0] || "2026-05-24"}</span>
              <div className="h-10 my-1 flex items-center justify-center relative">
                {/* Elegant cursive signature font placeholder */}
                <span className="font-serif italic text-amber-800 text-lg opacity-85 select-none font-extrabold flex items-center gap-1">
                  <Feather className="w-4 h-4" /> Suwarto, S.Pd
                </span>
              </div>
              <div className="w-full h-[1px] bg-slate-300"></div>
              <span className="text-[11px] font-bold text-slate-800 block mt-1">Suwarto, S.Pd</span>
              <span className="text-[9px] text-slate-400 font-mono uppercase block">Pengembang &amp; Penguji</span>
            </div>
          </div>

        </div>
      </div>

      {/* Control Buttons (excluded from print natively) */}
      <div className="flex gap-4 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-950 text-white rounded-lg transition-all duration-200 font-medium text-sm shadow cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Cetak Sertifikat ini
        </button>
        <button
          onClick={onReset}
          className="px-5 py-2.5 border border-slate-300 hover:border-slate-400 text-slate-700 bg-white rounded-lg transition-all duration-200 font-medium text-sm shadow cursor-pointer"
        >
          Masuk Ujian Baru
        </button>
      </div>
    </div>
  );
};
