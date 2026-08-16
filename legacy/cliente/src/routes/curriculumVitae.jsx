import CvRoute from '../components/cv/cvRoute.jsx';
import React from "react";
import '../styles/curriculumVitae.css';

export default function CurriculumVitae() {
    return (
        <div className="cv-route-container">
            <div className="cv-route-download">
                <a href="/documento.pdf" download="CV-HernandezJuan-EN.pdf">
                    <button className='download-button'>Download PDF</button>
                </a>
            </div>
            <div className='inner-cv-route-container'>
                <CvRoute />
            </div>
            <div className="cv-route-download">
                <a href="/documento.pdf" download="CV-HernandezJuan-EN.pdf">
                    <button className='download-button'>Download PDF</button>
                </a>
            </div>
        </div>
    );
}