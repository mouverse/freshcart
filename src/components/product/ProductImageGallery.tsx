'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface Props {
  images: string[];
  title: string;
}

export default function ProductImageGallery({ images, title }: Props) {
  const [selected, setSelected] = useState(0);

  const prev = () => setSelected((s) => (s === 0 ? images.length - 1 : s - 1));
  const next = () => setSelected((s) => (s === images.length - 1 ? 0 : s + 1));

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Main image */}
      <div className="relative group bg-gray-50">
        <div className="aspect-square overflow-hidden">
          <Image
            src={images[selected]}
            alt={title}
            width={600}
            height={600}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            priority
          />
        </div>

        {/* Prev / Next arrows — only show when multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:bg-white hover:text-primary-600 transition opacity-0 group-hover:opacity-100"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:bg-white hover:text-primary-600 transition opacity-0 group-hover:opacity-100"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </>
        )}

        {/* Dot indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  selected === i
                    ? 'bg-primary-500 scale-125 shadow-sm'
                    : 'bg-white/60 hover:bg-white/90'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="p-3 border-t border-gray-100">
          <div className="flex justify-center gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary-300 hover:[&::-webkit-scrollbar-thumb]:bg-primary-500">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 bg-gray-50 transition-all duration-200 ${
                  selected === i
                    ? 'border-transparent shadow-md scale-105'
                    : 'border-transparent hover:scale-105 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="w-full h-full flex items-center justify-center p-1">
                  <Image
                    src={img}
                    alt={`${title} view ${i + 1}`}
                    width={80}
                    height={80}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
