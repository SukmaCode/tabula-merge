import { useState } from 'react';

type SheetType = 'AGAMA' | 'PEKERJAAN' | 'ASI';

export default function Spreadsheet() {
  // Preview interactive tab
  const [activeSheet, setActiveSheet] = useState<SheetType>('AGAMA');
  const sheetSelectorTabs: { id: SheetType; name: string }[] = [
    {
      id: 'AGAMA',
      name: 'AGAMA',
    },
    {
      id: 'PEKERJAAN',
      name: 'PEKERJAAN',
    },
    {
      id: 'ASI',
      name: 'ASI (Sub-Klasifikasi)',
    },
  ];

  return (
    <section id="preview-tabel" className="w-full max-w-7xl mx-auto min-w-0 px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
      {/* Section Head */}
      <div className="text-center mb-8 sm:mb-10">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Contoh Struktur Tabel Hasil Penggabungan
        </h3>
        <p className="text-sm sm:text-base text-slate-500 mt-2">
          Melihat bagaimana format 3 baris header bertingkat, freeze panes, dan formula tertata rapi.
        </p>
      </div>

      {/* Spreadsheet Card */}
      <div className="w-full max-w-full border-4 border-black shadow-hard overflow-hidden">
        {/* Ribbon Header */}
        <div className="bg-excel-primary text-white px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
            <span>Sheet: {activeSheet} &mdash; Matrix Gabungan</span>
          </div>
          <div className="bg-white/20 px-2.5 py-0.5 rounded text-[11px] sm:text-xs font-medium tracking-wide">
            Hasil Gabungan (214 KK + 15 Kolom Tambahan)
          </div>
        </div>

        {/* Sheet Selector Tabs */}
        <div className="bg-slate-100 border-b border-slate-200 px-3 sm:px-6 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {sheetSelectorTabs.map(({ id, name }) => (
              <button
                key={id}
                onClick={() => setActiveSheet(id)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${activeSheet === id
                  ? 'bg-white text-excel-primary border-r-4 border-b-4 border-excel-primary'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="hidden lg:block text-slate-500 font-mono text-[11px] pb-1">
            Freeze Panes: C4 (Kolom NO &amp; KLASIFIKASI terkunci di kiri)
          </div>
        </div>

        {/* Live Table Mockup with Scroll */}
        <div className="w-full max-w-full overflow-x-auto bg-slate-50/50">
          <table className="w-full border-collapse font-mono text-xs border border-slate-300 bg-white select-none">
            <thead>
              {/* Baris 1: Kode Responden */}
              <tr className="bg-white text-slate-600 text-[11px]">
                <td className="sticky left-0 bg-slate-50 z-10 border border-slate-300 w-12 min-w-12"></td>
                <td className="sticky left-12 bg-slate-50 z-10 border border-slate-300 min-w-[140px] sm:min-w-[180px]"></td>
                {activeSheet === 'ASI' && (
                  <td className="border border-slate-300 bg-slate-50 min-w-[100px] sm:min-w-[120px]"></td>
                )}
                <td className="border border-slate-300 px-3 py-1 text-center min-w-[55px]">01/Za</td>
                <td className="border border-slate-300 px-3 py-1 text-center min-w-[55px]">01/Sa</td>
                <td className="border border-slate-300 px-3 py-1 text-center min-w-[40px]">...</td>
                <td className="border border-slate-300 px-3 py-1 text-center min-w-[55px]">26/Za</td>
                <td className="border border-slate-300 px-3 py-1 text-center min-w-[55px] font-bold text-excel-primary bg-excel-tint">01/ar</td>
                <td className="border border-slate-300 px-3 py-1 text-center min-w-[55px]">01/at</td>
                <td className="border border-slate-300 px-3 py-1 text-center min-w-[40px]">...</td>
                <td className="border border-slate-300 px-3 py-1 text-center min-w-[55px]">38/at</td>
                <td className="border border-slate-300 px-3 py-1 text-center min-w-[65px] text-slate-400">(tambahan)</td>
                <td className="border border-slate-300 px-3 py-1 text-center min-w-[65px] text-slate-400">(tambahan)</td>
                <td className="border border-slate-300 px-3 py-1 min-w-[110px]"></td>
                <td className="border border-slate-300 px-3 py-1 min-w-[100px]"></td>
              </tr>

              {/* Baris 2: Header JUMLAH KK & Kolom Vertikal */}
              <tr className="text-slate-900 font-bold">
                <th rowSpan={2} className="sticky left-0 bg-excel-header-blue2 z-20 border border-slate-300 px-2 py-1.5 text-center w-12 min-w-12">
                  NO
                </th>
                <th rowSpan={2} className="sticky left-12 bg-excel-header-blue2 z-20 border border-slate-300 px-3 py-1.5 text-left min-w-[140px] sm:min-w-[180px]">
                  KLASIFIKASI
                </th>
                {activeSheet === 'ASI' && (
                  <th rowSpan={2} className="border border-slate-300 bg-excel-header-blue2 px-3 py-1.5 text-left min-w-[100px] sm:min-w-[120px]">
                    SUB-KLASIFIKASI
                  </th>
                )}
                <th colSpan={10} className="bg-excel-header-blue1 border border-slate-300 px-3 py-1.5 text-center text-blue-950 font-bold">
                  JUMLAH KK (Gabungan File 1 + File 2 + 15 Kolom Cadangan)
                </th>
                <th rowSpan={2} className="bg-excel-header-blue2 border border-slate-300 px-3 py-1.5 text-center min-w-[110px]">
                  JUMLAH
                </th>
                <th rowSpan={2} className="bg-excel-header-blue2 border border-slate-300 px-3 py-1.5 text-center min-w-[100px]">
                  DLM%
                </th>
              </tr>

              {/* Baris 3: Nomor KK */}
              <tr className="bg-excel-header-blue2 text-slate-800 font-bold text-center">
                <th className="border border-slate-300 px-2 py-1">1</th>
                <th className="border border-slate-300 px-2 py-1">2</th>
                <th className="border border-slate-300 px-2 py-1">...</th>
                <th className="border border-slate-300 px-2 py-1 bg-excel-col-f1">89</th>
                <th className="border border-slate-300 px-2 py-1 bg-excel-col-f2-bg text-excel-col-f2-text">90</th>
                <th className="border border-slate-300 px-2 py-1 bg-excel-col-f2-bg text-excel-col-f2-text">91</th>
                <th className="border border-slate-300 px-2 py-1">...</th>
                <th className="border border-slate-300 px-2 py-1 bg-excel-col-f2-bg text-excel-col-f2-text">214</th>
                <th className="border border-slate-300 px-2 py-1 bg-excel-col-backup-bg text-excel-col-backup-text">215</th>
                <th className="border border-slate-300 px-2 py-1 bg-excel-col-backup-bg text-excel-col-backup-text">229</th>
              </tr>
            </thead>

            <tbody>
              {activeSheet === 'AGAMA' && (
                <>
                  <tr className="hover:bg-slate-50 text-center">
                    <td className="sticky left-0 bg-white z-10 border border-slate-300 px-2 py-1.5 font-bold">1</td>
                    <td className="sticky left-12 bg-white z-10 border border-slate-300 px-3 py-1.5 text-left font-medium">ISLAM</td>
                    <td className="border border-slate-300 px-2 py-1.5">1</td>
                    <td className="border border-slate-300 px-2 py-1.5">1</td>
                    <td className="border border-slate-300 px-2 py-1.5">...</td>
                    <td className="border border-slate-300 px-2 py-1.5">1</td>
                    <td className="border border-slate-300 px-2 py-1.5">1</td>
                    <td className="border border-slate-300 px-2 py-1.5">1</td>
                    <td className="border border-slate-300 px-2 py-1.5">...</td>
                    <td className="border border-slate-300 px-2 py-1.5">1</td>
                    <td className="border border-slate-300 px-2 py-1.5 text-slate-300">-</td>
                    <td className="border border-slate-300 px-2 py-1.5 text-slate-300">-</td>
                    <td className="border border-slate-300 px-3 py-1.5 bg-excel-formula-bg text-excel-formula-text font-bold text-left">=SUM(C4:HW4) [214]</td>
                    <td className="border border-slate-300 px-3 py-1.5 bg-excel-formula-bg text-excel-formula-text font-bold text-left">=HX4/229 [93%]</td>
                  </tr>
                  <tr className="hover:bg-slate-50 text-center">
                    <td className="sticky left-0 bg-white z-10 border border-slate-300 px-2 py-1.5 font-bold">2</td>
                    <td className="sticky left-12 bg-white z-10 border border-slate-300 px-3 py-1.5 text-left font-medium">KRISTEN</td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5">...</td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5">...</td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5 text-slate-300">-</td>
                    <td className="border border-slate-300 px-2 py-1.5 text-slate-300">-</td>
                    <td className="border border-slate-300 px-3 py-1.5 bg-excel-formula-bg text-excel-formula-text font-bold text-left">=SUM(C5:HW5) [0]</td>
                    <td className="border border-slate-300 px-3 py-1.5 bg-excel-formula-bg text-excel-formula-text font-bold text-left">=HX5/229 [0%]</td>
                  </tr>
                  <tr className="hover:bg-slate-50 text-center">
                    <td className="sticky left-0 bg-white z-10 border border-slate-300 px-2 py-1.5 font-bold">3</td>
                    <td className="sticky left-12 bg-white z-10 border border-slate-300 px-3 py-1.5 text-left font-medium">KATOLIK</td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5">...</td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5">...</td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5 text-slate-300">-</td>
                    <td className="border border-slate-300 px-2 py-1.5 text-slate-300">-</td>
                    <td className="border border-slate-300 px-3 py-1.5 bg-excel-formula-bg text-excel-formula-text font-bold text-left">=SUM(C6:HW6) [0]</td>
                    <td className="border border-slate-300 px-3 py-1.5 bg-excel-formula-bg text-excel-formula-text font-bold text-left">=HX6/229 [0%]</td>
                  </tr>
                </>
              )}

              {activeSheet === 'PEKERJAAN' && (
                <>
                  <tr className="hover:bg-slate-50 text-center">
                    <td className="sticky left-0 bg-white z-10 border border-slate-300 px-2 py-1.5 font-bold">1</td>
                    <td className="sticky left-12 bg-white z-10 border border-slate-300 px-3 py-1.5 text-left font-medium">PNS</td>
                    <td className="border border-slate-300 px-2 py-1.5">1</td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5">...</td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5">1</td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5">...</td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5 text-slate-300">-</td>
                    <td className="border border-slate-300 px-2 py-1.5 text-slate-300">-</td>
                    <td className="border border-slate-300 px-3 py-1.5 bg-excel-formula-bg text-excel-formula-text font-bold text-left">=SUM(C4:HW4) [18]</td>
                    <td className="border border-slate-300 px-3 py-1.5 bg-excel-formula-bg text-excel-formula-text font-bold text-left">=HX4/229 [8%]</td>
                  </tr>
                  <tr className="hover:bg-slate-50 text-center">
                    <td className="sticky left-0 bg-white z-10 border border-slate-300 px-2 py-1.5 font-bold">2</td>
                    <td className="sticky left-12 bg-white z-10 border border-slate-300 px-3 py-1.5 text-left font-medium">WIRASWASTA</td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5">1</td>
                    <td className="border border-slate-300 px-2 py-1.5">...</td>
                    <td className="border border-slate-300 px-2 py-1.5">1</td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5">1</td>
                    <td className="border border-slate-300 px-2 py-1.5">...</td>
                    <td className="border border-slate-300 px-2 py-1.5">1</td>
                    <td className="border border-slate-300 px-2 py-1.5 text-slate-300">-</td>
                    <td className="border border-slate-300 px-2 py-1.5 text-slate-300">-</td>
                    <td className="border border-slate-300 px-3 py-1.5 bg-excel-formula-bg text-excel-formula-text font-bold text-left">=SUM(C5:HW5) [120]</td>
                    <td className="border border-slate-300 px-3 py-1.5 bg-excel-formula-bg text-excel-formula-text font-bold text-left">=HX5/229 [52%]</td>
                  </tr>
                </>
              )}

              {activeSheet === 'ASI' && (
                <>
                  <tr className="hover:bg-slate-50 text-center">
                    <td rowSpan={2} className="sticky left-0 bg-white z-10 border border-slate-300 px-2 py-1.5 font-bold">1</td>
                    <td rowSpan={2} className="sticky left-12 bg-white z-10 border border-slate-300 px-3 py-1.5 text-left font-medium">Pemberian ASI</td>
                    <td className="border border-slate-300 px-3 py-1.5 text-left font-medium">Ya</td>
                    <td className="border border-slate-300 px-2 py-1.5">1</td>
                    <td className="border border-slate-300 px-2 py-1.5">1</td>
                    <td className="border border-slate-300 px-2 py-1.5">...</td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5">1</td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5">...</td>
                    <td className="border border-slate-300 px-2 py-1.5">1</td>
                    <td className="border border-slate-300 px-2 py-1.5 text-slate-300">-</td>
                    <td className="border border-slate-300 px-2 py-1.5 text-slate-300">-</td>
                    <td className="border border-slate-300 px-3 py-1.5 bg-excel-formula-bg text-excel-formula-text font-bold text-left">=SUM(D4:HX4) [42]</td>
                    <td className="border border-slate-300 px-3 py-1.5 bg-excel-formula-bg text-excel-formula-text font-bold text-left">=HY4/229 [18%]</td>
                  </tr>
                  <tr className="hover:bg-slate-50 text-center">
                    <td className="border border-slate-300 px-3 py-1.5 text-left font-medium">Tidak</td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5">...</td>
                    <td className="border border-slate-300 px-2 py-1.5">1</td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5">1</td>
                    <td className="border border-slate-300 px-2 py-1.5">...</td>
                    <td className="border border-slate-300 px-2 py-1.5"></td>
                    <td className="border border-slate-300 px-2 py-1.5 text-slate-300">-</td>
                    <td className="border border-slate-300 px-2 py-1.5 text-slate-300">-</td>
                    <td className="border border-slate-300 px-3 py-1.5 bg-excel-formula-bg text-excel-formula-text font-bold text-left">=SUM(D5:HX5) [12]</td>
                    <td className="border border-slate-300 px-3 py-1.5 bg-excel-formula-bg text-excel-formula-text font-bold text-left">=HY5/229 [5%]</td>
                  </tr>
                </>
              )}

              {/* Baris Total Warna Emas */}
              <tr className="bg-excel-total-gold text-black font-extrabold text-center">
                <td colSpan={activeSheet === 'ASI' ? 3 : 2} className="sticky left-0 bg-excel-total-gold z-20 border border-slate-400 px-3 py-2 text-center">
                  TOTAL
                </td>
                <td className="border border-slate-400 px-2 py-1"></td>
                <td className="border border-slate-400 px-2 py-1"></td>
                <td className="border border-slate-400 px-2 py-1">...</td>
                <td className="border border-slate-400 px-2 py-1"></td>
                <td className="border border-slate-400 px-2 py-1"></td>
                <td className="border border-slate-400 px-2 py-1"></td>
                <td className="border border-slate-400 px-2 py-1">...</td>
                <td className="border border-slate-400 px-2 py-1"></td>
                <td className="border border-slate-400 px-2 py-1"></td>
                <td className="border border-slate-400 px-2 py-1"></td>
                <td className="border border-slate-400 px-3 py-2 text-left">=SUM(HX4:HX8)</td>
                <td className="border border-slate-400 px-3 py-2 text-left">=AVERAGE(HY4:HY8)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Note info bar */}
        <div className="flex items-center gap-2 bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-3 text-xs text-slate-500">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-excel-primary flex-shrink-0">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
          <span>Diagram batang (Bar Chart) otomatis disisipkan di sebelah kanan tabel dengan sumbu proporsional 0% s/d 100%.</span>
        </div>
      </div>
    </section>
  );
}
