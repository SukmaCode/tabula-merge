import Navbar from './components/navbar';
import Hero from './pages/Hero';
import Workspace from './pages/Workspace';
import Spreadsheet from './pages/Spreadsheet';
import Superiority from './pages/Superiority';
import Feature from './pages/Feature';
import Footer from './components/footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col w-full max-w-full overflow-x-clip bg-bg-main text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">

      {/* ── TOP NAVIGATION ── */}
      <Navbar />

      {/* ── HERO SECTION ── */}
      <Hero />

      {/* ── WORKSPACE (INTERACTIVE UPLOAD & MERGE ZONE) ── */}
      <Workspace />

      {/* ── SPREADSHEET MOCKUP VISUALIZER (ANTI-SLOP DEMO) ── */}
      <Spreadsheet />

      {/* ── WHY NATIVE EXCEL POWER QUERY FAILS (THE TECHNICAL TRUTH) ── */}
      <Superiority />

      {/* ── 4 PILLARS FEATURE SECTION ── */}
      <Feature />

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}
