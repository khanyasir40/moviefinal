# MovieFlix Deployment Guide

## Preparing for Deployment

### 1. Compress the Project

Run the compression script to create a deployment-ready archive:

```bash
# On Windows
.\compress-project.bat

# On Linux/macOS
./compress-project.sh
```

This will create `MovieFlix_Compressed.zip` with all necessary files while excluding large folders like `node_modules`.

### 2. Server Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4.4 or higher) or MongoDB Atlas account
- 1GB RAM minimum (2GB recommended)
- 10GB storage space

## Deployment Steps

### 1. Upload and Extract

```bash
# Upload the zip file to your server
scp MovieFlix_Compressed.zip user@your-server:/path/to/deployment

# SSH into your server
ssh user@your-server

# Navigate to deployment directory
cd /path/to/deployment

# Extract the archive
unzip MovieFlix_Compressed.zip
```

### 2. Install Dependencies

```bash
# Install server dependencies
npm install

# Install client dependencies
cd client && npm install
cd ..
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
TMDB_API_KEY=your_tmdb_api_key
PORT=5000
NODE_ENV=production
```

Refer to `setup-mongodb-atlas.md` and `setup-tmdb-api.md` for detailed instructions on obtaining the required API keys.

### 4. Build the Client

```bash
cd client
npm run build
cd ..
```

### 5. Start the Application

#### Using PM2 (Recommended for Production)

```bash
# Install PM2 globally if not already installed
npm install -g pm2

# Start the application with PM2
pm2 start server.js --name "movieflix"

# Ensure app starts on system reboot
pm2 startup
pm2 save
```

#### Using Node.js Directly

```bash
# Start in production mode
NODE_ENV=production node server.js
```

### 6. Configure Nginx (Optional but Recommended)

Install and configure Nginx as a reverse proxy:

```bash
sudo apt update
sudo apt install nginx
```

Create a new Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/movieflix
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/movieflix /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 7. Set Up SSL with Let's Encrypt (Recommended)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Maintenance

### Updating the Application

```bash
# Pull the latest changes
git pull

# Install any new dependencies
npm install
cd client && npm install
cd ..

# Rebuild the client
cd client
npm run build
cd ..

# Restart the application
pm2 restart movieflix
```

### Monitoring

```bash
# Check application status
pm2 status

# View logs
pm2 logs movieflix

# Monitor in real-time
pm2 monit
```

### Backup

Regularly backup your MongoDB database:

```bash
# For MongoDB Atlas, backups are automatic
# For local MongoDB
mongodump --uri="your_mongodb_connection_string" --out=/path/to/backup/directory
```

## Troubleshooting

### Application Not Starting

1. Check logs: `pm2 logs movieflix`
2. Verify environment variables are set correctly
3. Ensure MongoDB is accessible
4. Check for port conflicts: `lsof -i :5000`

### Performance Issues

1. Increase server resources if possible
2. Optimize MongoDB queries
3. Consider implementing caching
4. Check for memory leaks using PM2 monitoring

### For Additional Help

Refer to the project documentation or contact the development team.