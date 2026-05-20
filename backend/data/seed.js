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

    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      image TEXT,
      author TEXT DEFAULT 'T-EcoBike Team',
      author_avatar TEXT,
      read_time INTEGER DEFAULT 5,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const count = db.prepare('SELECT COUNT(*) as c FROM scooters').get();
  if (count.c === 0) seedData(db);
  const postCount = db.prepare('SELECT COUNT(*) as c FROM posts').get();
  if (postCount.c === 0) seedPosts(db);
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

function seedPosts(db) {
  const posts = [
    {
      title: 'Top 10 Must-Visit Places in Da Nang by Electric Scooter',
      slug: 'top-10-places-da-nang-electric-scooter',
      category: 'Travel Guide',
      excerpt: 'Discover the best spots in Da Nang that are perfect to explore on an electric scooter — from golden beaches to ancient streets.',
      content: `Da Nang is one of Vietnam's most vibrant coastal cities, and there's no better way to explore it than on a silent, eco-friendly electric scooter. Here are the top 10 destinations you should add to your itinerary:

**1. My Khe Beach (Mỹ Khê)**
Known as one of the most beautiful beaches in the world by Forbes, My Khe stretches over 30km of golden sand. Ride along the beach road at sunrise for a magical experience.

**2. Dragon Bridge (Cầu Rồng)**
The iconic Dragon Bridge breathes fire and water every weekend night. Park your scooter nearby and enjoy the spectacular show at 9 PM on Saturdays and Sundays.

**3. Son Tra Peninsula (Bán Đảo Sơn Trà)**
A winding mountain road leads to the Linh Ung Pagoda with its 67-meter Goddess of Mercy statue. The views from the top are absolutely breathtaking.

**4. Marble Mountains (Ngũ Hành Sơn)**
Just 9km from the city centre, these five limestone hills hide caves, tunnels, temples, and panoramic viewpoints. Your electric scooter gets you there in 20 minutes.

**5. Han River Night Market**
Come alive after dark, the Han River area is perfect for a scooter cruise. Grab fresh seafood, browse local crafts, and soak in the riverside atmosphere.

**6. Ba Na Hills Cable Car**
The world's longest single-track cable car. Ride your scooter to the base station and take the cable car up to the famous Golden Bridge.

**7. My Son Sanctuary (Thánh Địa Mỹ Sơn)**
A 45-minute scooter ride from Da Nang brings you to this UNESCO World Heritage Site — ancient Cham temple ruins set in a lush valley.

**8. Hoi An Ancient Town**
Hop on your scooter for a 30km coastal ride south to the enchanting ancient town of Hoi An. The journey along the coast is as beautiful as the destination.

**9. Lady Buddha Statue**
At 67 metres tall, the Lady Buddha at Linh Ung Pagoda is one of the largest Buddhist statues in Southeast Asia. Free entry, stunning sea views.

**10. Da Nang Night Street Food Scene**
Head to Hoang Dieu Street or the Night Market near the Han River for the best banh mi, cao lau, and freshly grilled seafood. Your scooter means you can easily hop between stalls!

**Pro tip:** Book your VinFast Evo Grand Lite with T-EcoBike for free delivery to your hotel. Our 60km range covers all these spots with ease — and our battery swap stations mean you never run out of power.`,
      image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&q=80',
      author: 'Minh Vu',
      author_avatar: 'https://i.pravatar.cc/100?img=12',
      read_time: 7
    },
    {
      title: 'VinFast Evo Grand Lite: The Perfect Scooter for Da Nang Tourists',
      slug: 'vinfast-evo-grand-lite-review-da-nang',
      category: 'Scooter Review',
      excerpt: 'An in-depth look at the VinFast Evo Grand Lite — why it\'s the ideal electric scooter for exploring Da Nang without a license.',
      content: `The VinFast Evo Grand Lite is rapidly becoming the go-to electric scooter for tourists in Da Nang. But what makes it so special? We break it down for you.

**What Is the VinFast Evo Grand Lite?**
The Evo Grand Lite is VinFast's flagship electric scooter in the "no license required" category. Under Vietnamese traffic law, scooters under 50cc equivalent (or electric scooters under 4kW) do not require a driver's licence — making the Evo Grand Lite perfectly legal for all tourists.

**Key Specifications**
- **Motor:** 4kW brushless electric motor
- **Range:** Up to 60km per battery charge
- **Top Speed:** 50 km/h (more than enough for city riding)
- **Battery Swap:** 1-minute swap at any VinFast battery station
- **Weight:** 98kg (lightweight and easy to manoeuvre)
- **Charging Time:** Full charge in 4-5 hours (or instant battery swap)

**Why Tourists Love It**

*No License Required*
This is the game-changer. Whether you're from Australia, Europe, the USA or anywhere else in the world, you can legally ride the Evo Grand Lite in Vietnam with just a valid passport or ID.

*Silent & Smooth*
Electric motors mean zero engine noise. You'll glide through Da Nang's streets, enjoying the sounds of the city without contributing to noise pollution.

*Eco-Friendly*
Zero direct CO₂ emissions make the Evo Grand Lite the greenest way to explore Da Nang. You're doing your part for the environment while having the adventure of a lifetime.

*VinFast Reliability*
As Vietnam's national automotive brand, VinFast maintains strict quality standards. Every scooter in our fleet undergoes thorough inspection before each rental.

**Range Anxiety? Not Here.**
The 60km range comfortably covers a full day of sightseeing in Da Nang. If you're heading further (like Hoi An, 30km away), our battery swap network means you can top up in 60 seconds and keep going.

**Verdict**
The VinFast Evo Grand Lite earns a 9.5/10 for tourists. It's reliable, legal, eco-friendly, and genuinely fun to ride. At T-EcoBike, we rent it from just 150,000₫/day for 2+ day bookings.`,
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&q=80',
      author: 'Tuan Nguyen',
      author_avatar: 'https://i.pravatar.cc/100?img=15',
      read_time: 6
    },
    {
      title: 'Electric Scooter Safety Guide: How to Ride Safely in Da Nang',
      slug: 'electric-scooter-safety-guide-da-nang',
      category: 'Safety',
      excerpt: 'Essential safety tips for riding an electric scooter in Da Nang — from traffic rules to road conditions and what to do in an emergency.',
      content: `Riding an electric scooter in Da Nang is an incredible experience — but safety always comes first. Follow these guidelines to ensure a smooth, incident-free journey.

**1. Always Wear Your Helmet**
We provide a high-quality helmet with every rental — and wearing it is mandatory under Vietnamese law. Make sure the chin strap is securely fastened before you set off.

**2. Understand Vietnamese Traffic Flow**
Vietnamese traffic may seem chaotic at first, but there's a rhythm to it. Key points:
- Traffic drives on the **right side** of the road
- At intersections, vehicles often merge and yield gradually — don't panic, just slow down and blend in
- Turn signals are important — use them!
- Motorbikes can travel in bus lanes in many areas

**3. Start Slow**
If it's your first time on a scooter in Asia, spend the first 10 minutes riding in a quiet area to get comfortable with the throttle and brakes before heading into traffic.

**4. Stay in the Right Lane**
Slower vehicles (including scooters) should keep to the right lane. Faster vehicles like cars will overtake on your left.

**5. Watch Out for Road Hazards**
- **Sand and gravel:** Common near beach areas — reduce speed
- **Potholes:** Less common in Da Nang but still present in older areas
- **Wet roads:** Reduce speed by 30% in wet conditions — electric brakes can feel different in rain

**6. Park Safely**
Always park in designated areas. Look for the motorcycle parking zones marked with motorbike symbols. Never block pedestrian paths or fire exits.

**7. Night Riding**
Da Nang is generally safe at night, but visibility drops. Make sure your headlight is on and stick to well-lit roads. Avoid rural roads after dark.

**8. Emergency Contacts**
- **T-EcoBike 24/7 Support:** +84 905 659 886
- **Police Emergency:** 113
- **Ambulance:** 115
- **Fire:** 114

**9. Battery Swap Locations**
If your battery runs low, don't worry. Contact us at +84 905 659 886 and we'll guide you to the nearest swap station within 10km.

**10. Stay Hydrated**
Da Nang is hot and humid, especially from April to August. Bring a water bottle and take breaks in the shade. Fatigue and dehydration increase accident risk.

**Remember:** Our team is always just one phone call away. We'd rather you call us with a question than end up in a difficult situation. Ride safe and enjoy beautiful Da Nang!`,
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80',
      author: 'Lan Anh',
      author_avatar: 'https://i.pravatar.cc/100?img=25',
      read_time: 8
    },
    {
      title: 'Da Nang vs. Hoi An: Which City is Better to Explore by Scooter?',
      slug: 'da-nang-vs-hoi-an-scooter-comparison',
      category: 'Travel Guide',
      excerpt: 'Comparing two of Vietnam\'s most beloved destinations from a scooter rider\'s perspective — and how to visit both in one trip.',
      content: `Two cities, one electric scooter, and a coastal road that connects them. Da Nang and Hoi An are neighbouring gems in Central Vietnam — but which is better for scooter exploration? The answer might surprise you.

**Da Nang: The City Rider's Paradise**

Da Nang is a modern, fast-growing city with wide roads, good infrastructure, and relatively organised traffic. For scooter riders, this means:

- Wide boulevards along the Han River
- Well-marked lanes and traffic lights
- Plenty of parking throughout the city
- Great coastal road along My Khe Beach
- Easy access to Son Tra Peninsula (mountain road!)
- Modern petrol stations (and our battery swap network)

The city's scale means there's always something new to discover. From the Dragon Bridge to the Marble Mountains, you can cover Da Nang's highlights in 2-3 days on a scooter.

**Hoi An: The Ancient Town Experience**

Hoi An is a completely different vibe. The UNESCO-listed Ancient Town is actually a no-vehicle zone — you'll need to park your scooter and explore on foot or by bicycle within the old town itself. But:

- The surrounding countryside is stunning scooter territory
- Rural rice paddies, fishing villages, and empty roads
- Cam Nam Island (just across the bridge) is perfect for scooter exploration
- An Bang Beach is a 5km scooter ride from the Ancient Town centre
- My Son Sanctuary is 40km from Hoi An — easily doable by scooter

**The Coastal Route Between Them**
The 30km coastal highway connecting Da Nang and Hoi An is arguably the best scooter road in Central Vietnam. You'll pass:
- Non Nuoc Beach
- Marble Mountains
- Traditional stone-carving villages
- Coconut palm forests

**Verdict**
Do both! Rent your VinFast Evo Grand Lite in Da Nang, explore the city for 1-2 days, then ride the coastal route to Hoi An for a day trip. The 60km range comfortably covers the round trip — or use our battery swap points along the way.

**Practical Tips**
- Allow 45-60 minutes for the Da Nang → Hoi An coastal route (it's worth taking slow)
- Start the Hoi An day trip before 10 AM to avoid tourist crowds
- Return to Da Nang before sunset for the Dragon Bridge fire show`,
      image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&q=80',
      author: 'Minh Vu',
      author_avatar: 'https://i.pravatar.cc/100?img=12',
      read_time: 7
    },
    {
      title: 'Why Electric Scooters Are the Greenest Way to Travel in Da Nang',
      slug: 'electric-scooters-eco-friendly-travel-da-nang',
      category: 'Eco Travel',
      excerpt: 'How choosing an electric scooter over a petrol motorbike makes a real difference to Da Nang\'s environment and your travel experience.',
      content: `Sustainable tourism is no longer a buzzword — it's a responsibility. Every choice you make as a traveller has an environmental impact. Here's why choosing an electric scooter for your Da Nang adventure is one of the best decisions you can make.

**The Problem with Petrol Motorbikes**
Vietnam has over 70 million registered motorbikes, the vast majority of which run on petrol. In Da Nang alone, vehicle emissions are a growing concern as tourism increases. Traditional motorbike rentals contribute to:
- Air pollution (CO₂, NOx, particulate matter)
- Noise pollution (engine noise affects local wildlife and community wellbeing)
- Fuel spills and oil leaks in parking areas
- Higher carbon footprint per km compared to electric

**Electric Scooters: The Numbers**
When you ride our VinFast Evo Grand Lite instead of a comparable petrol scooter:
- **CO₂ saved:** Approximately 0.8–1.2 kg per 60km (depending on energy mix)
- **Noise reduction:** Electric motors operate at 45-55 dB vs 70-85 dB for petrol engines
- **No exhaust fumes:** Zero direct tailpipe emissions in Da Nang's streets and beaches
- **Energy efficiency:** Electric motors convert 85-90% of energy to motion vs 25-30% for petrol engines

**VinFast's Green Commitment**
VinFast powers its Vietnam EV charging network increasingly with renewable energy. By renting a VinFast EV, you're supporting a domestic brand committed to Vietnam's green transition.

**What You Can Do as a Traveller**
1. Choose electric over petrol for all local transport
2. Avoid single-use plastics when buying food at street stalls
3. Stay at eco-certified accommodations
4. Support local businesses over international chains
5. Offset your flight emissions before arriving

**T-EcoBike's Commitment**
At T-EcoBike, we operate a 100% electric fleet. Our battery swap system means batteries are charged centrally with optimised energy use, rather than individually at hotels (which often run on diesel generators during peak hours).

We also donate 2% of every booking to the Da Nang Environmental Fund, supporting beach clean-ups and mangrove restoration projects.

**The Experience Difference**
Beyond the environmental benefits, riding electric simply feels better. No fumes, no vibration, no noise — just the sound of the breeze and the city around you. You'll experience Da Nang in a completely new way.

Make the green choice. Book your electric scooter with T-EcoBike today.`,
      image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1200&q=80',
      author: 'Lan Anh',
      author_avatar: 'https://i.pravatar.cc/100?img=25',
      read_time: 6
    },
    {
      title: 'A Complete 3-Day Da Nang Itinerary by Electric Scooter',
      slug: '3-day-da-nang-itinerary-electric-scooter',
      category: 'Travel Guide',
      excerpt: 'The ultimate 3-day Da Nang itinerary for scooter riders — day-by-day routes, must-eat spots, and insider tips from our local team.',
      content: `Three days in Da Nang is the sweet spot — enough time to explore the city, venture to the mountains, and ride down to Hoi An. Here's our recommended itinerary for scooter travellers.

---

## Day 1: City & Coast

**Morning (7:00 AM)**
Start with sunrise at My Khe Beach. Ride along the coastal road before the city wakes up — it's magical. Stop for a Vietnamese breakfast (bánh mì or xôi) at a street stall near the beach.

**Mid-Morning (9:00 AM)**
Head to the Marble Mountains (Ngũ Hành Sơn). Climb to the summit, explore the cave temples, and enjoy panoramic views. Allow 2 hours.

**Afternoon (12:00 PM)**
Lunch at a local seafood restaurant near Non Nuoc Beach. Try fresh grilled squid and clams — around 150,000₫ per person.

**Late Afternoon (2:00 PM)**
Ride north along the coast to the Lady Buddha Statue at Linh Ung Pagoda, Son Tra Peninsula. The winding mountain road is one of the best scooter routes in Vietnam. The views at the top are spectacular.

**Evening (6:00 PM)**
Ride back to the city and park near Dragon Bridge. Have dinner along the Han River (try Madame Lan restaurant). Watch the Dragon Bridge breathe fire at 9 PM (weekends only).

---

## Day 2: Mountains & Culture

**Morning (8:00 AM)**
Head to Ba Na Hills for the cable car and Golden Bridge. Note: Ba Na Hills has an entrance fee and you'll park your scooter at the base. Allow a full morning.

**Afternoon (1:00 PM)**
Explore the Da Nang Museum of Cham Sculpture — free entry, air-conditioned, and one of the best Cham art collections in the world. Perfect for a hot afternoon.

**Late Afternoon (3:00 PM)**
Ride through the city neighbourhoods — try An Hai Tay Street for local coffee and the famous Phở Đinh (Dinh Pho) at 37 Dong Da Street.

**Evening (6:00 PM)**
Night food tour by scooter! Hit up Hoang Dieu Street for grilled meats, Bach Dang for fresh sugarcane juice, and the Night Market for souvenirs.

---

## Day 3: Hoi An Day Trip

**Morning (8:00 AM)**
Set off early on the coastal road toward Hoi An (30km, 45-60 minutes). Stop at Non Nuoc and An Bang beaches along the way.

**Morning-Afternoon (10:00 AM – 4:00 PM)**
Explore Hoi An Ancient Town on foot (park your scooter at Cam Nam Bridge parking). Must-sees:
- Japanese Covered Bridge
- Tan Ky Old House
- Old Town lantern streets
- Banh Mi Phuong (best bánh mì in Vietnam, allegedly)
- Cao Lau noodles for lunch

**Late Afternoon (4:00 PM)**
Ride back to Da Nang along the beach road at golden hour — one of the most beautiful scooter rides in Vietnam.

**Evening**
Farewell dinner at a rooftop restaurant overlooking the Han River. You've earned it!

---

**Practical Information**
- Book your scooter for 3 days at T-EcoBike: 3 × 150,000₫ = 450,000₫ total (~USD 18)
- Free hotel delivery on Day 1 morning
- We can store your luggage at our office during the Hoi An day trip
- 24/7 support on WhatsApp: +84 905 659 886`,
      image: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1200&q=80',
      author: 'Minh Vu',
      author_avatar: 'https://i.pravatar.cc/100?img=12',
      read_time: 10
    }
  ];

  const insertPost = db.prepare(`
    INSERT INTO posts (title, slug, category, excerpt, content, image, author, author_avatar, read_time)
    VALUES (@title, @slug, @category, @excerpt, @content, @image, @author, @author_avatar, @read_time)
  `);
  posts.forEach(p => insertPost.run(p));
}

module.exports = { getDB, initDB };
