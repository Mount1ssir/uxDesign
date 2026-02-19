import React from "react";
import ReviewSystem from "./ReviewSystem";
import EventCalendar from "./EventCalendar";

const avatarColors = [
  "from-indigo-400 to-purple-500",
  "from-violet-400 to-fuchsia-500",
  "from-amber-400 to-orange-500",
  "from-teal-400 to-cyan-500",
  "from-rose-400 to-pink-500",
];

const subjectIcons = {
  Mathematics: "∑",
  "Computer Science": "⌘",
  Literature: "✦",
  Physics: "⚛",
  History: "⏳",
};

export default function TeacherProfile({ teacher, onBack, onReviewSubmit, onEventAdd }) {
  const avatarGradient = avatarColors[(teacher.id - 1) % avatarColors.length];
  const initials = teacher.name
    .split(" ")
    .filter((p) => !["Dr.", "Prof.", "Ms.", "Mr."].includes(p))
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  const avgRating = teacher.reviews.length
    ? (teacher.reviews.reduce((s, r) => s + r.stars, 0) / teacher.reviews.length).toFixed(1)
    : teacher.rating.toFixed(1);

  const ratingDist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: teacher.reviews.filter((r) => r.stars === star).length,
    pct: teacher.reviews.length
      ? Math.round((teacher.reviews.filter((r) => r.stars === star).length / teacher.reviews.length) * 100)
      : 0,
  }));

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 mb-6 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Teachers
      </button>

      {/* Hero card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-6">
        <div className={`h-32 bg-gradient-to-r ${avatarGradient} relative`}>
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: "radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}
          />
        </div>
        <div className="px-8 pb-8">
          <div className="flex flex-wrap items-end gap-5 -mt-10 mb-5">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-white text-2xl font-extrabold shadow-xl border-4 border-white`}>
              {initials}
            </div>
            <div className="pb-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-extrabold text-gray-900">{teacher.name}</h1>
                {teacher.rating > 4.5 && (
                  <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1 rounded-full text-sm font-bold">
                    🥇 Top Rated
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl">{subjectIcons[teacher.subject] || "📚"}</span>
                <span className="text-gray-500 font-medium">{teacher.subject}</span>
              </div>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { icon: "📍", label: "City", value: teacher.city },
              { icon: "🎂", label: "Age", value: teacher.age },
              { icon: "📞", label: "Phone", value: teacher.phone },
              { icon: "✉️", label: "Email", value: teacher.email },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <span>{item.icon}</span>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{item.label}</span>
                </div>
                <p className="text-sm font-semibold text-gray-800 truncate">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Rating summary */}
          <div className="flex flex-wrap gap-8 items-center">
            <div className="text-center">
              <div className="text-5xl font-extrabold text-gray-900">{avgRating}</div>
              <div className="flex items-center gap-0.5 mt-1 justify-center">
                {[1,2,3,4,5].map((s) => (
                  <span key={s} className={`text-xl ${s <= Math.round(Number(avgRating)) ? "text-amber-400" : "text-gray-200"}`}>★</span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1">{teacher.reviews.length} reviews</p>
            </div>
            <div className="flex-1 min-w-40 space-y-1.5">
              {ratingDist.map(({ star, count, pct }) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 w-4 text-right">{star}</span>
                  <span className="text-amber-400 text-xs">★</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-6">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reviews */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <span className="text-2xl">💬</span> Student Reviews
          </h3>

          {teacher.reviews.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <div className="text-4xl mb-2">🌟</div>
              <p className="text-gray-500 font-medium">No reviews yet—be the first!</p>
              <p className="text-gray-300 text-xs mt-1">Share your experience below.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {[...teacher.reviews].reverse().map((review) => (
                <div key={review.id} className="bg-white border border-gray-100 rounded-2xl p-4 hover:border-indigo-100 transition-all">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{review.author}</p>
                      {review.date && (
                        <p className="text-xs text-gray-400">
                          {new Date(review.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      {[1,2,3,4,5].map((s) => (
                        <span key={s} className={`text-sm ${s <= review.stars ? "text-amber-400" : "text-gray-200"}`}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          <ReviewSystem onSubmit={onReviewSubmit} />
        </div>

        {/* Events */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
          <EventCalendar events={teacher.events} onAddEvent={onEventAdd} />
        </div>
      </div>
    </div>
  );
}
