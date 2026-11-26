import React from 'react';

const podcastLinks = [
  {
    name: 'Coffee Break English',
    url: 'https://example.com/podcast/coffee-break-english',
    description: 'Learn English with daily coffee break lessons.',
  },
  {
    name: 'English with Friends',
    url: 'https://example.com/podcast/english-with-friends',
    description: 'Join our friendly community for English practice.',
  },
];

export default function Podcasts() {
  return (
    <div>
      {/* Hero Section */}
      <header className="bg-[#F4EBD9] py-12 px-4 sm:py-16 sm:px-8 text-center border-b border-[#E0C8A8]">
        <h1 className="text-3xl sm:text-4xl font-[Cinzel] text-[#3E2723] leading-tight">
          Podcasts
        </h1>
        <p className="mt-3 text-[#6B5A4A] text-lg max-w-xl">
          Listen to our latest episodes and join the conversation.
        </p>
      </header>

      {/* Podcast Links Section */}
      <main className="max-w-3xl mx-auto px-4 sm:px-8 pb-12">
        <div className="card">
          <h2 className="text-2xl font-[Cinzel] text-[#3E2723] mb-4">
            Podcast Links
          </h2>
          <div className="flex flex-col gap-4">
            {podcastLinks.map((podcast) => (
              <a
                key={podcast.name}
                href={podcast.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5 rounded-lg border border-[#E0C8A8] hover:border-[#D4AF37] hover:shadow-lg transition"
              >
                <h3 className="text-[#3E2723] font-[Cinzel] text-lg mb-1">
                  {podcast.name}
                </h3>
                <p className="text-[#6B5A4A]">{podcast.description}</p>
              </a>
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
