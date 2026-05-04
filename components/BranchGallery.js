import React, { useState, useEffect, useCallback } from 'react';

export default function BranchGallery({ images }) {
  const [lightbox, setLightbox] = useState(null); // { index }

  const openLightbox = useCallback((i) => setLightbox({ index: i }), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const showPrev = useCallback((e) => {
    e.stopPropagation();
    setLightbox((lb) => lb && ({ index: (lb.index - 1 + images.length) % images.length }));
  }, [images]);

  const showNext = useCallback((e) => {
    e.stopPropagation();
    setLightbox((lb) => lb && ({ index: (lb.index + 1) % images.length }));
  }, [images]);

  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setLightbox((lb) => lb && ({ index: (lb.index - 1 + images.length) % images.length }));
      if (e.key === 'ArrowRight') setLightbox((lb) => lb && ({ index: (lb.index + 1) % images.length }));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, closeLightbox, images]);

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <>
      <div className="bg-grid">
        {images.map((src, i) => (
          <div key={src} className="bg-item" onClick={() => openLightbox(i)}>
            <img src={src} alt={`Gallery image ${i + 1}`} />
            <div className="bg-overlay">
              <svg className="bg-zoom-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="22" y2="22" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div className="bg-lb-overlay" onClick={closeLightbox}>
          <button className="bg-lb-close" onClick={closeLightbox} aria-label="Close">&#x2715;</button>
          <button className="bg-lb-arrow bg-lb-prev" onClick={showPrev} aria-label="Previous">&#8249;</button>
          <img
            className="bg-lb-img"
            src={images[lightbox.index]}
            alt="Gallery preview"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="bg-lb-arrow bg-lb-next" onClick={showNext} aria-label="Next">&#8250;</button>
          <div className="bg-lb-counter">{lightbox.index + 1} / {images.length}</div>
        </div>
      )}

      <style jsx global>{`
        .bg-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .bg-item {
          position: relative;
          overflow: hidden;
          border-radius: 10px;
          aspect-ratio: 4/3;
          cursor: zoom-in;
          background: #e8ecf2;
          box-shadow: 0 2px 10px rgba(41,51,71,0.08);
          transition: box-shadow 0.25s;
        }
        .bg-item:hover {
          box-shadow: 0 6px 24px rgba(68,65,229,0.2);
        }
        .bg-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.38s ease;
        }
        .bg-item:hover img {
          transform: scale(1.08);
        }
        .bg-overlay {
          position: absolute;
          inset: 0;
          background: rgba(68, 65, 229, 0.2);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.25s ease;
        }
        .bg-item:hover .bg-overlay { opacity: 1; }
        .bg-zoom-icon {
          width: 44px;
          height: 44px;
          color: #fff;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
        }

        /* Lightbox */
        .bg-lb-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0,0,0,0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: bg-fade 0.2s ease;
        }
        @keyframes bg-fade { from { opacity:0; } to { opacity:1; } }
        .bg-lb-img {
          max-width: 90vw;
          max-height: 88vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.6);
          animation: bg-zoom 0.22s ease;
          cursor: default;
        }
        @keyframes bg-zoom {
          from { transform: scale(0.92); opacity:0; }
          to   { transform: scale(1);    opacity:1; }
        }
        .bg-lb-close {
          position: fixed;
          top: 16px; right: 20px;
          background: rgba(255,255,255,0.15);
          border: none; color: #fff;
          font-size: 24px; line-height: 1;
          width: 44px; height: 44px;
          border-radius: 50%; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s; z-index: 10000;
        }
        .bg-lb-close:hover { background: #4441e5; }
        .bg-lb-arrow {
          position: fixed; top: 50%; transform: translateY(-50%);
          background: rgba(255,255,255,0.15);
          border: none; color: #fff;
          font-size: 48px; line-height: 1;
          width: 54px; height: 54px;
          border-radius: 50%; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s; z-index: 10000; user-select: none;
        }
        .bg-lb-arrow:hover { background: #4441e5; }
        .bg-lb-prev { left: 12px; }
        .bg-lb-next { right: 12px; }
        .bg-lb-counter {
          position: fixed; bottom: 16px; left: 50%; transform: translateX(-50%);
          color: rgba(255,255,255,0.75); font-size: 14px;
          font-family: 'DM Sans', Arial, sans-serif; letter-spacing: 1px;
          background: rgba(0,0,0,0.4); padding: 4px 14px; border-radius: 20px;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .bg-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 640px) {
          .bg-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .bg-lb-arrow { width: 40px; height: 40px; font-size: 36px; }
          .bg-lb-prev { left: 4px; }
          .bg-lb-next { right: 4px; }
          .bg-lb-img { max-width: 96vw; max-height: 80vh; }
        }
      `}</style>
    </>
  );
}
