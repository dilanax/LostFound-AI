// src/pages/LostForm.jsx
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../api";

/* eslint-disable react/prop-types */
export default function LostForm({ goHome }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    lastSeenLocation: "",
    description: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/lost`, form);
      alert("Lost item reported successfully!");
      setForm({
        title: "",
        category: "",
        lastSeenLocation: "",
        description: "",
        imageUrl: "",
      });
      goHome?.();
    } catch (err) {
      console.error(err);
      alert("Error reporting lost item. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-1">Report a Lost Item</h2>
      <p className="text-sm text-slate-400 mb-6">
        Add as many details as possible so people can help find it.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 max-w-xl bg-slate-900/70 border border-slate-800 rounded-2xl p-5"
      >
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Black wallet with red stripe"
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="wallet, phone, bag, pet..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Last Seen Location</label>
          <input
            name="lastSeenLocation"
            value={form.lastSeenLocation}
            onChange={handleChange}
            placeholder="Colombo Fort Station, SLIIT Malabe..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Image URL (optional)</label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
          />
          <p className="text-xs text-slate-500 mt-1">
            Later we can add real file upload (Cloudinary).
          </p>
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Details like color, brand, unique marks, contents..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg px-4 py-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-400 text-slate-950 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Lost Report"}
          </button>
          <button
            type="button"
            onClick={goHome}
            className="rounded-lg px-4 py-2 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
