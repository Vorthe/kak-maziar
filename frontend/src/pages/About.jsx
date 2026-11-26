import React from 'react';

export default function About() {
  const timelineItems = [
    {
      title: 'My Story',
      content: 'A brief overview of my background and journey.',
    },
    {
      title: 'Where I am from',
      content: 'My roots and hometown.',
    },
    {
      title: 'Why I became a teacher',
      content: 'The moment I decided to teach.',
    },
  ];

  const polaroidPhotos = [
    { title: 'My Coffee', image: 'https://placehold.co/400x300/ecf0f1/333333?text=My+Coffee' },
    { title: 'My Books', image: 'https://placehold.co/400x300/ecf0f1/333333?text=My+Books' },
    { title: 'My City', image: 'https://placehold.co/400x300/ecf0f1/333333?text=My+City' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <header className="bg-[#F4EBD9] py-12 px-4 sm:py-16 sm:px-8 text-center border-b border-[#E0C8A8]">
        <h1 className="text-3xl sm:text-4xl font-[Cinzel] text-[#3E2723] leading-tight">
          About Me
        </h1>
        <p className="mt-3 text-[#6B5A4A] text-lg max-w-xl">
          My journey, my passions, and what inspires me.
        </p>
      </header>

      {/* Timeline Section */}
      <section className="py-10 sm:py-14 px-4 sm:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-[Cinzel] text-[#3E2723] text-center mb-2">
            My Story
          </h2>
          <div className="timeline">
            {timelineItems.map((item, index) => (
              <div key={item.title} className="timeline-item">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37] border-3 border-[#F4EBD9] flex items-center justify-center text-[#3E2723] font-[Cinzel] font-bold text-sm shadow-md">
                    {index + 1}
                  </div>
                </div>
                <div className="timeline-content flex-1">
                  <h3 className="text-xl font-[Cinzel] text-[#3E2723] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[#6B5A4A]">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Polaroid Photo Gallery Section */}
      <section className="bg-[#F9FAFB] py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-[Cinzel] text-[#3E2723] text-center mb-2">
            Polaroid Gallery
          </h2>
          <p className="text-[#6B5A4A] text-center mb-8">
            A few snapshots from my shelves, my cup, and my city.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {polaroidPhotos.map((photo, index) => (
              <div key={photo.title} className="polaroid">
                <img
                  src={photo.image}
                  alt={photo.title}
                />
                <div className="p-2">
                  <div className="photo-label">{photo.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
