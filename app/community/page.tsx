'use client';
import { supabase } from '@/lib/supabase';  // Import your init
import { useEffect, useState } from 'react';

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);  // Bonus: Handle errors

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error: fetchError } = await supabase.from('community_posts').select('*');
      if (fetchError) setError(fetchError.message);
      else setPosts(data || []);
    };
    fetchPosts();

    // Real-time subscription (bonus for efficiency)
    const channel = supabase.channel('posts-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'community_posts' }, () => fetchPosts())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8">
      <h1>Community Posts</h1>
      {posts.map((post: any) => (
        <div key={post.id} className="bg-white/10 p-4 mb-4 rounded">
          {post.content} (Module: {post.module})
        </div>
      ))}
    </div>
  );
}
