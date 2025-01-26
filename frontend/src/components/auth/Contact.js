import React from 'react';
import './Contact.css';

const ContactUs = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>If you have any questions or concerns, feel free to reach out to us!</p>
        <ul className="contact-info">
          <li>
            <strong>Email:</strong> pizzahouse.adm.team@gmail.com
          </li>
          <li>
            <strong>Phone:</strong> 9579853955
          </li>
          <li>
            <strong>Address:</strong> 123 Pizza Street, Foodtown, Pune
          </li>
        </ul>
        <div className="social-icons">
          <a href="https://www.instagram.com/its_sudarshan___10/" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
            Instagram
          </a>
          <a href="https://www.linkedin.com/in/sudarshan-hingalje-b07993158" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
            LinkedIn
          </a>
          <a href="https://www.facebook.com/sudarshan.hingalje/" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
            Facebook
          </a>
        </div>
      </div>
      <footer className="site-footer">
        <p>&copy; 2025 Pizza House. All rights reserved to Sudarshan Hingalje.</p>
      </footer>
    </div>
  );
};

export default ContactUs;
