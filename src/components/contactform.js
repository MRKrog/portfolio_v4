import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false); // New state for loading

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true); // Set loading to true when the form submission starts
    
    try {
      const response = await fetch('https://q6gzuzpcyk.execute-api.us-east-1.amazonaws.com/prod/confirm', {
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
    } finally {
      setLoading(false); // Set loading to false after the form submission finishes
    }
  };  

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1em", textAlign: 'left' }}>
          <label htmlFor="email" style={{ fontSize: 14 }}>Your Email:</label>
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
              border: "1px solid #ccc", 
              fontSize: "16px", 
              borderRadius: "4px", 
              boxSizing: "border-box", 
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
              border: "1px solid #ccc", 
              fontSize: "16px", 
              borderRadius: "4px", 
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
          disabled={loading} // Disable the button while loading
        >
          {loading ? (
            <div className="spinner" style={{ 
              border: "4px solid #f3f3f3", 
              borderRadius: "50%", 
              borderTop: "4px solid #3498db", 
              width: "20px", 
              height: "20px", 
              animation: "spin 2s linear infinite" 
            }}>
            </div>
          ) : (
            'Send Message'
          )}
        </button>
      </form>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ContactForm;
