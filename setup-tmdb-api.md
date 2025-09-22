# TMDB API Setup Guide

This guide will help you get an API key from The Movie Database (TMDB) to fetch movie data for your application.

## Step 1: Create TMDB Account

1. Go to [The Movie Database](https://www.themoviedb.org/)
2. Click "Sign Up" in the top right corner
3. Fill in your details and create an account
4. Verify your email address

## Step 2: Request API Key

1. Go to [TMDB Settings](https://www.themoviedb.org/settings/api)
2. Click "Click to generate" under "API Read Access Token (v4 auth)"
3. Or click "Click to generate" under "API Key (v3 auth)" for the older API
4. Copy the generated API key

## Step 3: Update Your .env File

Add the API key to your `.env` file:

```env
TMDB_API_KEY=your_api_key_here
```

## Step 4: Test the API

You can test if your API key works by making a request to:

```
https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY
```

Replace `YOUR_API_KEY` with your actual API key. You should get a JSON response with movie data.

## API Usage Limits

- **Free Tier**: 1,000 requests per day
- **Rate Limit**: 40 requests per 10 seconds
- **Perfect for**: Development and small applications

## What the API Provides

The TMDB API gives you access to:

- Movie information (title, overview, poster, etc.)
- Cast and crew details
- Movie ratings and reviews
- Similar movies
- Movie trailers and videos
- Genre information
- Search functionality

## Troubleshooting

### API Key Not Working
- Make sure you copied the entire API key
- Check that there are no extra spaces
- Verify your account is active

### Rate Limit Exceeded
- Wait a few seconds before making more requests
- Consider implementing caching in your application
- Monitor your daily usage

### No Data Returned
- Check if the movie ID exists
- Verify the API endpoint URL
- Ensure your API key has the correct permissions

## Best Practices

1. **Cache Responses**: Store movie data in your database to reduce API calls
2. **Error Handling**: Always handle API errors gracefully
3. **Rate Limiting**: Implement delays between requests if needed
4. **Environment Variables**: Never hardcode API keys in your code

## Next Steps

Once your TMDB API key is set up:

1. Your application will fetch trending, popular, and top-rated movies
2. Users can search for movies
3. Movie details will be displayed with posters and information
4. Similar movies will be recommended

## Alternative APIs

If you need more data or higher limits, consider:

- **OMDB API**: Additional movie information
- **IMDB API**: More comprehensive movie database
- **MovieLens**: For recommendation algorithms

However, TMDB is free and provides excellent data for most use cases. 