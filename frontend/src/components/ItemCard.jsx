// src/components/ItemCard.jsx
/* eslint-disable react/prop-types */
export default function ItemCard({
  item,
  type,
  onMatchClick,
  highlight = false,
}) {
  const isLost = type === "lost";
  return (
    <div
      className={`rounded-xl border p-4 bg-slate-900/70 border-slate-800 shadow-sm ${
        highlight ? "ring-2 ring-emerald-400/70" : ""
      }`}
    >
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="font-semibold text-slate-50">
            {item.title || "Untitled item"}
          </h3>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {item.category || "uncategorized"} •{" "}
            {isLost ? "Lost" : "Found"} item
          </p>
        </div>
        <span className="text-[10px] px-2 py-1 rounded-full bg-slate-800 text-slate-300">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      </div>

      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="mt-3 h-40 w-full object-cover rounded-lg border border-slate-800/80"
        />
      )}

      <p className="mt-2 text-sm text-slate-300 line-clamp-3">
        {item.description || "No description provided."}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {isLost ? "Last seen at" : "Found at"}:{" "}
        <span className="text-slate-200">
          {item.lastSeenLocation || item.foundLocation || "Not specified"}
        </span>
      </p>

      {isLost && onMatchClick && (
        <button
          className="mt-3 inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full bg-emerald-500/90 hover:bg-emerald-400 text-slate-950"
          onClick={() => onMatchClick(item._id)}
        >
          🔍 Find Matches
        </button>
      )}
    </div>
  );
}
