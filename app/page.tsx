import { Suspense } from "react";
import SearchAndMovies from "@/components/SearchAndMovies";
import HeroBanner from "./components/HeroBanner";

export default function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; genre?: string }>;
}) {

   return (
    <main className="min-h-screen p-6 md:p-10 bg-black text-white">

      <h1 className="text-6xl font-black mb-8 text-center tracking-tighter 
               bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 
               bg-clip-text text-transparent drop-shadow-2xl">
         Movie Watchlist
      </h1>

    {/* 🎬 Hero Banner loads separately */}
    <Suspense fallback={<p className="text-center py-10">Loading banner...</p>}>
      <HeroBanner />
    </Suspense>

      <Suspense fallback={<p className="text-center py-20">Loading...</p>}>
         <SearchAndMovies searchParams={searchParams} />
      </Suspense>
             
    </main>
   );
  }

