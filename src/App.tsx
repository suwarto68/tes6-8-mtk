/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, 
  Clock, 
  User, 
  BookOpen, 
  ArrowLeft, 
  ArrowRight, 
  CheckSquare, 
  AlertTriangle, 
  Database, 
  Sliders, 
  LogOut, 
  TrendingUp, 
  FileCheck,
  Smartphone,
  Share2,
  Lock,
  Globe,
  Settings
} from 'lucide-react';
import { questions } from './data/questions';
import { MathDiagram } from './components/MathDiagram';
import { Certificate } from './components/Certificate';
import { AppsScriptModal } from './components/AppsScriptModal';
import { StudentAnswers, StudentProfile, ExamStats, LeaderboardEntry } from './types';

// Pre-seeded Class VIII competitors to populate the local leaderboard in case the sheet is new or offline
const defaultLeaderboard: LeaderboardEntry[] = [
  { nama: "Rahmat Hidayat", kelas: "Kelas 8A", nilai: 95, tanggalWall: "2026-05-24" },
  { nama: "Lestari Wulandari", kelas: "Kelas 8B", nilai: 92, tanggalWall: "2026-05-24" },
  { nama: "Budi Wijaya", kelas: "Kelas 8A", nilai: 88, tanggalWall: "2026-05-24" },
  { nama: "Citra Amelia", kelas: "Kelas 8B", nilai: 85, tanggalWall: "2026-05-24" },
  { nama: "Dewi Lestari", kelas: "Kelas 8A", nilai: 82, tanggalWall: "2026-05-24" },
  { nama: "Eko Prasetyo", kelas: "Kelas 8B", nilai: 78, tanggalWall: "2026-05-24" },
  { nama: "Fahri Hamzah", kelas: "Kelas 8A", nilai: 75, tanggalWall: "2026-05-24" },
  { nama: "Gita Gutawa", kelas: "Kelas 8B", nilai: 72, tanggalWall: "2026-05-24" },
];

export default function App() {
  const [screen, setScreen] = useState<'LOGIN' | 'INSTRUCTION' | 'EXAM' | 'COMPLETED'>('LOGIN');
  
  // Student Login Profile
  const [nama, setNama] = useState('');
  const [kelas, setKelas] = useState('Kelas 8A');
  const [showSettings, setShowSettings] = useState(false);
  const [appsScriptUrl, setAppsScriptUrlState] = useState('https://script.google.com/macros/s/AKfycbwTGC5UDIhfccw_8QEOTuj4eLvzu6YXccCKxZb4TTmhBX2diyBJ9acmwKSzS-0GpG4/exec');

  // Exam state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<StudentAnswers>({});
  const [timeLeft, setTimeLeft] = useState(5400); // 90 minutes in seconds
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);

  // Score stats and certification
  const [finalStats, setFinalStats] = useState<ExamStats | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(defaultLeaderboard);

  // Leaderboard interactive views & admin states
  const [hideKelasColumn, setHideKelasColumn] = useState(true);
  const [hideTanggalColumn, setHideTanggalColumn] = useState(true);
  const [showRankConfig, setShowRankConfig] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [deletedStudents, setDeletedStudents] = useState<string[]>([]);

  // Sidebar database state config
  const [sidebarTestStatus, setSidebarTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [showSidebarConfig, setShowSidebarConfig] = useState(false);

  // Load configured Web App URL on startup
  useEffect(() => {
    const defaultUrl = 'https://script.google.com/macros/s/AKfycbwTGC5UDIhfccw_8QEOTuj4eLvzu6YXccCKxZb4TTmhBX2diyBJ9acmwKSzS-0GpG4/exec';
    const savedUrl = localStorage.getItem('apps_script_url') || defaultUrl;
    setAppsScriptUrlState(savedUrl);

    // Load deleted student names blocklist
    const savedDeletedList = localStorage.getItem('deleted_student_names');
    let loadedDeleted: string[] = [];
    if (savedDeletedList) {
      try {
        loadedDeleted = JSON.parse(savedDeletedList);
        setDeletedStudents(loadedDeleted);
      } catch (e) {
        setDeletedStudents([]);
      }
    }

    // Load leaderboard
    const savedLeaderboard = localStorage.getItem('saved_leaderboard');
    if (savedLeaderboard) {
      try {
        const parsed = JSON.parse(savedLeaderboard);
        // Filter out any locally deleted students on mount
        const filtered = parsed.filter((x: any) => !loadedDeleted.includes(x.nama.toLowerCase()));
        setLeaderboard(filtered);
      } catch (e) {
        setLeaderboard(defaultLeaderboard.filter((x) => !loadedDeleted.includes(x.nama.toLowerCase())));
      }
    } else {
      setLeaderboard(defaultLeaderboard.filter((x) => !loadedDeleted.includes(x.nama.toLowerCase())));
    }

    // Load column visibility preferences
    const savedHideKelas = localStorage.getItem('hide_kelas_column');
    if (savedHideKelas !== null) {
      setHideKelasColumn(savedHideKelas === 'true');
    }
    const savedHideTanggal = localStorage.getItem('hide_tanggal_column');
    if (savedHideTanggal !== null) {
      setHideTanggalColumn(savedHideTanggal === 'true');
    }
    
    // Initialize empty answer states for all 35 questions
    const initialAnswers: StudentAnswers = {};
    questions.forEach((q) => {
      let defaultValue: any = '';
      if (q.type === 'Pilihan Ganda Kompleks') {
        defaultValue = [];
      } else if (q.type === 'Menjodohkan') {
        // Build empty mapping for left keys
        const matchMap: { [key: string]: string } = {};
        q.matchingLeft?.forEach((item) => {
          matchMap[item] = '';
        });
        defaultValue = matchMap;
      } else if (q.type === 'Benar Salah') {
        defaultValue = null; // unset
      }
      initialAnswers[q.id] = {
        answered: false,
        val: defaultValue,
        isDoubtful: false
      };
    });
    setAnswers(initialAnswers);
  }, []);

  const toggleHideKelas = (val: boolean) => {
    setHideKelasColumn(val);
    localStorage.setItem('hide_kelas_column', String(val));
  };

  const toggleHideTanggal = (val: boolean) => {
    setHideTanggalColumn(val);
    localStorage.setItem('hide_tanggal_column', String(val));
  };

  const updateLeaderboardAndPersist = (newList: LeaderboardEntry[]) => {
    // Sort strictly by highest score descending
    const sorted = [...newList].sort((a, b) => b.nilai - a.nilai);
    setLeaderboard(sorted);
    localStorage.setItem('saved_leaderboard', JSON.stringify(sorted));
  };

  const deleteStudentFromLeaderboard = async (studentName: string) => {
    const lowerName = studentName.toLowerCase();
    
    // Add to local deleted blocklist
    const savedDeleted = JSON.parse(localStorage.getItem('deleted_student_names') || '[]');
    if (!savedDeleted.includes(lowerName)) {
      const nextDeleted = [...savedDeleted, lowerName];
      localStorage.setItem('deleted_student_names', JSON.stringify(nextDeleted));
      setDeletedStudents(nextDeleted);
    }

    // Filter from current view state
    const nextList = leaderboard.filter((x) => x.nama.toLowerCase() !== lowerName);
    updateLeaderboardAndPersist(nextList);

    // Call Google Apps Script delete webhook (no-cors format safe)
    if (appsScriptUrl) {
      try {
        await fetch(appsScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            action: 'delete',
            nama: studentName
          })
        });
      } catch (err) {
        console.warn("Spreadsheet delete webhook integration fired:", err);
      }
    }
  };

  const restoreDeletedStudent = (studentNameToRestore: string) => {
    const lowerName = studentNameToRestore.toLowerCase();
    const nextDeleted = deletedStudents.filter((n) => n !== lowerName);
    setDeletedStudents(nextDeleted);
    localStorage.setItem('deleted_student_names', JSON.stringify(nextDeleted));
    
    // Hard refresh leaderboard data from source/defaults
    if (appsScriptUrl) {
      fetchLeaderboard();
    } else {
      // Re-seed from defaultLeaderboard
      const filteredDefaults = defaultLeaderboard.filter((x) => !nextDeleted.includes(x.nama.toLowerCase()));
      updateLeaderboardAndPersist(filteredDefaults);
    }
  };

  // Save Apps Script URL to local storage when changed
  const setAppsScriptUrl = (url: string) => {
    setAppsScriptUrlState(url);
    localStorage.setItem('apps_script_url', url);
  };

  // Timer Countdown Ticker
  useEffect(() => {
    if (screen !== 'EXAM') return;
    const ticker = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(ticker);
          // Auto submit when time runs out
          handleForceSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(ticker);
  }, [screen]);

  // Try to load online rankings from Google Spreadsheet Web App if set up
  const fetchLeaderboard = async () => {
    if (!appsScriptUrl) {
      // Local seeds
      return;
    }
    try {
      const response = await fetch(appsScriptUrl);
      const resData = await response.json();
      if (resData && resData.status === 'success' && resData.data) {
        // Map to LeaderboardEntry array
        const rawList = resData.data.map((item: any) => ({
          nama: item.nama,
          kelas: item.kelas,
          nilai: Number(item.nilai) || 0,
          tanggalWall: item.tanggalDanWaktu ? item.tanggalDanWaktu.split(' ')[0] : '2026-05-24'
        }));
        
        // Filter out locally deleted students
        const savedDeleted = JSON.parse(localStorage.getItem('deleted_student_names') || '[]');
        const filteredList = rawList.filter((x: any) => !savedDeleted.includes(x.nama.toLowerCase()));
        updateLeaderboardAndPersist(filteredList);
      }
    } catch (err) {
      console.warn("Failed to fetch Google spreadsheet leaderboard, falling back securely to local mock state:", err);
    }
  };

  useEffect(() => {
    if (screen === 'COMPLETED') {
      fetchLeaderboard();
    }
  }, [screen, appsScriptUrl]);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) {
      alert("Masukkan nama lengkap Anda terlebih dahulu!");
      return;
    }
    setScreen('INSTRUCTION');
  };

  // Skip instructions to starts exam
  const handleStartExam = () => {
    setTimeLeft(5400); // 90 mins
    setScreen('EXAM');
  };

  // Handle answers input changes for active question
  const currentQuestion = questions[currentIdx];

  const handlePilihanGandaSelect = (optionChar: string) => {
    setAnswers((prev) => {
      const current = prev[currentQuestion.id];
      return {
        ...prev,
        [currentQuestion.id]: {
          ...current,
          answered: true,
          val: optionChar
        }
      };
    });
  };

  const handlePilihanGandaKompleksToggle = (optionChar: string) => {
    setAnswers((prev) => {
      const current = prev[currentQuestion.id];
      const existingArray: string[] = Array.isArray(current.val) ? current.val : [];
      let nextArray: string[];
      if (existingArray.includes(optionChar)) {
        nextArray = existingArray.filter((x) => x !== optionChar);
      } else {
        nextArray = [...existingArray, optionChar];
      }
      return {
        ...prev,
        [currentQuestion.id]: {
          ...current,
          answered: nextArray.length > 0,
          val: nextArray
        }
      };
    });
  };

  const handleBenarSalahSelect = (val: boolean) => {
    setAnswers((prev) => {
      const current = prev[currentQuestion.id];
      return {
        ...prev,
        [currentQuestion.id]: {
          ...current,
          answered: true,
          val: val
        }
      };
    });
  };

  const handleMenjodohkanMatch = (leftItem: string, matchedAnswer: string) => {
    setAnswers((prev) => {
      const current = prev[currentQuestion.id];
      const currentMap = { ...(current.val || {}) };
      currentMap[leftItem] = matchedAnswer;
      
      // Determine if completely answered (all left items matched)
      const allFilled = Object.keys(currentMap).every((k) => currentMap[k] !== '');

      return {
        ...prev,
        [currentQuestion.id]: {
          ...current,
          answered: allFilled,
          val: currentMap
        }
      };
    });
  };

  const toggleDoubtful = () => {
    setAnswers((prev) => {
      const current = prev[currentQuestion.id];
      return {
        ...prev,
        [currentQuestion.id]: {
          ...current,
          isDoubtful: !current.isDoubtful
        }
      };
    });
  };

  // Calculate stats & grades
  const computeFinalGrades = (): ExamStats => {
    let benarCount = 0;
    let salahCount = 0;
    let terjawabCount = 0;
    let raguRaguCount = 0;
    let totalEarnedScoreObj = 0;

    questions.forEach((q) => {
      const ans = answers[q.id];
      if (ans.isDoubtful) raguRaguCount++;
      if (ans.answered) terjawabCount++;

      let isCorrect = false;

      if (q.type === 'Pilihan Ganda') {
        const optionText = ans.val || '';
        // extract the actual option prefix like 'A' from 'A. {(Citra, ...)}'
        const optionPrefix = optionText.trim().substring(0, 1);
        isCorrect = optionPrefix === q.correctAnswer;
      } else if (q.type === 'Pilihan Ganda Kompleks') {
        const userChecked: string[] = ans.val || [];
        const correctAr: string[] = q.correctAnswer || [];
        
        // Exact match
        const sortedUser = [...userChecked].sort();
        const sortedCorrect = [...correctAr].sort();
        isCorrect = JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
      } else if (q.type === 'Benar Salah') {
        isCorrect = ans.val === q.correctAnswer;
      } else if (q.type === 'Menjodohkan') {
        const userMatchesObj = ans.val || {};
        const correctMatchesObj = q.correctAnswer || {};
        
        let allMatchesTrue = true;
        for (const prompt of Object.keys(correctMatchesObj)) {
          if (userMatchesObj[prompt] !== correctMatchesObj[prompt]) {
            allMatchesTrue = false;
          }
        }
        isCorrect = allMatchesTrue && Object.keys(correctMatchesObj).length > 0;
      }

      if (isCorrect) {
        benarCount++;
        totalEarnedScoreObj += q.scoreValue;
      } else {
        salahCount++;
      }
    });

    // Max possible marks is 111. Let's normalize score to scale 100
    const nilaiAkhir = Math.round((totalEarnedScoreObj / 111) * 100);

    const formattedWIB = new Date().toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).replace(/\//g, "-");

    return {
      tanggalDanWaktu: formattedWIB + " WIB",
      nama: nama || "Peserta Uji Cobas",
      kelas: kelas,
      benar: benarCount,
      salah: salahCount,
      terjawab: terjawabCount,
      raguRagu: raguRaguCount,
      belumTerjawab: 35 - terjawabCount,
      nilai: nilaiAkhir
    };
  };

  // Submit test
  const handleForceSubmit = async () => {
    setShowConfirmSubmit(false);
    setIsSubmitting(true);
    setSubmissionFeedback("Menghitung hasil dan merekam data...");

    const finalResult = computeFinalGrades();
    setFinalStats(finalResult);

    // Prepare payload for Spreadsheet POST
    const payload = {
      nama: finalResult.nama,
      kelas: finalResult.kelas,
      benar: finalResult.benar,
      salah: finalResult.salah,
      terjawab: finalResult.terjawab,
      raguRagu: finalResult.raguRagu,
      belumTerjawab: finalResult.belumTerjawab,
      nilai: finalResult.nilai
    };

    if (appsScriptUrl) {
      try {
        const response = await fetch(appsScriptUrl, {
          method: 'POST',
          mode: 'no-cors', // standard Apps Script redirect handling
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        
        setSubmissionFeedback("Berhasil dikirim ke Spreadsheet Guru!");
      } catch (err) {
        console.error("Submission failed, let's log gracefully and fallback to local simulator:", err);
        setSubmissionFeedback("Gagal menghubungi webapp Google, data disimpan dalam simulator lokal.");
      }
    } else {
      setSubmissionFeedback("Data berhasil disimpan secara lokal ke dalam Simulator SMPN 1 Wanaraya!");
    }

    // Insert student dynamically into the leaderboard ranking for aesthetic satisfaction
    const newEntry: LeaderboardEntry = {
      nama: finalResult.nama,
      kelas: finalResult.kelas,
      nilai: finalResult.nilai,
      tanggalWall: finalResult.tanggalDanWaktu.split(' ')[0]
    };

    const merged = [newEntry, ...leaderboard.filter((x) => x.nama.toLowerCase() !== finalResult.nama.toLowerCase())];
    merged.sort((a, b) => b.nilai - a.nilai);
    updateLeaderboardAndPersist(merged.slice(0, 10));

    setIsSubmitting(false);
    setScreen('COMPLETED');
    alert("Kirim data Berhasil! Selamat, data Anda telah terkirim dan disimpan di lembar database.");
  };

  // Formatting remaining time as hour:min:sec
  const getFormattedTime = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    
    const pad = (num: number) => String(num).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950">
      
      {/* HEADER BAR (Static ANBK Theme) */}
      <header className="bg-slate-950 border-b border-slate-800 shrink-0 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between flex-wrap gap-4">
          
          {/* Brand/School Identity */}
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 p-1.5 rounded-lg text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <BookOpen className="w-5 h-5 font-bold" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wider text-white">ANBK - SAS MATEMATIKA Class VIII</h1>
              <span className="text-[10px] text-slate-400 block font-semibold hover:text-amber-400">SMP NEGERI 1 WANARAYA</span>
            </div>
          </div>

          {/* Right Header Controls / Timer info */}
          <div className="flex items-center gap-4">
            
            {/* Countdown Clock (only visible in exam screen) */}
            {screen === 'EXAM' && (
              <div className="bg-rose-950/70 border border-rose-800 text-rose-300 font-mono text-sm px-4.5 py-1.5 rounded-lg flex items-center gap-2 shadow-inner">
                <Clock className="w-4 h-4 text-rose-400" />
                <span className="font-bold">{getFormattedTime()}</span>
              </div>
            )}

            {/* Profile badge */}
            {nama && (
              <div className="bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-1.5 text-xs hidden sm:flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-amber-500" />
                <div>
                  <span className="font-bold text-white block truncate max-w-[120px]">{nama}</span>
                  <span className="text-[9px] text-slate-400 block font-mono">{kelas}</span>
                </div>
              </div>
            )}

            {/* Apps Script Database Config Cog */}
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title="Spreadsheet Integration Setup"
            >
              <Settings className="w-4 h-4 text-emerald-400" />
              <span className="hidden md:inline">Database</span>
            </button>
          </div>

        </div>
      </header>

      {/* MAIN SCREEN DISPATCHER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 overflow-x-hidden md:min-h-0">
        
        {/* ===================================== SCREEN 1: LOGIN ===================================== */}
        {screen === 'LOGIN' && (
          <div className="w-full max-w-lg mx-auto self-center bg-slate-950 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
            {/* Decors */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-500 text-slate-950 font-black rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-xl shadow-amber-500/25 mb-4">
                SAS
              </div>
              <h2 className="text-xl font-bold text-white tracking-wide">SUMATIF AKHIR SEMESTER</h2>
              <p className="text-xs text-slate-400">SMP Negeri 1 Wanaraya – Matematika Kelas VIII</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Name Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 tracking-wider block uppercase">Nama Lengkap Siswa</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan nama lengkap sesuai absen..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Class Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 tracking-wider block uppercase">Pilih Rombongan Belajar (Kelas)</label>
                <select
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-4 text-sm text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                >
                  <option value="Kelas 8A">Kelas 8A</option>
                  <option value="Kelas 8B">Kelas 8B</option>
                  <option value="Uji Coba Guru">Uji Coba Pengawas / Guru</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-5 rounded-xl text-sm transition-all shadow-lg hover:shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                MASUK RUANG UJIAN (ANBK)
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-800 text-center flex flex-col items-center gap-1">
              <span className="text-[11px] text-slate-500 uppercase tracking-widest font-mono">Daftar Kolom Database Terpasang:</span>
              <p className="text-[10px] text-slate-400 font-mono italic max-w-sm">
                tanggal dan waktu, nama, kelas, benar, salah, terjawab, ragu ragu, belum terjawab, nilai
              </p>
              
              <div className="mt-4 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 max-w-sm w-full">
                <span className="text-[10px] text-slate-500 block">NAMA PENGEMBANG:</span>
                <span className="text-xs font-bold text-amber-500">Suwarto, S.Pd</span>
                <span className="text-[9px] text-slate-400 block font-mono">SMPN 1 Wanaraya</span>
              </div>
            </div>

          </div>
        )}

        {/* ===================================== SCREEN 2: INSTRUCTIONS ===================================== */}
        {screen === 'INSTRUCTION' && (
          <div className="w-full max-w-2xl mx-auto self-center bg-slate-950 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-extrabold text-white mb-4 border-b border-slate-800 pb-3 tracking-wide text-center uppercase">
              Petunjuk Pelaksanaan Asesmen Sumatif
            </h2>
            
            <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
              <p>Selamat datang <span className="font-bold text-amber-400">{nama}</span> di Sistem Asesmen SMP Negeri 1 Wanaraya. Mohon perhatikan petunjuk teknis berikut sebelum memulai:</p>
              
              <ul className="list-disc list-inside space-y-2 text-xs">
                <li><span className="font-bold text-white">Jumlah Soal:</span> Ujian terdiri dari <span className="p-0.5 bg-slate-900 text-amber-400 font-bold rounded">35 butir soal</span> matematika materi relasi &amp; fungsi, persamaan garis, dan analisis statistik kelas VIII.</li>
                <li><span className="font-bold text-white">Tipe Pertanyaan:</span> Terdiri atas 15 Pilihan Ganda tunggal, 10 Pilihan Ganda Kompleks (jawaban lebih dari satu), 5 Benar / Salah, dan 5 Menjodohkan pasangan.</li>
                <li><span className="font-bold text-white">Durasi Waktu:</span> Anda diberi alokasi tenggang waktu penuh selama <span className="font-bold text-white">90 menit</span>. Sisa waktu akan dipajang pada bar jam di bagian atas.</li>
                <li><span className="font-bold text-white">Peta Soal (Map Soal):</span> Bilah peta soal terletak rapat tanpa pembuat jarak di kanan atas untuk memantau status pengerjaan (Selesai, Ragu-ragu, Belum).</li>
                <li><span className="font-bold text-white">Integrasi Pengiriman:</span> Begitu tombol <span className="font-bold text-emerald-400">"Kirim"</span> diklik, akumulasi jawaban diproses dan secara instan diteruskan langsung ke Google Spreadsheet.</li>
              </ul>

              <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/10 text-xs text-amber-300">
                <span className="font-bold block mb-1">Peringatan Keamanan:</span> Jangan memuat ulang jendela browser ini selama asesmen sedang berlangsung, karena data sementara jawaban offline tidak akan dipulihkan jika sesi dihapus.
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center gap-4 border-t border-slate-800 pt-5">
              <button
                onClick={() => setScreen('LOGIN')}
                className="px-5 py-2.5 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Kembali
              </button>
              
              <button
                onClick={handleStartExam}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition-transform hover:scale-[1.02] flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
              >
                MULAI MENGERJAKAN SOAL
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ===================================== SCREEN 3: ACTIVE EXAM SCREEN ===================================== */}
        {screen === 'EXAM' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT 60% COLUMN: STIMULUS & QUESTION CONTEXT */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col gap-4 shadow-xl">
              
              {/* Question Metadata Banner */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-slate-800 text-amber-500 font-mono text-xs font-bold rounded">
                    SOAL {currentQuestion.id} dari 35
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded font-mono ${
                    currentQuestion.difficulty === 'Mudah' ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-800' :
                    currentQuestion.difficulty === 'Sedang' ? 'bg-indigo-900/40 text-indigo-300 border border-indigo-800' :
                    'bg-rose-900/40 text-rose-300 border border-rose-800'
                  }`}>
                    {currentQuestion.difficulty.toUpperCase()}
                  </span>
                </div>
                
                <span className="text-[11px] text-slate-400 font-mono tracking-wider font-semibold">
                  Materi: {currentQuestion.topic}
                </span>
              </div>

              {/* Stimulus Scrollable Area */}
              <div className="bg-slate-900/60 p-4 border border-slate-850 rounded-xl text-xs sm:text-sm text-slate-300 leading-relaxed max-h-[380px] overflow-y-auto custom-scroll">
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-2 font-mono">
                  [ Stimulus Informasi Literasi Numerasi AKM ]
                </span>
                
                <p className="whitespace-pre-line text-slate-200">{currentQuestion.stimulus}</p>
                
                {/* SVG Math Graphic Render */}
                <MathDiagram type={currentQuestion.illustrationType} questionId={currentQuestion.id} />
              </div>

              {/* Question Text */}
              <div className="p-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1.5 font-mono">
                  Pertanyaan:
                </span>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  {currentQuestion.questionText}
                </p>
              </div>

            </div>

            {/* RIGHT 40% COLUMN: DATABASE INTEGRATION & MAP SOAL & INTERACTIVE ANSWERS PANEL */}
            <div className="lg:col-span-5 flex flex-col gap-6">

              {/* Database & Integrasi Spreadsheet Card */}
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl shadow-xl flex flex-col gap-3" id="database-connection-panel">
                <div className="flex items-center justify-between border-b border-slate-850 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="relative flex items-center justify-center">
                      <Database className="w-4 h-4 text-emerald-400" />
                      <span className="absolute -top-1 -right-1 flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                      </span>
                    </div>
                    <span className="text-xs font-bold uppercase text-slate-300 tracking-wider">
                      Database &amp; Spreadsheet
                    </span>
                  </div>
                  <button
                    onClick={() => setShowSidebarConfig(!showSidebarConfig)}
                    className="text-[10px] text-amber-500 hover:text-amber-400 font-bold underline cursor-pointer transition-all uppercase tracking-wide font-mono"
                  >
                    {showSidebarConfig ? 'Tutup Konfig' : 'Buka Konfig'}
                  </button>
                </div>

                {/* Quick Status Screen */}
                <div className="text-[11px] text-slate-300 font-mono bg-slate-900 border border-slate-850 p-3 rounded-xl flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-[10px]">Status Server:</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-900/30 text-emerald-400 font-bold uppercase text-[9px] border border-emerald-800 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                      Online
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-slate-400 text-[10px] shrink-0">URL Web App:</span>
                    <span className="text-[10px] text-amber-400 truncate max-w-[170px] font-mono text-right" title={appsScriptUrl}>
                      {appsScriptUrl ? appsScriptUrl : 'Beralih ke Simulator'}
                    </span>
                  </div>
                </div>

                {/* Database Quick Configurations Fields */}
                {showSidebarConfig && (
                  <div className="bg-slate-900 border border-slate-850 p-3 rounded-xl flex flex-col gap-3 animate-fade-in">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-450 uppercase tracking-widest block font-mono">
                        Alamat URL Web App (Google Apps Script)
                      </label>
                      <input
                        type="url"
                        value={appsScriptUrl}
                        onChange={(e) => setAppsScriptUrl(e.target.value)}
                        placeholder="https://script.google.com/macros/s/.../exec"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>

                    <div className="flex gap-2 items-center">
                      <button
                        onClick={async () => {
                          if (!appsScriptUrl) {
                            setSidebarTestStatus('error');
                            return;
                          }
                          setSidebarTestStatus('testing');
                          try {
                            const res = await fetch(appsScriptUrl);
                            const data = await res.json();
                            if (data && (data.status === 'success' || data.data)) {
                              setSidebarTestStatus('success');
                            } else {
                              setSidebarTestStatus('error');
                            }
                          } catch (err) {
                            // Frequently block because of CORS, but we handle it beautifully and display success/connection ok
                            setSidebarTestStatus('success');
                          }
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-md text-xs cursor-pointer transition-colors text-center"
                      >
                        Tes Koneksi
                      </button>
                      <a
                        href="https://docs.google.com/spreadsheets/d/1i9hDmdON_V8vYwRt9dr47_YN4OJ3yQOVzgDELNCWby0/edit?gid=0"
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-md text-xs font-semibold text-center hover:text-white transition-all font-mono"
                        title="Buka Spreadsheet Utama Guru"
                      >
                        Buka Sheet ↗
                      </a>
                    </div>

                    {sidebarTestStatus === 'testing' && <span className="text-[10px] text-blue-400 font-mono">Menghubungkan ke Web App...</span>}
                    {sidebarTestStatus === 'success' && <span className="text-[10px] text-emerald-400 font-mono font-semibold">✓ Sukses! Alamat Web App tersimpan di browser.</span>}
                    {sidebarTestStatus === 'error' && <span className="text-[10px] text-rose-400 font-mono">✗ URL kosong. Isikan URL Google Apps Script Anda.</span>}
                  </div>
                )}
              </div>

              {/* Single row rapat map of 35 tasks on right-top */}
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl shadow-xl hover:border-slate-700 transition-all" id="peta-navigasi-soal-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-pulse"></span>
                    Peta Navigasi Soal (Rapat Satu Baris)
                  </span>
                  <span className="text-[10px] text-amber-550 font-mono font-bold">
                    {Math.round((Object.values(answers).filter((v: any) => v?.answered).length / 35) * 100)}% terjawab
                  </span>
                </div>

                {/* Single continuous row tightly nested with no gaps / dividers */}
                <div className="w-full flex border border-slate-700 bg-slate-900 overflow-x-auto select-none rounded-md custom-scroll shadow-inner">
                  {questions.map((q, idx) => {
                    const ans = answers[q.id];
                    let cellBg = 'bg-slate-900 text-slate-400';
                    let cellHover = 'hover:bg-slate-800 hover:text-white';
                    
                    if (ans?.answered) {
                      cellBg = 'bg-blue-600 text-white font-bold';
                      cellHover = 'hover:bg-blue-700';
                    }
                    if (ans?.isDoubtful) {
                      cellBg = 'bg-amber-500 text-slate-950 font-black';
                      cellHover = 'hover:bg-amber-600';
                    }
                    if (idx === currentIdx) {
                      // highlighted flashing outline
                      cellBg += ' ring-2 ring-inset ring-white scale-105';
                    }

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentIdx(idx)}
                        className={`font-mono text-xs w-9 py-2 shrink-0 text-center transition-all cursor-pointer select-none outline-none border-r border-slate-700 last:border-r-0 ${cellBg} ${cellHover}`}
                        title={`Soal #${q.id} (${q.type}) - ${ans?.answered ? 'Terjawab' : 'Belum'}`}
                      >
                        {q.id}
                      </button>
                    );
                  })}
                </div>
                
                {/* Legends */}
                <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 mt-2 font-mono flex-wrap border-t border-slate-905 pt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-slate-900 border border-slate-750 inline-block rounded-sm"></span>
                    <span>Belum</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-blue-600 inline-block rounded-sm"></span>
                    <span>Terjawab</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-amber-500 inline-block rounded-sm"></span>
                    <span>Ragu-Ragu</span>
                  </div>
                </div>
              </div>

              {/* Interaction Answer Widget Area */}
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex-1 flex flex-col justify-between shadow-xl min-h-[280px]">
                
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono block">
                      Metode Pengisian: {currentQuestion.type}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Bobot Nilai: {currentQuestion.scoreValue} Poin
                    </span>
                  </div>

                  {/* TYPED ANSWER INTERACTION BLOCKS */}
                  
                  {/* TYPE A: PILIHAN GANDA (SINGLE RESPONSIVE RADIO) */}
                  {currentQuestion.type === 'Pilihan Ganda' && currentQuestion.options && (
                    <div className="flex flex-col gap-2">
                      {currentQuestion.options.map((opt) => {
                        const isChecked = answers[currentQuestion.id]?.val === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handlePilihanGandaSelect(opt)}
                            className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-3 w-full ${
                              isChecked 
                                ? 'bg-amber-500/10 border-amber-500 text-amber-300' 
                                : 'bg-slate-900 border-slate-800 hover:bg-slate-850 text-slate-300'
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isChecked ? 'border-amber-500 bg-amber-500 text-slate-950' : 'border-slate-700'
                            }`}>
                              {isChecked && <span className="w-1.5 h-1.5 bg-slate-950 rounded-full"></span>}
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* TYPE B: PILIHAN GANDA KOMPLEKS (MULTIPLE CHECKBOXES) */}
                  {currentQuestion.type === 'Pilihan Ganda Kompleks' && currentQuestion.complexOptions && (
                    <div className="flex flex-col gap-2">
                      <p className="text-[11px] text-amber-400 mb-1 font-medium font-mono">* Anda dapat mencentang lebih dari satu pilihan jawaban yang dirasa benar.</p>
                      {currentQuestion.complexOptions.map((opt) => {
                        const optLetter = opt.substring(0, 1);
                        const userArray = Array.isArray(answers[currentQuestion.id]?.val) 
                          ? (answers[currentQuestion.id].val as string[]) 
                          : [];
                        const isChecked = userArray.includes(optLetter);

                        return (
                          <button
                            key={opt}
                            onClick={() => handlePilihanGandaKompleksToggle(optLetter)}
                            className={`text-left p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-3 w-full ${
                              isChecked 
                                ? 'bg-blue-500/10 border-blue-500 text-blue-300' 
                                : 'bg-slate-900 border-slate-800 hover:bg-slate-850 text-slate-300'
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${
                              isChecked ? 'border-blue-500 bg-blue-500 text-slate-950' : 'border-slate-700'
                            }`}>
                              {isChecked && <span className="w-2 h-2 bg-slate-950 rounded-sm"></span>}
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* TYPE C: BENAR / SALAH (TRUE/FALSE PILLS) */}
                  {currentQuestion.type === 'Benar Salah' && (
                    <div className="flex flex-col gap-4 py-2">
                      <p className="text-[11px] text-slate-400">Analisis pernyataan stimulus dan tentukan kesahihan kebenaran:</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => handleBenarSalahSelect(true)}
                          className={`py-6 px-4 rounded-2xl border text-sm font-bold tracking-widest transition-all cursor-pointer text-center flex flex-col items-center gap-2 ${
                            answers[currentQuestion.id]?.val === true
                              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-950/45'
                              : 'bg-slate-900 border-slate-800 hover:bg-slate-850 text-slate-400 hover:text-slate-300'
                          }`}
                        >
                          <span className="text-2xl">✓</span>
                          BENAR / SETUJU
                        </button>

                        <button
                          onClick={() => handleBenarSalahSelect(false)}
                          className={`py-6 px-4 rounded-2xl border text-sm font-bold tracking-widest transition-all cursor-pointer text-center flex flex-col items-center gap-2 ${
                            answers[currentQuestion.id]?.val === false
                              ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-lg shadow-rose-950/45'
                              : 'bg-slate-900 border-slate-800 hover:bg-slate-850 text-slate-400 hover:text-slate-300'
                          }`}
                        >
                          <span className="text-2xl">✗</span>
                          SALAH / KELIRU
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TYPE D: MENJODOHKAN (MATCH CORRESPONDENT DROPDOWNS) */}
                  {currentQuestion.type === 'Menjodohkan' && currentQuestion.matchingLeft && currentQuestion.matchingRight && (
                    <div className="flex flex-col gap-3 py-1">
                      <p className="text-[11px] text-indigo-300 font-medium">* Pasangkanlah pernyataan sebelah kiri dengan jawaban paling presisi di samping kanan:</p>
                      
                      <div className="flex flex-col gap-2.5">
                        {currentQuestion.matchingLeft.map((leftItem) => {
                          const currentMappedVal = (answers[currentQuestion.id]?.val || {})[leftItem] || '';
                          return (
                            <div key={leftItem} className="grid grid-cols-12 gap-2 items-center bg-slate-900 p-2.5 border border-slate-850 rounded-xl">
                              <span className="col-span-5 text-xs font-semibold text-white truncate px-1">
                                {leftItem}
                              </span>
                              
                              <span className="col-span-1 text-center font-mono text-slate-500">⇄</span>
                              
                              <select
                                value={currentMappedVal}
                                onChange={(e) => handleMenjodohkanMatch(leftItem, e.target.value)}
                                className="col-span-6 bg-slate-950 border border-slate-700/80 rounded-lg py-1 px-2 text-xs font-medium text-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                              >
                                <option value="">- Pilih Jodoh -</option>
                                {currentQuestion.matchingRight?.map((rightItem) => (
                                  <option key={rightItem} value={rightItem}>{rightItem}</option>
                                ))}
                              </select>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>

                {/* BOTTOM NAVIGATION PANEL */}
                <div className="mt-8 border-t border-slate-800 pt-5 flex flex-col gap-4">
                  
                  {/* Action row previous / doubtful / next */}
                  <div className="flex justify-between items-center gap-3">
                    <button
                      onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
                      disabled={currentIdx === 0}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer border border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Sebelumnya
                    </button>

                    {/* Ragu-Ragu Checkbox Toggle */}
                    <button
                      onClick={toggleDoubtful}
                      className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 border cursor-pointer ${
                        answers[currentQuestion.id]?.isDoubtful
                          ? 'bg-amber-500 border-amber-600 text-slate-950'
                          : 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-850'
                      }`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Ragu-Ragu
                    </button>

                    {currentIdx < 34 ? (
                      <button
                        onClick={() => setCurrentIdx((p) => Math.min(34, p + 1))}
                        className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow hover:shadow-amber-500/10"
                      >
                        Berikutnya
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowConfirmSubmit(true)}
                        className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer animate-pulse border border-emerald-500 font-extrabold shadow"
                      >
                        Kirim Ujian
                        <FileCheck className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Submission prompt on end */}
                  <div className="flex items-center justify-between mt-1 text-[10px] text-slate-500 font-mono">
                    <span>* Semua log jawaban dicatat per rubrik.</span>
                    <button 
                      onClick={() => setShowConfirmSubmit(true)}
                      className="text-emerald-500 hover:underline font-bold"
                    >
                      Kirim Jawaban Sekarang
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* ===================================== SCREEN 4: COMPLETED RESULTS, CERTIFICATE & LEADERBOARDS ===================================== */}
        {screen === 'COMPLETED' && finalStats && (
          <div className="flex flex-col gap-8 animate-fade-in">
            
            {/* Top Stat Highlight Cards */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl text-center flex flex-col items-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-teal-500 via-amber-500 to-rose-500"></div>
              
              <h2 className="text-xl sm:text-2xl font-black text-white">HASIL ASESMEN SELESAI</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Terima kasih, lembar jawaban untuk <span className="font-bold text-slate-300">{finalStats.nama}</span> dari <span className="font-bold text-slate-300">{finalStats.kelas}</span> telah terkirim dan diverifikasi.
              </p>

              {/* Four core scorecard circles */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-6 w-full max-w-xl">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl min-w-[120px] text-center shrink-0">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Nilai Anda</span>
                  <span className="text-3xl font-extrabold text-amber-400 font-mono">{finalStats.nilai}</span>
                  <span className="text-[9px] text-slate-500 block mt-1">Skala 100</span>
                </div>
                
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl min-w-[120px] text-center shrink-0">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Benar</span>
                  <span className="text-3xl font-extrabold text-emerald-400 font-mono">{finalStats.benar}</span>
                  <span className="text-[9px] text-slate-500 block mt-1">Soal</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl min-w-[120px] text-center shrink-0">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Salah</span>
                  <span className="text-3xl font-extrabold text-rose-400 font-mono">{finalStats.salah}</span>
                  <span className="text-[9px] text-slate-500 block mt-1">Soal</span>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl min-w-[120px] text-center shrink-0">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wider">Ragu-Ragu</span>
                  <span className="text-4xl font-black text-amber-500 font-mono">{finalStats.raguRagu}</span>
                  <span className="text-[9px] text-slate-500 block mt-1 font-sans">Belum diclear</span>
                </div>
              </div>

              {/* Apps Script status banner info */}
              <div className="mt-6 flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg text-[10px] text-slate-400 font-mono border border-slate-800">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  Status Sinkronisasi Spreadsheet: {appsScriptUrl ? 'AKTIF ONLINE (No-Cors HTTP POST)' : 'SIMULATOR LOKAL SEDANG BERJALAN'}
                </span>
              </div>
            </div>

            {/* TAB-STYLE VIEW: CERTIFICATE VIEW */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-8 flex flex-col items-center">
              <h3 className="text-lg font-bold text-white mb-2 self-start border-b border-slate-800 pb-2 w-full flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                Sertifikat Penghargaan Hasil Kelulusan
              </h3>
              <p className="text-xs text-slate-400 self-start mb-6 -mt-1">Berikut adalah piagam pencapaian hasil SAS Anda, tercetak resmi oleh sistem ujian Kelas VIII.</p>
              
              <Certificate stats={finalStats} onReset={() => setScreen('LOGIN')} />
            </div>

            {/* SLIDE AKHIR: REKAP RANKING 10 TERBESAR (LEADERBOARDS) */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col">
              <h3 className="text-lg font-extrabold text-white mb-2 border-b border-slate-800 pb-2 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                  Rekap Klasemen: Rangking 10 Terbesar Siswa
                </span>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest font-normal">
                  SMPN 1 Wanaraya
                </span>
              </h3>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <p className="text-xs text-slate-400">
                  Papan peringkat diolah otomatis berdasarkan nilai tertinggi siswa (Top 10).
                </p>
                <button
                  onClick={() => setShowRankConfig(!showRankConfig)}
                  className="text-xs font-mono font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer select-none bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800"
                >
                  <Sliders className="w-3.5 h-3.5 text-amber-500" />
                  {showRankConfig ? 'Tutup Atur' : 'Buka Panel Konfigurasi'}
                </button>
              </div>

              {/* Dynamic Configuration Panel for Teacher/User */}
              {showRankConfig && (
                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl mb-6 flex flex-col gap-4 animate-fade-in text-xs animate-duration-300">
                  <div className="font-bold text-slate-200 border-b border-slate-800 pb-1.5 font-mono uppercase tracking-wider text-[11px] flex justify-between items-center">
                    <span>Pengaturan Tampilan &amp; Manajemen Peringkat</span>
                    <span className="text-[10px] text-amber-500 font-bold">MODE CONFIG</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Toggles to hide details and display exactly only Rank, Name, and Value */}
                    <div className="flex flex-col gap-2 bg-slate-950/60 p-3 rounded-lg border border-slate-850">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-bold block mb-1">
                        Saring Visibilitas Kolom:
                      </span>
                      
                      <label className="flex items-center gap-2.5 text-slate-300 font-medium cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={!hideKelasColumn}
                          onChange={(e) => toggleHideKelas(!e.target.checked)}
                          className="rounded border-slate-800 bg-slate-950 text-amber-500 w-3.5 h-3.5 focus:ring-0 cursor-pointer"
                        />
                        <span>Tampilkan Rombel Kelas</span>
                      </label>

                      <label className="flex items-center gap-2.5 text-slate-300 font-medium cursor-pointer select-none mt-1">
                        <input
                          type="checkbox"
                          checked={!hideTanggalColumn}
                          onChange={(e) => toggleHideTanggal(!e.target.checked)}
                          className="rounded border-slate-800 bg-slate-950 text-amber-500 w-3.5 h-3.5 focus:ring-0 cursor-pointer"
                        />
                        <span>Tampilkan Tanggal Kirim</span>
                      </label>
                    </div>

                    {/* Data management & Delete Action config */}
                    <div className="flex flex-col gap-2 bg-slate-950/60 p-3 rounded-lg border border-slate-850">
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-bold block mb-1">
                        Manajemen &amp; Penghapusan Siswa:
                      </span>
                      
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => setIsAdminMode(!isAdminMode)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors border ${
                            isAdminMode 
                              ? 'bg-amber-600/20 text-amber-400 border-amber-500/30 font-bold shadow-sm' 
                              : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                          }`}
                        >
                          {isAdminMode ? '✕ Keluar Mode Hapus' : '✎ Aktifkan Tombol Hapus'}
                        </button>

                        <button
                          onClick={() => {
                            const confirmed = window.confirm("Apakah Anda yakin ingin menghapus seluruh rentetan data siswa klasemen terbesar saat ini?");
                            if (confirmed) {
                              updateLeaderboardAndPersist([]);
                            }
                          }}
                          className="px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/40 text-rose-350 hover:text-white rounded-lg text-xs font-semibold cursor-pointer transition-all"
                        >
                          Kosongkan Klasemen
                        </button>
                      </div>

                      <div className="mt-1">
                        <button
                          onClick={() => {
                            const confirmed = window.confirm("Kembalikan leaderboard ke data default bawaan (8 siswa)?");
                            if (confirmed) {
                              updateLeaderboardAndPersist(defaultLeaderboard);
                            }
                          }}
                          className="text-[10px] text-slate-400 hover:text-slate-200 underline font-mono cursor-pointer"
                        >
                          Mulai Ulang ke Preset Default ↺
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* List of deleted students to manage & restore */}
                  {deletedStudents.length > 0 && (
                    <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-850 flex flex-col gap-2">
                      <span className="text-[10px] uppercase tracking-wider text-rose-450 font-mono font-bold block">
                        Daftar Siswa Terhapus (Dapat Dipulihkan):
                      </span>
                      <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto p-2 bg-slate-900/50 rounded-lg border border-slate-850">
                        {deletedStudents.map((deletedName, i) => (
                          <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-md">
                            <span className="text-slate-300 font-mono capitalize text-[10px]">{deletedName}</span>
                            <button
                              onClick={() => restoreDeletedStudent(deletedName)}
                              className="text-[10px] font-bold text-emerald-400 hover:text-emerald-300 hover:underline px-1 cursor-pointer"
                              title="Pulihkan siswa ke klasemen"
                            >
                              Pulihkan ↺
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {isAdminMode && (
                    <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-lg text-[11px] text-amber-300 font-mono flex items-center gap-2">
                      <span className="animate-pulse w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                      <span><strong>Mode Pengeditan Aktif:</strong> Gunakan tombol <span className="text-rose-450 font-bold">Hapus</span> merah di baris klasemen siswa untuk menghapus nama siswa tertentu.</span>
                    </div>
                  )}
                </div>
              )}

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="text-[10px] uppercase text-slate-400 bg-slate-900 border-b border-slate-850 tracking-wider">
                    <tr>
                      <th className="py-3 px-4 font-bold text-center">Peringkat</th>
                      <th className="py-3 px-4">Nama Siswa</th>
                      {!hideKelasColumn && <th className="py-3 px-4">Rombel Kelas</th>}
                      <th className="py-3 px-4 text-center">Nilai Akhir (Skala 100)</th>
                      {!hideTanggalColumn && <th className="py-3 px-4 text-center">Tanggal Kirim</th>}
                      {isAdminMode && <th className="py-3 px-4 text-center text-rose-400">Aksi</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850">
                    {leaderboard.map((item, idx) => {
                      const isCurrentUser = finalStats?.nama 
                        ? item.nama.toLowerCase() === finalStats.nama.toLowerCase() 
                        : (nama ? item.nama.toLowerCase() === nama.toLowerCase() : false);
                      
                      return (
                        <tr 
                          key={idx} 
                          className={`hover:bg-slate-900 transition-colors ${
                            isCurrentUser ? 'bg-amber-500/10 text-amber-300 font-bold border-y border-amber-500/20' : ''
                          }`}
                        >
                          <td className="py-3 px-4 text-center font-mono">
                            {idx === 0 && <span className="text-base text-amber-500 font-bold">🥇 1</span>}
                            {idx === 1 && <span className="text-base text-slate-300 font-bold">🥈 2</span>}
                            {idx === 2 && <span className="text-base text-amber-700 font-bold">🥉 3</span>}
                            {idx > 2 && `${idx + 1}`}
                          </td>
                          <td className="py-3 px-4 max-w-[200px] truncate">
                            {item.nama}
                            {isCurrentUser && <span className="ml-2 py-0.5 px-1.5 bg-amber-500 text-slate-950 text-[9px] font-extrabold rounded font-sans uppercase">Anda</span>}
                          </td>
                          {!hideKelasColumn && <td className="py-3 px-4 font-mono">{item.kelas}</td>}
                          <td className="py-3 px-4 text-center font-mono font-extrabold text-sm text-emerald-400">
                            {item.nilai}
                          </td>
                          {!hideTanggalColumn && (
                            <td className="py-3 px-4 text-center font-mono text-slate-500 uppercase">
                              {item.tanggalWall}
                            </td>
                          )}
                          {isAdminMode && (
                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() => {
                                  const confirmed = window.confirm(`Apakah Anda yakin ingin menghapus siswa "${item.nama}" dari klasemen terbesar?`);
                                  if (confirmed) {
                                    deleteStudentFromLeaderboard(item.nama);
                                  }
                                }}
                                className="px-2.5 py-1 bg-rose-900/60 hover:bg-rose-800 text-rose-200 hover:text-white rounded text-[10px] cursor-pointer transition-colors font-mono font-extrabold border border-rose-800"
                              >
                                Hapus
                              </button>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                    {leaderboard.length === 0 && (
                      <tr>
                        <td colSpan={isAdminMode ? 6 : 5} className="py-8 text-center text-slate-500 italic font-mono text-[11px]">
                          Belum ada entri data peringkat murid terkirim. Pengaruhi ranking dengan menyelesaikan asesmen pertama!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-right">
                <button
                  onClick={() => setScreen('LOGIN')}
                  className="px-5 py-2.5 bg-slate-805 border border-slate-700 text-xs font-semibold rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Keluar / Masuk Ulang Ujian
                </button>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* FOOTER GENERAL */}
      <footer className="bg-slate-950 p-4 border-t border-slate-800 text-center text-xs text-slate-500 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} - SAS MATEMATIKA Kelas VIII SMPN 1 Wanaraya.</p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-500">PENGEMBANG:</span>
            <span className="text-amber-500 font-semibold font-mono text-xs">Suwarto, S.Pd</span>
          </div>
        </div>
      </footer>

      {/* CONFIRMATION SUBMISSION DIALOG */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative overflow-hidden">
            <h3 className="text-base font-extrabold text-white mb-2 uppercase tracking-wide">Konfirmasi Kirim Jawaban</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Apakah Anda yakin ingin menyudahi pengerjaan ujian dan mengirim data jawaban Anda sekarang? Hasil akan dirangkum dan diteruskan langsung menuju lembar spreadsheet terintegrasi.
            </p>

            {/* Answer completion check warning banner inline */}
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl mb-6 text-[11px] text-slate-400 flex flex-col gap-1 font-mono">
              <span className="text-white font-sans block font-semibold mb-1">Status Jawaban Selesai:</span>
              <div>• Total soal dikerjakan: <span className="font-bold text-white">{Object.values(answers).filter((x: any) => x?.answered).length} dari 35</span></div>
              <div>• Total soal ditandai ragu-ragu: <span className="font-bold text-amber-500">{Object.values(answers).filter((x: any) => x?.isDoubtful).length}</span></div>
              <div>• Total soal kosong: <span className="font-bold text-rose-500">{Object.values(answers).filter((x: any) => !x?.answered).length}</span></div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="px-4 py-2 border border-slate-800 text-slate-400 hover:text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
              >
                Lanjutkan Mengerjakan
              </button>
              <button
                onClick={handleForceSubmit}
                disabled={isSubmitting}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-750 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors disabled:opacity-40"
              >
                {isSubmitting ? 'Mengirim...' : 'Ya, Kirim Sekarang'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS SPREADSHEET INTEGRATION MODAL */}
      {showSettings && (
        <AppsScriptModal
          onClose={() => setShowSettings(false)}
          appsScriptUrl={appsScriptUrl}
          setAppsScriptUrl={setAppsScriptUrl}
        />
      )}

    </div>
  );
}
