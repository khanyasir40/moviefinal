# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas (cloud database) as an alternative to installing MongoDB locally.

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" or "Sign Up"
3. Create an account or sign in with Google/GitHub

## Step 2: Create a Cluster

1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region close to you
5. Click "Create"

## Step 3: Set Up Database Access

1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (save these!)
5. Select "Read and write to any database"
6. Click "Add User"

## Step 4: Set Up Network Access

1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 5: Get Connection String

1. Go back to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string

## Step 6: Update Your .env File

Replace the `MONGO_URI` in your `.env` file with the connection string from Step 5:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/movieapp?retryWrites=true&w=majority
```

**Important**: Replace `<username>` and `<password>` with the credentials you created in Step 3.

## Step 7: Test Connection

1. Start your server: `npm run server`
2. Check the console for "MongoDB Connected..." message
3. If you see any errors, double-check your connection string and credentials

## Security Notes

- Never commit your `.env` file to version control
- Use environment-specific connection strings for production
- Consider using IP whitelist for production environments
- Regularly rotate database passwords

## Troubleshooting

### Connection Timeout
- Check your internet connection
- Verify the connection string format
- Ensure your IP is whitelisted in Network Access

### Authentication Failed
- Double-check username and password
- Make sure you're using the correct database user
- Verify the connection string format

### Cluster Not Found
- Check if your cluster is active
- Verify the cluster name in the connection string
- Ensure you're using the correct project

## Next Steps

Once MongoDB Atlas is set up:

1. Your application will automatically create the necessary collections
2. Users can register and login
3. Movie data will be fetched from TMDB API and cached in your database
4. All user preferences (favorites, watchlist, ratings) will be stored in Atlas

## Cost Information

- MongoDB Atlas free tier includes:
  - 512MB storage
  - Shared RAM
  - Up to 500 connections
  - Perfect for development and small applications

For production applications, consider upgrading to a paid plan for better performance and features. 