import React from "react";
import github from '../../imgs/icons/github-mark.png';
import linkedin from '../../imgs/icons/linkedin.png';
import facebook from '../../imgs/icons/facebook.png';
import instagram from '../../imgs/icons/instagram.png';
import '../../styles/footer.css';

export default function Footer() {
    return (
        <footer className="foot-container">
            <div className="foot-inner-container">
                <div className="footer-social-info">
                    <div className="foot-icons-conteiner">
                        <a href="https://www.linkedin.com/in/juan-hern%C3%A1ndez-morani/" target="_blank" rel="noopener noreferrer">
                            <img src={linkedin} alt="LinkedIn" className="img-fluid" />
                        </a>
                        <a href="https://www.facebook.com/Juan.hernandez.morani.97" target="_blank" rel="noopener noreferrer">
                            <img src={facebook} alt="Facebook" className="img-fluid" />
                        </a>
                        <a href="https://www.instagram.com/elchetomdq97/" target="_blank" rel="noopener noreferrer">
                            <img src={instagram} alt="Instagram" className="img-fluid" />
                        </a>
                        <a href="https://github.com/JuanHernandezMorani" target="_blank" rel="noopener noreferrer">
                            <img src={github} alt="Github" className="img-fluid" />
                        </a>
                        <p>© Derechos reservados 2025</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}