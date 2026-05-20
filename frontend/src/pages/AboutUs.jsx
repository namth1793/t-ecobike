import { Link } from 'react-router-dom';

const team = [
  {
    name: 'Minh Vũ',
    role: 'Founder & CEO',
    img: 'https://i.pravatar.cc/200?img=12',
    desc: 'Người sáng lập với đam mê du lịch xanh và phát triển bền vững tại Hội An.'
  },
  {
    name: 'Lan Anh',
    role: 'Operations Manager',
    img: 'https://i.pravatar.cc/200?img=25',
    desc: 'Điều phối hoạt động hàng ngày, đảm bảo dịch vụ khách hàng hoàn hảo.'
  },
  {
    name: 'Tuấn Nguyễn',
    role: 'Head Mechanic',
    img: 'https://i.pravatar.cc/200?img=15',
    desc: 'Kỹ thuật viên trưởng chịu trách nhiệm bảo dưỡng và kiểm tra toàn bộ đội xe.'
  }
];

const milestones = [
  { year: '2019', title: 'Founded', desc: 'T-EcoBike được thành lập với 5 chiếc xe đầu tiên' },
  { year: '2020', title: 'Expansion', desc: 'Mở rộng đội xe lên 30 chiếc, phục vụ 1.000+ khách hàng' },
  { year: '2022', title: 'VinFast Partner', desc: 'Trở thành đại lý cho thuê chính thức của VinFast tại Đà Nẵng' },
  { year: '2024', title: 'New Location', desc: 'Khai trương địa điểm tại 135 Trần Nhân Tông, Phường Hội An Đông, Thành Phố Đà Nẵng' }
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
              Chúng tôi tin rằng du lịch xanh là tương lai. Từ năm 2019, T-EcoBike đã tiên phong
              trong việc mang đến trải nghiệm khám phá Đà Nẵng theo cách thân thiện với môi trường nhất —
              hoàn toàn bằng điện, không ô nhiễm, không tiếng ồn.
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
                Cung cấp dịch vụ cho thuê xe điện cao cấp, giúp du khách khám phá Hội An theo cách thân thiện
                với môi trường nhất. Chúng tôi cam kết mang lại sự tiện lợi, an toàn và trải nghiệm đáng nhớ
                cho mỗi khách hàng.
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
                Trở thành dịch vụ cho thuê xe điện hàng đầu tại miền Trung Việt Nam, góp phần vào việc
                giảm ô nhiễm môi trường và thúc đẩy du lịch bền vững tại Hội An, Di sản Văn hóa Thế giới.
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
            <p className="text-gray-500 mt-2">Từ ý tưởng nhỏ đến dịch vụ được tin tưởng bởi hàng nghìn du khách</p>
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
            <p className="text-gray-500 mt-2">Đội ngũ tận tâm, luôn sẵn sàng phục vụ bạn</p>
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
                Hội An là Di sản Văn hóa Thế giới — một nơi cần được bảo vệ và gìn giữ cho các thế hệ tương lai.
                Xe điện giúp giảm ô nhiễm không khí, tiếng ồn và góp phần bảo vệ không gian cổ kính này.
              </p>
              <ul className="space-y-3">
                {[
                  '0% khí thải CO₂',
                  'Tiếng ồn gần như bằng 0',
                  'Chi phí vận hành thấp hơn xe xăng',
                  'Phù hợp với khu phố cổ Hội An',
                  'Đóng góp vào du lịch bền vững'
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
          <p className="text-primary-100 mb-8">Cùng chúng tôi khám phá Hội An theo cách xanh nhất!</p>
          <Link to="/booking" className="bg-white text-primary-600 hover:bg-primary-50 font-bold px-10 py-4 rounded-full transition-all hover:shadow-lg inline-block">
            Book a Scooter →
          </Link>
        </div>
      </section>
    </div>
  );
}
