import React from 'react';
import { getAssetPath } from '@/utils';

const AnnathanamImageStrip: React.FC = () => {
  // Exactly three images
  const images = [
    getAssetPath('assets/annathanam/img1.jpeg'),
    getAssetPath('assets/annathanam/img2.jpeg'),
    getAssetPath('assets/annathanam/img3.jpeg'),
  ];

  // Repeat images multiple times so the loop feels continuous / circular
  const trackImages = Array(4)
    .fill(images)
    .flat();

  return (
    <section
      aria-label="Annathanam gallery"
      className="bg-white py-4 md:py-6 overflow-hidden"
    >
      <div className="container-custom-full">
        <div
          className="carousel-wrapper"
          style={{
            overflow: 'hidden',
            width: '100%',
            maxWidth: '1100px',
            position: 'relative',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <div
            className="card-track"
            style={{
              display: 'flex',
              gap: '24px',
              width: 'max-content',
              animation: 'stream-loop-ltr 26s linear infinite',
            }}
          >
            {trackImages.map((src, index) => (
              <div
                key={index}
                className="stream-card"
                style={{
                  width: '260px',
                  flexShrink: 0,
                  borderRadius: '16px',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={src}
                  alt="Annathanam meal service"
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnathanamImageStrip;

