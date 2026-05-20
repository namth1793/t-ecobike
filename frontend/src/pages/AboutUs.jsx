import { Link } from 'react-router-dom';

const team = [
  {
    name: 'Minh Vu',
    role: 'Founder & CEO',
    img: 'https://i.pravatar.cc/200?img=12',
    desc: 'Founder with a passion for sustainable green tourism in Da Nang.'
  },
  {
    name: 'Lan Anh',
    role: 'Operations Manager',
    img: 'https://i.pravatar.cc/200?img=25',
    desc: 'Coordinates daily operations to ensure a perfect customer experience every time.'
  },
  {
    name: 'Tuan Nguyen',
    role: 'Head Mechanic',
    img: 'https://i.pravatar.cc/200?img=15',
    desc: 'Lead technician responsible for maintaining and inspecting the entire scooter fleet.'
  }
];

const milestones = [
  { year: '2019', title: 'Founded', desc: 'T-EcoBike was established with the first 5 electric scooters' },
  { year: '2020', title: 'Expansion', desc: 'Fleet grew to 30 scooters, serving 1,000+ happy customers' },
  { year: '2022', title: 'VinFast Partner', desc: 'Became an official VinFast authorised rental partner in Da Nang' },
  { year: '2024', title: 'New Location', desc: 'Opened our new location at 135 Tran Nhan Tong, Hoi An Dong Ward, Da Nang' }
];

export default function AboutUs() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative bg-dark-2 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=1400&q=60')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-2/90 to-dark-2" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
            <Link to="/" className="hover:text-primary-400">Home</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-300">About Us</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold text-white mb-6">
              About <span className="text-primary-400">T-EcoBike</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              We believe green travel is the future. Since 2019, T-EcoBike has been pioneering
              the most eco-friendly way to explore Da Nang —
              100% electric, zero pollution, zero noise.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gray-50 rounded-3xl p-8">
              <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-dark-2 mb-3">Our Mission</h3>
              <p className="text-gray-500 leading-relaxed">
                To provide premium electric scooter rentals that help travellers explore Da Nang
                in the most eco-friendly way. We are committed to delivering convenience,
                safety and unforgettable experiences for every customer.
              </p>
            </div>
            <div className="bg-primary-600 rounded-3xl p-8 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
              <p className="text-primary-100 leading-relaxed">
                To become the leading electric scooter rental service in Central Vietnam, contributing
                to reduced environmental pollution and promoting sustainable tourism in Da Nang, a UNESCO World Heritage city.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Happy Customers' },
              { value: '50+', label: 'Electric Scooters' },
              { value: '20+', label: 'Countries' },
              { value: '4.9★', label: 'Average Rating' }
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-extrabold text-white mb-1">{s.value}</div>
                <div className="text-primary-100 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-2">Our Journey</h2>
            <p className="text-gray-500 mt-2">From a small idea to a service trusted by thousands of travellers</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-primary-200" />
            {milestones.map((m, i) => (
              <div key={m.year} className={`relative flex items-center gap-8 mb-10 ${i % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                <div className={`flex-1 bg-white rounded-2xl p-5 shadow ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="text-primary-500 font-bold text-sm mb-1">{m.year}</div>
                  <div className="text-dark-2 font-bold">{m.title}</div>
                  <div className="text-gray-500 text-sm mt-1">{m.desc}</div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-primary-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark-2">Meet Our Team</h2>
            <p className="text-gray-500 mt-2">A dedicated team, always ready to serve you</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map(m => (
              <div key={m.name} className="text-center group">
                <div className="relative inline-block mb-4">
                  <img src={m.img} alt={m.name} className="w-24 h-24 rounded-2xl object-cover mx-auto group-hover:scale-105 transition-transform shadow-lg" />
                </div>
                <div className="font-bold text-dark-2">{m.name}</div>
                <div className="text-primary-500 text-sm font-medium mb-2">{m.role}</div>
                <p className="text-gray-500 text-sm">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Electric */}
      <section className="py-20 bg-dark-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">Sustainability</span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-4">
                Why We Choose Electric
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Da Nang is a vibrant city that deserves to be protected for future generations.
                Electric scooters help reduce air pollution and noise, contributing to the preservation of this beautiful destination.
              </p>
              <ul className="space-y-3">
                {[
                  '0% CO₂ emissions',
                  'Near-silent operation',
                  'Lower running costs than petrol bikes',
                  'Perfect for navigating the city centre',
                  'Contributes to sustainable tourism'
                ].map(i => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                    <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=700&q=80" alt="Eco" className="w-full h-80 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-extrabold text-white mb-4">Join Our Green Journey</h2>
          <p className="text-primary-100 mb-8">Join us and explore Da Nang the greenest way possible!</p>
          <Link to="/booking" className="bg-white text-primary-600 hover:bg-primary-50 font-bold px-10 py-4 rounded-full transition-all hover:shadow-lg inline-block">
            Book a Scooter →
          </Link>
        </div>
      </section>
    </div>
  );
}
