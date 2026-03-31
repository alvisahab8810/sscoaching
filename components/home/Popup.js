"use client";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

export default function Popup() {
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    // email: "",        // hidden for now
    phone: "",
    lookingFor: "",
    city: "",
    formType: "popup"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClose = () => setShowPopup(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const buttons = document.querySelectorAll(".cta-btn, .cta-btn-2nd");
    const openHandler = (e) => {
      e.preventDefault();
      setShowPopup(true);
    };
    buttons.forEach((btn) => btn.addEventListener("click", openHandler));
    return () => {
      buttons.forEach((btn) => btn.removeEventListener("click", openHandler));
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Send only the visible fields + formType
    // email, lookingFor, city are commented out but kept in model for future
    const payload = {
      fullName: form.fullName,
      email: "",                  // hidden field, sending empty string
      phone: form.phone,
      lookingFor: form.lookingFor,
      city: form.city,
      formType: form.formType,
    };

    const response = await fetch("/api/popup", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    setLoading(false);

    if (data.success) {
      toast.success("Form Submitted Successfully!");
      setShowPopup(false);
      setForm({
        fullName: "",
        // email: "",
        phone: "",
        lookingFor: "",
        city: "",
        formType: "popup",
      });
    } else {
      toast.error("Submission Failed!");
    }
  };

  return (
    <>
      <Toaster richColors position="top-right" />

      {showPopup && (
        <div className="popup-overlay" onClick={handleClose}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleClose}>×</button>

            <div className="form-container">
              <div className="form-header">
                <div className="overlay">
                  <h1>
                    Registration open!
                    <br /> Limited seats
                  </h1>
                  <p>Fill the form before it's too late</p>
                </div>
              </div>

              <form className="form-body" onSubmit={handleSubmit}>

                {/* ✅ VISIBLE: Name */}
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />

                {/* ❌ HIDDEN: Email — commented out, not removed */}
                {/* <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                /> */}

                {/* ✅ VISIBLE: Phone */}
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone No."
                  value={form.phone}
                  onChange={handleChange}
                  required
                />

                {/* ✅ VISIBLE: Looking For */}
                <input
                  type="text"
                  name="lookingFor"
                  placeholder="What are you looking for?"
                  value={form.lookingFor}
                  onChange={handleChange}
                  required
                />

                {/* ✅ VISIBLE: City */}
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  required
                />

                <button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "SUBMIT"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ⭐ CSS remains exactly same ⭐ */}
      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          animation: fadeIn 0.3s ease;
        }

        .popup-content {
          position: relative;
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
          animation: slideUp 0.3s ease;
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          background: transparent;
          border: none;
          font-size: 24px;
          font-weight: bold;
          cursor: pointer;
          color: #ffffffff;
          z-index: 10;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .form-container {
          border-radius: 10px;
          overflow: hidden;
          background: #fff;
        }

        .form-header {
          background-image: url("/assets/images/cta.webp");
          background-size: cover;
          background-position: center;
          height: 180px;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
        }

        .overlay {
          color: #fff;
          background: rgba(0, 0, 0, 0.4);
          width: 100%;
          padding: 16px;
          height: 100%;
          display: flex;
          flex-flow: column;
          justify-content: center;
        }

        .form-body {
          display: flex;
          flex-direction: column;
          padding: 16px;
          gap: 12px;
        }

        input {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 10px;
          font-size: 14px;
          width: 100%;
          outline: none;
          transition: border 0.2s;
        }

        input:focus {
          border-color: #7a5fff;
        }

        .phone-input {
          display: flex;
          align-items: center;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
        }

        .overlay h1 {
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 4px 0;
          line-height: 1.3;
        }

        .overlay p {
          font-size: 14px;
          opacity: 0.9;
          margin: 0;
        }

        button[type="submit"] {
          background: linear-gradient(to right, #6a5cff, #7a5fff);
          color: #fff;
          border: none;
          padding: 10px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 15px;
          transition: background 0.3s;
        }

        button[type="submit"]:hover {
          background: linear-gradient(to right, #5949ff, #6a5fff);
        }
      `}</style>
    </>
  );
}




// "use client";
// import React, { useEffect, useState } from "react";
// import { Toaster, toast } from "sonner";

// export default function Popup() {
//   const [showPopup, setShowPopup] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     lookingFor: "",
//     city: "",
//     formType: "popup"
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleClose = () => setShowPopup(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setShowPopup(true), 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     const buttons = document.querySelectorAll(".cta-btn, .cta-btn-2nd");
//     const openHandler = (e) => {
//       e.preventDefault();
//       setShowPopup(true);
//     };
//     buttons.forEach((btn) => btn.addEventListener("click", openHandler));
//     return () => {
//       buttons.forEach((btn) => btn.removeEventListener("click", openHandler));
//     };
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const response = await fetch("/api/popup", {
//       method: "POST",
//       body: JSON.stringify(form),
//     });

//     const data = await response.json();
//     setLoading(false);

//     if (data.success) {
//       toast.success("Form Submitted Successfully!");
//       setShowPopup(false);
//       setForm({
//         fullName: "",
//         email: "",
//         phone: "",
//         lookingFor: "",
//         city: "",
//       });
//     } else {
//       toast.error("Submission Failed!");
//     }
//   };

//   return (
//     <>
//       <Toaster richColors position="top-right" />

//       {showPopup && (
//         <div className="popup-overlay" onClick={handleClose}>
//           <div className="popup-content" onClick={(e) => e.stopPropagation()}>
//             <button className="close-btn" onClick={handleClose}>×</button>

//             <div className="form-container">
//               <div className="form-header">
//                 <div className="overlay">
//                   <h1>
//                     Registration open!
//                     <br /> Limited seats
//                   </h1>
//                   <p>Fill the form before it’s too late</p>
//                 </div>
//               </div>

//               <form className="form-body" onSubmit={handleSubmit}>
//                 <input
//                   type="text"
//                   name="fullName"
//                   placeholder="Full name"
//                   value={form.fullName}
//                   onChange={handleChange}
//                   required
//                 />

//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   value={form.email}
//                   onChange={handleChange}
//                   required
//                 />

//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Phone No."
//                   value={form.phone}
//                   onChange={handleChange}
//                   required
//                 />

//                 <input
//                   type="text"
//                   name="lookingFor"
//                   placeholder="What are you looking for?"
//                   value={form.lookingFor}
//                   onChange={handleChange}
//                   required
//                 />

//                 <input
//                   type="text"
//                   name="city"
//                   placeholder="City"
//                   value={form.city}
//                   onChange={handleChange}
//                   required
//                 />

//                 <button type="submit" disabled={loading}>
//                   {loading ? "Submitting..." : "SUBMIT"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ⭐ Your CSS remains exactly same ⭐ */}
    
//       {/* Styles */}
//       <style jsx>{`
//         .popup-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100vw;
//           height: 100vh;
//           background: rgba(0, 0, 0, 0.6);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 9999;
//           animation: fadeIn 0.3s ease;
//         }

//         .popup-content {
//           position: relative;
//           background: #fff;
//           border-radius: 10px;
//           overflow: hidden;
//           width: 100%;
//           max-width: 400px;
//           box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
//           animation: slideUp 0.3s ease;
//         }

//         .close-btn {
//           position: absolute;
//           top: 10px;
//           right: 15px;
//           background: transparent;
//           border: none;
//           font-size: 24px;
//           font-weight: bold;
//           cursor: pointer;
//           color: #ffffffff;
//           z-index: 10;
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }

//         @keyframes slideUp {
//           from {
//             transform: translateY(40px);
//             opacity: 0;
//           }
//           to {
//             transform: translateY(0);
//             opacity: 1;
//           }
//         }

//         .form-container {
//           border-radius: 10px;
//           overflow: hidden;
//           background: #fff;
//         }

//         .form-header {
//           background-image: url("/assets/images/cta.webp");
//           background-size: cover;
//           background-position: center;
//           height: 180px;
//           display: flex;
//           align-items: flex-end;
//           justify-content: flex-start;
//         }

//         .overlay {
//           color: #fff;
//           background: rgba(0, 0, 0, 0.4);
//           width: 100%;
//           padding: 16px;
//           height: 100%;
//           display: flex;
//           flex-flow: column;
//           justify-content: center;
//         }

//         .form-body {
//           display: flex;
//           flex-direction: column;
//           padding: 16px;
//           gap: 12px;
//         }

//         input {
//           border: 1px solid #ddd;
//           border-radius: 8px;
//           padding: 10px;
//           font-size: 14px;
//           width: 100%;
//           outline: none;
//           transition: border 0.2s;
//         }

//         input:focus {
//           border-color: #7a5fff;
//         }

//         .phone-input {
//           display: flex;
//           align-items: center;
//           border: 1px solid #ddd;
//           border-radius: 8px;
//           overflow: hidden;
//         }

//         .overlay h1 {
//           font-size: 22px;
//           font-weight: 700;
//           margin: 0 0 4px 0;
//           line-height: 1.3;
//         }

//         .overlay p {
//           font-size: 14px;
//           opacity: 0.9;
//           margin: 0;
//         }

//         button[type="submit"] {
//           background: linear-gradient(to right, #6a5cff, #7a5fff);
//           color: #fff;
//           border: none;
//           padding: 10px;
//           border-radius: 8px;
//           font-weight: 600;
//           cursor: pointer;
//           font-size: 15px;
//           transition: background 0.3s;
//         }

//         button[type="submit"]:hover {
//           background: linear-gradient(to right, #5949ff, #6a5fff);
//         }
//       `}</style>
//     </>
//   );
// }
