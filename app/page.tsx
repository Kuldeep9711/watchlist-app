import { Suspense } from "react";
import SearchAndMovies from "@/components/SearchAndMovies";

export default function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; genre?: string }>;
}) {

   return (
    <main className="min-h-screen p-6 md:p-10 bg-black text-white">

      <h1 className="text-4xl font-bold mb-8 text-center">
         Movie Watchlist
      </h1>

      <Suspense fallback={<p className="text-center py-20">Loading...</p>}>
         <SearchAndMovies searchParams={searchParams} />
      </Suspense>

    </main>
   );
  }

/*
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
 
 <Suspense fallback={null}>
    <Categories />
  </Suspense>

      <Suspense fallback={<p className="text-center py-20">Loading movies...</p>}>
        <MoviesSection searchParams={searchParams} />
      </Suspense>

    </main>
  );
}
*/
