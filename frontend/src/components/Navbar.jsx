// src/components/Navbar.jsx
/* eslint-disable react/prop-types */
export default function Navbar({ currentPage, onChangePage }) {
  const baseBtn =
    "px-4 py-2 rounded-full text-sm font-medium transition hover:bg-slate-800";
  const active = "bg-slate-900 text-emerald-400";
  const inactive = "bg-slate-800/40 text-slate-200";

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center text-emerald-300 font-bold">
            LF
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              AI Lost &amp; Found
            </h1>
            <p className="text-xs text-slate-400">
              Connect lost items with their owners
            </p>
          </div>
        </div>

        <nav className="flex gap-2">
          <button
            className={`${baseBtn} ${
              currentPage === "home" ? active : inactive
            }`}
            onClick={() => onChangePage("home")}
          >
            Home
          </button>
          <button
            className={`${baseBtn} ${
              currentPage === "lost" ? active : inactive
            }`}
            onClick={() => onChangePage("lost")}
          >
            Report Lost
          </button>
          <button
            className={`${baseBtn} ${
              currentPage === "found" ? active : inactive
            }`}
            onClick={() => onChangePage("found")}
          >
            Report Found
          </button>
        </nav>
      </div>
    </header>
  );
}
