import React from "react";

const subjectColors = {
  Mathematics: "bg-blue-100 text-blue-700",
  "Computer Science": "bg-violet-100 text-violet-700",
  Literature: "bg-amber-100 text-amber-700",
  Physics: "bg-teal-100 text-teal-700",
  History: "bg-rose-100 text-rose-700",
};

const subjectIcons = {
  Mathematics: "∑",
  "Computer Science": "⌘",
  Literature: "✦",
  Physics: "⚛",
  History: "⏳",
};

const avatarColors = [
  "from-indigo-400 to-purple-500",
  "from-violet-400 to-fuchsia-500",
  "from-amber-400 to-orange-500",
  "from-teal-400 to-cyan-500",
  "from-rose-400 to-pink-500",
];

export default function TeacherCard({ teacher, onClick }) {
  const colorClass = subjectColors[teacher.subject] || "bg-gray-100 text-gray-700";
  const avatarGradient = avatarColors[(teacher.id - 1) % avatarColors.length];
  const initials = teacher.name
    .split(" ")
    .filter((p) => p !== "Dr." && p !== "Prof." && p !== "Ms." && p !== "Mr.")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  const stars = Math.round(teacher.rating);

  return (
    <div
      onClick={() => onClick(teacher)}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Top accent bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${avatarGradient}`} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-white text-xl font-bold shadow-lg flex-shrink-0`}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-gray-900 text-lg leading-tight truncate">
                {teacher.name}
              </h3>
              {teacher.rating > 4.5 && (
                <span
                  className="text-lg"
                  title="Top Rated Teacher"
                >
                  🥇
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-xl">{subjectIcons[teacher.subject] || "📚"}</span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${colorClass}`}>
                {teacher.subject}
              </span>
            </div>
          </div>
        </div>

        {/* Info pills */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
            <span className="text-sm">📍</span>
            <span className="text-sm text-gray-600 font-medium truncate">{teacher.city}</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
            <span className="text-sm">🎂</span>
            <span className="text-sm text-gray-600 font-medium">Age {teacher.age}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                className={`text-lg ${s <= stars ? "text-amber-400" : "text-gray-200"}`}
              >
                ★
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-gray-900">
              {teacher.rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {teacher.reviews.length} review{teacher.reviews.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-6 pb-5">
        <div className="w-full text-center text-sm font-semibold text-indigo-600 bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white rounded-xl py-2.5 transition-all duration-300">
          View Profile →
        </div>
      </div>
    </div>
  );
}
