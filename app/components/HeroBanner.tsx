import Image from "next/image";
import HeroClient from "./HeroClient";

async function getTrendingMovie() {
    const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos`
    );

    const data = await res.json();
    return data.results[0];   // top trending movie
}

export default async function HeroBanner() {
    const movie = await getTrendingMovie();

    return (
        <div className="relative h-[70vh] w-full mb-10">

            {/* Background Image */}
            <Image
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                fill
                priority
                className="object-cover"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-10 left-10 max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {movie.title}
                </h1>

                <p className="text-gray-300 mb-6 line-clamp-3">
                    {movie.overview}
                </p>

                <div className="flex gap-4">

                    {/* Play Button */}
                    <HeroClient movie={movie} />
                </div>

            </div>
        </div>
    );
}