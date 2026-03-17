import { Suspense } from "react";
import MoviesSection from "./components/MoviesSection";

export default function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {

  return (
    <main className="min-h-screen p-6 md:p-10 bg-black text-white">

      <h1 className="text-4xl font-bold mb-8 text-center">
        Movie Watchlist
      </h1>

        <form className="flex gap-3 mb-10 max-w-2xl mx-auto" action="">
          <input
            name="q"
           placeholder="Search movie..."
           className="flex-1 bg-zinc-900 border border-zinc-700 focus:border-blue-500 rounded-xl px-5 py-3 text-lg outline-none"
          />
          <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold transition"
          >
            Search 
          </button>
      </form>

      <Suspense fallback={<p className="text-center py-20">Loading movies...</p>}>
        <MoviesSection searchParams={searchParams} />
      </Suspense>

    </main>
  );
}

/*
import MovieCard from "@/components/MovieCard"
import { Suspense } from "react"

  async function fetchPopularMovies() {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`,
      { next: { revalidate: 3600 } } // revalidate every hour
    );

    if (!res.ok) throw new Error("Failed to fetch popular movies");
    const data = await res.json();
    return data.results || [];
  }

  async function searchTMDBMovies(query: string) {
    if (!query.trim()) return[];

    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`
    );

    if (!res.ok) throw new Error("Search failed");

    const data = await res.json();
    return data.results || [];
  }

  // This is the dynamic part - wrapped in Suspense
     
     async function MoviesSection({ query }: {query: string }) {
      let movies: any[] = [];
      let error: string | null = null;

      try {
      if (query) {
        movies = await searchTMDBMovies(query);
      } else {
        movies = await fetchPopularMovies();
      }
    } catch (err) {
      console.error(err);
      error = "Failed to load movies. Please try again later.";
    }
     
    if (error) {
      return <p className="text-red-500 text-center py-10">{error}</p>
    }
   
       if (movies.length === 0) {
        return (
          <p className="text-center py-20 text-gray-400 text-xl">
              {query ? `No results for "${query}"` : "No movies found"}
          </p>
        )
       }

       return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-6">
           {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
           ))}
        </div>
       )
     }

// Main page (Fast + Non-blocking)

  export default  function HomePage({
    searchParams,
  }: {
    searchParams: {q?: string };
  }) {
     const query = searchParams?.q || "";


  return (
    <main className="min-h-screen p-6 md:p-10 bg-black text-white">
      <h1 className="text-4xl md:text-4xl font-bold mb-8 text-center tracking-tight">
            Movie Watchlist
      </h1>

        <form className="flex gap-3 mb-10 max-w-2xl mx-auto" action="">
          <input
            name="q"
            defaultValue={query}
           placeholder="Search movie..."
           className="flex-1 bg-zinc-900 border border-zinc-700 focus:border-blue-500 rounded-xl px-5 py-3 text-lg outline-none"
          />
          <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold transition"
          >
            Search 
          </button>
      </form>

  <Suspense 
  fallback={
    <div className="text-center py-20">
  <p className="text-center text-xl">Loading movies...</p>
    </div>
  }
  >
    <MoviesSection query={query} />
    </Suspense>
    </main>
  )
} 
*/