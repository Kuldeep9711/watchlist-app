import MovieCard from "@/components/MovieCard";

async function fetchPopularMovies(page: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&page=${page}`,
  //  { next: { revalidate: 3600 } }
  );

  const data = await res.json();
   return data;
}

async function searchTMDBMovies(query: string, page: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}&page=${page}`
  );

  const data = await res.json();
  return data;
}

async function fetchByGenre(genreId: string, page: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${genreId}&page=${page}`
  );

  const data = await res.json();
  return data;
}

export default async function MoviesSection({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; genre?: string; page?: number }>;
}) {

  const { q: query = "", genre, page = "1" } = await searchParams;
  
  const currentPage = Number(page);


    let data;
    
     if (query) {
      data = await searchTMDBMovies(query, currentPage);
     } else if (genre) {
      data = await fetchByGenre(genre, currentPage);
     } else {
      data = await fetchPopularMovies(currentPage);
     }

     const movies = data?.results || [];
     const totalPages = data?.total_pages || 1;

    // console.log("DATA:", data);

  if (movies.length === 0) {
    return <p className="text-center py-20">No movies found</p>;
  }

  return (
   <>
   
   <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
      {movies.map((movie: any) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
   </div>

    {/* 🔥 Pagination UI (ADD HERE) */}
    <div className="flex justify-center gap-4 mt-10">

    {currentPage > 1 && (
      <a
      href={`?${new URLSearchParams({
        ...(query && { q: query }),
        ...(genre && { genre }),
        page: String(currentPage - 1),
      })}`}
      className="px-5 py-2 bg-zinc-800 rounded-lg"
      >
         ⬅ Prev
      </a>
    )}

    <span className="px-4 py-2">
         Page {currentPage}
    </span>

    {currentPage < totalPages && (
      <a
      href={`?${new URLSearchParams({
        ...(query && { q: query }),
        ...(genre && { genre }),
        page: String(currentPage + 1),
      })}`}
      className="px-5 py-2 bg-zinc-800 rounded-lg"
      >
        Next ➡
      </a>
    )}
    </div>
   </>
  );
}

