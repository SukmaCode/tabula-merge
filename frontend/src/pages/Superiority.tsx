export default function Superiority() {
  return (
    <section id="kenapa-beda" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
      <div className="text-center mb-8 sm:mb-12">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Mengapa Fitur Bawaan Excel Gagal?
        </h3>
        <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-xl mx-auto">
          Fitur bawaan Power Query (<em>Combine &amp; Load</em>) dirancang untuk tabel datar sederhana, bukan tabulasi survei multi-sheet.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Fail Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 border-l-4 border-l-red-500 shadow-sm flex flex-col justify-between">
          <div>
            <span className="inline-block px-3 py-1 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs font-bold mb-3">
              Excel Power Query (Combine &amp; Load)
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
              Keterbatasan Fitur Bawaan Excel
            </h4>
            <ul className="space-y-3.5 text-slate-600 text-sm sm:text-[14.5px]">
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-extrabold flex-shrink-0 text-base leading-tight">&#10005;</span>
                <span><strong>Hanya 1 Sheet per Proses:</strong> Pengguna harus membuat dan menghubungkan 77 query manual satu per satu.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-extrabold flex-shrink-0 text-base leading-tight">&#10005;</span>
                <span><strong>Arah Gabung Salah (Ke Bawah):</strong> Excel menumpuk baris ke bawah (<em>append rows</em>), bukan menambah kolom responden ke samping.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-extrabold flex-shrink-0 text-base leading-tight">&#10005;</span>
                <span><strong>Merusak Header Bertingkat:</strong> Sel yang di-merge vertikal (Baris 1&ndash;3) dibaca sebagai data korup (<em>null / error</em>).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-extrabold flex-shrink-0 text-base leading-tight">&#10005;</span>
                <span><strong>Tidak Ada Rumus &amp; Grafik:</strong> Tidak dapat menanam rumus aktif <code>=SUM</code> atau diagram batang di 77 sheet secara otomatis.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Success Card */}
        <div className="bg-gradient-to-b from-white to-emerald-50/30 rounded-2xl p-6 sm:p-8 border border-slate-200 border-l-4 border-l-excel-primary shadow-sm flex flex-col justify-between">
          <div>
            <span className="inline-block px-3 py-1 rounded-md bg-excel-tint border border-excel-tint-border text-excel-dark text-xs font-bold mb-3">
              TabulaMerge Engine (Aplikasi Ini)
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
              Kelebihan Mesin TabulaMerge
            </h4>
            <ul className="space-y-3.5 text-slate-600 text-sm sm:text-[14.5px]">
              <li className="flex items-start gap-2.5">
                <span className="text-excel-primary font-extrabold flex-shrink-0 text-base leading-tight">&#10003;</span>
                <span><strong>Looping Otomatis 77 Sheet:</strong> Sekali klik, seluruh sheet kuesioner diproses serentak tanpa sisa.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-excel-primary font-extrabold flex-shrink-0 text-base leading-tight">&#10003;</span>
                <span><strong>Sambung Kolom Responden Dinamis:</strong> Otomatis menghitung N1 dan melanjutkan nomor urut responden File 2.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-excel-primary font-extrabold flex-shrink-0 text-base leading-tight">&#10003;</span>
                <span><strong>Rekonstruksi Header 3 Tingkat:</strong> Membangun ulang header bertingkat dengan border, alignment, dan fill rapi.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-excel-primary font-extrabold flex-shrink-0 text-base leading-tight">&#10003;</span>
                <span><strong>Formula, Freeze Panes &amp; Grafik:</strong> Seluruh sheet dilengkapi formula reaktif, kolom terkunci, dan grafik visual siap pakai.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
