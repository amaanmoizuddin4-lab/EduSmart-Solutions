const testFeatures = async () => {
  const api = 'http://localhost:5000/api';
  
  console.log('🧪 Testing EduSmart Features...\n');

  try {
    // Test 1: Registration
    console.log('1️⃣ Testing Student Registration...');
    const registerRes = await fetch(`${api}/students/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'Password123',
        grade: '10',
        subjects: ['Math', 'Science'],
        learningStyle: 'Visual'
      })
    });
    const registerData = await registerRes.json();
    console.log(`✅ Registration: ${registerData.success ? 'PASS' : 'FAIL'} - ${registerData.message}\n`);
    
    if (!registerData.success && registerData.message.includes('already exist')) {
      console.log('📌 User already exists, testing login instead...\n');
    }
    
    const token = registerData.token;
    
    // Test 2: Login
    console.log('2️⃣ Testing Student Login...');
    const loginRes = await fetch(`${api}/students/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'testuser@example.com',
        password: 'Password123'
      })
    });
    const loginData = await loginRes.json();
    console.log(`✅ Login: ${loginData.success ? 'PASS' : 'FAIL'} - ${loginData.message}\n`);
    
    const validToken = loginData.token || token;
    
    // Test 3: Get Profile
    if (validToken) {
      console.log('3️⃣ Testing Get Student Profile...');
      const profileRes = await fetch(`${api}/students/profile`, {
        headers: { 'Authorization': `Bearer ${validToken}` }
      });
      const profileData = await profileRes.json();
      console.log(`✅ Get Profile: ${profileData.success !== false ? 'PASS' : 'FAIL'}\n`);
    }
    
    // Test 4: Submit Query
    if (validToken) {
      console.log('4️⃣ Testing Submit Query...');
      const queryRes = await fetch(`${api}/queries/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${validToken}`
        },
        body: JSON.stringify({
          subject: 'Math',
          topic: 'Quadratic Equations',
          description: 'How do I solve quadratic equations?',
          proficiencyLevel: 'Intermediate'
        })
      });
      const queryData = await queryRes.json();
      console.log(`✅ Submit Query: ${queryData.success !== false ? 'PASS' : 'FAIL'}\n`);
    }
    
    // Test 5: Get Learning Materials
    if (validToken) {
      console.log('5️⃣ Testing Get Learning Materials...');
      const materialsRes = await fetch(`${api}/learning-materials?subject=Math&grade=10`, {
        headers: { 'Authorization': `Bearer ${validToken}` }
      });
      const materialsData = await materialsRes.json();
      console.log(`✅ Get Learning Materials: ${Array.isArray(materialsData) || materialsData.success !== false ? 'PASS' : 'FAIL'}\n`);
    }
    
    console.log('✨ All tests completed!');
    
  } catch (error) {
    console.error('❌ Test Error:', error.message);
  }
};

testFeatures();
