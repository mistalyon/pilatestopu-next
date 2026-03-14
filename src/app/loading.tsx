export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-[#F2DFF4] to-white py-12 animate-pulse">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-4 w-48 bg-purple-200 rounded mb-4" />
          <div className="h-10 w-96 bg-purple-200 rounded mb-3" />
          <div className="h-5 w-72 bg-purple-100 rounded" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border p-6 animate-pulse">
              <div className="h-40 bg-gray-100 rounded-lg mb-4" />
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-100 rounded w-full mb-1" />
              <div className="h-4 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
