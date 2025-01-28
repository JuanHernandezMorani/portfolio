import {React, useContext} from 'react';
import { ImageContext } from '../../context/ImageContext';
import '../../style/nav.css';
import logo from '../../imgs/icons/own.png';
import linkedin from '../../imgs/icons/linkedin.png';
import github from '../../imgs/icons/github-mark.png';
import linkedinW from '../../imgs/icons/white-linkedin.png';
import githubW from '../../imgs/icons/github-mark-white.png';

export default function Navbar() {
    const { imageID } = useContext(ImageContext);

    function check() {
        return imageID > 1;
    }

    function selectB() {
        return check() ? linkedinW : linkedin;
    }

    function selectD() {
        return check() ? githubW : github;
    }

    function selectF() {
        return check() ? "mark-w" : "mark";
    }
    function selectG() {
        return check() ? "nav-item-w" : "nav-item";
    }

    return (
        <div className="nav-conteiner">
            <div className="nav-container-inner">
                <div className="navbar-brand">
                    <img src={logo} alt="Almabtl_Icon" className="img-fluid" />
                </div>
                <ul className="nav-ul">
                    <li className={selectG()}>
                        <a className="nav-link" href="#projects">PROYECTOS&#9662;</a>
                    </li>
                    <li className={selectG()}></li>
                    <li className={selectG()}>
                        <a className="nav-link" href="#about">ABOUT&#9662;</a>
                    </li>
                    <li className={selectG()}></li>
                    <li className={selectG()}>
                        <a className="nav-link" href="#contact">CONTACTO&#9662;</a>
                    </li>
                </ul>
                <div className="social-conteiner">
                    <a href="https://www.linkedin.com/in/juan-hern%C3%A1ndez-morani/" target="_blank" rel="noopener noreferrer">
                        <img src={selectB()} alt="LinkedIn" className="social-icon" />
                    </a>
                    <a href="https://github.com/JuanHernandezMorani" target="_blank" rel="noopener noreferrer">
                        <img src={selectD()} alt="github" className="social-icon" />
                    </a>
                    <a>
                        <img src="" alt="" className="social-icon"/>
                    </a>
                    <p className={selectF()}>@JuanBHM</p>
                </div>
            </div>
        </div>
    );
}