import React, { useState, useEffect, useCallback } from 'react';

const allImages = [
  '/assets/images/gallery/gallery1.png',
  '/assets/images/gallery/gallery4.png',
  '/assets/images/gallery/gallery5.png',
  '/assets/images/gallery/gallery7.png',
  '/assets/images/gallery/gallery2.png',
  '/assets/images/gallery/gallery3.png',
  '/assets/images/gallery/gallery9.png',
  '/assets/images/gallery/gallery6.png',
  '/assets/images/gallery/gallery8.png',
  '/assets/images/gallery/g1.png',
  '/assets/images/gallery/g9.png',
  '/assets/images/gallery/g3.png',
  '/assets/images/gallery/g4.png',
  '/assets/images/gallery/g5.png',
  '/assets/images/gallery/g2.png',
];

export default function PhotoGallery() {
  const [lightbox, setLightbox] = useState(null); // index into allImages

  const openLightbox = useCallback((src) => {
    const idx = allImages.indexOf(src);
    setLightbox(idx !== -1 ? idx : 0);
  }, []);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const showPrev = useCallback((e) => {
    e.stopPropagation();
    setLightbox((i) => (i - 1 + allImages.length) % allImages.length);
  }, []);

  const showNext = useCallback((e) => {
    e.stopPropagation();
    setLightbox((i) => (i + 1) % allImages.length);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (lightbox === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + allImages.length) % allImages.length);
      if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % allImages.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, closeLightbox]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const imgProps = (src) => ({
    src,
    onClick: () => openLightbox(src),
    style: { cursor: 'zoom-in' },
  });

  return (
    <>
      <div className="photo-gallery-container">

        <div className='gallery-row-area mb-5'>
          <div className='gallery-first-row'>
            <div className='firs-g-img'>
              <img {...imgProps('/assets/images/gallery/gallery1.png')} />
            </div>
            <div className='gallery-items-row'>
              <div>
                <img {...imgProps('/assets/images/gallery/gallery4.png')} />
                <img {...imgProps('/assets/images/gallery/gallery5.png')} />
              </div>
              <div>
                <img {...imgProps('/assets/images/gallery/gallery7.png')} />
              </div>
            </div>
          </div>
          <div className='gallery-2nd-row'>
            <div className='second-g-img'>
              <img {...imgProps('/assets/images/gallery/gallery2.png')} />
              <img {...imgProps('/assets/images/gallery/gallery3.png')} />
            </div>
            <div className='second-large-img'>
              <img {...imgProps('/assets/images/gallery/gallery9.png')} />
            </div>
            <div className='second-g-img'>
              <img {...imgProps('/assets/images/gallery/gallery6.png')} />
              <img {...imgProps('/assets/images/gallery/gallery8.png')} />
            </div>
          </div>
        </div>

        <div className='gallery-row-area'>
          <div className='gallery-first-row'>
            <div className='firs-g-img'>
              <img {...imgProps('/assets/images/gallery/g1.png')} />
            </div>
            <div className='gallery-items-row'>
              <div>
                <img {...imgProps('/assets/images/gallery/g9.png')} />
                <img {...imgProps('/assets/images/gallery/g3.png')} />
              </div>
              <div>
                <img {...imgProps('/assets/images/gallery/g4.png')} />
              </div>
            </div>
          </div>
          <div className='gallery-2nd-row'>
            <div className='second-g-img'>
              <img {...imgProps('/assets/images/gallery/g5.png')} />
              <img {...imgProps('/assets/images/gallery/g2.png')} />
            </div>
            <div className='second-g-img'></div>
          </div>
        </div>

      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="gallery-lightbox-overlay" onClick={closeLightbox}>
          <button className="gallery-lb-close" onClick={closeLightbox} aria-label="Close">&#x2715;</button>
          <button className="gallery-lb-arrow gallery-lb-prev" onClick={showPrev} aria-label="Previous">&#8249;</button>
          <img
            className="gallery-lb-img"
            src={allImages[lightbox]}
            alt="Gallery preview"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="gallery-lb-arrow gallery-lb-next" onClick={showNext} aria-label="Next">&#8250;</button>
          <div className="gallery-lb-counter">{lightbox + 1} / {allImages.length}</div>
        </div>
      )}

      <style jsx global>{`
        .gallery-lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: lb-fade 0.2s ease;
        }

        @keyframes lb-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .gallery-lb-img {
          max-width: 90vw;
          max-height: 88vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.6);
          animation: lb-zoom 0.2s ease;
          cursor: default;
        }

        @keyframes lb-zoom {
          from { transform: scale(0.92); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }

        .gallery-lb-close {
          position: fixed;
          top: 16px;
          right: 20px;
          background: rgba(255,255,255,0.15);
          border: none;
          color: #fff;
          font-size: 26px;
          line-height: 1;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          z-index: 10000;
        }
        .gallery-lb-close:hover { background: rgba(255,255,255,0.3); }

        .gallery-lb-arrow {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.15);
          border: none;
          color: #fff;
          font-size: 48px;
          line-height: 1;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          z-index: 10000;
          user-select: none;
        }
        .gallery-lb-arrow:hover { background: rgba(255,255,255,0.3); }
        .gallery-lb-prev { left: 12px; }
        .gallery-lb-next { right: 12px; }

        .gallery-lb-counter {
          position: fixed;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255,255,255,0.7);
          font-size: 14px;
          letter-spacing: 1px;
        }

        @media (max-width: 600px) {
          .gallery-lb-arrow { width: 40px; height: 40px; font-size: 36px; }
          .gallery-lb-prev { left: 4px; }
          .gallery-lb-next { right: 4px; }
          .gallery-lb-img { max-width: 96vw; max-height: 80vh; }
        }
      `}</style>
    </>
  );
}
