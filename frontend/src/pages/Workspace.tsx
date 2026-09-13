import { useState } from 'react';

interface FileState {
  name: string;
  size: string;
  respondents: number;
}

export default function Workspace() {
  // File upload state
  const [file1, setFile1] = useState<FileState | null>(null);
  const [file2, setFile2] = useState<FileState | null>(null);

  // Execution state
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [logs, setLogs] = useState<string[]>([
    'Menunggu kedua file Excel siap untuk diproses...',
  ]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const response = await fetch("http://127.0.0.1:8000/api/profile", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    console.log(data);
  };

  const handleSimulateProcess = () => {
    setStatus('processing');
    setLogs([
      'Memulai pipeline penggabungan multi-sheet...',
      'Membaca File 1: Mendeteksi responden aktif (89 KK)...',
      'Membaca File 2: Mendeteksi responden aktif (125 KK)...',
      'Memetakan 77 sheet unik secara berurutan...',
      'Membangun tabel pivot & menyambung nomor KK (90 s/d 214)...',
      'Menyematkan 15 kolom cadangan (lebar 7.0)...',
      'Menanam formula aktif (=SUM, =DLM%, =AVERAGE)...',
      'Mengunci Freeze Panes pada baris dan kolom klasifikasi...',
      'Membuat diagram batang di 77 sheet...',
      'Selesai! File berhasil digabungkan dalam 12.4 detik.',
    ]);

    setTimeout(() => {
      setStatus('success');
    }, 1800);
  };

  const handleReset = () => {
    setStatus('idle');
    setLogs(['Menunggu file Excel baru...']);
  };

  return (
    <section id="workspace" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
      <div className="relative border-4 border-black shadow-hard p-5 sm:p-8 md:p-10 overflow-hidden">
        {/* Header Title */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            Pusat Penggabungan Data Survei
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-1">
            Masukkan 2 file Excel tabulasi survei dengan format kuesioner yang seragam.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Dropzone Grid */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6 sm:mb-8">
            {/* Slot File 1 */}
            <input
              type="file"
              name="file_excel_1"
              accept=".xlsx, .xls"
              className='border-4 border-black shadow-hard w-full h-[20vh] cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-hover active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all'
            />

            {/* Merge Divider */}
            <div className="flex md:flex-col items-center justify-center my-1 md:my-0">
              <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-black shadow-hard flex items-center justify-center font-bold text-xl text-excel-primary">
                +
              </div>
            </div>

            {/* Slot File 2 */}
            <input
              type="file"
              name="file_excel_2"
              accept=".xlsx, .xls"
              className='border-4 border-black shadow-hard w-full h-[20vh] cursor-pointer hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-hover active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all'
            />
          </div>

          {/* Config Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between flex-wrap gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3.5 sm:p-4 mb-6 sm:mb-8 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-2 flex-wrap">
              <label className="text-slate-500 font-medium">Arah Gabung:</label>
              <select className="bg-white border border-slate-200 px-2.5 py-1 rounded-md font-semibold text-excel-dark">
                <option value="horizontal">Horizontal (Kolom Responden)</option>
                <option value="vertical">Vertical (Baris Responden)</option>
              </select>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <label className="text-slate-500 font-medium">Kolom Tambahan:</label>
              <select className="bg-white border border-slate-200 px-2.5 py-1 rounded-md font-semibold text-excel-dark">
                <option value="15">+15 Kolom Input (Lebar 7.0)</option>
                <option value="10">+10 Kolom Input (Lebar 7.0)</option>
                <option value="5">+5 Kolom Input (Lebar 7.0)</option>
              </select>
            </div>
          </div>

          {/* Execution Button */}
          <div>
            {status !== 'success' ? (
              <button
                type='submit'
                onClick={handleSimulateProcess}
                disabled={status === 'processing'}
                className={`w-full py-4 px-6 border-4 border-black shadow-hard bg-excel-primary hover:from-excel-primary-hover hover:to-excel-dark text-white font-bold text-base sm:text-lg flex items-center justify-center gap-3 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-hover active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all 
                  ${status === 'processing' ? 'cursor-wait bg-yellow-600 text-white' : 'cursor-pointer'}
                `}
              >
                {status === 'processing' ? (
                  <>
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
                    <span>Sedang Memproses 77 Sheet &amp; Membangun Formula...</span>
                  </>
                ) : (
                  <>
                    <span>Gabungkan 2 File Excel</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="w-full py-4 px-6 border-4 border-black shadow-hard bg-gradient-to-r from-excel-primary to-excel-primary-hover hover:from-excel-primary-hover hover:to-excel-dark text-white font-bold text-base sm:text-lg flex items-center justify-center gap-3 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-hover active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all cursor-pointer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Unduh Hasil Gabungan: hasil_gabungan_pivot.xlsx (Selesai!)</span>
              </button>
            )}
          </div>
        </form>

        {/* Real-time Execution Feed */}
        <div className={`mt-5 sm:mt-6 bg-slate-950 border border-slate-800 p-4 font-mono text-xs sm:text-[13px] text-slate-400 max-h-40 overflow-y-auto space-y-1.5 shadow-inner ${status === 'idle' ? 'hidden' : ''}`}>
          {logs.map((log, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2 ${idx === logs.length - 1 && status === 'success'
                ? 'text-emerald-400 font-semibold'
                : 'text-white'
                }`}
            >
              <span className="text-green-300 select-none">[{new Date().toLocaleTimeString()}]</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div >
    </section >
  );
}
