// src/pages/Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Package, Sparkles } from "lucide-react";
import { API_URL } from "../api";
import ItemCard from "../components/ItemCard.jsx";

/* eslint-disable react/prop-types */
export default function Home({ refreshKey = 0 }) {

    useEffect(() => {
    fetchItems();
  }, [refreshKey]);
  
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchResult, setMatchResult] = useState(null);
  const [matchLoading, setMatchLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const [lostRes, foundRes] = await Promise.all([
        axios.get(`${API_URL}/api/lost`),
        axios.get(`${API_URL}/api/found`),
      ]);

      setLostItems(lostRes.data || []);
      setFoundItems(foundRes.data || []);
    } catch (err) {
      console.error("Error fetching items:", err);
      alert("Error fetching items from server");
    } finally {
      setLoading(false);
    }
  };

  // ✅ re-fetch whenever refreshKey changes
  useEffect(() => {
    fetchItems();
  }, [refreshKey]);

  const handleFindMatches = async (lostId) => {
    setMatchLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/match/${lostId}`);
      setMatchResult(res.data);
    } catch (err) {
      console.error("Error finding matches:", err);
      alert("Error finding matches");
    } finally {
      setMatchLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-300 font-medium">
                AI-Powered Matching
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Lost &amp; Found
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 mt-2">
                Made Simple
              </span>
            </h1>

            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Report items you&apos;ve lost or found, and let our smart system help match them.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-1">{lostItems.length}</div>
              <div className="text-xs text-slate-400">Lost Items</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">{foundItems.length}</div>
              <div className="text-xs text-slate-400">Found Items</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">0</div>
              <div className="text-xs text-slate-400">Matches Made</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">100%</div>
              <div className="text-xs text-slate-400">Free to Use</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent mb-4" />
            <p className="text-slate-400">Loading items...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Lost Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <Search className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Lost Items</h3>
                    <p className="text-xs text-slate-500">Help find these items</p>
                  </div>
                </div>
                <span className="bg-red-500/10 text-red-400 text-xs font-semibold px-3 py-1 rounded-full">
                  {lostItems.length} items
                </span>
              </div>

              {lostItems.length === 0 ? (
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 text-center">
                  <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500">No lost items yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {lostItems.map((item) => (
                    <ItemCard
                      key={item._id}
                      item={item}
                      type="lost"
                      onMatchClick={handleFindMatches}
                      highlight={matchResult && matchResult.lost?._id === item._id}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Found Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Package className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Found Items</h3>
                    <p className="text-xs text-slate-500">Waiting to be claimed</p>
                  </div>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full">
                  {foundItems.length} items
                </span>
              </div>

              {foundItems.length === 0 ? (
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 text-center">
                  <Package className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500">No found items yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {foundItems.map((item) => (
                    <ItemCard key={item._id} item={item} type="found" />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
