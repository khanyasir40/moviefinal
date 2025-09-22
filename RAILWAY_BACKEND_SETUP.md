# 🚂 **Railway Backend Deployment Guide for khanyasir40**

## 🎯 **Problem:** Railway can't find backend directory option

## ✅ **Solution:** Configure Railway Root Directory

### **Step-by-Step Railway Setup:**

#### **Step 1: Access Railway Settings**
1. Go to your Railway project dashboard
2. Click on your service name (moviefinal)
3. Click on **"Settings"** tab
4. Look for **"Service Settings"** section

#### **Step 2: Set Root Directory**
1. In Settings, find **"Root Directory"** field
2. Change from `/` (root) to `backend`
3. Type exactly: `backend`
4. Click **"Save"** or **"Update"**

#### **Step 3: Environment Variables**
Add these in Variables tab:
```
MONGO_URI=mongodb+srv://yasirkhan1_db_user:9920149107@cluster0.0nvooqy.mongodb.net/movieapp?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=movieapp_super_secret_key_2024_change_in_production
TMDB_API_KEY=e76573d78b5046bbab827df2265a6940
NODE_ENV=production
```

#### **Step 4: Trigger Redeploy**
1. Go to **"Deployments"** tab
2. Click **"Redeploy"** button
3. Railway will rebuild using backend directory

---

## 🔄 **Alternative Method: Create New Service**

If you can't find Root Directory setting:

#### **Step 1: Delete Current Service**
1. Go to Settings → Danger Zone
2. Click "Delete Service"

#### **Step 2: Create New Service**
1. Click **"+ New"** button
2. Select **"GitHub Repo"**
3. Choose **"khanyasir40/moviefinal"**
4. **IMPORTANT:** When it asks for configuration:
   - Set **"Root Directory"** to `backend`
   - Set **"Start Command"** to `node server.js`

---

## 🛠️ **Manual Configuration Method**

If Railway interface is different:

#### **Option A: Using Railway CLI**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Set variables
railway variables set MONGO_URI="mongodb+srv://yasirkhan1_db_user:9920149107@cluster0.0nvooqy.mongodb.net/movieapp?retryWrites=true&w=majority&appName=Cluster0"
railway variables set JWT_SECRET="movieapp_super_secret_key_2024_change_in_production"
railway variables set TMDB_API_KEY="e76573d78b5046bbab827df2265a6940"
railway variables set NODE_ENV="production"

# Deploy from backend directory
cd backend
railway up
```

#### **Option B: Railway Web Interface Navigation**
1. **Dashboard** → **Your Project** → **Service Name**
2. **Settings** → **General** → **Root Directory**
3. Change to `backend`
4. **Variables** → Add environment variables
5. **Deployments** → **Redeploy**

---

## 🎯 **What Railway Should See After Configuration:**

### **Expected Build Output:**
```
✅ Detecting backend directory
✅ Found package.json in backend/
✅ Installing Node.js dependencies
✅ Running npm install
✅ Starting with: node server.js
✅ Server running on port $PORT
```

### **Health Check:**
- Railway will ping: `https://your-app.railway.app/health`
- Should return: `{"status": "OK", "message": "Server is running!"}`

---

## 🚨 **Common Railway Interface Locations:**

### **Where to find Root Directory setting:**

#### **New Railway Interface:**
```
Project Dashboard → Service → Settings → Source → Root Directory
```

#### **Classic Railway Interface:**
```
Project → Service Settings → Build & Deploy → Root Directory
```

#### **Mobile/Condensed View:**
```
☰ Menu → Settings → General → Root Directory
```

---

## 📱 **Screenshots Guide:**

Look for these UI elements in Railway:
- **"Settings"** tab or gear icon ⚙️
- **"Root Directory"** or **"Source Directory"** field
- **"Variables"** or **"Environment Variables"** section
- **"Redeploy"** or **"Deploy"** button

---

## 🔍 **Troubleshooting:**

### **If you still can't find Root Directory:**
1. Try creating a **new service** instead
2. Use **Railway CLI** method above
3. Contact Railway support (they usually respond quickly)

### **If deployment still fails:**
1. Check build logs for specific errors
2. Verify environment variables are set
3. Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0

---

## ✅ **Success Indicators:**

You'll know it's working when:
- Build shows "backend/" in the path
- Package.json from backend/ directory is used
- Server starts with "node server.js"
- Health endpoint responds at /health
- No "frontend build" errors

---

## 🎯 **Final Backend URL:**
Once deployed, your backend will be available at:
`https://[your-service-name].railway.app`

Example: `https://vivacious-tranquillity-production.up.railway.app`