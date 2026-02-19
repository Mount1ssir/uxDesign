import React, { useState } from "react";

export default function ReviewSystem({ onSubmit }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(0);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!author.trim()) return setError("Please enter your name.");
    if (selected === 0) return setError("Please select a star rating.");
    if (comment.trim().length < 10) return setError("Comment must be at least 10 characters.");

    onSubmit({ author: author.trim(), stars: selected, comment: comment.trim() });
    setAuthor("");
    setComment("");
    setSelected(0);
    setHovered(0);
    setError("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const starLabel = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
        <span className="text-2xl">✍️</span> Write a Review
      </h3>

      {/* Star selector */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-600 mb-2">Your Rating</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setSelected(s)}
              className={`text-3xl transition-all duration-150 hover:scale-125 ${
                s <= (hovered || selected) ? "text-amber-400" : "text-gray-200"
              }`}
            >
              ★
            </button>
          ))}
          {(hovered || selected) > 0 && (
            <span className="ml-3 text-sm font-semibold text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
              {starLabel[hovered || selected]}
            </span>
          )}
        </div>
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-600 mb-1.5">Your Name</label>
        <input
          type="text"
          value={author}
          onChange={(e) => { setAuthor(e.target.value); setError(""); }}
          placeholder="e.g. Alex M."
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
        />
      </div>

      {/* Comment */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-600 mb-1.5">Your Review</label>
        <textarea
          value={comment}
          onChange={(e) => { setComment(e.target.value); setError(""); }}
          placeholder="Share your experience with this teacher..."
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all resize-none"
        />
        <div className="flex justify-end mt-1">
          <span className={`text-xs ${comment.length < 10 ? "text-gray-400" : "text-green-500"}`}>
            {comment.length} chars {comment.length < 10 ? `(${10 - comment.length} more needed)` : "✓"}
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
          <span>⚠️</span> {error}
        </div>
      )}

      {success && (
        <div className="mb-4 flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-2.5">
          <span>✅</span> Review submitted! Thank you for your feedback.
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-indigo-200 shadow-indigo-100"
      >
        Submit Review
      </button>
    </div>
  );
}
