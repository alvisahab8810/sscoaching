

// "use client";
// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

// export default function FAQ() {
//   const [openIndex, setOpenIndex] = useState(0); // first FAQ open by default
//   const [faqData, setFaqData] = useState([]);

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   // Fetch FAQs dynamically from API
//   useEffect(() => {
//     const fetchFaqs = async () => {
//       try {
//         const res = await fetch("/api/faqs");
//         const data = await res.json();
//         if (data.success) {
//           setFaqData(data.data);
//         } else {
//           console.error("Failed to load FAQs");
//         }
//       } catch (err) {
//         console.error("Error fetching FAQs:", err);
//       }
//     };
//     fetchFaqs();
//   }, []);

//   return (
//     <section className="faq-section">
//       <div className="container">
//         <div className="faq-container">
//           <h2 className="faq-title">
//             <span className="highlight">FAQ:</span> Frequently Asked Questions
//           </h2>

//           <div className="faq-list">
//             {faqData.length === 0 ? (
//               <p className="text-center text-muted">No FAQs available yet.</p>
//             ) : (
//               faqData.map((item, index) => (
//                 <div
//                   key={item._id || index}
//                   className={`faq-item ${openIndex === index ? "expanded" : ""}`}
//                 >
//                   <div
//                     className="faq-question d-flex justify-content-between align-items-center"
//                     onClick={() => toggleFAQ(index)}
//                     style={{ cursor: "pointer" }}
//                   >
//                     <div className="faq-question-text">{item.question}</div>
//                     <div className="faq-icon">
//                       {openIndex === index ? (
//                         <AiOutlineClose size={28} />
//                       ) : (
//                         <AiOutlinePlus size={28} />
//                       )}
//                     </div>
//                   </div>

//                   {openIndex === index && item.answer && (
//                     <div className="faq-answer mt-2">{item.answer}</div>
//                   )}

//                   {openIndex === index && item.subText && (
//                     <div className="faq-sub-item mt-2 d-flex align-items-center">
//                       <div className="faq-sub-text">{item.subText}</div>
//                       {item.subIcon && (
//                         <div className="faq-sub-icon ms-2">
//                           <Link href="#">
//                             <img src={item.subIcon} alt="Info" />
//                           </Link>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import DOMPurify from "dompurify";


export default function FAQ({ limit, showViewMore = false }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [faqData, setFaqData] = useState([]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("/api/faqs");
        const data = await res.json();
        if (data.success) {
          // If limit prop exists, slice the array
          const limitedData = limit ? data.data.slice(0, limit) : data.data;
          setFaqData(limitedData);
        } else {
          console.error("Failed to load FAQs");
        }
      } catch (err) {
        console.error("Error fetching FAQs:", err);
      }
    };
    fetchFaqs();
  }, [limit]);

  return (
    <section className="faq-section">
      <div className="container">
        <div className="faq-container">
          <h2 className="faq-title">
            <span className="highlight">FAQ:</span> Frequently Asked Questions
          </h2>

          <div className="faq-list">
            {faqData.length === 0 ? (
              <p className="text-center text-muted">No FAQs available yet.</p>
            ) : (
              faqData.map((item, index) => (
                <div
                  key={item._id || index}
                  className={`faq-item ${openIndex === index ? "expanded" : ""}`}
                >
                  <div
                    className="faq-question d-flex justify-content-between align-items-center"
                    onClick={() => toggleFAQ(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="faq-question-text">{item.question}</div>
                    <div className="faq-icon">
                      {openIndex === index ? (
                        <AiOutlineClose size={28} />
                      ) : (
                        <AiOutlinePlus size={28} />
                      )}
                    </div>
                  </div>

                  {/* {openIndex === index && item.answer && (
                    <div className="faq-answer mt-2">{item.answer}</div>
                  )} */}


                  {openIndex === index && item.answer && (
  <div
    className="faq-answer mt-2"
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(item.answer),
    }}
  />
)}


                  {openIndex === index && item.subText && (
                    <div className="faq-sub-item mt-2 d-flex align-items-center">
                      <div className="faq-sub-text">{item.subText}</div>
                      {item.subIcon && (
                        <div className="faq-sub-icon ms-2">
                          <Link href="#">
                            <img src={item.subIcon} alt="Info" />
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* ✅ View More Button */}
          {showViewMore && (
            <div className="text-center mt-4">
              <Link href="/faq" className="view-more-btn">
                View All FAQs →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
