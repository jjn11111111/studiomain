'use client';

export default function Community() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 text-black">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">Community Journal</h1>
        <p className="text-center text-gray-600 mb-6">Share your 3rd eye experiences.</p>
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-gray-600">No posts yet. Be the first!</p>
        </div>
      </div>
    </div>
  );
}
