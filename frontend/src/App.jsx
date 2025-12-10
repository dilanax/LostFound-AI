// src/App.jsx
import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import LostForm from "./pages/LostForm.jsx";
import FoundForm from "./pages/FoundForm.jsx";

function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    if (page === "lost") return <LostForm goHome={() => setPage("home")} />;
    if (page === "found") return <FoundForm goHome={() => setPage("home")} />;
    return <Home />;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar currentPage={page} onChangePage={setPage} />
      <main className="max-w-6xl mx-auto px-4 py-6">{renderPage()}</main>
    </div>
  );
}

export default App;
