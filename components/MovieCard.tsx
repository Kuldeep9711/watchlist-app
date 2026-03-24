'use client'

import { supabase } from "@/lib/supabase-client"
import { Check, Heart, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";


interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    overview?: string;
    vote_average: number;
    release_date?: string;
}

interface Props {
    movie: Movie;
}

export default function MovieCard ({ movie }: Props) {
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Check if movie is already in user's watchlist
    useEffect(() => {
        const checkWatchlistStatus = async () => {
            const { data: user } = await supabase.auth.getUser();
            if (!user?.user) return;

            const { data } = await supabase
               .from('watchlist')
               .select('id')
               .eq('user_id', user.user.id)
               .eq('movie_id', movie.id)
               .single();

               setIsInWatchlist(!!data);
        };

        checkWatchlistStatus();
    }, [movie.id])

    const toggleWatchlist = async () => {
        const { data: user } = await supabase.auth.getUser();
        if (!user?.user) {
            alert('Please log in to add movies to your watchlist');
            return;
        }

        setIsLoading(true);

        try {
            if (isInWatchlist) {
                // Remove from watchlist
                const { error } = await supabase
                .from('watchlist')
                .delete()
                .eq('user_id', user.user.id)
                .eq('movie_id', movie.id);

                if (error) throw error;
                    setIsInWatchlist(false);
            } else {
                // Add to watchlist
                const { error } = await supabase.from('watchlist').insert({
                    user_id: user.user.id,
                    movie_id: movie.id,
                    title: movie.title,
                    poster: movie.poster_path,
                    added_at: new Date().toISOString(),
                });

                if (error) throw error;
                setIsInWatchlist(true);
            }
        } catch (error) {
            console.error('Watchlist error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : null;

    return (
        <div
        className="group relative overflow-hidden rounded-xl bg-zinc-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
            {/* Poster */}
            <Link href={`/movie/${movie.id}`}>
            <div className="relative aspect-[2/3] overflow-hidden cursor-pointer">
               {movie.poster_path ? (
                <Image
                   src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                   alt={movie.title}
                   fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                   className="object-cover transition-transform duration-500 group-hover:scale-110"
                  
                />
               ) : (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                      <span className="text-gray-500">No Poster</span>
                    </div>
                    
               )}
              
               {/* Rating Badge */}
               {movie.vote_average > 0 && (
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                       {movie.vote_average.toFixed(1)}
                    </div>
               )}

               { /* Hover Overlay */}
               <div
               className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
                }`}
               >
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-sm text-gray-300 line-clamp-3 mb-3">
                      {movie.overview}
                    </p>
                </div>
               </div>
            </div>
             </Link>

             

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2 mb-1">
               {movie.title}
            </h3>

            {year && <p className="text-gray-400 text-sm mb-4">{year}</p>}

            {/* Action Button */}
            <button
            onClick={toggleWatchlist}
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                isInWatchlist
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
                } disabled:opacity-70`}
            >
              {isLoading ? (
                <>
                <Check className="w-2 h-2" />
                In Watchlist 
                </>
              ) : (
                <>
                <Heart className="w-2 h-2" />
                Add to Watchlist 
                </>
              )}
            </button>
          </div>
        </div>
    );
}
   