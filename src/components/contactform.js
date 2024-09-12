import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
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
    
    try {
      const response = await fetch('https://7lem2psccg.execute-api.us-east-1.amazonaws.com/prod/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      console.log('Form data submitted:', result);
  
      setFormData({
        email: "",
        message: "",
      });
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };  

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: "1em", textAlign: 'left' }}>
          <label htmlFor="email" style={{ fontSize: 14 }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ 
              width: "100%", 
              padding: "0.5em", 
              border: "1px solid #ccc", // added border
              fontSize: "16px", // changed font size
              borderRadius: "4px", // added border radius
              boxSizing: "border-box", // added box sizing
              backgroundColor: "#EEEEEE", 
            }}
          />
        </div>

        <div style={{ marginBottom: "1em", textAlign: 'left' }}>
          <label htmlFor="message" style={{ fontSize: 14 }}>Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            style={{ 
              width: "100%", 
              padding: "0.5em", 
              border: "1px solid #ccc", // added border
              fontSize: "16px", // changed font size
              borderRadius: "4px", // added border radius
              boxSizing: "border-box",
              backgroundColor: "#EEEEEE", 
              height: "100px",
            }}
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="email-link"
          style={{ padding: "0.75em 1.5em", cursor: "pointer" }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;