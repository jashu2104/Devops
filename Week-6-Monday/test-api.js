const app = require('./src/server');
const jwt = require('jsonwebtoken');
const jwtConfig = require('./src/config/jwt');
const http = require('http');

let server;
const PORT = 3009; // Isolated test port
const BASE_URL = `http://localhost:${PORT}`;

function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: JSON.parse(data)
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: data
          });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log('\n=============================================================');
  console.log('🧪 RUNNING COMPREHENSIVE AUTOMATED TEST SUITE (JWT AUTH)');
  console.log('=============================================================\n');

  let studentToken = '';
  let facultyToken = '';
  let passedCount = 0;
  let totalCount = 0;

  function assert(condition, testName, details = '') {
    totalCount++;
    if (condition) {
      passedCount++;
      console.log(` ✅ PASS: [${testName}]`);
    } else {
      console.error(` ❌ FAIL: [${testName}] - ${details}`);
    }
  }

  try {
    // 1. POST /register - Register New Student
    const regRes = await request('POST', '/register', {
      name: 'Test Student',
      email: 'test.student@college.edu',
      password: 'password123',
      role: 'student',
      department: 'Computer Science Engineering'
    });
    assert(regRes.status === 201 && regRes.body.token, 'POST /register - Create User & Return JWT', `Status: ${regRes.status}`);

    // 2. POST /register - Reject Duplicate Email
    const dupRes = await request('POST', '/register', {
      name: 'Test Student',
      email: 'test.student@college.edu',
      password: 'password123'
    });
    assert(dupRes.status === 409, 'POST /register - Reject Duplicate Email Uniqueness', `Status: ${dupRes.status}`);

    // 3. POST /login - Student Login
    const loginRes = await request('POST', '/login', {
      email: 'alex.j@student.college.edu',
      password: 'student123'
    });
    assert(loginRes.status === 200 && loginRes.body.token, 'POST /login - Validate Password & Generate JWT', `Status: ${loginRes.status}`);
    studentToken = loginRes.body.token;

    // 4. POST /login - Faculty Login
    const facLoginRes = await request('POST', '/login', {
      email: 'ali.shaik@cse.college.edu',
      password: 'faculty123'
    });
    assert(facLoginRes.status === 200 && facLoginRes.body.token, 'POST /login - Authenticate Faculty Account', `Status: ${facLoginRes.status}`);
    facultyToken = facLoginRes.body.token;

    // 5. POST /login - Incorrect Credentials Failure
    const badLoginRes = await request('POST', '/login', {
      email: 'alex.j@student.college.edu',
      password: 'wrongpassword'
    });
    assert(badLoginRes.status === 401, 'POST /login - Reject Incorrect Password', `Status: ${badLoginRes.status}`);

    // 6. GET /profile - Protected Access with Bearer Token
    const profileRes = await request('GET', '/profile', null, {
      'Authorization': `Bearer ${studentToken}`
    });
    assert(profileRes.status === 200 && profileRes.body.user.email === 'alex.j@student.college.edu', 'GET /profile - View Authenticated User Profile', `Status: ${profileRes.status}`);

    // 7. GET /profile - Reject Missing JWT Token
    const noTokenRes = await request('GET', '/profile');
    assert(noTokenRes.status === 401, 'GET /profile - Reject Missing Token (401 Unauthorized)', `Status: ${noTokenRes.status}`);

    // 8. GET /students - Reject Invalid/Corrupt Token
    const badTokenRes = await request('GET', '/students', null, {
      'Authorization': 'Bearer invalid_signature_token_xyz'
    });
    assert(badTokenRes.status === 403, 'GET /students - Reject Corrupted JWT Token (403 Forbidden)', `Status: ${badTokenRes.status}`);

    // 9. GET /students - Expired Token Handling Test
    const expiredToken = jwt.sign({ id: 'STU-EXPIRED', email: 'exp@college.edu', role: 'student' }, jwtConfig.secret, { expiresIn: '-1s' });
    const expRes = await request('GET', '/students', null, {
      'Authorization': `Bearer ${expiredToken}`
    });
    assert(expRes.status === 401 && expRes.body.error === 'TokenExpired', 'GET /students - Reject Expired JWT Token (401 TokenExpired)', `Status: ${expRes.status}`);

    // 10. GET /students - Role Privilege: Student Self-View Only
    const studentListRes = await request('GET', '/students', null, {
      'Authorization': `Bearer ${studentToken}`
    });
    assert(studentListRes.status === 200 && studentListRes.body.data.length === 1, 'GET /students - Student Role Privilege Isolation', `Count: ${studentListRes.body.data ? studentListRes.body.data.length : 0}`);

    // 11. GET /students - Role Privilege: Faculty Full List View
    const facListRes = await request('GET', '/students', null, {
      'Authorization': `Bearer ${facultyToken}`
    });
    assert(facListRes.status === 200 && facListRes.body.data.length > 1, 'GET /students - Faculty Role Full Access Privilege', `Count: ${facListRes.body.data ? facListRes.body.data.length : 0}`);

    // 12. PUT /students/:id - Update Student Info by Faculty
    const updateRes = await request('PUT', '/students/STU-202601', {
      department: 'Computer Science & AI',
      gpa: 3.98,
      semester: 'ODD (Sem 5)'
    }, {
      'Authorization': `Bearer ${facultyToken}`
    });
    assert(updateRes.status === 200 && updateRes.body.data.gpa === 3.98, 'PUT /students/:id - Faculty Update Student Record', `Status: ${updateRes.status}`);

    console.log('\n=============================================================');
    console.log(`📊 TEST RESULTS: ${passedCount} / ${totalCount} TESTS PASSED SUCCESSFULY!`);
    console.log('=============================================================\n');

  } catch (err) {
    console.error('Test execution error:', err);
  } finally {
    if (server) server.close();
    process.exit(passedCount === totalCount ? 0 : 1);
  }
}

server = app.listen(PORT, () => {
  runTests();
});
