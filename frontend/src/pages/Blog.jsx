import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api';

const CATEGORIES = ['All', 'Travel Guide', 'Scooter Review', 'Safety', 'Eco Travel'];

const categoryColors = {
  'Travel Guide': 'bg-blue-100 text-blue-700',
  'Scooter Review': 'bg-purple-100 text-purple-700',
  'Safety': 'bg-red-100 text-red-700',
  'Eco Travel': 'bg-green-100 text-green-700',
};

function formatDate(str) {
  return new Date(str).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/posts').then(r => {
      setPosts(r.data);
      setFiltered(r.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFiltered(posts);
    } else {
      setFiltered(posts.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, posts]);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative bg-dark-2 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1400&q=60')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-2/90 to-dark-2" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
            <Link to="/" className="hover:text-primary-400">Home</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-300">Blog</span>
          </div>
          <div className="max-w-2xl">
            <span className="inline-block bg-primary-500/20 text-primary-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              Travel Stories & Tips
            </span>
            <h1 className="text-5xl font-extrabold text-white mb-5">
              T-EcoBike <span className="text-primary-400">Blog</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Travel guides, scooter tips, safety advice and eco-travel inspiration for your Da Nang adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto flex-shrink-0 text-sm text-gray-400">{filtered.length} article{filtered.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow animate-pulse">
                  <div className="h-52 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-5 bg-gray-200 rounded w-4/5" />
                    <div className="h-3 bg-gray-200 rounded" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-dark-2 mb-2">No articles found</h3>
              <p className="text-gray-500">Try selecting a different category.</p>
            </div>
          ) : (
            <>
              {/* Featured Post (first item) */}
              {activeCategory === 'All' && filtered[0] && (
                <div className="mb-10">
                  <Link to={`/blog/${filtered[0].slug}`} className="group block bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="relative overflow-hidden h-72 lg:h-auto">
                        <img
                          src={filtered[0].image}
                          alt={filtered[0].title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-8 lg:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[filtered[0].category] || 'bg-gray-100 text-gray-600'}`}>
                            {filtered[0].category}
                          </span>
                          <span className="text-gray-400 text-xs">{filtered[0].read_time} min read</span>
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-extrabold text-dark-2 mb-4 group-hover:text-primary-600 transition-colors leading-snug">
                          {filtered[0].title}
                        </h2>
                        <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">
                          {filtered[0].excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img src={filtered[0].author_avatar} alt={filtered[0].author} className="w-9 h-9 rounded-full object-cover" />
                            <div>
                              <div className="text-sm font-semibold text-dark-2">{filtered[0].author}</div>
                              <div className="text-xs text-gray-400">{formatDate(filtered[0].created_at)}</div>
                            </div>
                          </div>
                          <span className="text-primary-500 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read more
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Rest of posts */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(activeCategory === 'All' ? filtered.slice(1) : filtered).map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-2xl mx-auto text-center px-4">
          <h2 className="text-3xl font-extrabold text-white mb-3">Ready for Your Da Nang Adventure?</h2>
          <p className="text-primary-100 mb-8">Book your VinFast electric scooter today — free delivery, no license needed!</p>
          <Link to="/booking" className="bg-white text-primary-600 hover:bg-primary-50 font-bold px-10 py-4 rounded-full transition-all hover:shadow-lg inline-flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Book a Scooter →
          </Link>
        </div>
      </section>
    </div>
  );
}

function PostCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden h-52">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
            {post.category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          {post.read_time} min read
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-dark-2 text-base mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
          <img src={post.author_avatar} alt={post.author} className="w-7 h-7 rounded-full object-cover" />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-gray-700 truncate">{post.author}</div>
            <div className="text-xs text-gray-400">{formatDate(post.created_at)}</div>
          </div>
          <svg className="w-4 h-4 text-primary-500 flex-shrink-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
