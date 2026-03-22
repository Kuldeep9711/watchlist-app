import Image from "next/image";

async function getMovie(id: string) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos`
    );

    return res.json();
}

export default async function MoviePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const movie = await getMovie(id);

    const trailer = movie.videos?.results?.find(
        (vid: any) => vid.type === "Trailer" && vid.site === "Youtube"
    );

    return (
        <div className="min-h-screen bg-black text-white p-6">
       
          <div className="max-w-5xl mx-auto">
            { /*  Trailer */}
             {trailer && (
                <iframe
             className="w-full h-[400px] rounded-xl mb-6"
             src={`https://www.youtube.com/embed/${trailer.key}`}
             allowFullScreen
                />
             )}

             <div className="grid md:grid-cols-2 gap-8">

                { /* Poster */}
                <div className="relative w-full h-[500px]">
                   <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      className="object-cover rounded-xl"
                   />
                </div>

                {/* Info */}
                <div>
                    <h1 className="text-4xl font-bold mb-4">
                     {movie.title}
                    </h1>

                    <p className="text-gray-400 mb-4">
                      {movie.release_date}
                    </p>

                    <p className="mb-6">
                         {movie.overview}
                    </p>

                    <p className="text-yellow-400">
                      ⭐ {movie.vote_average}
                    </p>

                    <a href="/" className="inline-block mt-6 text-blue-400">
                        ⬅ Back to Home
                    </a>
                </div>
             </div>
          </div>
        </div>
    );
}