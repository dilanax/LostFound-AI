// src/pages/FoundForm.jsx
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../api";

/* eslint-disable react/prop-types */
export default function FoundForm({ goHome }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    foundLocation: "",
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
      await axios.post(`${API_URL}/api/found`, form);
      alert("Found item posted successfully!");
      setForm({
        title: "",
        category: "",
        foundLocation: "",
        description: "",
        imageUrl: "",
      });
      goHome?.();
    } catch (err) {
      console.error(err);
      alert("Error posting found item. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-1">Report a Found Item</h2>
      <p className="text-sm text-slate-400 mb-6">
        Help someone get their belongings back. Be honest and clear.
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
            placeholder="e.g. Smartphone with blue cover"
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
            placeholder="phone, wallet, bag, keys..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Found Location</label>
          <input
            name="foundLocation"
            value={form.foundLocation}
            onChange={handleChange}
            placeholder="Where did you find it?"
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Image URL (optional)</label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/item.jpg"
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe the item and any unique details..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/70"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg px-4 py-2 text-sm font-medium bg-emerald-500 hover:bg-emerald-400 text-slate-950 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Found Item"}
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
