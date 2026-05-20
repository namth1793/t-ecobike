import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api';

const scooterData = {
  id: 1,
  name: 'VinFast Evo Grand Lite',
  model: 'Evo Grand Lite',
  price_1day: 200000,
  price_multi: 150000,
  range_km: 60,
  image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
  description: 'VinFast Evo Grand Lite — the ideal electric scooter for every Da Nang adventure. Stylish, dynamic design, no license needed, eco-friendly and 100% legal in Vietnam.',
  features: [
    'No license required',
    '60km range per charge',
    'Battery swap in 1 minute',
    '100% legal under Vietnamese law',
    'VinFast nationwide warranty',
    'Built-in GPS tracking'
  ]
};

const specs = [
  { label: 'Motor', value: 'BLDC Brushless' },
  { label: 'Max Speed', value: '50 km/h' },
  { label: 'Range', value: '60 km' },
  { label: 'Battery Swap', value: '< 1 min' },
  { label: 'Weight', value: '~65 kg' },
  { label: 'Charge Time', value: '4-6 hours' },
  { label: 'License', value: 'Not Required' },
  { label: 'Warranty', value: 'VinFast Nationwide' }
];

/* hook: animate on scroll */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function ElectricMotorbike() {
  const [days, setDays] = useState(1);

  const price = days === 1 ? scooterData.price_1day : days * scooterData.price_multi;
  const perDay = days === 1 ? scooterData.price_1day : scooterData.price_multi;

  const [heroRef, heroIn] = useInView(0.1);
  const [specsRef, specsIn] = useInView(0.1);
  const [inclRef, inclIn] = useInView(0.1);

  return (
    <div className="pt-20 overflow-x-hidden">

      {/* ── Hero / Product Detail ── */}
      <section className="bg-dark-2 py-20 relative overflow-hidden min-h-[80vh] flex items-center">
        {/* BG glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumb */}
          <div className={`flex items-center gap-2 text-gray-400 text-sm mb-10 transition-all duration-700 ${heroIn ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <Link to="/" className="hover:text-primary-400 transition-colors">Home</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-300">Electric Motorbike</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Image */}
            <div className={`relative transition-all duration-700 delay-100 ${heroIn ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary-500/10 group">
                <img
                  src={scooterData.image}
                  alt={scooterData.name}
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-2/60 via-transparent to-transparent" />

                {/* VinFast badge */}
                <div className="absolute top-5 left-5 bg-primary-500 text-white font-bold px-4 py-2 rounded-full text-sm shadow-lg">
                  ✅ VinFast Official
                </div>

                {/* No license badge */}
                <div className="absolute bottom-5 left-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 text-white">
                  <div className="text-xs text-primary-300 font-medium">Không cần bằng lái</div>
                  <div className="text-lg font-extrabold">100% Hợp pháp</div>
                </div>
              </div>

              {/* Floating range badge */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 bg-primary-500 rounded-2xl p-4 shadow-xl shadow-primary-500/30 text-center animate-bounce-slow">
                <div className="text-white font-extrabold text-2xl">60km</div>
                <div className="text-primary-100 text-xs">Range</div>
              </div>
            </div>

            {/* Info */}
            <div className={`transition-all duration-700 delay-200 ${heroIn ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="inline-flex items-center gap-2 bg-primary-500/20 border border-primary-500/40 text-primary-300 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></span>
                VinFast Electric Scooter · Da Nang, Vietnam
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                VinFast<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-300">
                  Evo Grand Lite
                </span>
              </h1>
              <p className="text-gray-400 leading-relaxed mb-8 text-base">{scooterData.description}</p>

              {/* Features grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {scooterData.features.map((f, i) => (
                  <div
                    key={f}
                    className={`flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 transition-all duration-500`}
                    style={{ transitionDelay: `${200 + i * 60}ms`, opacity: heroIn ? 1 : 0, transform: heroIn ? 'none' : 'translateX(16px)' }}
                  >
                    <div className="w-6 h-6 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-200">{f}</span>
                  </div>
                ))}
              </div>

              {/* Pricing tiers */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Bảng giá thuê</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 border border-primary-500/30 rounded-xl p-4 text-center">
                    <div className="text-primary-300 text-xs font-medium mb-1">1 ngày</div>
                    <div className="text-white font-extrabold text-2xl">200k</div>
                    <div className="text-gray-400 text-xs mt-0.5">200.000₫/ngày</div>
                  </div>
                  <div className="bg-primary-500/20 border border-primary-500/50 rounded-xl p-4 text-center relative overflow-hidden">
                    <div className="absolute top-1 right-2 text-xs text-primary-300 font-bold">Save 25%</div>
                    <div className="text-primary-300 text-xs font-medium mb-1">2+ days</div>
                    <div className="text-white font-extrabold text-2xl">150k</div>
                    <div className="text-gray-400 text-xs mt-0.5">150.000₫/ngày</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3">
                <Link to="/booking?scooter=1" className="btn-primary text-base px-8 py-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Now
                </Link>
                <a href="https://wa.me/84905659886" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/40 text-green-300 font-semibold px-8 py-4 rounded-full transition-all text-base">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Price Calculator ── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-dark-2">Price Calculator</h2>
            <p className="text-gray-500 mt-2">Drag the slider to see the price by number of days</p>
          </div>
          <div className="bg-gray-50 rounded-3xl p-8 shadow-inner">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">Number of days</span>
              <span className="text-2xl font-extrabold text-primary-600">{days} {days === 1 ? 'day' : 'days'}</span>
            </div>
            <input
              type="range" min={1} max={30} value={days}
              onChange={e => setDays(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-green-500 mb-6"
            />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-2xl p-4 shadow">
                <div className="text-xs text-gray-400 mb-1">Giá/ngày</div>
                <div className="text-xl font-extrabold text-primary-600">{perDay.toLocaleString('vi-VN')}₫</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow">
                <div className="text-xs text-gray-400 mb-1">Days</div>
                <div className="text-xl font-extrabold text-dark-2">{days}</div>
              </div>
              <div className="bg-primary-500 rounded-2xl p-4 shadow-lg shadow-primary-500/30">
                <div className="text-xs text-primary-100 mb-1">Total</div>
                <div className="text-xl font-extrabold text-white">{price.toLocaleString('vi-VN')}₫</div>
              </div>
            </div>
            {days >= 2 && (
              <p className="text-center text-primary-600 text-sm font-medium mt-4 animate-pulse">
                🎉 You save {(days * 50000).toLocaleString('vi-VN')}₫ compared to the 1-day rate!
              </p>
            )}
            <div className="mt-6 text-center">
              <Link to="/booking?scooter=1" className="btn-primary text-base px-10 py-4">
                Book {days} {days === 1 ? 'day' : 'days'} — {price.toLocaleString('vi-VN')}₫ →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Specs ── */}
      <section ref={specsRef} className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 transition-all duration-700 ${specsIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl font-bold text-dark-2">Technical Specifications</h2>
            <p className="text-gray-500 mt-2">Full details of the VinFast Evo Grand Lite</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {specs.map((spec, i) => (
              <div
                key={spec.label}
                className="bg-white rounded-2xl p-5 shadow hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center"
                style={{ transitionDelay: `${i * 60}ms`, opacity: specsIn ? 1 : 0, transform: specsIn ? 'none' : 'translateY(20px)' }}
              >
                <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{spec.label}</div>
                <div className="text-base font-bold text-dark-2">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Included ── */}
      <section ref={inclRef} className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 transition-all duration-700 ${inclIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl font-bold text-dark-2">What's Included</h2>
            <p className="text-gray-500 mt-2">Everything included in your rental price</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: '🪖', title: 'Quality Helmet', desc: 'Full-face helmet provided' },
              { icon: '🗺️', title: 'Tourist Map', desc: 'Da Nang attractions map' },
              { icon: '🚚', title: 'Free Delivery', desc: 'To your hotel door' },
              { icon: '📞', title: '24/7 Support', desc: 'Roadside assistance' }
            ].map((item, i) => (
              <div
                key={item.title}
                className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-primary-50 hover:-translate-y-1 transition-all duration-300 group"
                style={{ transitionDelay: `${i * 80}ms`, opacity: inclIn ? 1 : 0, transform: inclIn ? 'none' : 'translateY(20px)' }}
              >
                <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">{item.icon}</div>
                <div className="font-semibold text-dark-2 text-sm mb-1">{item.title}</div>
                <div className="text-gray-400 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=40')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
          <h2 className="text-4xl font-extrabold text-white mb-4">Ready to Ride?</h2>
          <p className="text-primary-100 text-lg mb-8">Book today — free delivery, no license needed!</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/booking?scooter=1" className="bg-white text-primary-600 hover:bg-primary-50 font-bold px-10 py-4 rounded-full transition-all hover:-translate-y-0.5 shadow-lg inline-flex items-center gap-2">
              Book Now →
            </Link>
            <a href="tel:+84905659886" className="bg-primary-700/50 hover:bg-primary-700 text-white font-semibold px-10 py-4 rounded-full transition-all inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              +84 905 659 886
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
