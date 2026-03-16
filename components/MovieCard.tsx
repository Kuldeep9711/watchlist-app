'use client'

import { supabase } from "@/lib/supabase-client"

export default function MovieCard ({ movie }: any) {
    
    const addToWatchlist = async () => {

        const { data: user } = await supabase.auth.getUser()
        
        if (!user?.user) {
            alert("Please login first")
            return
        }

    const { error } = await supabase
    .from("watchlist")
    .insert({
        user_id: user.user.id,
        movie_id: movie.id,
        title: movie.title,
        poster: movie.poster_path
    })

    if (error) {
        console.log(error)
    } else {
        alert("Added to watchlist")
    }
}

    return (
        <div className="border p-3 rounded">
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