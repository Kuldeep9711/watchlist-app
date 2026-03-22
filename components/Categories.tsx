'use client'

import { useRouter, useSearchParams } from "next/navigation"

const categories = [
    { name: "Action", id: 28 },
    { name: "Comedy", id: 35 },
    { name: "Drama", id: 18 },
    { name: "Horror", id: 27 },
    { name: "Romance", id: 10749 },
    { name: "Animation", id: 16 },
    { name: "Thriller", id: 53 },
];

export default function Categories() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const active = searchParams.get("genre");

    const handleClick = (id: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("genre", String(id));
        router.push(`/?${params.toString()}`);
    };

    return (
        <div className="flex flex-wrap gap-3 mb-8 justify-center max-w-5xl mx-auto">
           {categories.map((cat) => (
            <button
            key={cat.id}
            onClick={() => handleClick(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition
                ${
                 active === String(cat.id)
                 ? "bg-red-600 text-white"
                 : "bg-zinc-800 hover:bg-red-500"
                }
                `}
            >
             {cat.name}
            </button>
           ))}
        </div>
    )
}