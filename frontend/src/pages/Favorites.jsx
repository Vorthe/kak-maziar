import React from 'react';

const favorites = [
  { type: 'Song', title: 'Wonderwall', artist: 'Oasis', link: 'https://example.com/song/1' },
  { type: 'Song', title: 'Here Comes the Sun', artist: 'The Beatles', link: 'https://example.com/song/2' },
  { type: 'Book', title: 'The Alchemist', author: 'Paulo Coelho', link: 'https://example.com/book/1' },
  { type: 'Book', title: 'To Kill a Mockingbird', author: 'Harper Lee', link: 'https://example.com/book/2' },
  { type: 'Quote', text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { type: 'Quote', text: 'Believe you can and you are halfway there.', author: 'Theodore Roosevelt' },
];

export default function Favorites() {
  return (
    <div>
      {/* Hero Section */}
      <header className="bg-[#F4EBD9] py-12 px-4 sm:py-16 sm:px-8 text-center border-b border-[#E0C8A8]">
        <h1 className="text-3xl sm:text-4xl font-[Cinzel] text-[#3E2723] leading-tight">
          Favorites
        </h1>
        <p className="mt-3 text-[#6B5A4A] text-lg max-w-xl">
          A collection of songs, books, and quotes that inspire me.
        </p>
      </header>

      {/* Favorites Section */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 pb-12">
        <div className="card">
          <h2 className="text-2xl font-[Cinzel] text-[#3E2723] mb-4">
            Songs, Books &amp; Quotes
          </h2>
          <div className="flex flex-col gap-3">
            {favorites.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-[#E0C8A8] bg-[#FDFBF7] flex items-center gap-3"
              >
                <span className="px-2.5 py-1 rounded-full bg-[#D4AF37] text-white text-xs font-[Cinzel] font-semibold">
                  {item.type}
                </span>
                <div className="flex-1">
                  <p className="text-[#3E2723] font-medium">
                    {item.title || item.text}
                  </p>
                  {item.artist || item.author ? (
                    <p className="text-[#6B5A4A] text-sm">
                      {item.artist || item.author}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Telegram Link Section */}
      <div className="mt-10 bg-[#F4EBD9] py-10 px-4 text-center">
        <h2 className="text-2xl font-[Cinzel] text-[#3E2723] mb-2">
          Join our Community
        </h2>
        <a
          href="https://t.me/kakmaziar"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-[#7B241C] text-[#F4EBD9] font-[Cinzel] rounded-md font-semibold transition hover:bg-[#D4AF37] hover:text-[#3E2723]"
        >
          Join our Telegram
        </a>
      </div>
    </div>
  );
}
