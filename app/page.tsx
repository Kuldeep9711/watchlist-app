import { Suspense } from "react";
import SearchAndMovies from "@/components/SearchAndMovies";
import HeroBanner from "./components/HeroBanner";

export default function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; genre?: string }>;
}) {

   return (
    <main className="min-h-screen bg-black text-white">

      <h1 className="text-4xl font-bold mb-8 text-center">
         Movie Watchlist
      </h1>

    {/* 🎬 Hero Banner loads separately */}
    <Suspense fallback={<p className="text-center py-10">Loading banner...</p>}>
      <HeroBanner />
    </Suspense>

 {/* 🔍 Search + Movies */}
      <Suspense fallback={<p className="text-center py-20">Loading...</p>}>
         <SearchAndMovies searchParams={searchParams} />
      </Suspense>
             
    </main>
   );
  }

