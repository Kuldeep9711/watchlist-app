
export async function searchMovies(query: string) {
    const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_TMBD_API_KEY}&query=${query}`
    )

    const data = await res.json()
    return data.results
}