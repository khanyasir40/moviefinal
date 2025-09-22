// Mock service for testing frontend deployment
// This provides sample movie data when backend is not available

export const mockMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
    release_date: "2008-07-18",
    vote_average: 9.0,
    vote_count: 27000,
    genre_ids: [28, 80, 18]
  },
  {
    id: 2,
    title: "Inception",
    overview: "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state.",
    poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdrop_path: "/s2bT29y0ngXxxu2IA8AOzzXTRhd.jpg",
    release_date: "2010-07-16",
    vote_average: 8.8,
    vote_count: 31000,
    genre_ids: [28, 878, 53]
  },
  {
    id: 3,
    title: "Interstellar",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/pbrkL804c8yAv3zBZR4QPWZAAn5.jpg",
    release_date: "2014-11-07",
    vote_average: 8.6,
    vote_count: 25000,
    genre_ids: [12, 18, 878]
  },
  {
    id: 4,
    title: "The Matrix",
    overview: "Set in the 22nd century, The Matrix tells the story of a computer programmer who is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
    poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdrop_path: "/icmmSD4vTTDKOq2vvdulafOGw93.jpg",
    release_date: "1999-03-31",
    vote_average: 8.7,
    vote_count: 23000,
    genre_ids: [28, 878]
  },
  {
    id: 5,
    title: "Pulp Fiction",
    overview: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper.",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/4cDFJr4HnXN5AdPw4AKrmLlMWdO.jpg",
    release_date: "1994-10-14",
    vote_average: 8.9,
    vote_count: 26000,
    genre_ids: [80, 18]
  }
];

export class MockMovieService {
  static async getMovieById(movieId) {
    return mockMovies.find(movie => movie.id === parseInt(movieId)) || null;
  }

  static async searchMovies(query, page = 1) {
    const filtered = mockMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase()) ||
      movie.overview.toLowerCase().includes(query.toLowerCase())
    );
    return { results: filtered, total_pages: 1 };
  }

  static async getMoviesByCategory(category, page = 1) {
    return { results: mockMovies, total_pages: 1 };
  }

  static async getAllGenres() {
    return [
      { id: 28, name: "Action" },
      { id: 80, name: "Crime" },
      { id: 18, name: "Drama" },
      { id: 878, name: "Science Fiction" },
      { id: 53, name: "Thriller" },
      { id: 12, name: "Adventure" }
    ];
  }

  static async getMoviesByGenre(genreId, page = 1) {
    const filtered = mockMovies.filter(movie => 
      movie.genre_ids.includes(parseInt(genreId))
    );
    return { results: filtered, total_pages: 1 };
  }
}