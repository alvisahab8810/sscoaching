// import React from "react";

// const Gallery = () => {
//   const images = [
//     // Box 1
//     { src: "/assets/images/gallery/gallery1.png", alt: "Teacher at desk in S.S Coaching" },
//     { src: "/assets/images/gallery/gallery4.png", alt: "Classroom view with students" },
//     { src: "/assets/images/gallery/gallery5.png", alt: "Students attending a lecture" },
//     { src: "/assets/images/gallery/gallery7.png", alt: "Group discussion at S.S Coaching" },

//     // Box 2
//     { src: "/assets/images/gallery/gallery2.png", alt: "Coaching office interior" },
//     { src: "/assets/images/gallery/gallery3.png", alt: "Teachers and staff photo" },
//     { src: "/assets/images/gallery/gallery9.png", alt: "Lecture in progress" },
//     { src: "/assets/images/gallery/gallery8.png", alt: "Teacher at office desk" },
//     { src: "/assets/images/gallery/gallery6.png", alt: "Students group photo" },
//   ];

//   return (
//     <>
//       <div className="gallery-main">
//         {/* BOX 1 */}
//         <div className="gallery-box box-1">
//           <div className="top-full">
//             <img src={images[0].src} alt={images[0].alt} />
//           </div>

//           <div className="bottom-grid">
//             <div className="left-column">
//               <div className="half"><img src={images[1].src} alt={images[1].alt} /></div>
//               <div className="half"><img src={images[2].src} alt={images[2].alt} /></div>
//             </div>
//             <div className="right-column">
//               <img src={images[3].src} alt={images[3].alt} />
//             </div>
//           </div>
//         </div>

//         {/* BOX 2 */}
//         <div className="gallery-box box-2">
//           <div className="top-row">
//             <img src={images[4].src} alt={images[4].alt} />
//             <img src={images[5].src} alt={images[5].alt} />
//           </div>
//           <div className="middle-full">
//             <img src={images[6].src} alt={images[6].alt} />
//           </div>
//           <div className="bottom-row">
//             <img src={images[7].src} alt={images[7].alt} />
//             <img src={images[8].src} alt={images[8].alt} />
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .gallery-main {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 25px;
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 20px;
//         }

//         .gallery-box {
//           display: grid;
//           gap: 16px;
//         }

//         img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           border-radius: 12px;
//           display: block;
//         }

//         /* --- BOX 1 --- */
//         .box-1 .top-full {
//           height: 280px;
//           overflow: hidden;
//         }

//         .box-1 .bottom-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 12px;
//           height: 420px; /* ensures both columns equal */
//         }

//         .box-1 .left-column {
//           display: grid;
//           grid-template-rows: 1fr 1fr;
//           gap: 12px;
//           height: 100%;
//         }

//         .box-1 .left-column .half,
//         .box-1 .right-column {
//           overflow: hidden;
//         }

//         .box-1 .right-column img {
//           height: 100%;
//         }

//         /* --- BOX 2 --- */
//         .box-2 .top-row,
//         .box-2 .bottom-row {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 12px;
//           height: 280px;
//           overflow: hidden;
//         }

//         .box-2 .middle-full {
//           height: 420px;
//           overflow: hidden;
//         }

//         /* --- RESPONSIVE --- */
//         @media (max-width: 900px) {
//           .gallery-main {
//             grid-template-columns: 1fr;
//           }

//           .box-1 .top-full,
//           .box-2 .middle-full {
//             height: 220px;
//           }

//           .box-1 .bottom-grid,
//           .box-2 .top-row,
//           .box-2 .bottom-row {
//             grid-template-columns: 1fr;
//             height: auto;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default Gallery;



import React from 'react';

export default function PhotoGallery() {
  return (
    <div className="photo-gallery-container">

      <div className='gallery-row-area mb-5'>
         <div className='gallery-first-row'>
            <div className='firs-g-img'>
               <img src='/assets/images/gallery/gallery1.png'></img>
            </div>

            <div className='gallery-items-row'>
                <div>
                  <img src='/assets/images/gallery/gallery4.png'></img>
                   <img src='/assets/images/gallery/gallery5.png'></img>

                </div>
                <div>
                  <img src='/assets/images/gallery/gallery7.png'></img>

                </div>

            </div>
         </div>
           <div className='gallery-2nd-row'>
             <div className='second-g-img'>
                 <img src='/assets/images/gallery/gallery2.png'></img>
                   <img src='/assets/images/gallery/gallery3.png'></img>

             </div>

              <div className='second-large-img'>
               <img src='/assets/images/gallery/gallery9.png'></img>
            </div>

             <div className='second-g-img'>
                 <img src='/assets/images/gallery/gallery6.png'></img>
                   <img src='/assets/images/gallery/gallery8.png'></img>

             </div>
         </div>
      </div>

          <div className='gallery-row-area'>
         <div className='gallery-first-row'>
            <div className='firs-g-img'>
               <img src='/assets/images/gallery/g1.png'></img>
            </div>

            <div className='gallery-items-row'>
                <div>
                  <img src='/assets/images/gallery/g2.png'></img>
                   <img src='/assets/images/gallery/g3.png'></img>

                </div>
                <div>
                  <img src='/assets/images/gallery/g4.png'></img>

                </div>

            </div>
         </div>
           <div className='gallery-2nd-row'>
             <div className='second-g-img'>
                 <img src='/assets/images/gallery/g5.png'></img>
                   <img src='/assets/images/gallery/g6.png'></img>

             </div>

              <div className='second-large-img'>
               <img src='/assets/images/gallery/g7.png'></img>
            </div>

             <div className='second-g-img'>
                 <img src='/assets/images/gallery/g8.png'></img>
                   <img src='/assets/images/gallery/g9.png'></img>

             </div>
         </div>
      </div>

      

     </div>
  );
}
