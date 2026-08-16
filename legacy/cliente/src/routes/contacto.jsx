import '../styles/contacto.css';
import Form from '../components/form/form.jsx';
import React, { useState } from "react";
import { Bolder } from "../components/helper/helper.jsx";
import { useDispatch } from "react-redux";
import { sendMSG } from "../actions";

function validate(form) {
  const errors = {};
  if (!form.name) errors.name = 'The name is required.';
  if (form.name.length < 3) errors.name = 'The name must contain at least 3 chars';
  if (!form.phone && !form.email) errors.contact = 'You must provide at least 1 option, phone number or email.';
  if (form.message.length < 1) errors.message = 'Form message, cant be empty value.';
  return errors;
}

export default function Contacto() {
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    reason: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors(validate({ ...formData, [e.target.name]: e.target.value }));
  };

  document.querySelectorAll("textarea").forEach(textarea => {
    if (textarea.id) {
      const adjustHeight = () => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      };

      textarea.addEventListener("input", adjustHeight);
      adjustHeight();
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate(formData)) {
      dispatch(sendMSG(formData));
      setFormSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          email: "",
          reason: "",
          message: "",
        });
        setFormSubmitted(false);
      }, 10000);
    }
  }

  return (
    <div className="contact-container">
      <div className="contact-inner">
        <div className="contact-info">
            <Form />
        </div>
        <div className="contact-form">
              {formSubmitted ? (
                <div className="message-container">
                  <h1 className="message-titulo">Thank you for contacting me! I will respond soon, using the means provided.</h1>
                  <p className="message-parrafo">
                    <Bolder text={"Email received, I will be contacting you\nwithin the next 48 hours."} toBold={["48", "hours"]} />
                  </p>
                  <p className="message-parrafo">
                    <Bolder text={"Remember that if you don't see my answer,\nlook for the email in your spam folder."} toBold={["don't", "see", "email", "spam"]} />
                  </p>
                </div>
              ) : (
                <form
                  className="contact-form-inner"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="* Name"
                    className="form-input"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className='input-errors'>{errors.name}</p>}
                  <input
                    type="tel"
                    name="phone"
                    placeholder="* Phone Number"
                    className="form-input"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.contact && <p className='input-errors'>{errors.contact}</p>}
                  <input
                    type="email"
                    name="email"
                    placeholder="* Email"
                    className="form-input"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.contact && <p className='input-errors'>{errors.contact}</p>}
                  <input
                    type="text"
                    name="reason"
                    placeholder="* Contact Reason"
                    className="form-input"
                    required
                    value={formData.reason}
                    onChange={handleChange}
                  />
                  <textarea
                    name="message"
                    placeholder="* Message"
                    className="form-textarea"
                    value={formData.message}
                    onChange={handleChange}
                    id="contact-form-textarea"
                  ></textarea>
                  {errors.message && <p className='input-errors'>{errors.message}</p>}
                  <button type="submit" className="contact-form-button">
                    SEND
                  </button>
                </form>
              )}
            </div>
      </div>
    </div>
  );
}