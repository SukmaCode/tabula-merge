export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-6 sm:py-8 text-xs sm:text-sm text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div>
          <strong className="text-slate-800 font-semibold">TabulaMerge</strong> &mdash; Multi-Sheet Survey Consolidation Engine
        </div>
        <div>
          Ditenagai oleh <strong className="text-slate-700 font-medium">FastAPI Backend</strong> + <strong className="text-slate-700 font-medium">React &amp; Tailwind CSS</strong>
        </div>
      </div>
    </footer>
  );
}
