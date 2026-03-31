// import React from "react";

// export default function QueryForm() {
//   return (
//       <div className="container">
//     <div className="registration-card mx-auto desktop-none">
    
//          {/* Header with image */}
//       <div className="registration-header position-relative">
//         <img
//           src="/assets/images/home/cta2mobile.png" // replace with your image path
//           alt="Student"
//           className="img-fluid header-image"
//         />
//         <div className="overlay-text">
//           <h5 className="fw-semibold mb-1">Registration open! Limited seats</h5>
//           <p className="small mb-0 mt-1">fill the form before<br/> its too late</p>
//         </div>
//       </div>

//       {/* Form Section */}
//       <form className="query_form">
//         <div className="mb-2">
//           <input
//             type="text"
//             className="form-control custom-input"
//             placeholder="Full name"
//           />
//         </div>

//           <div className="mb-2">
//           <input
//             type="email"
//             className="form-control custom-input"
//             placeholder="Email"
//           />
//         </div>

//            <div className="mb-2 input-group">
       
//           <input
//             type="text"
//             className="form-control custom-input "

//             placeholder="Phone No."
//           />
//         </div>


//           <div className="mb-2">
//           <input
//             type="text"
//             className="form-control custom-input"
//             placeholder="City"
//           />
//         </div>
      
//         <div className="mb-2">
//           <input
//             type="text"
//             className="form-control custom-input"
//             placeholder="What are you looking for?"
//           />
//         </div>
      
     

//         <button type="submit" className="btn submit-btn w-100 py-2 submit-btn1">
//           SUBMIT
//         </button>
//       </form>
//       </div>
//     </div>
//   );
// }





"use client";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";

export default function QueryForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    // email: "",   // hidden for now
    phone: "",
    city: "",
    lookingFor: "",
    formType: "query",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      fullName: form.fullName,
      email: "",          // hidden field, sending empty string
      phone: form.phone,
      city: form.city,
      lookingFor: form.lookingFor,
      formType: form.formType,
    };

    const response = await fetch("/api/popup", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    setLoading(false);

    if (data.success) {
      toast.success("Query submitted successfully!");
      setForm({
        fullName: "",
        // email: "",
        phone: "",
        city: "",
        lookingFor: "",
        formType: "query",
      });
    } else {
      toast.error("Submission failed!");
    }
  };

  return (
    <div className="container">
      <Toaster richColors position="top-right" />

      <div className="registration-card mx-auto desktop-none">
        {/* Header */}
        <div className="registration-header position-relative">
          <img
            src="/assets/images/home/cta2mobile.png"
            alt="Student"
            className="img-fluid header-image"
          />
          <div className="overlay-text">
            <h5 className="fw-semibold mb-1">Registration open! Limited seats</h5>
            <p className="small mb-0 mt-1">
              fill the form before <br /> its too late
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="query_form" onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Full name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* ❌ HIDDEN: Email — commented out, not removed */}
          {/* <div className="mb-2">
            <input
              type="email"
              className="form-control custom-input"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div> */}

          <div className="mb-2 input-group">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="Phone No."
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <input
              type="text"
              className="form-control custom-input"
              placeholder="What are you looking for?"
              name="lookingFor"
              value={form.lookingFor}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn submit-btn w-100 py-2 submit-btn1"
            disabled={loading}
          >
            {loading ? "Submitting..." : "SUBMIT"}
          </button>
        </form>
      </div>
    </div>
  );
}
