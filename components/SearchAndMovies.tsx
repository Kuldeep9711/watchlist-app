import MoviesSection from "@/app/components/MoviesSection";
import { Suspense } from "react";
import Categories from "./Categories";



export default async function SearchAndMovies({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; genre?: string }>;
}) {
    const { q: query = "" } = await searchParams;

  return (
    <>
    {/* Search Form */}
    <a
    href="/"
    className="block text-center mb-6 text-blue-400 hover:underline"
    >
        ⬅ Back to Home
    </a>
    <form className="flex gap-3 mb-10 max-w-2xl mx-auto">
    <input
      name="q"
      defaultValue={query}
      placeholder="Search movie..."
      className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-3"
    />

    <button className="bg-blue-600 px-8 py-3 rounded-xl">
          Search 
    </button>
    </form>

     <Suspense fallback={null}>
        <Categories />
      </Suspense>

    {/* Movies */}
    <Suspense fallback={<p className="text-center py-20">Loading...</p>}>
     <MoviesSection searchParams={searchParams} />
    </Suspense>
    </>
  )
}
