import Image from "next/image";
import Link from "next/link";

async function getMovie(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos`
  );

  return res.json();
}

export default async function MovieDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;
  const movie = await getMovie(id);

  const trailer = movie.videos?.results?.find(
    (vid: any) =>
      vid.site === "YouTube" &&
      (vid.type === "Trailer" || vid.type === "Teaser")
  );

  return (
    <div className="max-w-5xl mx-auto">

      {/* 🎬 Trailer */}
      {trailer ? (
        <iframe
          className="w-full h-[400px] rounded-xl mb-6"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          allowFullScreen
        />
      ) : (
        <p className="text-gray-400 mb-6">
          🎬 Trailer not available
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-8">

        {/* Poster */}
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

         <Link href="/">⬅ Back</Link>
        </div>

      </div>
    </div>
  );
}
