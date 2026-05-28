import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api';

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─────────────────── HERO ─────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#0a0f1e' }}>
      {/* Banner bg */}
      <div className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url('/assets/banner.jpg')` }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg" />

      {/* Gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e]/70 via-transparent to-[#0a0f1e]" />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3
        w-[800px] h-[800px] bg-primary-500/12 rounded-full blur-[160px] pointer-events-none animate-glow-pulse" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px]
        bg-primary-400/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[200px] h-[200px]
        bg-primary-300/6 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary-500/12 border border-primary-500/25
          text-primary-300 rounded-full px-5 py-2 text-sm font-medium mb-8 shadow-lg shadow-primary-500/10">
          <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
          🌿 Eco-Friendly Electric Scooter · Da Nang, Vietnam
        </div>

        {/* Heading */}
        <h1 className="text-6xl sm:text-7xl xl:text-[5.5rem] font-extrabold text-white leading-[1.04] tracking-tight mb-6">
          Ride The{' '}
          <span className="shimmer-text">Future</span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-200 font-semibold mb-3 tracking-wide">
          No Driver&apos;s License Needed
        </p>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Travel up to{' '}
          <span className="text-primary-400 font-bold">60km</span>, swap batteries in{' '}
          <span className="text-primary-400 font-bold">1 minute</span>.
          Explore Da Nang the eco-friendly way!
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <Link to="/booking" className="btn-primary text-base px-9 py-4 text-base">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book Now
          </Link>
          <a href="#scooter-details" className="btn-ghost text-base px-9 py-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Scooter
          </a>
        </div>

        {/* Stats — glass cards */}
        <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
          {[
            { value: '60km', label: 'Range' },
            { value: '< 1 min', label: 'Battery Swap' },
            { value: 'No', label: 'License Needed' }
          ].map(s => (
            <div key={s.label} className="glass rounded-2xl px-3 py-4 text-center">
              <div className="text-xl font-extrabold text-primary-400 leading-none mb-1">{s.value}</div>
              <div className="text-gray-400 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-gray-500 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5">
          <span className="w-1 h-2 bg-primary-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SCOOTER SHOWCASE ─────────────────── */
function ScootersSection() {
  const [ref, inView] = useInView();
  const features = ['No License Required', '60km Range', '1-Min Battery Swap', '100% Legal'];

  return (
    <section id="scooters" ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-tag">Our Electric Scooter</span>
          <h2 className="section-title mt-4">VinFast Evo Grand Lite</h2>
          <p className="section-subtitle">Premium VinFast electric scooter — no license needed, eco-friendly and 100% legal!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Image */}
          <div className={`relative transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="rounded-3xl overflow-hidden gradient-ring group">
              <img src="/assets/intro.jpg" alt="VinFast Evo Grand Lite"
                className="w-full h-[360px] object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-3xl" />
            </div>
            {/* Badges */}
            <div className="absolute top-5 left-5 bg-primary-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-primary-500/40">
              ⭐ Best Seller
            </div>
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl shadow-black/10 p-4 border border-gray-100 text-center">
              <div className="text-2xl font-extrabold text-primary-600">60km</div>
              <div className="text-gray-400 text-xs font-medium">range/charge</div>
            </div>
          </div>

          {/* Info */}
          <div className={`pt-8 lg:pt-0 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <h3 className="text-3xl font-extrabold text-dark-2 mb-2 tracking-tight">VinFast Evo Grand Lite</h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              The perfect choice for exploring Da Nang. Stylish design, no license needed, eco-friendly and 100% legal.
            </p>

            {/* Feature pills */}
            <ul className="grid grid-cols-2 gap-2.5 mb-7">
              {features.map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700 bg-gray-50 hover:bg-primary-50 rounded-xl px-3.5 py-3 border border-gray-100 hover:border-primary-100 transition-colors">
                  <div className="w-5 h-5 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium">{f}</span>
                </li>
              ))}
            </ul>

            {/* Pricing */}
            <div className="grid grid-cols-2 gap-3 mb-7">
              <div className="bg-white rounded-2xl p-5 text-center border-2 border-gray-100">
                <div className="text-xs text-gray-400 mb-1.5 font-semibold uppercase tracking-wider">1 day</div>
                <div className="text-3xl font-extrabold text-dark-2">200k</div>
                <div className="text-gray-400 text-xs mt-1">200,000₫</div>
              </div>
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-5 text-center relative shadow-lg shadow-primary-500/25">
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow">
                  -25%
                </div>
                <div className="text-xs text-primary-100 mb-1.5 font-semibold uppercase tracking-wider">2+ days</div>
                <div className="text-3xl font-extrabold text-white">150k</div>
                <div className="text-primary-200 text-xs mt-1">150,000₫/day</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link to="/booking?scooter=1" className="btn-primary flex-1 justify-center">Book Now</Link>
              <a href="#scooter-details" className="btn-outline flex-1 justify-center">View Details</a>
            </div>
          </div>
        </div>

        {/* Photo gallery */}
        <div className={`mt-14 grid grid-cols-3 gap-4 max-w-5xl mx-auto transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            '/assets/z7848049053773_91b9c21f271cf11d75540df23129fb02.jpg',
            '/assets/z7848049056601_f6683072c445f15defc6932241b7c24e.jpg',
            '/assets/z7848049057923_2bff46bc0133d6896f94b05cdd275ab2.jpg'
          ].map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300">
              <img src={src} alt={`T-EcoBike photo ${i + 1}`}
                className="w-full h-56 object-cover group-hover:scale-106 transition-transform duration-600" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SPECS & PRICING ─────────────────── */
const specsList = [
  { label: 'Motor', value: 'BLDC Brushless', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> },
  { label: 'Max Speed', value: '50 km/h', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /> },
  { label: 'Range', value: '60 km', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /> },
  { label: 'Battery Swap', value: '< 1 min', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /> },
  { label: 'Weight', value: '~65 kg', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /> },
  { label: 'Charge Time', value: '4–6 hours', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /> },
  { label: 'License', value: 'Not Required', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> },
  { label: 'Warranty', value: 'VinFast', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /> }
];

const includedItems = [
  { icon: '🪖', title: 'Quality Helmet', desc: 'Full-face helmet provided' },
  { icon: '🗺️', title: 'Tourist Map', desc: 'Da Nang attractions map' },
  { icon: '🚚', title: 'Free Delivery', desc: 'Direct to your hotel' },
  { icon: '📞', title: '24/7 Support', desc: 'Roadside assistance' }
];

function ElectricMotorbikeSection() {
  const [days, setDays] = useState(1);
  const [ref, inView] = useInView();
  const price = days === 1 ? 200000 : days * 150000;
  const perDay = days === 1 ? 200000 : 150000;

  return (
    <section id="scooter-details" ref={ref} className="py-24 lg:py-32 grid-bg" style={{ background: '#0a0f1e' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-tag-dark">VinFast Evo Grand Lite</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 tracking-tight">Specs & Pricing</h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">Everything you need to know before you ride</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Specs + Included */}
          <div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.15em] mb-5">Technical Specifications</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {specsList.map((s, i) => (
                <div
                  key={s.label}
                  className="glass-card p-4 text-center hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1"
                  style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)', transition: `all 0.5s ${i * 60}ms` }}
                >
                  <div className="w-8 h-8 bg-primary-500/15 rounded-xl flex items-center justify-center mx-auto mb-2.5">
                    <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {s.icon}
                    </svg>
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{s.label}</div>
                  <div className="text-sm font-bold text-white leading-tight">{s.value}</div>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.15em] mb-5">What&apos;s Included</p>
            <div className="grid grid-cols-2 gap-3">
              {includedItems.map((item, i) => (
                <div
                  key={item.title}
                  className="glass-card p-4 flex items-center gap-3 hover:border-primary-500/30 transition-all duration-300"
                  style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)', transition: `all 0.5s ${i * 80 + 400}ms` }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-white">{item.title}</div>
                    <div className="text-xs text-gray-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Price Calculator */}
          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-[0.15em] mb-5">Price Calculator</p>
            <div className="glass-card p-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300 font-medium">Number of rental days</span>
                <span className="text-3xl font-extrabold text-primary-400">{days}</span>
              </div>
              <p className="text-xs text-gray-500 mb-5">{days === 1 ? '1 day rental' : `${days} days rental`}</p>

              <input
                type="range" min={1} max={30} value={days}
                onChange={e => setDays(Number(e.target.value))}
                className="w-full mb-8 cursor-pointer"
                style={{ accentColor: '#22c55e' }}
              />

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/8">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Per day</div>
                  <div className="text-base font-extrabold text-white">{perDay.toLocaleString('vi-VN')}₫</div>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/8">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Days</div>
                  <div className="text-base font-extrabold text-white">{days}</div>
                </div>
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-4 text-center shadow-lg shadow-primary-500/30">
                  <div className="text-[10px] text-primary-100 uppercase tracking-wider mb-2">Total</div>
                  <div className="text-base font-extrabold text-white">{price.toLocaleString('vi-VN')}₫</div>
                </div>
              </div>

              {days >= 2 && (
                <div className="text-center mb-5 py-2.5 bg-primary-500/10 border border-primary-500/20 rounded-xl">
                  <p className="text-primary-300 text-sm font-semibold">
                    🎉 Save {(days * 50000).toLocaleString('vi-VN')}₫ vs 1-day rate!
                  </p>
                </div>
              )}

              <Link to="/booking?scooter=1" className="btn-primary w-full justify-center py-4 text-base">
                Book {days} {days === 1 ? 'day' : 'days'} — {price.toLocaleString('vi-VN')}₫ →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── WHY CHOOSE ─────────────────── */
const benefits = [
  {
    num: '01',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    title: 'No License Required',
    desc: "VinFast electric scooters are classified as e-bikes under Vietnamese law — no driver's license needed!"
  },
  {
    num: '02',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />,
    title: '100% Legal',
    desc: 'Fully compliant with Vietnamese traffic regulations. Ride with total peace of mind anywhere in Da Nang.'
  },
  {
    num: '03',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
    title: '60km Range',
    desc: '60km of range per battery swap — more than enough to explore all of Da Nang and the surrounding areas.'
  },
  {
    num: '04',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    title: '1-Minute Battery Swap',
    desc: 'Ultra-fast battery swap in under 1 minute at convenient stations. No waiting around for charging!'
  }
];

function WhyChoose() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className="py-24 lg:py-32 dot-bg" style={{ background: '#f9fafb' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-tag">Why T-EcoBike</span>
          <h2 className="section-title mt-4">Why Choose Electric?</h2>
          <p className="section-subtitle">Reasons why electric scooters are the perfect choice for your Da Nang adventure</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="group relative bg-white p-7 rounded-3xl border border-gray-100 hover:border-primary-200
                hover:shadow-2xl hover:shadow-primary-500/8 transition-all duration-400 hover:-translate-y-2 cursor-default"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: `all 0.6s ${i * 100}ms` }}
            >
              {/* Number */}
              <div className="absolute top-5 right-5 text-5xl font-extrabold text-gray-50 group-hover:text-primary-50 transition-colors select-none leading-none">
                {b.num}
              </div>
              {/* Icon */}
              <div className="relative w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl
                flex items-center justify-center mb-6 shadow-lg shadow-primary-500/25
                group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {b.icon}
                </svg>
              </div>
              {/* Content */}
              <h3 className="text-base font-bold text-dark-2 mb-2.5 group-hover:text-primary-700 transition-colors">{b.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              {/* Bottom accent */}
              <div className="absolute bottom-0 left-7 right-7 h-0.5 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full
                scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── SAFETY TIPS ─────────────────── */
const tips = [
  { q: 'Helmet regulations', a: 'All riders and passengers must wear a helmet throughout the journey. We provide high-quality helmets free of charge with every rental.' },
  { q: 'Obey traffic laws', a: 'Stay in the correct lane, stop at red lights, and follow all road signs. The recommended maximum speed in the Da Nang city centre is 40km/h.' },
  { q: 'Pre-ride inspection', a: 'Check the battery level, brakes, lights and tyres before each ride. If you notice anything unusual, contact us immediately for assistance.' },
  { q: 'When the battery is low', a: 'When the battery is running low, find the nearest swap station via the VinFast app or call +84 905 659 886 for directions to the closest station within 10km.' },
  { q: 'Protect the scooter when parked', a: 'Always lock the scooter and take the key when you leave. Park in designated areas only. We are not responsible for damage caused by failing to follow parking guidelines.' }
];

function SafetyTips() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-24 lg:py-32 grid-bg" style={{ background: '#0f172a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="section-tag-dark mb-5 inline-flex">Stay Safe</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-1 mb-4 tracking-tight">Safety & Riding Tips</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Safety is our top priority. Read these guidelines for a safe and enjoyable experience.
            </p>
            <div className="space-y-2">
              {tips.map((tip, i) => (
                <div key={i}
                  className={`rounded-2xl overflow-hidden border transition-all duration-200 ${
                    open === i ? 'border-primary-500/40 bg-primary-500/5' : 'border-white/8 bg-white/3 hover:border-white/15'
                  }`}>
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${open === i ? 'bg-primary-400' : 'bg-white/20'}`} />
                      <span className={`font-semibold text-sm ${open === i ? 'text-primary-300' : 'text-gray-200'}`}>
                        {tip.q}
                      </span>
                    </div>
                    <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 ml-4 transition-transform ${open === i ? 'rotate-180 text-primary-400' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {open === i && (
                    <div className="px-5 pb-5 pl-[3.25rem]">
                      <p className="text-gray-400 text-sm leading-relaxed">{tip.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
              <img src="/assets/z7848049053773_91b9c21f271cf11d75540df23129fb02.jpg"
                alt="Safe riding"
                className="w-full h-80 lg:h-[420px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-3xl" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 shadow-xl shadow-primary-500/40">
              <div className="text-white font-extrabold text-4xl leading-none">24/7</div>
              <div className="text-primary-100 text-sm font-medium mt-1">Roadside Support</div>
            </div>
            <div className="absolute top-5 right-5 glass rounded-xl px-4 py-2.5">
              <div className="text-white text-xs font-semibold">🛡️ Safety Certified</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── RENTAL PROCESS ─────────────────── */
const steps = [
  { step: '01', title: 'Book Online', desc: 'Book via our website or WhatsApp. Fast, easy and instantly confirmed.', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /> },
  { step: '02', title: 'Submit Documents', desc: "Provide a valid ID or passport. No driver's license required — just valid identity!", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /> },
  { step: '03', title: 'Free Delivery', desc: 'Your scooter is delivered free of charge to your hotel or any central Da Nang location!', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /> },
  { step: '04', title: 'Ride & Explore', desc: 'Pay by cash or credit card (3% fee). Hit the road and discover Da Nang your way!', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /> }
];

function RentalProcess() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white grid-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-tag">How It Works</span>
          <h2 className="section-title mt-4">Rental Process</h2>
          <p className="section-subtitle">Just 4 simple steps to start your electric adventure</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i}
              className="relative group"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: `all 0.6s ${i * 120}ms` }}
            >
              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] right-[-50%] h-px
                  bg-gradient-to-r from-primary-300/60 to-gray-200 z-0" />
              )}
              <div className="relative bg-white rounded-3xl p-7 border border-gray-100
                hover:border-primary-200 hover:shadow-2xl hover:shadow-primary-500/8
                transition-all duration-400 hover:-translate-y-2 h-full flex flex-col z-10">
                {/* Step number */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl
                    flex items-center justify-center shadow-lg shadow-primary-500/25
                    group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {s.icon}
                    </svg>
                  </div>
                  <span className="text-5xl font-extrabold text-gray-50 group-hover:text-primary-50 select-none transition-colors leading-none">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-dark-2 mb-2.5">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link to="/booking" className="btn-primary text-base px-10 py-4">
            Start Your Journey →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── ABOUT US ─────────────────── */
const teamMembers = [
  { name: 'Minh Vu', role: 'Founder & CEO', img: 'https://i.pravatar.cc/200?img=12', desc: 'Passionate about sustainable green tourism in Da Nang.' },
  { name: 'Lan Anh', role: 'Operations Manager', img: 'https://i.pravatar.cc/200?img=25', desc: 'Ensures every customer has a perfect experience.' },
  { name: 'Tuan Nguyen', role: 'Head Mechanic', img: 'https://i.pravatar.cc/200?img=15', desc: 'Maintains and inspects the entire scooter fleet.' }
];

function AboutSection() {
  const [ref, inView] = useInView();
  return (
    <section id="about" ref={ref} className="py-24 lg:py-32 dot-bg" style={{ background: '#f9fafb' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-tag">Who We Are</span>
          <h2 className="section-title mt-4">About T-EcoBike</h2>
          <p className="section-subtitle">Pioneering eco-friendly electric travel in Da Nang since 2019</p>
        </div>

        {/* Mission + Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="rounded-3xl p-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              To provide premium electric scooter rentals that help travellers explore Da Nang in the most eco-friendly way —
              delivering convenience, safety and unforgettable experiences.
            </p>
          </div>
          <div className="rounded-3xl p-8 bg-gradient-to-br from-primary-500 to-primary-700 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Our Vision</h3>
            <p className="text-primary-100 leading-relaxed text-sm">
              To become the leading electric scooter rental in Central Vietnam, promoting sustainable tourism and reducing
              pollution in Da Nang — a beautiful heritage city.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { value: '500+', label: 'Happy Customers', color: 'text-primary-600' },
            { value: '50+', label: 'Electric Scooters', color: 'text-primary-600' },
            { value: '20+', label: 'Countries Served', color: 'text-primary-600' },
            { value: '4.9★', label: 'Average Rating', color: 'text-yellow-500' }
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className={`text-3xl md:text-4xl font-extrabold ${s.color} leading-none mb-1.5`}>{s.value}</div>
              <div className="text-gray-400 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-dark-2 tracking-tight">Meet Our Team</h3>
          <p className="text-gray-500 mt-2 text-sm">A dedicated team, always ready to serve you</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {teamMembers.map((m, i) => (
            <div
              key={m.name}
              className="group bg-white rounded-3xl p-7 text-center border border-gray-100 hover:border-primary-200
                hover:shadow-xl hover:shadow-primary-500/8 transition-all duration-400 hover:-translate-y-1.5"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: `all 0.6s ${i * 120}ms` }}
            >
              <div className="relative inline-block mb-4">
                <img src={m.img} alt={m.name}
                  className="w-20 h-20 rounded-2xl object-cover mx-auto group-hover:scale-105 transition-transform shadow-md" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary-500 rounded-full border-2 border-white" />
              </div>
              <div className="font-bold text-dark-2 mb-0.5">{m.name}</div>
              <div className="text-primary-500 text-xs font-semibold uppercase tracking-wider mb-3">{m.role}</div>
              <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── TESTIMONIALS ─────────────────── */
function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    axios.get('/api/testimonials').then(r => setTestimonials(r.data)).catch(() => {
      setTestimonials([
        { id: 1, author: 'Sarah Johnson', country: 'Australia', rating: 5, content: 'Amazing experience! The scooters are in perfect condition and the staff is incredibly helpful. No license needed made it super easy for us tourists. Highly recommend for exploring Da Nang!', avatar: 'https://i.pravatar.cc/100?img=1' },
        { id: 2, author: 'Thomas Müller', country: 'Germany', rating: 5, content: 'Perfect service! The electric scooters are quiet, eco-friendly and very easy to ride. The battery swap stations are conveniently located. Will definitely rent again next trip!', avatar: 'https://i.pravatar.cc/100?img=3' },
        { id: 3, author: 'Emily Chen', country: 'USA', rating: 5, content: 'Best way to explore Da Nang! Delivery to our hotel was on time, helmets provided. The 60km range was more than enough for a full day of sightseeing. Absolutely loved it!', avatar: 'https://i.pravatar.cc/100?img=5' }
      ]);
    });
  }, []);

  if (!testimonials.length) return null;
  const t = testimonials[idx];

  return (
    <section className="py-24 lg:py-32 grid-bg" style={{ background: '#111827' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-tag-dark">Customer Reviews</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 tracking-tight">What Our Riders Say</h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">Thousands of travellers trust and love riding with T-EcoBike</p>
        </div>

        {/* Rating summary */}
        <div className="flex justify-center gap-8 sm:gap-14 mb-12">
          {[
            { value: '4.9', sub: 'Google Rating', stars: true },
            { value: '500+', sub: 'Happy Customers', stars: false },
            { value: '20+', sub: 'Countries', stars: false }
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl sm:text-5xl font-extrabold text-white mb-1">{s.value}</div>
              {s.stars && (
                <div className="flex justify-center gap-0.5 mb-1">
                  {[1,2,3,4,5].map(n => (
                    <svg key={n} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}
              <div className="text-gray-400 text-sm">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Main review */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
            {/* Decorative quote */}
            <div className="absolute -top-3 left-8 text-primary-500/20 text-[10rem] font-serif leading-none select-none pointer-events-none">
              &ldquo;
            </div>
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[1,2,3,4,5].map(n => (
                <svg key={n} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-200 text-lg leading-relaxed mb-8 relative z-10">{t.content}</p>
            <div className="flex items-center justify-center gap-4">
              <img src={t.avatar} alt={t.author}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary-500/30" />
              <div className="text-left">
                <div className="font-bold text-white">{t.author}</div>
                <div className="text-gray-400 text-sm flex items-center gap-1.5 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {t.country}
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                className={`rounded-full transition-all duration-300 ${i === idx ? 'w-8 h-2.5 bg-primary-500' : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'}`} />
            ))}
          </div>
        </div>

        {/* Thumbnail grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-3xl mx-auto">
          {testimonials.map((t2, i) => (
            <button key={t2.id} onClick={() => setIdx(i)}
              className={`p-4 rounded-2xl text-left transition-all duration-200 border ${
                i === idx
                  ? 'bg-primary-500/10 border-primary-500/30'
                  : 'bg-white/4 border-white/6 hover:border-white/15'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <img src={t2.avatar} alt={t2.author} className="w-7 h-7 rounded-lg object-cover" />
                <span className="text-xs font-semibold text-gray-200 truncate">{t2.author}</span>
              </div>
              <div className="flex gap-0.5 mb-1.5">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} className={`w-3 h-3 ${s <= t2.rating ? 'text-yellow-400' : 'text-white/10'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">{t2.content}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── CONTACT ─────────────────── */
function ContactSection() {
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

  const inputCls = 'w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:bg-white transition-all';

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-tag">Contact Us</span>
          <h2 className="section-title mt-4">Get In Touch</h2>
          <p className="section-subtitle">Reach us through any channel — we&apos;re always ready to help!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Info */}
          <div className="space-y-4">
            <div className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm border-l-4 border-primary-500 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-dark-2 text-sm mb-0.5">Hotline</div>
                <a href="tel:+84905659886" className="text-sm text-gray-500 hover:text-primary-600 transition-colors font-medium">+84 905 659 886</a>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-dark-2 text-sm mb-0.5">Email</div>
                <a href="mailto:truongvunguyen1991@gmail.com" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">truongvunguyen1991@gmail.com</a>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm border-l-4 border-orange-400 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="font-bold text-dark-2 text-sm mb-0.5">Address</div>
                <div className="text-sm text-gray-500 leading-relaxed">135 Tran Nhan Tong<br />Hoi An Dong, Da Nang City</div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <a href="https://wa.me/84905659886" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md shadow-green-500/20">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <a href="tel:+84905659886"
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-sm font-bold px-4 py-2.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md shadow-yellow-400/20"
                style={{ color: '#3B1C1C' }}>
                <span className="text-xs font-extrabold">KT</span>
                KakaoTalk
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-dark-2 mb-6">Send Us a Message</h3>

              {status === 'success' && (
                <div className="flex items-center gap-3 bg-primary-50 border border-primary-200 text-primary-700 rounded-xl p-4 mb-6 text-sm">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Message sent! We&apos;ll get back to you shortly.</span>
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6 text-sm">
                  An error occurred. Please try again or contact us via hotline.
                </div>
              )}

              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Full Name <span className="text-red-400">*</span></label>
                    <input name="full_name" value={form.full_name} onChange={handle} required placeholder="John Smith" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Phone</label>
                    <input name="phone" value={form.phone} onChange={handle} placeholder="+84 905 659 886" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handle} placeholder="your@email.com" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Subject</label>
                  <select name="subject" value={form.subject} onChange={handle} className={inputCls}>
                    <option value="">Select a subject</option>
                    <option value="booking">Booking Inquiry</option>
                    <option value="pricing">Pricing & Availability</option>
                    <option value="delivery">Delivery & Pickup</option>
                    <option value="support">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Message <span className="text-red-400">*</span></label>
                  <textarea name="message" value={form.message} onChange={handle} required rows={4}
                    placeholder="How can we help you?" className={`${inputCls} resize-none`} />
                </div>
                <button type="submit" disabled={loading}
                  className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                  {loading ? (
                    <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>Sending...</>
                  ) : (
                    <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>Send Message</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── CTA BANNER ─────────────────── */
function CTABanner() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: '#0a0f1e' }}>
      {/* Gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700/40 via-primary-600/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-tl from-primary-500/15 via-transparent to-transparent" />
      <div className="absolute inset-0 grid-bg" />

      {/* Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-500/20 rounded-full blur-[120px] pointer-events-none animate-glow-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-primary-400/15 rounded-full blur-[80px] pointer-events-none animate-float-slow" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <span className="section-tag-dark mb-6 inline-flex">Start Your Adventure</span>
        <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-5 leading-tight tracking-tight">
          Ready to Ride<br />
          <span className="shimmer-text">the Future?</span>
        </h2>
        <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Free delivery · No license needed · 60km range · Lightning-fast battery swap
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/booking"
            className="bg-primary-500 hover:bg-primary-400 text-white font-bold px-10 py-4 rounded-full
              transition-all hover:-translate-y-0.5 shadow-xl shadow-primary-500/30 inline-flex items-center gap-2 text-base">
            Book Now →
          </Link>
          <a href="https://wa.me/84905659886" target="_blank" rel="noopener noreferrer"
            className="glass font-semibold text-white px-10 py-4 rounded-full transition-all hover:-translate-y-0.5 inline-flex items-center gap-2 text-base hover:border-primary-400/40">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────── PAGE ─────────────────── */
export default function Home() {
  return (
    <>
      <Hero />
      <ScootersSection />
      <ElectricMotorbikeSection />
      <WhyChoose />
      <SafetyTips />
      <RentalProcess />
      <AboutSection />
      <Testimonials />
      <ContactSection />
      <CTABanner />
    </>
  );
}
