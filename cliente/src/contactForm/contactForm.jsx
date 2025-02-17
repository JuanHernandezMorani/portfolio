import React from "react";
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

export default function ContactForm(){
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
        if(!validate(formData)){
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
        <div className="contact-form">
          {formSubmitted ? (
            <div className="message-container">
            <h1 className="message-titulo">¡Nos estaremos comunicando pronto!</h1>
            <p className="message-parrafo">
              <Bolder text={"Recibimos tu consulta, y nos estaremos contactando\nen las próximas 48 horas."} toBold={["48","horas"]}/>
            </p>
            <p className="message-parrafo">
              <Bolder text={"Recuerda que en caso de no ver nuestra respuesta,\nbusca el mail dentro de correo no deseado de tu correo."} toBold={["no","ver","correo","deseado"]}/>
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
              <select
                name="reason"
                className="form-input"
                required
                value={formData.reason}
                onChange={handleChange}
              >
                <option value="" disabled>REASON</option>
                <option value="Job">Job</option>
                <option value="Services">Services</option>
                <option value="Other">Other</option>
              </select>
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
                ENVIAR
              </button>
            </form>
          )}
        </div>
    );
}