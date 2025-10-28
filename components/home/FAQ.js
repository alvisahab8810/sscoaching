// import Link from "next/link";
// import React, { useState } from "react";
// import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";

// export default function FAQ() {
//   const [openIndex, setOpenIndex] = useState(0); // first FAQ open by default

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   const faqData = [
//     {
//       question: "Can I enroll in multiple courses at once?",
//       answer:
//         "Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience.",
//       subText: "Enrollment Process for Different Courses",
//       subIcon: "/assets/icons/faq-arrow.svg",
//     },
//     {
//       question: "What kind of support can I expect from instructors?",
//       answer:
//         "Our instructors provide personalized guidance, answer your questions promptly, and offer support throughout your learning journey.",
//       subText: null,
//       subIcon: null,
//     },
//     {
//       question:
//         "Are the courses self-paced or do they have specific start and end dates?",
//       answer:
//         "Most courses are self-paced, allowing you to learn at your convenience. Some courses may have specific start and end dates, which will be mentioned in the course details.",
//       subText: null,
//       subIcon: null,
//     },
//     {
//       question: "Are there any prerequisites for the courses?",
//       answer:
//         "Some courses may have prerequisites like basic knowledge of the subject. Please check the course description for detailed requirements.",
//       subText: null,
//       subIcon: null,
//     },
//   ];

//   return (
//     <section className="faq-section">
//       <div className="container">
//         <div className="faq-container">
//           <h2 className="faq-title">
//             <span className="highlight">FAQ:</span> Frequently Asked Questions
//           </h2>
//           <div className="faq-list">
//             {faqData.map((item, index) => (
//               <div
//                 key={index}
//                 className={`faq-item ${openIndex === index ? "expanded" : ""}`}
//               >
//                 <div
//                   className="faq-question d-flex justify-content-between align-items-center"
//                   onClick={() => toggleFAQ(index)}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <div className="faq-question-text">{item.question}</div>
//                   <div className="faq-icon">
//                     {openIndex === index ? (
//                       <AiOutlineClose size={28} />
//                     ) : (
//                       <AiOutlinePlus size={28} />
//                     )}
//                   </div>
//                 </div>

//                 {openIndex === index && item.answer && (
//                   <div className="faq-answer mt-2">{item.answer}</div>
//                 )}

//                 {openIndex === index && item.subText && (
//                   <div className="faq-sub-item mt-2 d-flex align-items-center">
//                     <div className="faq-sub-text">{item.subText}</div>
//                     <div className="faq-sub-icon ms-2">
//                      <Link href="#">
//                       <img
//                         src={item.subIcon}
//                         alt="Info"
//                       />
//                      </Link>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // first FAQ open by default
  const [faqData, setFaqData] = useState([]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Fetch FAQs dynamically from API
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("/api/faqs");
        const data = await res.json();
        if (data.success) {
          setFaqData(data.data);
        } else {
          console.error("Failed to load FAQs");
        }
      } catch (err) {
        console.error("Error fetching FAQs:", err);
      }
    };
    fetchFaqs();
  }, []);

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

                  {openIndex === index && item.answer && (
                    <div className="faq-answer mt-2">{item.answer}</div>
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
        </div>
      </div>
    </section>
  );
}
