import { Suspense } from "react";
import MovieDetails from "./MovieDetails";


export default function MoviePage ({
    params,
}: {
    params: Promise<{id: string}>;
}) {
    return (
        <div className="min-h-screen bg-black text-white p-6">
         
         <Suspense fallback={<p className="text-center">Loading movie...</p>}>
           <MovieDetails params={params} />
         </Suspense>
        </div>
    )
}