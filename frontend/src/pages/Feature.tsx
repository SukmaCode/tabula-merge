export default function Feature() {
  return (
    <section id="cara-kerja" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
      <div className="text-center mb-8 sm:mb-12">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Arsitektur &amp; Kemampuan Khusus
        </h3>
        <p className="text-sm sm:text-base text-slate-500 mt-2 max-w-xl mx-auto">
          Didesain secara presisi untuk standarisasi format data survei kesehatan dan sosial.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {/* Pillar 1 */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 hover:shadow-md hover:border-excel-tint-border hover:-translate-y-0.5 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-excel-tint border border-excel-tint-border text-excel-primary flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform">
            🔍
          </div>
          <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
            Deteksi Baris KK Cerdas
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            Tidak bergantung pada posisi baris tertentu. Mendeteksi sel teks header (<code className="text-excel-dark bg-slate-100 px-1 py-0.5 rounded text-xs">JUMLAH KK</code>) atau deretan angka responden secara dinamis.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 hover:shadow-md hover:border-excel-tint-border hover:-translate-y-0.5 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-excel-tint border border-excel-tint-border text-excel-primary flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform">
            🔢
          </div>
          <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
            Penomoran Sambung Otomatis
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            Menghitung responden aktif File 1 (1–89), lalu otomatis memetakan responden File 2 menjadi (90–214) tanpa ada data yang tertimpa.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 hover:shadow-md hover:border-excel-tint-border hover:-translate-y-0.5 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-excel-tint border border-excel-tint-border text-excel-primary flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform">
            📊
          </div>
          <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
            Formula Persentase Valid (&le; 100%)
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            Menggunakan <code className="text-excel-dark bg-slate-100 px-1 py-0.5 rounded text-xs">=AVERAGE</code> pada baris DLM% TOTAL agar akumulasi persentase responden tidak melebihi 100% saat dihitung bertingkat.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 hover:shadow-md hover:border-excel-tint-border hover:-translate-y-0.5 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-excel-tint border border-excel-tint-border text-excel-primary flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform">
            ❄️
          </div>
          <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
            Freeze Panes Terkunci di Sisi Kiri
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            Kolom NO dan KLASIFIKASI tetap terlihat saat tabel digeser ke samping kanan melintasi 229 kolom responden.
          </p>
        </div>
      </div>
    </section>
  );
}
