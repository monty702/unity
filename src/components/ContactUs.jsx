import  { useState } from "react";
import './CoAbTePri.css';

const ContactUs = () => {
  const [formStatus, setFormStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormStatus("Submitting...");
    const formData = new FormData(event.target);

    // Send form data to Formspree
    fetch("https://formspree.io/f/meooplbp", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setFormStatus("Thank you! Your message has been sent.");
          event.target.reset();
        } else {
          setFormStatus("Oops! There was an error submitting your message.");
        }
      })
      .catch(() => {
        setFormStatus("Oops! There was an error submitting your message.");
      });
  };

  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      <p>We’d love to hear from you! Feel free to send us a message below:</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" required placeholder="Your Name" />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Your Email"
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          placeholder="Your Message"
        ></textarea>

        <button type="submit">Send Message</button>
      </form>

      {/* Display form submission status */}
      {formStatus && <p>{formStatus}</p>}

      <p>
        Alternatively, you can reach us at <strong>support@unityconnect.com</strong> or call us at
        <strong>+254 796597510</strong>.
      </p>
    </div>
  );
};

export default ContactUs;