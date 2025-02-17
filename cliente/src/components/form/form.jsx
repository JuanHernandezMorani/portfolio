import '../../styles/form.css';
import ubicacion from '../../imgs/icons/ubicacion.png'
import linkedin from '../../imgs/icons/linkedin.png';
import git from '../../imgs/icons/github-mark.png';

export default function Form(){
    return (
        <div className='form-container'>
            <div className='form-info'>
            <h3 className='form-h3'>DATOS OFICINAS</h3>
                <div className='form-ub-1'>
                    <img src={ubicacion} alt='ubicacion' className='form-img-1'/> 
                        <ul className='form-c'>
                            <li className='form-data'>Av. Velez Sarsfield 1237 {'('}X5000JJM{')'}</li>
                            <li className='form-data'>Capital, Cordoba</li>
                        </ul>
                </div>
                <div className='form-ub-2'>
                        <ul className='form-c'>
                            <li>
                                <a href="https://www.linkedin.com/in/juan-hern%C3%A1ndez-morani/" target="_blank" rel="noopener noreferrer">
                                    <img src={linkedin} alt="LinkedIn" className="social-icon" />
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/JuanHernandezMorani" target="_blank" rel="noopener noreferrer">
                                    <img src={git} alt="github" className="social-icon" />
                                </a>
                            </li>
                        </ul>
                </div>
                <h3 className='form-h3'> CEL:</h3>
                <ul className='info-list-tel'>
                    <li className='form-data'>+5493512513177</li>
                </ul>
                <h3 className='form-h3'> MAIL</h3>
                <a className='form-mail' href="mailto:info@almabtl.com">juan.hernandez.morani@gamil.com</a>
            </div>
        </div>
    );
}