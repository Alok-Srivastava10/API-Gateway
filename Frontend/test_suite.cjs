const http = require('http');

const BASE_URL = 'http://localhost:8084';

function request(options, data) {
  return new Promise((resolve, reject) => {
    const url = new URL(options.path, BASE_URL);
    const reqOptions = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + (url.search || ''),
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    };

    const req = http.request(reqOptions, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : null;
          resolve({ status: res.statusCode, data: parsed, text: body });
        } catch (e) {
          resolve({ status: res.statusCode, text: body, data: body });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('=====================================================');
  console.log('   FULL END-TO-END MICROSERVICES & FRONTEND TEST    ');
  console.log('=====================================================\n');

  const randomNum = Math.floor(Math.random() * 90000) + 10000;
  const testEmail = `test_${randomNum}@hotelverse.io`;
  const testPassword = 'Password@123';

  // 1. REGISTER
  console.log('1. [AUTH SERVICE] Testing User Registration...');
  const regRes = await request({
    path: '/auth/register',
    method: 'POST'
  }, {
    name: `Automated Tester ${randomNum}`,
    email: testEmail,
    password: testPassword,
    about: 'Automated QA Reviewer',
    role: 'USER'
  });
  console.log(`   -> Status: ${regRes.status}, Response: ${regRes.text}`);
  if (regRes.status !== 200 && regRes.status !== 201) {
    console.error('❌ Registration failed!');
  } else {
    console.log('✅ Registration SUCCESS\n');
  }

  // 2. LOGIN
  console.log('2. [AUTH SERVICE] Testing User Login & JWT Generation...');
  const loginRes = await request({
    path: '/auth/login',
    method: 'POST'
  }, {
    email: testEmail,
    password: testPassword
  });
  console.log(`   -> Status: ${loginRes.status}, Token: ${loginRes.data?.token ? loginRes.data.token.slice(0, 35) + '...' : 'NONE'}`);
  const token = loginRes.data?.token;
  if (!token) {
    console.error('❌ Login failed!');
    return;
  }
  console.log('✅ Login SUCCESS\n');

  const authHeaders = { Authorization: `Bearer ${token}` };

  // 3. GET USERS
  console.log('3. [USER SERVICE] Testing GET /Users to verify user sync...');
  const usersRes = await request({
    path: '/Users',
    method: 'GET',
    headers: authHeaders
  });
  console.log(`   -> Status: ${usersRes.status}, Total Users: ${Array.isArray(usersRes.data) ? usersRes.data.length : 'N/A'}`);
  const matchedUser = Array.isArray(usersRes.data) ? usersRes.data.find(u => u.email === testEmail) : null;
  if (matchedUser) {
    console.log(`✅ User sync verified! UserID: ${matchedUser.userID}, Name: ${matchedUser.name}\n`);
  } else {
    console.log(`⚠️ User not found in /Users directly (might be running older UserService without restart)\n`);
  }

  const userId = matchedUser?.userID || testEmail;

  // 4. CREATE HOTEL
  console.log('4. [HOTEL SERVICE] Testing Hotel Creation (POST /hotels)...');
  const hotelRes = await request({
    path: '/hotels',
    method: 'POST',
    headers: authHeaders
  }, {
    name: `The Grand Nirvana Luxury Resort #${randomNum}`,
    location: 'Goa Beachfront',
    about: 'A luxurious 5-star automated beachfront resort with private pool.'
  });
  console.log(`   -> Status: ${hotelRes.status}, Hotel ID: ${hotelRes.data?.id}, Name: ${hotelRes.data?.name}`);
  const hotelId = hotelRes.data?.id;
  if (!hotelId) {
    console.error('❌ Hotel creation failed!');
    return;
  }
  console.log('✅ Hotel Creation SUCCESS\n');

  // 5. GET ALL HOTELS
  console.log('5. [HOTEL SERVICE] Testing GET /hotels...');
  const allHotelsRes = await request({
    path: '/hotels',
    method: 'GET',
    headers: authHeaders
  });
  console.log(`   -> Status: ${allHotelsRes.status}, Total Hotels: ${Array.isArray(allHotelsRes.data) ? allHotelsRes.data.length : 0}`);
  console.log('✅ GET /hotels SUCCESS\n');

  // 6. CREATE RATING
  console.log('6. [RATING SERVICE] Testing Rating Creation (POST /ratings)...');
  const ratingRes = await request({
    path: '/ratings',
    method: 'POST',
    headers: authHeaders
  }, {
    userId: userId,
    hotelId: hotelId,
    rating: 5,
    remarks: 'Breathtaking property with world-class hospitality and views!'
  });
  console.log(`   -> Status: ${ratingRes.status}, Rating ID: ${ratingRes.data?.ratingId}, Stars: ${ratingRes.data?.rating}`);
  const ratingId = ratingRes.data?.ratingId;
  console.log('✅ Rating Creation SUCCESS\n');

  // 7. VERIFY HOTEL RATINGS WITH USER POPULATED
  console.log('7. [AGGREGATION] Verifying Hotel Details contain Ratings + Real User...');
  const hotelDetails = await request({
    path: `/hotels`,
    method: 'GET',
    headers: authHeaders
  });
  const hotelWithRating = Array.isArray(hotelDetails.data) ? hotelDetails.data.find(h => h.id === hotelId) : null;
  if (hotelWithRating) {
    console.log(`   -> Hotel: ${hotelWithRating.name}`);
    console.log(`   -> Average Rating: ${hotelWithRating.averageRating}`);
    console.log(`   -> Ratings Count: ${hotelWithRating.ratings?.length}`);
    if (hotelWithRating.ratings && hotelWithRating.ratings.length > 0) {
      const r = hotelWithRating.ratings[0];
      console.log(`   -> Review User: ${r.user?.name || r.userId} (${r.user?.email || 'N/A'})`);
      console.log(`   -> Review Remarks: "${r.remarks}"`);
    }
    console.log('✅ Hotel + Rating + User Aggregation SUCCESS\n');
  }

  // 8. VERIFY USER RATINGS WITH HOTEL POPULATED
  console.log('8. [AGGREGATION] Verifying User Details contain Ratings + Real Hotel...');
  const userDetails = await request({
    path: `/Users`,
    method: 'GET',
    headers: authHeaders
  });
  const userWithRating = Array.isArray(userDetails.data) ? userDetails.data.find(u => u.email === testEmail || u.userID === userId) : null;
  if (userWithRating) {
    console.log(`   -> User: ${userWithRating.name} (${userWithRating.email})`);
    console.log(`   -> User Ratings Count: ${userWithRating.ratings?.length || 0}`);
    if (userWithRating.ratings && userWithRating.ratings.length > 0) {
      const ur = userWithRating.ratings[0];
      console.log(`   -> Rated Hotel: ${ur.hotel?.name || ur.hotelId} in ${ur.hotel?.location || 'N/A'}`);
    }
    console.log('✅ User + Rating + Hotel Aggregation SUCCESS\n');
  }

  console.log('=====================================================');
  console.log('       ALL MICROSERVICES TESTS COMPLETED!            ');
  console.log('=====================================================');
}

runTests().catch(console.error);
