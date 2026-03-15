'use client'

import { supabase } from "@/lib/supabase-client"

export default function MovieCard ({ movie }: any) {
    
    const addToWatchlist = async () => {
    const { error } = await supabase
    .from("watchlist")
    .insert({
        movie_id: movie.id,
        title: movie.title,
        poster: movie.poster_path
    })

    if (error) {
        console.log(error)
        alert("Failed to add movie")
    } else {
        alert("Movie added to watchlist")
    }
}

    return (
        <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />

            <h3>{movie.title}</h3>

            <button onClick={addToWatchlist}>
                Add to Watchlist
                </button>
        </div>
    )
}