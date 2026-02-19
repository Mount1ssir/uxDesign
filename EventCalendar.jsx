import React, { useState } from "react";

const eventTypeConfig = {
  exam: { label: "Exam Prep", color: "bg-red-100 text-red-700 border-red-200", icon: "📝" },
  office: { label: "Office Hours", color: "bg-blue-100 text-blue-700 border-blue-200", icon: "🚪" },
  workshop: { label: "Workshop", color: "bg-purple-100 text-purple-700 border-purple-200", icon: "🔬" },
  study: { label: "Study Session", color: "bg-green-100 text-green-700 border-green-200", icon: "📖" },
  lecture: { label: "Lecture", color: "bg-amber-100 text-amber-700 border-amber-200", icon: "🎓" },
};

export default function EventCalendar({ events, onAddEvent }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("study");
  const [error, setError] = useState("");

  const sorted = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleAdd = () => {
    if (!title.trim()) return setError("Event title is required.");
    if (!date) return setError("Please pick a date.");
    if (!time) return setError("Please pick a time.");
    onAddEvent({ title: title.trim(), date, time, type });
    setTitle(""); setDate(""); setTime(""); setType("study"); setError(""); setShowForm(false);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <span className="text-2xl">📅</span> Upcoming Events
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-all"
        >
          {showForm ? "✕ Cancel" : "+ Add Event"}
        </button>
      </div>

      {/* Add event form */}
      {showForm && (
        <div className="mb-5 bg-gray-50 border border-gray-200 rounded-2xl p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Event Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => { setTitle(e.target.value); setError(""); }}
                placeholder="e.g. Final Exam Review"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => { setDate(e.target.value); setError(""); }}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => { setTime(e.target.value); setError(""); }}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Type</label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(eventTypeConfig).map(([key, cfg]) => (
                  <button
                    key={key}
                    onClick={() => setType(key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      type === key
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
                    }`}
                  >
                    {cfg.icon} {cfg.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {error && (
            <p className="text-xs text-red-500 mb-3 flex items-center gap-1"><span>⚠️</span>{error}</p>
          )}
          <button
            onClick={handleAdd}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all"
          >
            Add to Calendar
          </button>
        </div>
      )}

      {/* Events list */}
      {sorted.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <div className="text-4xl mb-2">📭</div>
          <p className="text-gray-400 font-medium text-sm">No events scheduled yet.</p>
          <p className="text-gray-300 text-xs mt-1">Add the first event above!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((event) => {
            const cfg = eventTypeConfig[event.type] || eventTypeConfig.study;
            return (
              <div
                key={event.id}
                className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-4 hover:border-indigo-200 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-xl flex-shrink-0">
                  {cfg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{event.title}</p>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      📅 {formatDate(event.date)}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      🕐 {event.time}
                    </span>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.color} flex-shrink-0`}>
                  {cfg.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
