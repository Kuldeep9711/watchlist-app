'use client'

import { supabase } from "@/lib/supabase-client"
import Link from "next/link"
import { useEffect, useState } from "react"


export default function WatchlistPage() {

    const [movies, setMovies] = useState<any[]>([])
    
    useEffect(() => {

        const loadWatchlist = async () => {
            
            const { data: user } = await supabase.auth.getUser()

            if (!user?.user) return

            const { data } = await supabase
            .from("watchlist")
            .select("")
            .eq("user_id", user.user.id)

            setMovies(data || [])
        }

        loadWatchlist()

    }, [])
  return (
    <div className="p-10">
      <h1 className="text-2xl mb-6">
        <Link href="/watchlist">
        My Watchlist
        </Link>
      </h1>

       {movies.map((movie: any) => (

      <div key={movie.id}>

        <img
           src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
        />

        <p>{movie.title}</p>

      </div>
      ))}
    </div>
  )
}
