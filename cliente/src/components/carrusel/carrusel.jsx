import React, { useState } from "react";

const data = [
    {
        id: 1,
        title: "Desarrollo de Aplicaciones Web",
        description: "Ofrezco servicios de desarrollo de aplicaciones web personalizadas, utilizando tecnologías modernas que garantizan una experiencia de usuario excepcional y un rendimiento óptimo.",
        imgLink: "a"
    },
    {
        id: 2,
        title: "Diseño Responsivo",
        description: "Mis diseños son responsivos y adaptables a cualquier dispositivo, asegurando que tu aplicación se vea y funcione de manera excelente en móviles y ordenadores.",
        imgLink: "b"
    },
    {
        id: 3,
        title: "Mantenimiento y Soporte",
        description: "Brindo mantenimiento continuo y soporte técnico para asegurar que tu aplicación funcione sin problemas y esté siempre actualizada con las últimas tecnologías.",
        imgLink: "c"
    }
];

export default function Carrusel() {
    const [selectedElement, setSelectedElement] = useState(data[0]);

    if(selectedElement.id > data.length || selectedElement.id < 1 || !(selectedElement.id)) {
        setSelectedElement(1);
    }

    const handleNext = () => {
        let newSelectedElement = selectedElement.id === data.length ? data[0] : data[selectedElement.id + 1];
        setSelectedElement(newSelectedElement);
    }

    const handlePrevious = () => {
        let limit = data.length;
        let newSelectedElement = selectedElement.id === 1 ? data[limit] : data[selectedElement.id - 1];
        setSelectedElement(newSelectedElement);
    }

    return (
        <div className="carrusel-container">
            <button onClick={handlePrevious}>{"<"}</button>
            <div className="inner-carrusel">
                {
                    data.map((element) => {
                        <div className="carrusel-inner-container">
                            <div className="element-data">
                                <h3>{element.title}</h3>
                                <p>{element.description}</p>
                            </div>
                            <div className="element-image">
                                <img src={imgLink} alt={element.title + "-image"} className="img-fluid" />
                            </div>
                        </div>
                    })
                }
                <div className="navigation">
                    {Array.from({ length: [data.length] }, (_, i) => (
                        <div
                            key={i}
                            className={`nav-dot ${current === i + 1 ? 'active' : 'inactive'}`}
                            onClick={() => setSelectedElement(i + 1)}
                        ></div>
                    ))}
                </div>
            </div>
            <button onClick={handleNext}>{">"}</button>
        </div>
    );
}