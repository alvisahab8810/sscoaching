import React from "react";

export default function QueryForm() {
  return (
      <div className="container">
    <div className="registration-card mx-auto desktop-none">
    
         {/* Header with image */}
      <div className="registration-header position-relative">
        <img
          src="/assets/images/home/cta2mobile.png" // replace with your image path
          alt="Student"
          className="img-fluid header-image"
        />
        <div className="overlay-text">
          <h5 className="fw-semibold mb-1">Registration open! Limited seats</h5>
          <p className="small mb-0 mt-1">fill the form before<br/> its too late</p>
        </div>
      </div>

      {/* Form Section */}
      <form className="query_form">
        <div className="mb-2">
          <input
            type="text"
            className="form-control custom-input"
            placeholder="Full name"
          />
        </div>

          <div className="mb-2">
          <input
            type="email"
            className="form-control custom-input"
            placeholder="Email"
          />
        </div>

           <div className="mb-2 input-group">
          {/* <span className="input-group-text bg-white border-end-0">
            🇮🇳 +91
          </span> */}
          <input
            type="text"
            // className="form-control custom-input border-start-0"
            className="form-control custom-input "

            placeholder="Phone No."
          />
        </div>


          <div className="mb-2">
          <input
            type="text"
            className="form-control custom-input"
            placeholder="City"
          />
        </div>
      
        <div className="mb-2">
          <input
            type="text"
            className="form-control custom-input"
            placeholder="What are you looking for?"
          />
        </div>
      
     

        <button type="submit" className="btn submit-btn w-100 py-2 submit-btn1">
          SUBMIT
        </button>
      </form>
      </div>
    </div>
  );
}
