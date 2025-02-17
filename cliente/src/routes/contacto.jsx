import '../styles/contacto.css';
import Form from '../components/form/form.jsx';
import ContactForm from '../contactForm/contactForm.jsx';
import React from "react";

export default function Contacto() {
  

  return (
    <div className="contact-route-container">
      <div className='inner-contact-route-container'>
        <Form />
      </div>
      <div className='inner-contact-route-container'>
        <ContactForm />
      </div>      
    </div>
  );
}