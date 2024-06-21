// import React, { useState } from "react";

// const CandidateForm = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     first_name: "",
//     last_name: "",
//     time_interval: "",
//     linkedin: "",
//     github: "",
//     text: "",
//     phone_number: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5000/api/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         alert(data.message);
//       } else {
//         const errorData = await response.json();
//         alert(errorData.message);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Error adding or updating candidate");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Candidate Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">
//             *Email
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="first_name" className="form-label">
//             *First Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="first_name"
//             name="first_name"
//             value={formData.first_name}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="last_name" className="form-label">
//             *Last Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="last_name"
//             name="last_name"
//             value={formData.last_name}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="time_interval" className="form-label">
//             Time Interval
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="time_interval"
//             name="time_interval"
//             value={formData.time_interval}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="linkedin" className="form-label">
//             LinkedIn
//           </label>
//           <input
//             type="url"
//             className="form-control"
//             id="linkedin"
//             name="linkedin"
//             value={formData.linkedin}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="github" className="form-label">
//             *GitHub
//           </label>
//           <input
//             type="url"
//             className="form-control"
//             id="github"
//             name="github"
//             value={formData.github}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="text" className="form-label">
//             Text
//           </label>
//           <textarea
//             className="form-control"
//             id="text"
//             name="text"
//             rows="3"
//             value={formData.text}
//             onChange={handleChange}
//           ></textarea>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="phone_number" className="form-label">
//             Phone Number
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="phone_number"
//             name="phone_number"
//             value={formData.phone_number}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CandidateForm;


import React, { useState } from "react";

const CandidateForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    time_interval: "",
    linkedin: "",
    github: "",
    text: "",
    phone_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check mandatory fields
    if (!formData.email || !formData.first_name || !formData.last_name || !formData.github) {
      alert("Email, First Name, Last Name, and GitHub are mandatory fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding or updating candidate");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Candidate Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            *Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required // HTML5 required attribute for client-side validation
          />
        </div>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            *First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required // HTML5 required attribute for client-side validation
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            *Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required // HTML5 required attribute for client-side validation
          />
        </div>
        <div className="mb-3">
          <label htmlFor="time_interval" className="form-label">
            Time Interval
          </label>
          <input
            type="text"
            className="form-control"
            id="time_interval"
            name="time_interval"
            value={formData.time_interval}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="linkedin" className="form-label">
            LinkedIn
          </label>
          <input
            type="url"
            className="form-control"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="github" className="form-label">
            *GitHub
          </label>
          <input
            type="url"
            className="form-control"
            id="github"
            name="github"
            value={formData.github}
            onChange={handleChange}
            required // HTML5 required attribute for client-side validation
          />
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Text
          </label>
          <textarea
            className="form-control"
            id="text"
            name="text"
            rows="3"
            value={formData.text}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="phone_number" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone_number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CandidateForm;
