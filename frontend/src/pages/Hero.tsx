import Card from "../components/card";
export default function Hero() {
    const statsBar = [
        {
            header: '77+',
            subheader: 'Sheet Terproses Sekaligus',
        },
        {
            header: '100%',
            subheader: 'Formula Excel Dinamis Aktif',
        },
        {
            header: '0 Kesalahan',
            subheader: 'Geser Kolom / Rusak Baris',
        },
        {
            header: '< 15 dtk',
            subheader: 'Waktu Pengerjaan Total',
        }
    ]
    return (
        <section className="py-10 sm:py-16 lg:py-16 text-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Title */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold tracking-tight text-slate-900 leading-[1.18] max-w-4xl mx-auto mb-5 sm:mb-6">
                    Satukan 2 File Excel dengan <br className="hidden sm:inline" />
                    <span className="text-white bg-excel-primary px-6 border-2 border-black shadow-hard relative inline-block">
                        Puluhan Sheet
                        <span className="absolute bottom-1 left-0 w-full h-2.5 bg-emerald-400/25 -z-1 rounded-sm"></span>
                    </span>{' '}
                    Secara Otomatis.
                </h2>

                {/* Hero Description */}
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                    Menggabungkan data ratusan responden di 77+ sheet tabel kuesioner tanpa copy-paste manual.
                    Menyambung nomor KK, mempertahankan kode responden, formula persentase, freeze panes,
                    dan grafik batang dalam hitungan detik.
                </p>

                {/* Hero Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-12 sm:mb-16">
                    <a
                        href="#workspace"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 border-2 border-black bg-excel-primary hover:bg-excel-primary-hover text-white font-bold text-sm sm:text-base shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-hover active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all cursor-pointer"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        Mulai Gabungkan File Sekarang
                    </a>
                    <a
                        href="#preview-tabel"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-black bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm sm:text-base shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-hover active:translate-x-[5px] active:translate-y-[5px] active:shadow-none transition-all cursor-pointer"
                    >
                        Lihat Perbandingan Tabel
                    </a>
                </div>

                {/* Key Metrics / Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border border-slate-200/80 p-5 sm:p-7">
                    {statsBar.map((item) => (
                        <Card
                            key={item.header}
                            header={item.header}
                            subheader={item.subheader}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
