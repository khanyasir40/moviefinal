# 🔧 STEP-BY-STEP BACKEND SETUP GUIDE FOR KHANYASIR40

## 📍 **CURRENT SITUATION**
- ✅ **Frontend**: Working on Vercel 
- ❌ **Backend**: Needs to be connected/deployed
- 🎯 **Goal**: Get backend running and connected to frontend

---

## 🚀 **METHOD 1: DEPLOY EXISTING BACKEND TO RENDER (RECOMMENDED)**

### **STEP 1: Check Your Backend Files**
First, let's verify your backend exists:

1. **Open your project folder**: `C:\Users\yasir khan\OneDrive\Desktop\movie_backup`
2. **Check if `backend` folder exists** with these files:
   - `server.js` (main backend file)
   - `package.json` (dependencies)
   - `routes/` folder
   - `models/` folder

### **STEP 2: Deploy Backend to Render**

#### **A. Go to Render.com**
1. **Open**: https://render.com
2. **Sign up/Login** with GitHub account
3. **Click**: "New +" button
4. **Select**: "Web Service"

#### **B. Connect Your Repository**
1. **Connect GitHub** account if not connected
2. **Select repository**: `khanyasir40/moviefinal`
3. **Click**: "Connect"

#### **C. Configure Build Settings**
```
Name: moviefinal-backend-khanyasir40
Region: Oregon (US West)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: npm start
```

#### **D. Add Environment Variables**
Click "Advanced" and add these:
```
NODE_ENV = production
MONGO_URI = mongodb+srv://yasirkhan1_db_user:9920149107@cluster0.0nvooqy.mongodb.net/movieapp?retryWrites=true&w=majority&appName=Cluster0
PORT = 10000
```

#### **E. Deploy**
1. **Click**: "Create Web Service"
2. **Wait**: 3-5 minutes for deployment
3. **Copy the URL**: Something like `https://moviefinal-backend-khanyasir40.onrender.com`

### **STEP 3: Connect Frontend to Backend**

#### **A. Update Frontend Environment Variables**
1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**: moviefinal-mgeh
3. **Go to**: Settings → Environment Variables
4. **Add/Update**:
   ```
   REACT_APP_API_URL = https://moviefinal-backend-khanyasir40.onrender.com
   REACT_APP_NODE_ENV = production
   ```

#### **B. Redeploy Frontend**
1. **In Vercel Dashboard**
2. **Go to**: Deployments tab
3. **Click**: "Trigger Deploy" → "Deploy"
4. **Wait**: 2-3 minutes

### **STEP 4: Test Connection**
1. **Open your Vercel app** in browser
2. **Check if movies load** (means backend is connected)
3. **Try user registration** (tests database connection)

---

## 🚀 **METHOD 2: CREATE SEPARATE BACKEND REPOSITORY (ALTERNATIVE)**

If Method 1 doesn't work, create a dedicated backend repository:

### **STEP 1: Create New Repository**
1. **Go to**: https://github.com/new
2. **Repository name**: `moviefinal-backend`
3. **Set to**: Public
4. **Click**: "Create repository"

### **STEP 2: Prepare Backend Files**
Open terminal in your project folder:

```bash
# Navigate to your project
cd "C:\Users\yasir khan\OneDrive\Desktop\movie_backup"

# Create new folder for backend-only
mkdir moviefinal-backend-only
cd moviefinal-backend-only

# Copy backend files
xcopy "..\backend\*" "." /E /I
```

### **STEP 3: Initialize Git Repository**
```bash
# Initialize git
git init

# Add files
git add .

# Commit
git commit -m "Initial backend setup"

# Add remote repository
git remote add origin https://github.com/khanyasir40/moviefinal-backend.git

# Push to GitHub
git push -u origin main
```

### **STEP 4: Deploy to Render**
1. **Go to**: https://render.com
2. **Create new Web Service**
3. **Connect**: `khanyasir40/moviefinal-backend` repository
4. **Configure**:
   ```
   Name: moviefinal-backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```
5. **Add environment variables** (same as Method 1)
6. **Deploy**

---

## 🚀 **METHOD 3: USE RAILWAY (BACKUP OPTION)**

### **STEP 1: Deploy to Railway**
1. **Go to**: https://railway.app
2. **Login** with GitHub
3. **Click**: "New Project"
4. **Select**: "Deploy from GitHub repo"
5. **Choose**: `khanyasir40/moviefinal`

### **STEP 2: Configure Railway**
1. **Select**: backend service
2. **Settings** → **Root Directory**: Set to `backend`
3. **Variables** → Add:
   ```
   NODE_ENV=production
   MONGO_URI=mongodb+srv://yasirkhan1_db_user:9920149107@cluster0.0nvooqy.mongodb.net/movieapp?retryWrites=true&w=majority&appName=Cluster0
   ```
4. **Deploy**

---

## 🔧 **TROUBLESHOOTING GUIDE**

### **Problem 1: Backend Won't Start**
**Solution**: Check `package.json` in backend folder:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### **Problem 2: Database Connection Error**
**Solution**: Verify MongoDB URI is correct:
```javascript
// In server.js, check this line:
mongoose.connect(process.env.MONGO_URI)
```

### **Problem 3: CORS Errors**
**Solution**: Update CORS in `server.js`:
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://moviefinal-mgeh-git-main-khanyasir40s-projects.vercel.app'
  ]
}));
```

### **Problem 4: Environment Variables Not Working**
**Solution**: Create `.env` file in backend:
```
NODE_ENV=production
MONGO_URI=mongodb+srv://yasirkhan1_db_user:9920149107@cluster0.0nvooqy.mongodb.net/movieapp?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
```

---

## ✅ **VERIFICATION CHECKLIST**

After setup, verify these work:

1. **Backend Health Check**:
   - Open: `https://your-backend-url.onrender.com/health`
   - Should show: `{"status": "OK", "message": "Movie App Backend is running!"}`

2. **Movies API**:
   - Open: `https://your-backend-url.onrender.com/api/movies/trending`
   - Should show: JSON with movie data

3. **Frontend Connection**:
   - Open your Vercel app
   - Movies should load on homepage
   - User registration should work

---

## 🎯 **RECOMMENDED APPROACH**

**I recommend METHOD 1 (Render deployment)** because:
- ✅ Uses your existing code
- ✅ No need to create new repository
- ✅ Render has good free tier
- ✅ Automatic deployments from GitHub

---

## 📞 **WHAT TO DO RIGHT NOW**

1. **Try METHOD 1 first** (Render deployment)
2. **If it doesn't work**, tell me the exact error message
3. **I'll help you fix it** or we'll try METHOD 2

**Let's start with METHOD 1 - go to https://render.com and follow STEP 2 above!**

**Which method would you like to try first?** 🚀