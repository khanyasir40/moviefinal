const fs = require('fs');
const path = require('path');

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, '.env');

if (!fs.existsSync(envPath)) {
  const envContent = `# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/movieapp

# JWT Secret for authentication
JWT_SECRET=your_jwt_secret_key_here_change_this_in_production

# TMDB API Key (optional - for movie data)
TMDB_API_KEY=your_tmdb_api_key_here

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env file with default values');
  console.log('⚠️  Please update the JWT_SECRET and other values as needed');
} else {
  console.log('✅ .env file already exists');
}

console.log('\n📝 Next steps:');
console.log('1. Update the JWT_SECRET in .env file');
console.log('2. Set up MongoDB (see setup-mongodb-atlas.md)');
console.log('3. Set up TMDB API (see setup-tmdb-api.md)');
console.log('4. Run "npm start" to start the server');
console.log('5. Run "cd client && npm start" to start the client'); 