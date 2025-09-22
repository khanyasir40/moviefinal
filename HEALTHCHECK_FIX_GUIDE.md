# 🔧 **Railway Healthcheck Fix Guide for khanyasir40**

## 🎯 **Problem Analysis**

### **What Happened:**
✅ Build: SUCCESS  
✅ Deploy: SUCCESS  
❌ Healthcheck: FAILED

### **Why It Failed:**
Railway tries to ping your `/health` endpoint but can't reach it. Common causes:
1. Server not binding to correct port
2. Health endpoint not working
3. Server taking too long to start

---

## 🔧 **Fix #1: Server Port Binding (Most Common)**

### **The Issue:**
Railway assigns a dynamic port via `$PORT` environment variable, but our server might not be reading it correctly.

### **Solution - Update server.js:**

```javascript
// OLD (might not work):
const PORT = process.env.PORT || 5000;

// NEW (Railway-compatible):
const PORT = process.env.PORT || process.env.RAILWAY_PRIVATE_DOMAIN_PORT || 5000;
```

---

## 🔧 **Fix #2: Health Endpoint Check**

### **Current Health Endpoint:**
```javascript
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running!' });
});
```

### **Enhanced Health Endpoint:**
```javascript
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running!',
    timestamp: new Date().toISOString(),
    port: PORT,
    env: process.env.NODE_ENV
  });
});

// Also add root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Movie Recommendation API',
    health: '/health',
    version: '1.0.0'
  });
});
```

---

## 🔧 **Fix #3: Server Binding**

### **Current Binding:**
```javascript
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

### **Railway-Optimized Binding:**
```javascript
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔄 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('💤 Process terminated');
  });
});
```

---

## 🔧 **Fix #4: Railway Configuration**

### **Update nixpacks.toml:**
```toml
[phases.setup]
nixPkgs = ['nodejs_18']

[phases.install]
cmds = ['npm ci --only=production']

[phases.build]
cmds = ['echo "Backend ready"']

[start]
cmd = 'node server.js'

[variables]
NODE_ENV = 'production'
RAILWAY_HEALTHCHECK_TIMEOUT = '60'
```

---

## 🔧 **Fix #5: Add Environment Variables**

In Railway Variables tab, ensure you have:
```
NODE_ENV=production
RAILWAY_HEALTHCHECK_TIMEOUT=60
MONGO_URI=mongodb+srv://yasirkhan1_db_user:9920149107@cluster0.0nvooqy.mongodb.net/movieapp?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=movieapp_super_secret_key_2024_change_in_production
TMDB_API_KEY=e76573d78b5046bbab827df2265a6940
```

---

## 🚀 **Quick Fix Steps**

### **Step 1: Update Server Code**
1. Fix port binding
2. Enhance health endpoint
3. Add graceful shutdown

### **Step 2: Push to GitHub**
```bash
git add .
git commit -m "Fix Railway healthcheck endpoint"
git push
```

### **Step 3: Redeploy on Railway**
1. Go to Deployments tab
2. Click "Redeploy"
3. Monitor logs

### **Step 4: Test Health Endpoint**
Once deployed, test:
`https://zestful-enchantment-production.up.railway.app/health`

---

## 📊 **Expected Success Output**

### **Railway Logs Should Show:**
```
✅ Initialization
✅ Build  
✅ Deploy
✅ Network > Healthcheck ✅
🚀 Server running on port 12345
🌍 Environment: production
🔗 Health check: http://localhost:12345/health
```

### **Health Endpoint Response:**
```json
{
  "status": "OK",
  "message": "Server is running!",
  "timestamp": "2025-09-22T10:30:00.000Z",
  "port": "12345",
  "env": "production"
}
```

---

## 🎯 **Why This Happens**

### **Railway's Process:**
1. **Builds your app** ✅
2. **Starts the server** ✅  
3. **Waits for server to respond** ❌ (This failed)
4. **Pings health endpoint** (Never reached this)

### **Common Causes:**
- Server binding to wrong interface
- Port not configured correctly
- Health endpoint returning error
- Server taking too long to start
- MongoDB connection blocking startup

---

## 🔍 **Debugging Tips**

### **Check Railway Logs:**
1. Click "View logs" button
2. Look for server startup messages
3. Check for error messages

### **Test Locally:**
```bash
cd backend
PORT=3000 node server.js
# Test: http://localhost:3000/health
```

### **Environment Test:**
```bash
# Test with production settings
NODE_ENV=production PORT=8080 node server.js
```

---

This is a very common Railway deployment issue - usually fixed with port binding adjustments! 🚀