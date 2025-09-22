const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

console.log('🔌 Testing MongoDB Atlas connection...');
console.log('📍 Connection string:', process.env.MONGO_URI?.substring(0, 40) + '...');

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ SUCCESS! MongoDB Atlas connected successfully!');
    console.log('🗄️ Database:', mongoose.connection.name);
    console.log('🌍 Host:', mongoose.connection.host);
    console.log('📊 Ready state:', mongoose.connection.readyState);
    
    // Test creating a simple document
    const TestModel = mongoose.model('Test', { message: String, createdAt: { type: Date, default: Date.now } });
    const testDoc = new TestModel({ message: 'Database connection test for khanyasir40' });
    await testDoc.save();
    console.log('✅ Test document created successfully!');
    
    // Clean up test document
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('🧹 Test document cleaned up');
    
    console.log('🎉 Your movie app database is ready!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

testConnection();