import { useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import axios from '../api';

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-2">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/banner.jpg')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark/90" />

      {/* Green glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6">
          Ride The{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-300">
            Future
          </span>
        </h1>
        <p className="text-2xl sm:text-3xl text-gray-200 font-medium mb-4">
          No License Needed
        </p>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Travel up to <span className="text-primary-400 font-semibold">100km</span>, swap batteries in{' '}
          <span className="text-primary-400 font-semibold">1 minute</span>, all without a driver's license.
          Explore Da Nang the eco-friendly way!
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/booking" className="btn-primary text-base px-8 py-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book Now
          </Link>
          <Link to="/electric-motorbike" className="btn-outline text-base px-8 py-4 text-white border-white/30 hover:border-primary-400 hover:bg-primary-500/10">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Scooters
          </Link>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto">
          {[
            { value: '60km', label: 'Range' },
            { value: '1 min', label: 'Battery Swap' },
            { value: '0', label: 'License Needed' }
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-primary-400">{s.value}</div>
              <div className="text-gray-400 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

/* ─── Scooter Showcase (single product) ─── */
function ScootersSection() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const features = ['No License Required', '60km Range', '1-Min Battery Swap', '100% Legal'];

  return (
    <section id="scooters" ref={ref} className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-primary-600 text-sm font-semibold uppercase tracking-wider">Our Electric Scooter</span>
          <h2 className="section-title mt-2">VinFast Evo Grand Lite</h2>
          <p className="section-subtitle">
            Premium VinFast electric scooter — no license needed, eco-friendly and 100% legal!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
          {/* Image */}
          <div className={`relative transition-all duration-700 delay-150 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src="/assets/intro.jpg"
                alt="VinFast Evo Grand Lite"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Popular badge */}
            <div className="absolute top-5 left-5 bg-primary-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              ⭐ Best Seller
            </div>
            {/* Range badge */}
            <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 text-center">
              <div className="text-2xl font-extrabold text-primary-600">60km</div>
              <div className="text-gray-400 text-xs">range</div>
            </div>
          </div>

          {/* Info */}
          <div className={`pt-6 lg:pt-0 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <h3 className="text-3xl font-extrabold text-dark-2 mb-2">VinFast Evo Grand Lite</h3>
            <p className="text-gray-500 text-sm mb-6">
              The perfect choice for exploring Da Nang. Stylish design, no license needed, eco-friendly.
            </p>

            {/* Features */}
            <ul className="grid grid-cols-2 gap-2.5 mb-6">
              {features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-700 bg-white rounded-xl px-3 py-2.5 shadow-sm">
                  <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            {/* Pricing tiers */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white rounded-2xl p-4 shadow text-center border border-gray-100">
                <div className="text-xs text-gray-400 mb-1 font-medium">1 day</div>
                <div className="text-2xl font-extrabold text-primary-600">200,000₫</div>
              </div>
              <div className="bg-primary-50 rounded-2xl p-4 shadow text-center border border-primary-200 relative overflow-hidden">
                <div className="absolute top-1 right-2 text-xs text-primary-500 font-bold">-25%</div>
                <div className="text-xs text-primary-600 mb-1 font-medium">2+ days</div>
                <div className="text-2xl font-extrabold text-primary-600">150,000₫/day</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Link to="/booking?scooter=1" className="btn-primary flex-1 justify-center text-sm">
                Book Now
              </Link>
              <Link to="/electric-motorbike" className="btn-outline flex-1 justify-center text-sm">
                View Details
              </Link>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className={`mt-16 grid grid-cols-3 gap-4 max-w-5xl mx-auto transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            '/assets/z7848049053773_91b9c21f271cf11d75540df23129fb02.jpg',
            '/assets/z7848049056601_f6683072c445f15defc6932241b7c24e.jpg',
            '/assets/z7848049057923_2bff46bc0133d6896f94b05cdd275ab2.jpg',
          ].map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
              <img
                src={src}
                alt={`T-EcoBike photo ${i + 1}`}
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why Choose ─── */
const benefits = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
    title: 'No License Required',
    desc: 'VinFast electric scooters are classified as e-bikes under Vietnamese law — no driver\'s license needed for tourists!'
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    ),
    title: '100% Legal',
    desc: 'Fully compliant with Vietnamese traffic regulations. Ride with total peace of mind anywhere in Da Nang.'
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
    title: '60km Range',
    desc: '60km of range per battery swap — more than enough to explore all of Da Nang and the surrounding areas.'
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    title: '1-Minute Battery Swap',
    desc: 'Ultra-fast battery swap in under 1 minute at convenient stations. No waiting around for charging!'
  }
];

function WhyChoose() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary-600 text-sm font-semibold uppercase tracking-wider">Why T-EcoBike</span>
          <h2 className="section-title mt-2">Why Choose Electric?</h2>
          <p className="section-subtitle">
            Reasons why electric scooters are the perfect choice for your Da Nang adventure
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="group p-7 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-primary-50 group-hover:bg-primary-500 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300">
                <svg className="w-7 h-7 text-primary-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {b.icon}
                </svg>
              </div>
              <h3 className="text-lg font-bold text-dark-2 mb-2">{b.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Safety Tips (Accordion) ─── */
const tips = [
  {
    q: 'Helmet regulations',
    a: 'All riders and passengers must wear a helmet throughout the journey. We provide high-quality helmets free of charge with every rental.'
  },
  {
    q: 'Obey traffic laws',
    a: 'Stay in the correct lane, stop at red lights, and follow all road signs. The recommended maximum speed in the Da Nang city centre is 40km/h.'
  },
  {
    q: 'Pre-ride inspection',
    a: 'Check the battery level, brakes, lights and tyres before each ride. If you notice anything unusual, contact us immediately for assistance.'
  },
  {
    q: 'What to do when the battery is low',
    a: 'When the battery is running low, find the nearest swap station via the VinFast app or call us at +84 905 659 886 for directions to the closest station within 10km.'
  },
  {
    q: 'Protect the scooter when parked',
    a: 'Always lock the scooter and take the key when you leave. Park in designated areas only. We are not responsible for damage caused by failing to follow parking guidelines.'
  }
];

function SafetyTips() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-20 lg:py-28 bg-dark-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">Stay Safe</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Safety & Tips
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Safety is our top priority. Please read and follow these guidelines for a safe and enjoyable ride.
            </p>
            <div className="space-y-3">
              {tips.map((tip, i) => (
                <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className={`font-medium text-sm ${open === i ? 'text-primary-400' : 'text-gray-200'}`}>
                      {tip.q}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-4 ${open === i ? 'rotate-180 text-primary-400' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {open === i && (
                    <div className="px-5 pb-4 text-gray-400 text-sm leading-relaxed border-t border-white/5">
                      <p className="pt-3">{tip.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-primary-500/10">
              <img
                src="/assets/z7848049053773_91b9c21f271cf11d75540df23129fb02.jpg"
                alt="Safe riding"
                className="w-full h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent rounded-2xl" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-5 -left-5 bg-primary-500 rounded-2xl p-5 shadow-xl shadow-primary-500/30">
              <div className="text-white font-bold text-3xl">24/7</div>
              <div className="text-primary-100 text-sm">Roadside Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Rental Process ─── */
const steps = [
  {
    step: '01',
    title: 'Book Online',
    desc: 'Book via our website or WhatsApp. Fast, easy and instantly confirmed.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  },
  {
    step: '02',
    title: 'Submit Documents',
    desc: 'Provide a valid ID or passport. No driver\'s license required — just a valid identity document!',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
  },
  {
    step: '03',
    title: 'Free Delivery',
    desc: 'Your scooter is delivered free of charge to your hotel or any central Da Nang location. No pick-up needed!',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
  },
  {
    step: '04',
    title: 'Ride & Explore',
    desc: 'Pay by cash or credit card (3% fee). Explore Da Nang your way!',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  }
];

function RentalProcess() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary-600 text-sm font-semibold uppercase tracking-wider">How It Works</span>
          <h2 className="section-title mt-2">Rental Process</h2>
          <p className="section-subtitle">
            Just 4 simple steps to get your electric scooter for the journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {steps.map((s, i) => (
            <div key={i} className="relative group h-full">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-primary-300 to-gray-200 z-0 -translate-x-6" />
              )}
              <div className="relative bg-white rounded-2xl p-6 shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 z-10 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {s.icon}
                    </svg>
                  </div>
                  <span className="text-4xl font-extrabold text-gray-100 select-none">{s.step}</span>
                </div>
                <h3 className="text-base font-bold text-dark-2 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/booking" className="btn-primary text-base px-10 py-4">
            Start Your Journey →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    axios.get('/api/testimonials').then(r => setTestimonials(r.data)).catch(() => {
      setTestimonials([
        { id: 1, author: 'Sarah Johnson', country: 'Australia', rating: 5, content: 'Amazing experience! The scooters are in perfect condition and the staff is incredibly helpful. No license needed made it super easy for us tourists. Highly recommend for exploring Hoi An!', avatar: 'https://i.pravatar.cc/100?img=1' },
        { id: 2, author: 'Thomas Müller', country: 'Germany', rating: 5, content: 'Perfect service! The electric scooters are quiet, eco-friendly and very easy to ride. The battery swap stations are conveniently located. Will definitely rent again!', avatar: 'https://i.pravatar.cc/100?img=3' },
        { id: 3, author: 'Emily Chen', country: 'USA', rating: 5, content: 'Best way to explore Hoi An! The delivery to our hotel was on time and the helmets were provided. The 60km range was more than enough for a full day of sightseeing.', avatar: 'https://i.pravatar.cc/100?img=5' }
      ]);
    });
  }, []);

  if (!testimonials.length) return null;

  const t = testimonials[idx];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-primary-600 text-sm font-semibold uppercase tracking-wider">Reviews</span>
          <h2 className="section-title mt-2">Customer Testimonials</h2>
          <p className="section-subtitle">
            Thousands of travellers trust and love riding with T-EcoBike
          </p>
        </div>

        {/* Rating summary */}
        <div className="flex justify-center gap-8 mb-12">
          <div className="text-center">
            <div className="text-5xl font-extrabold text-dark-2">4.9</div>
            <div className="flex justify-center gap-0.5 mt-1">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="text-gray-400 text-sm mt-1">Google Rating</div>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center">
            <div className="text-5xl font-extrabold text-dark-2">500+</div>
            <div className="text-gray-400 text-sm mt-2">Happy Customers</div>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="text-center">
            <div className="text-5xl font-extrabold text-dark-2">20+</div>
            <div className="text-gray-400 text-sm mt-2">Countries</div>
          </div>
        </div>

        {/* Main testimonial */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-50 rounded-3xl p-8 md:p-12 text-center relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-primary-300 text-8xl leading-none font-serif">"</div>
            <p className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10">{t.content}</p>
            <div className="flex items-center justify-center gap-4">
              <img src={t.avatar} alt={t.author} className="w-14 h-14 rounded-full object-cover border-2 border-primary-300" />
              <div className="text-left">
                <div className="font-bold text-dark-2">{t.author}</div>
                <div className="text-gray-400 text-sm flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`rounded-full transition-all ${i === idx ? 'w-8 h-2.5 bg-primary-500' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'}`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
          {testimonials.map((t2, i) => (
            <button
              key={t2.id}
              onClick={() => setIdx(i)}
              className={`p-4 rounded-xl text-left transition-all ${i === idx ? 'bg-primary-50 border-2 border-primary-300' : 'bg-gray-50 border-2 border-transparent hover:border-gray-200'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <img src={t2.avatar} alt={t2.author} className="w-8 h-8 rounded-full" />
                <span className="text-xs font-semibold text-dark-2 truncate">{t2.author}</span>
              </div>
              <div className="flex gap-0.5 mb-1.5">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} className={`w-3 h-3 ${s <= t2.rating ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
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

/* ─── CTA Banner ─── */
function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Ready to Ride the Future?
        </h2>
        <p className="text-primary-100 text-lg mb-8">
          Book today — Free delivery, no license needed, lightning-fast battery swap!
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/booking" className="bg-white text-primary-600 hover:bg-primary-50 font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5 shadow-lg inline-flex items-center gap-2">
            Book Now →
          </Link>
          <a
            href="https://wa.me/84905659886"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-700/50 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-full transition-all inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <>
      <Hero />
      <ScootersSection />
      <WhyChoose />
      <SafetyTips />
      <RentalProcess />
      <Testimonials />
      <CTABanner />
    </>
  );
}
