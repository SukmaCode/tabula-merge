export default function Feature() {
  const pillarCard = [
    {
      icon: "🔍",
      title: "Deteksi Baris KK Cerdas",
      description: "Tidak bergantung pada posisi baris tertentu. Mendeteksi sel teks header (JUMLAH KK) atau deretan angka responden secara dinamis.",
    },
    {
      icon: "🔢",
      title: "Penomoran Sambung Otomatis",
      description: "Menghitung responden aktif File 1 (1–89), lalu otomatis memetakan responden File 2 menjadi (90–214) tanpa ada data yang tertimpa.",
    },
    {
      icon: "📊",
      title: "Formula Persentase Valid (≤ 100%)",
      description: "Menggunakan =AVERAGE pada baris DLM% TOTAL agar akumulasi persentase responden tidak melebihi 100% saat dihitung bertingkat.",
    },
    {
      icon: "❄️",
      title: "Freeze Panes Terkunci di Sisi Kiri",
      description: "Kolom NO dan KLASIFIKASI tetap terlihat saat tabel digeser ke samping kanan melintasi 229 kolom responden.",
    },
  ]
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
        {pillarCard.map((pillar) => (
          <div key={pillar.title} className="bg-white border-4 border-black shadow-hard p-6 sm:p-7 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-hover transition-all group">
            <div className="w-12 h-12 rounded-xl bg-excel-tint border border-excel-tint-border text-excel-primary flex items-center justify-center text-2xl mb-4 group-hover:scale-105 transition-transform">
              {pillar.icon}
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              {pillar.title}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
