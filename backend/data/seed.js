const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'xe_dien.db');

let db;

function getDB() {
  if (!db) db = new Database(DB_PATH);
  return db;
}

function initDB() {
  const db = getDB();

  db.exec(`
    CREATE TABLE IF NOT EXISTS scooters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      model TEXT NOT NULL,
      price_per_day INTEGER NOT NULL,
      range_km INTEGER NOT NULL,
      image TEXT,
      description TEXT,
      features TEXT,
      available INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT,
      phone TEXT NOT NULL,
      scooter_id INTEGER,
      scooter_name TEXT,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      days INTEGER NOT NULL,
      total_price INTEGER NOT NULL,
      hotel_address TEXT,
      note TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author TEXT NOT NULL,
      country TEXT,
      rating INTEGER DEFAULT 5,
      content TEXT NOT NULL,
      avatar TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const count = db.prepare('SELECT COUNT(*) as c FROM scooters').get();
  if (count.c === 0) seedData(db);
}

function seedData(db) {
  const scooters = [
    {
      name: 'Vinfast Evo Grand Lite',
      model: 'Evo Grand Lite',
      price_per_day: 200000,
      range_km: 60,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      description: 'Xe máy điện VinFast Evo Grand Lite - Lựa chọn hoàn hảo cho hành trình khám phá Đà Nẵng. Không cần bằng lái, tầm hoạt động 60km, đổi pin chỉ 1 phút.',
      features: JSON.stringify([
        'Không cần bằng lái xe',
        'Tầm hoạt động 60km/lần sạc',
        'Đổi pin trong 1 phút',
        'Hợp pháp 100% theo luật VN',
        'Bảo hành toàn quốc VinFast',
        'GPS tracking tích hợp'
      ]),
      available: 1
    }
  ];

  const insertScooter = db.prepare(`
    INSERT INTO scooters (name, model, price_per_day, range_km, image, description, features, available)
    VALUES (@name, @model, @price_per_day, @range_km, @image, @description, @features, @available)
  `);
  scooters.forEach(s => insertScooter.run(s));

  const testimonials = [
    {
      author: 'Sarah Johnson',
      country: 'Australia',
      rating: 5,
      content: 'Amazing experience! The scooters are in perfect condition and the staff is incredibly helpful. No license needed made it super easy for us tourists. Highly recommend for exploring Hoi An!',
      avatar: 'https://i.pravatar.cc/100?img=1'
    },
    {
      author: 'Thomas Müller',
      country: 'Germany',
      rating: 5,
      content: 'Perfect service! The electric scooters are quiet, eco-friendly and very easy to ride. The battery swap stations are conveniently located. Will definitely rent again!',
      avatar: 'https://i.pravatar.cc/100?img=3'
    },
    {
      author: 'Emily Chen',
      country: 'USA',
      rating: 5,
      content: 'Best way to explore Hoi An! The delivery to our hotel was on time and the helmets were provided. The 60km range was more than enough for a full day of sightseeing.',
      avatar: 'https://i.pravatar.cc/100?img=5'
    },
    {
      author: 'Nguyen Minh Tuan',
      country: 'Vietnam',
      rating: 5,
      content: 'Dịch vụ tuyệt vời! Xe sạch đẹp, pin đầy, giao xe tận khách sạn. Đổi pin rất nhanh và thuận tiện. Chắc chắn sẽ thuê lại lần sau!',
      avatar: 'https://i.pravatar.cc/100?img=7'
    },
    {
      author: 'Marie Dupont',
      country: 'France',
      rating: 5,
      content: 'Très belle expérience! Les scooters sont en excellent état. Le service client est réactif et la livraison à l\'hôtel est très pratique. Je recommande vivement!',
      avatar: 'https://i.pravatar.cc/100?img=9'
    }
  ];

  const insertTestimonial = db.prepare(`
    INSERT INTO testimonials (author, country, rating, content, avatar)
    VALUES (@author, @country, @rating, @content, @avatar)
  `);
  testimonials.forEach(t => insertTestimonial.run(t));
}

module.exports = { getDB, initDB };
