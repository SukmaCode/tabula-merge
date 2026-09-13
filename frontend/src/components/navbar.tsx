import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menu = [
        {
            name: 'Workspace',
            href: '#workspace',
        },
        {
            name: 'Simulasi Tabel',
            href: '#preview-tabel',
        },
        {
            name: 'Mengapa Power Query Gagal',
            href: '#kenapa-beda',
        },
        {
            name: 'Arsitektur',
            href: '#cara-kerja',
        },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-4 border-t-4 border-black transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-18">
                    {/* Brand Logo */}
                    <a href="#" className="flex items-center gap-3 group text-decoration-none">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-excel-primary to-excel-primary-hover flex items-center justify-center text-white font-extrabold text-lg shadow-sm shadow-emerald-800/30 transition-transform group-hover:scale-105 flex-shrink-0">
                            X
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight group-hover:text-excel-primary transition-colors">
                                TabulaMerge
                            </h1>
                            <span className="text-[10px] sm:text-[11px] font-regular text-slate-800 uppercase block truncate max-w-[190px] sm:max-w-none">
                                Multi-Sheet Survey Consolidation Engine
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                        {menu.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-sm text-slate-800 hover:text-excel-primary transition-colors"
                            >
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    {/* Mobile Hamburger Button */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            type="button"
                            className="p-2 rounded-lg text-slate-800 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-excel-primary"
                            aria-label="Toggle Navigation Menu"
                        >
                            {isMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-3 border-t border-slate-200 flex flex-col gap-2">
                        {menu.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-sm font-medium text-slate-800 hover:text-excel-primary transition-colors"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
}