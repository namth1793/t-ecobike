import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api';

export default function Contact() {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/contacts', form);
      setStatus('success');
      setForm({ full_name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-dark-2 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
            <Link to="/" className="hover:text-primary-400">Home</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-300">Contact Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Get In <span className="text-primary-400">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Reach us through any channel. We are always ready to help you!
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Info */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-dark-2 mb-6">Contact Information</h3>
              </div>

              {/* Cards */}
              {[
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                  title: 'Hotline',
                  lines: ['+84 905 659 886'],
                  href: 'tel:+84905659886',
                  color: 'blue'
                },
                {
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                  title: 'Email',
                  lines: ['truongvunguyen1991@gmail.com'],
                  href: 'mailto:truongvunguyen1991@gmail.com',
                  color: 'green'
                },
                {
                  icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></>,
                  title: 'Address',
                  lines: ['135 Tran Nhan Tong', 'Hoi An Dong Ward, Da Nang City'],
                  color: 'orange'
                }
              ].map(c => (
                <div key={c.title} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    c.color === 'green' ? 'bg-primary-100' : c.color === 'blue' ? 'bg-blue-100' : 'bg-orange-100'
                  }`}>
                    <svg className={`w-5 h-5 ${
                      c.color === 'green' ? 'text-primary-600' : c.color === 'blue' ? 'text-blue-600' : 'text-orange-600'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {c.icon}
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-dark-2 text-sm mb-0.5">{c.title}</div>
                    {c.lines.map((l, i) => (
                      c.href ? (
                        <a key={i} href={c.href} className="block text-sm text-gray-500 hover:text-primary-600 transition-colors">{l}</a>
                      ) : (
                        <div key={i} className="text-sm text-gray-500">{l}</div>
                      )
                    ))}
                  </div>
                </div>
              ))}

              {/* Social */}
              <div className="pt-2">
                <div className="text-sm font-semibold text-dark-2 mb-3">Connect with us</div>
                <div className="flex gap-3">
                  <a href="https://wa.me/84905659886" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-full transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                  <a href="tel:+84905659886" className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-4 py-2 rounded-full transition-colors" style={{color:'#3B1C1C'}}>
                    <span className="font-bold text-xs">KT</span>
                    KakaoTalk
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-dark-2 mb-6">Send Us a Message</h3>

                {status === 'success' && (
                  <div className="bg-primary-50 border border-primary-200 text-primary-700 rounded-xl p-4 mb-6 flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">Message sent successfully! We will get back to you as soon as possible.</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm">
                    An error occurred. Please try again or contact us via hotline.
                  </div>
                )}

                <form onSubmit={submit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="full_name"
                        value={form.full_name}
                        onChange={handle}
                        required
                        placeholder="John Smith"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handle}
                        placeholder="+84 905 659 886"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handle}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handle}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="booking">Booking Inquiry</option>
                      <option value="pricing">Pricing & Availability</option>
                      <option value="delivery">Delivery & Pickup</option>
                      <option value="support">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handle}
                      required
                      rows={5}
                      placeholder="Enter your message..."
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-80 bg-gray-200 relative overflow-hidden">
        <iframe
          title="T-EcoBike Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.064876097553!2d108.33577731473497!3d15.879750988996064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142116949840de3%3A0x191f5f8a627fde97!2zSG_DoGkgQW4sIFF14bqjbmcgTmFt!5e0!3m2!1svi!2svn!4v1620000000000!5m2!1svi!2svn"
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
        />
      </section>
    </div>
  );
}
