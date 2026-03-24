'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';

export default function HeroClient({ movie }: any) {
    const [isOpen, setIsOpen] = useState(false);


    const trailer = movie.videos?.results?.find(
        (vid: any) =>
            vid.sit === "Youtube" &&
        (vid.type === "Trailer" || vid.type === "Teaser") 
    );

       useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false)
            }
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
       }, []);


  return (
    <>
    {/* Button */}
    <div className='flex gap-4 mt-6'>
        {trailer &&(
            <button
            onClick={() => setIsOpen(true)}
            className='bg-white text-black px-6 py-3 rounded-lg font-semibold'
            >
          ▶ Play Trailer
            </button>
        )}

        <a
        href={`movie/${movie.id}`}
        className='bg-gray-700/70 px-6 py-3 rounded-lg'
        >
            More Info
        </a>
    </div>

    {/* Modal */}
    {isOpen && (
    <div 
    className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'
      onClick={() => setIsOpen(false)}
      >
        <motion.div
        initial={{ scale: 0.8, opacity: 0}}
        animate= {{ scale: 1, opacity: 1}}
        exit={{ scale: 0.8, opacity: 0}}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        >
        <iframe 
         className='w-[90%] md:w-[800px] h-[300px] md:h-[450px] rounded-xl'
         src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
         allowFullScreen
        />

        </motion.div>
    </div>
    )}
    </>
  );
}
