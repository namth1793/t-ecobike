import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from '../api';

const PRICE_1DAY = 200000;
const PRICE_MULTI = 150000;

function calcTotal(days) {
  if (days <= 0) return 0;
  if (days === 1) return PRICE_1DAY;
  return days * PRICE_MULTI;
}

function calcPerDay(days) {
  if (days <= 0) return 0;
  if (days === 1) return PRICE_1DAY;
  return PRICE_MULTI;
}

export default function BookingPage() {
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    scooter_id: '1',
    start_date: '',
    end_date: '',
    hotel_address: '',
    note: ''
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const calcDays = () => {
    if (!form.start_date || !form.end_date) return 0;
    const diff = new Date(form.end_date) - new Date(form.start_date);
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const days = calcDays();
  const total = calcTotal(days);
  const perDay = calcPerDay(days);

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/bookings', {
        ...form,
        scooter_id: 1,
        scooter_name: 'VinFast Evo Grand Lite',
        days,
        total_price: total
      });
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center py-16 animate-fade-up">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-dark-2 mb-3">Đặt xe thành công! 🎉</h2>
          <p className="text-gray-500 mb-2">Cảm ơn bạn đã tin tưởng T-EcoBike!</p>
          <p className="text-gray-500 text-sm mb-8">
            Chúng tôi sẽ liên hệ xác nhận qua số điện thoại hoặc email. Xe sẽ được giao đến địa chỉ của bạn vào ngày thuê.
          </p>
          <div className="bg-primary-50 rounded-2xl p-5 mb-8 text-left">
            <div className="text-sm font-semibold text-dark-2 mb-3">📋 Thông tin đặt xe</div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Xe:</span>
                <span className="font-medium">VinFast Evo Grand Lite</span>
              </div>
              <div className="flex justify-between">
                <span>Số ngày:</span>
                <span className="font-medium">{days} ngày</span>
              </div>
              <div className="flex justify-between">
                <span>Giá/ngày:</span>
                <span className="font-medium">{perDay.toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="flex justify-between border-t border-primary-200 pt-2 mt-2">
                <span className="font-semibold">Tổng cộng:</span>
                <span className="font-bold text-primary-600 text-lg">{total.toLocaleString('vi-VN')}₫</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <a href="https://wa.me/84905659886" target="_blank" rel="noopener noreferrer" className="btn-primary justify-center">
              Liên hệ qua WhatsApp
            </a>
            <Link to="/" className="btn-outline justify-center">
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-dark-2 py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/10 rounded-full blur-[80px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
            <Link to="/" className="hover:text-primary-400">Home</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-300">Đặt xe</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">
            Đặt xe <span className="text-primary-400">VinFast Evo Grand Lite</span>
          </h1>
          <p className="text-gray-400">Giao xe tận nơi · Không cần bằng lái · Xác nhận ngay!</p>

          {/* Pricing chips */}
          <div className="flex flex-wrap gap-3 mt-5">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm text-white">
              <span className="text-primary-400 font-bold">1 ngày:</span> 200.000₫
            </div>
            <div className="flex items-center gap-2 bg-primary-500/20 border border-primary-500/40 rounded-full px-4 py-2 text-sm text-white">
              <span className="text-primary-300 font-bold">Từ 2 ngày:</span> 150.000₫/ngày
              <span className="text-xs bg-primary-500 rounded-full px-2 py-0.5">-25%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-dark-2">Thông tin đặt xe</h2>
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 text-red-600 rounded-xl p-4 mb-6 text-sm">
                    Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ +84 905 659 886.
                  </div>
                )}

                <form onSubmit={submit} className="space-y-5">
                  {/* Selected scooter */}
                  <div className="flex items-center gap-4 p-4 bg-primary-50 border-2 border-primary-200 rounded-2xl">
                    <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold text-dark-2 text-sm">VinFast Evo Grand Lite</div>
                      <div className="text-primary-600 text-xs font-medium">Không cần bằng lái · 60km range · Đổi pin 1 phút</div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-primary-600 font-extrabold text-sm">Từ 150k/ngày</div>
                      <div className="text-gray-400 text-xs">1 ngày: 200k</div>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Họ tên <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="full_name" value={form.full_name} onChange={handle} required
                        placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Điện thoại <span className="text-red-400">*</span>
                      </label>
                      <input
                        name="phone" value={form.phone} onChange={handle} required
                        placeholder="+84 905 659 886"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input
                      type="email" name="email" value={form.email} onChange={handle}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                    />
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Ngày bắt đầu <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="date" name="start_date" value={form.start_date} onChange={handle} required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Ngày kết thúc <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="date" name="end_date" value={form.end_date} onChange={handle} required
                        min={form.start_date || new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Địa chỉ giao xe</label>
                    <input
                      name="hotel_address" value={form.hotel_address} onChange={handle}
                      placeholder="Tên khách sạn hoặc địa chỉ giao xe"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ghi chú thêm</label>
                    <textarea
                      name="note" value={form.note} onChange={handle}
                      rows={3}
                      placeholder="Yêu cầu đặc biệt (nếu có)..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center py-4 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                  >
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Xác nhận đặt xe {days > 0 ? `— ${total.toLocaleString('vi-VN')}₫` : ''}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 shadow-sm sticky top-24">
                <h3 className="font-bold text-dark-2 mb-5">📋 Tóm tắt đặt xe</h3>

                {/* Scooter */}
                <div className="bg-gray-50 rounded-2xl p-4 mb-5">
                  <div className="text-xs text-gray-400 mb-1">Xe thuê</div>
                  <div className="font-bold text-dark-2 text-sm">VinFast Evo Grand Lite</div>
                  <div className="text-primary-500 text-xs mt-0.5">Không cần bằng lái · 60km range</div>
                </div>

                {/* Pricing */}
                {days > 0 ? (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Số ngày</span>
                      <span className="font-medium">{days} ngày</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Giá/ngày</span>
                      <span className="font-medium text-primary-600">{perDay.toLocaleString('vi-VN')}₫</span>
                    </div>
                    {days >= 2 && (
                      <div className="bg-primary-50 rounded-xl px-3 py-2 text-xs text-primary-600 font-medium">
                        🎉 Bạn tiết kiệm {(days * 50000).toLocaleString('vi-VN')}₫ so với giá 1 ngày!
                      </div>
                    )}
                    <div className="border-t border-gray-100 pt-3">
                      <div className="flex justify-between">
                        <span className="font-bold text-dark-2">Tổng cộng</span>
                        <span className="font-extrabold text-primary-600 text-xl">
                          {total.toLocaleString('vi-VN')}₫
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">Chọn ngày để xem tổng chi phí</p>
                )}

                <div className="mt-6 pt-5 border-t border-gray-100 space-y-2.5">
                  {['Giao xe tận nơi miễn phí', 'Mũ bảo hiểm được cung cấp', 'Hỗ trợ 24/7', 'Thanh toán tiền mặt hoặc thẻ'].map(item => (
                    <div key={item} className="flex items-center gap-2 text-xs text-gray-500">
                      <svg className="w-4 h-4 text-primary-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-5 border-t border-gray-100">
                  <div className="text-xs text-gray-400 mb-2">Cần hỗ trợ?</div>
                  <a href="tel:+84905659886" className="flex items-center gap-2 text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors mb-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    +84 905 659 886
                  </a>
                  <a href="https://wa.me/84905659886" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-green-600 font-semibold text-sm hover:text-green-700 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
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
