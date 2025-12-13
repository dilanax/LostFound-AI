import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import LostForm from "./pages/LostForm.jsx";
import FoundForm from "./pages/FoundForm.jsx";

export default function App() {
  const [page, setPage] = useState("home");
  const [refreshKey, setRefreshKey] = useState(0);

  const goHomeAndRefresh = () => {
    setPage("home");
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar currentPage={page} onChangePage={setPage} />
      <main className="max-w-6xl mx-auto px-4 py-6">
        {page === "home" && <Home refreshKey={refreshKey} />}
        {page === "lost" && <LostForm goHome={goHomeAndRefresh} />}
        {page === "found" && <FoundForm goHome={goHomeAndRefresh} />}
      </main>
    </div>
  );
}
