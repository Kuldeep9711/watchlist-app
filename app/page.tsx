'use client'

import MovieCard from "@/components/MovieCard"
import { searchMovies } from "@/lib/tmbs"
import { useEffect, useState } from "react"

export default function Page() {
  const [movies, setMovies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")

  useEffect(() => {
    const searchMovies = async () => {
      const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`
      )

      const data = await res.json()
      setMovies(data.results)
    }
  })

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMBD_API_KEY}`
        )

        const data = await res.json()
        setMovies(data.results || [])
      } catch (err) {
        console.log("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
            Movie Watchlist
      </h1>
        <div className="flex gap-2 mb-6 justify-end">
          <input
           value={query}
           onChange={(e) => setQuery(e.target.value)}
           placeholder="Search movie..."
           className="border p-2"
          />

          <button 
          onClick={() => searchMovies}
          className="bg-blue-500 text-white px-4"
          >
            Search 
          </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
           ))}
        </div>
      )}
    

    </main>
  )
}