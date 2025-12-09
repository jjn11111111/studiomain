'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function CommunityPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error: fetchError } = await supabase.from('community_posts').select('*');
      if (fetchError) setError(fetchError.message);
      else setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Community</h1>
        
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700">{post.content}</p>
                <div className="mt-4 text-sm text-gray-500">
                  Posted on {new Date(post.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
