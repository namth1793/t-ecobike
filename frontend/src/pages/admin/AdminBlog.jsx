import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api';

const CATEGORIES = ['Travel Guide', 'Scooter Review', 'Safety', 'Eco Travel'];

const catColors = {
  'Travel Guide': 'bg-blue-100 text-blue-700',
  'Scooter Review': 'bg-purple-100 text-purple-700',
  'Safety': 'bg-red-100 text-red-700',
  'Eco Travel': 'bg-green-100 text-green-700',
};

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
}

function adminAxios() {
  const token = localStorage.getItem('adminToken');
  return axios.create ? axios : axios;
}

function api(method, url, data) {
  const token = localStorage.getItem('adminToken');
  return axios({ method, url, data, headers: { Authorization: `Bearer ${token}` } });
}

const EMPTY_FORM = {
  title: '', slug: '', category: 'Travel Guide',
  excerpt: '', content: '', image: '',
  author: 'T-EcoBike Team', author_avatar: 'https://i.pravatar.cc/100?img=12', read_time: 5
};

export default function AdminBlog() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); // 'list' | 'form'
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [search, setSearch] = useState('');

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) navigate('/admin/login');
  }, []);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api('get', '/api/admin/posts');
      setPosts(res.data);
    } catch {
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const logout = async () => {
    try { await api('post', '/api/admin/logout'); } catch {}
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const openCreate = () => { setForm(EMPTY_FORM); setEditId(null); setError(''); setView('form'); };
  const openEdit = post => {
    setForm({
      title: post.title, slug: post.slug, category: post.category,
      excerpt: post.excerpt, content: post.content, image: post.image || '',
      author: post.author || 'T-EcoBike Team',
      author_avatar: post.author_avatar || '',
      read_time: post.read_time || 5
    });
    setEditId(post.id);
    setError('');
    setView('form');
  };

  const handleTitleChange = e => {
    const title = e.target.value;
    setForm(f => ({ ...f, title, slug: editId ? f.slug : slugify(title) }));
  };

  const save = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editId) {
        await api('put', `/api/admin/posts/${editId}`, form);
      } else {
        await api('post', '/api/admin/posts', form);
      }
      await fetchPosts();
      setView('list');
    } catch (err) {
      setError(err.response?.data?.error || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async id => {
    try {
      await api('delete', `/api/admin/posts/${id}`);
      setPosts(p => p.filter(x => x.id !== id));
      setDeleteConfirm(null);
    } catch {
      alert('Delete failed');
    }
  };

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-dark-2 flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="text-white font-bold text-sm">T-EcoBike</div>
              <div className="text-primary-400 text-xs">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <button
            onClick={() => setView('list')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${view === 'list' ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Blog Posts
            <span className="ml-auto bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">{posts.length}</span>
          </button>
          <button
            onClick={openCreate}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${view === 'form' && !editId ? 'bg-primary-500 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Post
          </button>
        </nav>

        {/* Footer */}
        <div className="px-3 pb-4 space-y-1">
          <a href="/" target="_blank" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Website
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {view === 'list' ? 'Blog Posts' : editId ? 'Edit Post' : 'New Post'}
            </h1>
            <p className="text-gray-400 text-sm">
              {view === 'list' ? `${posts.length} articles total` : 'Fill in the details below'}
            </p>
          </div>
          {view === 'list' ? (
            <button onClick={openCreate} className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Post
            </button>
          ) : (
            <button onClick={() => setView('list')} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to List
            </button>
          )}
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-8">
          {view === 'list' ? (
            <ListView
              posts={filtered}
              loading={loading}
              search={search}
              onSearch={setSearch}
              onEdit={openEdit}
              onDelete={id => setDeleteConfirm(id)}
            />
          ) : (
            <FormView
              form={form}
              setForm={setForm}
              editId={editId}
              saving={saving}
              error={error}
              onTitleChange={handleTitleChange}
              onSubmit={save}
              onCancel={() => setView('list')}
            />
          )}
        </main>
      </div>

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Delete Post?</h3>
            <p className="text-gray-500 text-sm text-center mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors text-sm">Cancel</button>
              <button onClick={() => deletePost(deleteConfirm)} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition-colors text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── List View ─────────────────────────────────────────────── */
function ListView({ posts, loading, search, onSearch, onEdit, onDelete }) {
  if (loading) return (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 animate-pulse flex gap-4">
          <div className="w-20 h-16 bg-gray-200 rounded-xl flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {/* Search */}
      <div className="mb-5 relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search posts..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
        />
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl">
          <div className="text-4xl mb-3">📝</div>
          <p className="text-gray-500 font-medium">No posts found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
              {/* Thumbnail */}
              <div className="w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                {post.image ? (
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${catColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
                    {post.category}
                  </span>
                  <span className="text-gray-300 text-xs">·</span>
                  <span className="text-gray-400 text-xs">{post.read_time} min read</span>
                </div>
                <div className="font-semibold text-gray-900 text-sm truncate">{post.title}</div>
                <div className="text-gray-400 text-xs mt-0.5 truncate">/blog/{post.slug}</div>
              </div>
              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <a
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <button
                  onClick={() => onEdit(post)}
                  className="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(post.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Form View ─────────────────────────────────────────────── */
function FormView({ form, setForm, editId, saving, error, onTitleChange, onSubmit, onCancel }) {
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  return (
    <form onSubmit={onSubmit} className="max-w-4xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main fields */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider text-gray-400">Content</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title <span className="text-red-400">*</span></label>
              <input
                value={form.title}
                onChange={onTitleChange}
                required
                placeholder="Article title..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Slug <span className="text-red-400">*</span></label>
              <div className="flex">
                <span className="px-3 py-3 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-400">/blog/</span>
                <input
                  value={form.slug}
                  onChange={e => set('slug', e.target.value)}
                  required
                  placeholder="article-slug"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-r-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Excerpt <span className="text-red-400">*</span></label>
              <textarea
                value={form.excerpt}
                onChange={e => set('excerpt', e.target.value)}
                required
                rows={3}
                placeholder="Short description shown in blog list..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Content <span className="text-red-400">*</span></label>
              <p className="text-xs text-gray-400 mb-2">Supports: **bold**, ## Heading 2, ### Heading 3, - bullet list, 1. numbered list, --- divider</p>
              <textarea
                value={form.content}
                onChange={e => set('content', e.target.value)}
                required
                rows={18}
                placeholder="Write your article content here..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-y font-mono"
              />
            </div>
          </div>
        </div>

        {/* Sidebar fields */}
        <div className="space-y-4">
          {/* Publish */}
          <div className="bg-white rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider text-gray-400">Publish</h3>
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2 text-sm"
            >
              {saving ? (
                <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Saving...</>
              ) : (editId ? '💾 Save Changes' : '🚀 Publish Post')}
            </button>
            <button type="button" onClick={onCancel} className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 text-sm transition-colors">
              Cancel
            </button>
          </div>

          {/* Meta */}
          <div className="bg-white rounded-2xl p-5 space-y-4">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider text-gray-400">Details</h3>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={e => set('category', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 transition-all bg-white"
              >
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Read Time (minutes)</label>
              <input
                type="number"
                min={1} max={60}
                value={form.read_time}
                onChange={e => set('read_time', parseInt(e.target.value) || 5)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Author Name</label>
              <input
                value={form.author}
                onChange={e => set('author', e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 transition-all"
              />
            </div>
          </div>

          {/* Image */}
          <div className="bg-white rounded-2xl p-5 space-y-3">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider text-gray-400">Cover Image</h3>
            <input
              value={form.image}
              onChange={e => set('image', e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 transition-all"
            />
            {form.image && (
              <div className="rounded-xl overflow-hidden h-32">
                <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
