import MovieCard from "@/components/MovieCard";

async function fetchPopularMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`,
    { next: { revalidate: 3600 } }
  );

  const data = await res.json();
  return data.results || [];
}

async function searchTMDBMovies(query: string) {
  if (!query.trim()) return [];

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`
  );

  const data = await res.json();
  return data.results || [];
}

async function fetchByGenre(genreId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${genreId}`
  );

  const data = await res.json();
  return data.results || [];
}

export default async function MoviesSection({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; genre?: string }>;
}) {

  const { q: query = "", genre } = await searchParams;

  /*
  const movies = query
    ? await searchTMDBMovies(query)
    : await fetchPopularMovies(); */

    let movies = []
    
     if (query) {
      movies = await searchTMDBMovies(query);
     } else if (genre) {
      movies = await fetchByGenre(genre);
     } else {
      movies = await fetchPopularMovies();
     }

  if (movies.length === 0) {
    return <p className="text-center py-20">No movies found</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
      {movies.map((movie: any) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

