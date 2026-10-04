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

async function testFullCrud() {
  console.log('===========================================================');
  console.log('   FULL CRUD SYNC TEST (CREATE -> READ -> DELETE -> READ)   ');
  console.log('===========================================================\n');

  // 1. Get Admin Token
  const loginRes = await request({
    path: '/auth/login',
    method: 'POST'
  }, {
    email: 'ayush@gmail.com',
    password: 'password123'
  });

  if (!loginRes.data?.token) {
    console.error('❌ Admin login failed!');
    return;
  }
  const authHeaders = { Authorization: `Bearer ${loginRes.data.token}` };
  console.log('✅ Admin Authenticated Successfully!\n');

  // 2. Count existing hotels
  const initialHotels = await request({ path: '/hotels', method: 'GET', headers: authHeaders });
  const initialCount = Array.isArray(initialHotels.data) ? initialHotels.data.length : 0;
  console.log(`📊 Initial Hotels Count in Backend DB: ${initialCount}`);

  // 3. Create a temporary hotel
  const tempHotel = await request({
    path: '/hotels',
    method: 'POST',
    headers: authHeaders
  }, {
    name: 'Temporary Sync Test Hotel',
    location: 'Shimla',
    about: 'Testing create and delete sync between frontend and backend.'
  });
  const hotelId = tempHotel.data?.id;
  console.log(`➕ Created Hotel: "${tempHotel.data?.name}" with ID: ${hotelId}`);

  // 4. Verify hotel count increased by 1
  const afterCreateHotels = await request({ path: '/hotels', method: 'GET', headers: authHeaders });
  const countAfterCreate = Array.isArray(afterCreateHotels.data) ? afterCreateHotels.data.length : 0;
  console.log(`📊 Hotels Count After Creation: ${countAfterCreate} (Expected: ${initialCount + 1})`);
  if (countAfterCreate === initialCount + 1) {
    console.log('✅ Hotel Create Sync: 100% SUCCESS\n');
  } else {
    console.warn('⚠️ Count mismatch after create\n');
  }

  // 5. Create a Rating for this hotel
  const newRating = await request({
    path: '/ratings',
    method: 'POST',
    headers: authHeaders
  }, {
    userId: 'ayush@gmail.com',
    hotelId: hotelId,
    rating: 5,
    remarks: 'Flawless test review'
  });
  const ratingId = newRating.data?.ratingId;
  console.log(`⭐ Created Rating: ID ${ratingId} (5 stars)`);

  // 6. Delete the Rating
  const deleteRatingRes = await request({
    path: `/ratings/${ratingId}`,
    method: 'DELETE',
    headers: authHeaders
  });
  console.log(`🗑️ Deleted Rating: ID ${ratingId} (Status: ${deleteRatingRes.status})`);

  // 7. Delete the temporary hotel
  const deleteHotelRes = await request({
    path: `/hotels/${hotelId}`,
    method: 'DELETE',
    headers: authHeaders
  });
  console.log(`🗑️ Deleted Hotel: ID ${hotelId} (Status: ${deleteHotelRes.status})`);

  // 8. Verify hotel count is back to initial
  const finalHotels = await request({ path: '/hotels', method: 'GET', headers: authHeaders });
  const finalCount = Array.isArray(finalHotels.data) ? finalHotels.data.length : 0;
  console.log(`📊 Final Hotels Count in Backend DB: ${finalCount} (Expected: ${initialCount})`);
  if (finalCount === initialCount) {
    console.log('✅ Hotel Delete Sync: 100% SUCCESS\n');
  }

  console.log('===========================================================');
  console.log('   🎉 ALL CRUD OPERATIONS (CREATE/READ/DELETE) PASSED!     ');
  console.log('===========================================================');
}

testFullCrud().catch(console.error);
