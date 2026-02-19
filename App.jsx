import React, { useState } from "react";
import { teachers as initialTeachers } from "./data/teachers";
import TeacherCard from "./components/TeacherCard";
import TeacherProfile from "./components/TeacherProfile";

const ALL_SUBJECTS = ["All", ...Array.from(new Set(initialTeachers.map((t) => t.subject))).sort()];
const ALL_CITIES = ["All", ...Array.from(new Set(initialTeachers.map((t) => t.city))).sort()];

export default function App() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  const filtered = teachers
    .filter((t) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.city.toLowerCase().includes(q);
      const matchSubject = subjectFilter === "All" || t.subject === subjectFilter;
      const matchCity = cityFilter === "All" || t.city === cityFilter;
      return matchSearch && matchSubject && matchCity;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviews.length - a.reviews.length;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const handleReviewSubmit = (review) => {
    setTeachers((prev) =>
      prev.map((t) => {
        if (t.id !== selected.id) return t;
        const newReviews = [
          ...t.reviews,
          { ...review, id: Date.now(), date: new Date().toISOString().split("T")[0] },
        ];
        const newRating = newReviews.reduce((s, r) => s + r.stars, 0) / newReviews.length;
        return { ...t, reviews: newReviews, rating: Math.round(newRating * 10) / 10 };
      })
    );
    setSelected((prev) => {
      const updated = teachers.find((t) => t.id === prev.id);
      if (!updated) return prev;
      const newReviews = [
        ...updated.reviews,
        { ...review, id: Date.now(), date: new Date().toISOString().split("T")[0] },
      ];
      const newRating = newReviews.reduce((s, r) => s + r.stars, 0) / newReviews.length;
      return { ...updated, reviews: newReviews, rating: Math.round(newRating * 10) / 10 };
    });
  };

  const handleEventAdd = (event) => {
    setTeachers((prev) =>
      prev.map((t) => {
        if (t.id !== selected.id) return t;
        return { ...t, events: [...t.events, { ...event, id: Date.now() }] };
      })
    );
    setSelected((prev) => ({
      ...prev,
      events: [...prev.events, { ...event, id: Date.now() }],
    }));
  };

  const handleCardClick = (teacher) => {
    const fresh = teachers.find((t) => t.id === teacher.id) || teacher;
    setSelected(fresh);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'DM Sans', 'Nunito', sans-serif" }}>
      {/* Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Serif+Display&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        h1, h2 { font-family: 'DM Serif Display', serif; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => setSelected(null)}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-extrabold text-lg">
                E
              </div>
              <div>
                <span className="text-xl font-extrabold text-gray-900 tracking-tight">EduReview</span>
                <span className="hidden sm:inline text-xs font-medium text-gray-400 ml-2 bg-gray-100 px-2 py-0.5 rounded-full">
                  Teacher Rating Portal
                </span>
              </div>
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="text-indigo-600 font-bold">{teachers.length}</span> Teachers
              <span className="text-gray-300">·</span>
              <span className="text-indigo-600 font-bold">
                {teachers.reduce((s, t) => s + t.reviews.length, 0)}
              </span>{" "}
              Reviews
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selected ? (
          <TeacherProfile
            teacher={selected}
            onBack={() => setSelected(null)}
            onReviewSubmit={handleReviewSubmit}
            onEventAdd={handleEventAdd}
          />
        ) : (
          <>
            {/* Hero */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                Find Your Perfect Teacher
              </h1>
              <p className="text-gray-500 text-lg max-w-xl mx-auto">
                Honest reviews from real students. Discover the educators who make a difference.
              </p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
              <div className="flex flex-wrap gap-3 items-center">
                {/* Search */}
                <div className="relative flex-1 min-w-52">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, subject, city..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50"
                  />
                </div>

                {/* Subject filter */}
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 cursor-pointer"
                >
                  {ALL_SUBJECTS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>

                {/* City filter */}
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 cursor-pointer"
                >
                  {ALL_CITIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 cursor-pointer"
                >
                  <option value="rating">Sort: Top Rated</option>
                  <option value="reviews">Sort: Most Reviewed</option>
                  <option value="name">Sort: Name A–Z</option>
                </select>

                {/* Reset */}
                {(search || subjectFilter !== "All" || cityFilter !== "All") && (
                  <button
                    onClick={() => { setSearch(""); setSubjectFilter("All"); setCityFilter("All"); }}
                    className="text-sm text-red-500 hover:text-red-700 font-semibold px-3 py-2.5 rounded-xl hover:bg-red-50 transition-all"
                  >
                    ✕ Reset
                  </button>
                )}
              </div>

              {/* Active filters summary */}
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs text-gray-400">
                  Showing <span className="font-bold text-indigo-600">{filtered.length}</span> of{" "}
                  {teachers.length} teachers
                </span>
                {filtered.filter((t) => t.rating > 4.5).length > 0 && (
                  <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full font-medium">
                    🥇 {filtered.filter((t) => t.rating > 4.5).length} top rated
                  </span>
                )}
              </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔭</div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">No teachers found</h3>
                <p className="text-gray-400">Try adjusting your search filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((teacher) => (
                  <TeacherCard key={teacher.id} teacher={teacher} onClick={handleCardClick} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <p>
          <span className="font-bold text-indigo-600">EduReview</span> · Empowering students with
          honest teacher ratings
        </p>
      </footer>
    </div>
  );
}
