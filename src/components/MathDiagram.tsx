import React from 'react';

interface MathDiagramProps {
  type: 'none' | 'relation_graph' | 'infographic_pie' | 'cartesian_line';
  questionId: number;
}

export const MathDiagram: React.FC<MathDiagramProps> = ({ type, questionId }) => {
  if (type === 'none') return null;

  // Render Relation/Function Line Graph on Coordinates
  if (type === 'relation_graph') {
    return (
      <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 text-center flex flex-col items-center shadow-inner">
        <span className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
          Visualisasi: Relasi Fungsi Sebagai Grafik Linier Koordinat (Soal #{questionId})
        </span>
        <svg viewBox="0 0 400 300" className="w-full max-w-[360px] h-auto bg-white rounded-lg border border-slate-200 shadow-sm">
          {/* Grid lines */}
          {Array.from({ length: 9 }).map((_, i) => (
            <React.Fragment key={i}>
              <line x1={40 + i * 40} y1="20" x2={40 + i * 40} y2="260" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="20 + i * 30" x2="360" y2="20 + i * 30" stroke="#f1f5f9" strokeWidth="1" />
            </React.Fragment>
          ))}

          {/* Axes */}
          <line x1="40" y1="150" x2="360" y2="150" stroke="#475569" strokeWidth="2" /> {/* X Axis */}
          <line x1="200" y1="20" x2="200" y2="260" stroke="#475569" strokeWidth="2" /> {/* Y Axis */}

          {/* Dots and Arrows */}
          <text x="350" y="145" className="text-xs font-semibold fill-slate-600">X</text>
          <text x="210" y="35" className="text-xs font-semibold fill-slate-600">Y</text>
          <text x="190" y="165" className="text-xs fill-slate-400">0</text>

          {/* Functioin Plot: f(x) = 2x */}
          <line x1="80" y1="230" x2="320" y2="50" stroke="#3b82f6" strokeWidth="3" strokeDasharray="1 0" />
          
          {/* Points */}
          <circle cx="200" cy="150" r="5" className="fill-blue-600 animate-pulse" />
          <circle cx="260" cy="105" r="5" className="fill-blue-600" />
          <circle cx="140" cy="195" r="5" className="fill-blue-600" />

          {/* Labels */}
          <text x="270" y="105" className="text-[10px] font-mono font-bold fill-slate-700">A (1, 2)</text>
          <text x="110" y="195" className="text-[10px] font-mono font-bold fill-slate-700">B (-1, -2)</text>
          <text x="210" y="165" className="text-[10px] font-mono fill-slate-500">1</text>
          <text x="205" y="110" className="text-[10px] font-mono fill-slate-500">2</text>

          {/* Graph name */}
          <rect x="50" y="30" width="120" height="25" rx="4" fill="#eff6ff" stroke="#bfdbfe" />
          <text x="60" y="46" className="text-[10px] font-mono font-semibold fill-blue-700">Relasi: y = 2x</text>
        </svg>
        <p className="text-xs text-slate-500 mt-2 italic">
          Grafik atas menyajikan relasi yang menghubungkan himpunan daerah asal ke daerah kawan dalam koordinat dua dimensi.
        </p>
      </div>
    );
  }

  // Render Colorful Corporate Market Share Infographic Pie Chart
  if (type === 'infographic_pie') {
    return (
      <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 text-center flex flex-col items-center shadow-inner">
        <span className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
          Infografis: Pembagian Hasil Survei Literasi Siswa (Soal #{questionId})
        </span>
        <div className="flex flex-col sm:flex-row items-center justify-around w-full gap-4 max-w-[450px] bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
          {/* Custom SVG Pie Chart */}
          <svg viewBox="0 0 200 200" className="w-[150px] h-[150px]">
            {/* Pie segments (Calculated coordinates for exact look) */}
            {/* Segment A - 4 siswa (20%) - Stroke Dasharray approximation */}
            <circle cx="100" cy="100" r="70" fill="transparent" stroke="#10b981" strokeWidth="40" strokeDasharray="88 352" strokeDashoffset="0" />
            
            {/* Segment B - 5 siswa (25%) */}
            <circle cx="100" cy="100" r="70" fill="transparent" stroke="#3b82f6" strokeWidth="40" strokeDasharray="110 330" strokeDashoffset="-88" />
            
            {/* Segment C - 6 siswa (30%) */}
            <circle cx="100" cy="100" r="70" fill="transparent" stroke="#f59e0b" strokeWidth="40" strokeDasharray="132 308" strokeDashoffset="-198" />
            
            {/* Segment D - 5 siswa (25%) */}
            <circle cx="100" cy="100" r="70" fill="transparent" stroke="#ec4899" strokeWidth="40" strokeDasharray="110 330" strokeDashoffset="-330" />

            {/* Inner Ring to make it a classy donut chart */}
            <circle cx="100" cy="100" r="45" fill="#ffffff" />
            <text x="100" y="98" textAnchor="middle" className="text-[11px] font-bold fill-slate-700">TOTAL</text>
            <text x="100" y="115" textAnchor="middle" className="text-xs font-mono font-bold fill-slate-500">20 Siswa</text>
          </svg>

          {/* Corporate Legends */}
          <div className="text-left flex flex-col gap-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#10b981] inline-block"></span>
              <span className="text-slate-600 font-medium">3 Buku fiksi (20% - 4 Siswa)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#3b82f6] inline-block"></span>
              <span className="text-slate-600 font-medium">4 Buku fiksi (25% - 5 Siswa)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#f59e0b] inline-block"></span>
              <span className="text-slate-600 font-medium">5 Buku fiksi (30% - 6 Siswa)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#ec4899] inline-block"></span>
              <span className="text-slate-600 font-medium">6 Buku fiksi (25% - 5 Siswa)</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-2 italic">
          Bagan lingkaran ini mempresentasikan proporsi jumlah buku fiksi yang dibaca siswa kelas 8 dalam satu semester terakhir.
        </p>
      </div>
    );
  }

  // Render Cartesian Grid coordinate line
  if (type === 'cartesian_line') {
    // Generate specialized grid based on target question to make it mathematically sound
    let lineX1 = 50, lineY1 = 200, lineX2 = 250, lineY2 = 50; 
    let label1 = "A(2, 5)", cx1 = 100, cy1 = 180;
    let label2 = "B(6, 17)", cx2 = 220, cy2 = 70;

    if (questionId === 11) {
      lineX1 = 40; lineY1 = 230; lineX2 = 260; lineY2 = 50;
      label1 = "(2, 4)"; cx1 = 100; cy1 = 170;
      label2 = "(5, 10)"; cx2 = 200; cy2 = 95;
    } else if (questionId === 20) {
      lineX1 = 40; lineY1 = 60; lineX2 = 260; lineY2 = 240;
      label1 = "P(3, 4)"; cx1 = 120; cy1 = 140;
      label2 = "Q(4, 2)"; cx2 = 160; cy2 = 180;
    } else if (questionId === 33) {
      lineX1 = 50; lineY1 = 220; lineX2 = 220; lineY2 = 50;
      label1 = "(1, 3)"; cx1 = 90; cy1 = 160;
      label2 = "(2, 5)"; cx2 = 140; cy2 = 110;
    }

    return (
      <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 text-center flex flex-col items-center shadow-inner animate-fade-in">
        <span className="text-xs font-mono text-slate-400 mb-2 uppercase tracking-wider">
          Visualisasi Geometri: Persamaan Garis di Bidang Kartesius (Soal #{questionId})
        </span>
        <svg viewBox="0 0 300 300" className="w-full max-w-[300px] h-auto bg-white rounded-lg border border-slate-200 shadow-sm">
          {/* Graph Grids */}
          {Array.from({ length: 15 }).map((_, i) => (
            <React.Fragment key={i}>
              <line x1={20 + i * 18} y1="10" x2={20 + i * 18} y2="290" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="10" y1={20 + i * 18} x2="290" y2={20 + i * 18} stroke="#f1f5f9" strokeWidth="1" />
            </React.Fragment>
          ))}

          {/* Axes */}
          <line x1="20" y1="210" x2="280" y2="210" stroke="#334155" strokeWidth="2.5" /> {/* X axis (shifted slightly lower for positive quadrant) */}
          <line x1="60" y1="10" x2="60" y2="280" stroke="#334155" strokeWidth="2.5" />  {/* Y axis (shifted left) */}

          {/* Axis Labels */}
          <text x="270" y="202" className="text-[11px] font-bold fill-slate-700">X</text>
          <text x="70" y="25" className="text-[11px] font-bold fill-slate-700">Y</text>
          <text x="45" y="222" className="text-[10px] font-mono fill-slate-400">0</text>

          {/* Plotted Line */}
          <line x1={lineX1} y1={lineY1} x2={lineX2} y2={lineY2} stroke="#ef4444" strokeWidth="3" />

          {/* Plotted Coordinate Points */}
          <circle cx={cx1} cy={cy1} r="6" className="fill-red-500 stroke-white stroke-2 shadow-md cursor-pointer hover:scale-125 transition-transform" />
          <circle cx={cx2} cy={cy2} r="6" className="fill-red-500 stroke-white stroke-2 shadow-md cursor-pointer hover:scale-125 transition-transform" />

          {/* Point Labels */}
          <text x={cx1 + 10} y={cy1 - 8} className="text-[10px] font-mono font-bold bg-white fill-slate-800">{label1}</text>
          <text x={cx2 + 10} y={cy2 - 8} className="text-[10px] font-mono font-bold bg-white fill-slate-800">{label2}</text>

          {/* Line Formula Banner */}
          <rect x="150" y="15" width="130" height="25" rx="5" fill="#fff1f2" stroke="#fecdd3" strokeWidth="1" />
          <text x="160" y="31" className="text-[9px] font-mono font-bold fill-rose-700">Garis Lereng / Gradien m</text>
        </svg>
        <p className="text-xs text-slate-500 mt-2 italic">
          Diagram garis Kartesius ini memetakan ordinat dan absis dari tanjakan jalan, saluran air, ataupun batas bidang tanah.
        </p>
      </div>
    );
  }

  return null;
};
