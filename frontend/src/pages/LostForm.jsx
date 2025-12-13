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
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("category", form.category);
      data.append("lastSeenLocation", form.lastSeenLocation);
      data.append("description", form.description);

      // field name MUST match backend: upload.single("image")
      if (imageFile) data.append("image", imageFile);

      await axios.post(`${API_URL}/api/lost`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Lost item reported successfully!");
      setForm({
        title: "",
        category: "",
        lastSeenLocation: "",
        description: "",
      });
      setImageFile(null);
      setPreview("");
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
        Add details and upload a real image (from your phone/PC).
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

        {/* ✅ REAL IMAGE UPLOAD */}
        <div>
          <label className="block text-sm mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-emerald-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-950 hover:file:bg-emerald-400"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-full h-48 object-cover rounded-xl border border-slate-800"
            />
          )}

          <p className="text-xs text-slate-500 mt-1">
            Max 5MB. (We are saving locally now; later we can use Cloudinary)
          </p>
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Details like color, brand, unique marks..."
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
