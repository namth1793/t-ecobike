import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from '../api';

const categoryColors = {
  'Travel Guide': 'bg-blue-100 text-blue-700',
  'Scooter Review': 'bg-purple-100 text-purple-700',
  'Safety': 'bg-red-100 text-red-700',
  'Eco Travel': 'bg-green-100 text-green-700',
};

function formatDate(str) {
  return new Date(str).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

// Simple markdown-like renderer: bold, headings, lists, paragraphs
function renderContent(text) {
  const lines = text.split('\n');
  const elements = [];
  let key = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // H2
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-2xl font-bold text-dark-2 mt-10 mb-4 pb-2 border-b border-gray-200">
          {line.replace('## ', '')}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-xl font-bold text-dark-2 mt-8 mb-3">
          {line.replace('### ', '')}
        </h3>
      );
      i++;
      continue;
    }

    // HR
    if (line.trim() === '---') {
      elements.push(<hr key={key++} className="my-8 border-gray-200" />);
      i++;
      continue;
    }

    // Unordered list
    if (line.startsWith('- ')) {
      const items = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].replace('- ', ''));
        i++;
      }
      elements.push(
        <ul key={key++} className="space-y-2 my-4 pl-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-gray-600">
              <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span dangerouslySetInnerHTML={{ __html: boldReplace(item) }} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\. /.test(line)) {
      const items = [];
      let num = 1;
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ''));
        i++;
        num++;
      }
      elements.push(
        <ol key={key++} className="space-y-2 my-4 pl-2 list-none">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-gray-600">
              <span className="w-7 h-7 bg-primary-500/10 text-primary-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm mt-0.5">
                {idx + 1}
              </span>
              <span className="pt-1" dangerouslySetInnerHTML={{ __html: boldReplace(item) }} />
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Bold heading line (e.g. **Title**)
    if (line.startsWith('**') && line.endsWith('**') && !line.slice(2, -2).includes('**')) {
      elements.push(
        <p key={key++} className="font-bold text-dark-2 text-lg mt-6 mb-2">
          {line.slice(2, -2)}
        </p>
      );
      i++;
      continue;
    }

    // Empty line → spacing
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="text-gray-600 leading-relaxed my-3"
        dangerouslySetInnerHTML={{ __html: boldReplace(line) }}
      />
    );
    i++;
  }

  return elements;
}

function boldReplace(str) {
  return str.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-dark-2">$1</strong>');
}

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/posts/${slug}`).then(r => {
      setPost(r.data);
      setLoading(false);
      // fetch related posts (same category, exclude current)
      return axios.get('/api/posts');
    }).then(r => {
      if (r) {
        setRelated(r.data.filter(p => p.slug !== slug).slice(0, 3));
      }
    }).catch(() => {
      navigate('/blog');
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative">
        <div className="h-80 lg:h-[480px] relative overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-2 via-dark-2/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 pb-10">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <Link to="/" className="hover:text-primary-400">Home</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link to="/blog" className="hover:text-primary-400">Blog</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-300 line-clamp-1">{post.title}</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
                {post.category}
              </span>
              <span className="text-gray-300 text-sm">{post.read_time} min read</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-extrabold text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Author & Meta */}
              <div className="flex items-center gap-4 pb-8 mb-8 border-b border-gray-100">
                <img src={post.author_avatar} alt={post.author} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <div className="font-semibold text-dark-2">{post.author}</div>
                  <div className="text-sm text-gray-400">{formatDate(post.created_at)}</div>
                </div>
                <div className="ml-auto flex gap-2">
                  <a
                    href={`https://wa.me/84905659886?text=Hi! I read your article "${post.title}" and I'd like to book a scooter.`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Share
                  </a>
                </div>
              </div>

              {/* Excerpt */}
              <p className="text-lg text-gray-500 leading-relaxed mb-8 font-medium border-l-4 border-primary-500 pl-5 italic">
                {post.excerpt}
              </p>

              {/* Content */}
              <div className="prose-article">
                {renderContent(post.content)}
              </div>

              {/* Tags */}
              <div className="mt-10 pt-8 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {['Da Nang', 'Electric Scooter', 'VinFast', post.category, 'Vietnam Travel'].map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">
                      #{tag.replace(' ', '')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Back button */}
              <div className="mt-8">
                <Link to="/blog" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all text-sm">
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Back to Blog
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">

                {/* Book CTA */}
                <div className="bg-primary-600 rounded-2xl p-6 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Ready to Ride?</h3>
                  <p className="text-primary-100 text-sm mb-5 leading-relaxed">
                    Book your VinFast Evo Grand Lite today. Free delivery, no license needed!
                  </p>
                  <div className="bg-white/10 rounded-xl p-3 mb-4 text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="text-primary-200">1 day</span>
                      <span className="font-bold">200,000₫</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-200">2+ days</span>
                      <span className="font-bold">150,000₫/day <span className="text-green-300 text-xs">Save 25%</span></span>
                    </div>
                  </div>
                  <Link to="/booking" className="block bg-white text-primary-600 font-bold text-center py-3 rounded-xl hover:bg-primary-50 transition-colors text-sm">
                    Book Now →
                  </Link>
                  <a href="tel:+84905659886" className="block text-center text-primary-200 text-sm mt-3 hover:text-white transition-colors">
                    📞 +84 905 659 886
                  </a>
                </div>

                {/* Related Posts */}
                {related.length > 0 && (
                  <div>
                    <h3 className="font-bold text-dark-2 mb-4">More Articles</h3>
                    <div className="space-y-4">
                      {related.map(p => (
                        <Link key={p.id} to={`/blog/${p.slug}`} className="group flex gap-3 hover:bg-gray-50 rounded-xl p-2 -mx-2 transition-colors">
                          <img src={p.image} alt={p.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="text-xs text-primary-500 font-semibold mb-0.5">{p.category}</div>
                            <div className="text-sm font-semibold text-dark-2 line-clamp-2 group-hover:text-primary-600 transition-colors leading-snug">
                              {p.title}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">{p.read_time} min read</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Card */}
                <div className="bg-gray-50 rounded-2xl p-5">
                  <h4 className="font-bold text-dark-2 mb-3 text-sm">Have Questions?</h4>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">Our team is available 24/7 to help plan your Da Nang adventure.</p>
                  <a
                    href="https://wa.me/84905659886"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors justify-center"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
