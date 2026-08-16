import '../styles/home.css';
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { getProjects } from '../actions';
import Loader from '../components/loader/loader';
import a from '../imgs/others/a.png';
import b from '../imgs/others/b.jpg';
import c from '../imgs/others/c.jpeg';
import d from '../imgs/others/d.png';
import e from '../imgs/others/e.png';
import f from '../imgs/others/f.jpg';

export default function Home({ projects }) {
    const [charge, setCharge] = useState(false);
    const dispatch = useDispatch();
    const [selectedElement, setSelectedElement] = useState(0);

    useEffect(() => {
        if (!charge) {
            if (!projects) {
                dispatch(getProjects());
            }
            setCharge(true);
        }
    }, [dispatch, charge, projects]);

    const services = [
        {
            title: "Frontend Development",
            description: "I specialize in creating attractive and functional user interfaces using React and other cutting-edge technologies to improve user interaction.",
            image: d
        },
        {
            title: "Backend Development",
            description: "I implement robust solutions on the backend with Node.js and Express, ensuring that your application handles data efficiently and securely.",
            image: b
        },
        {
            title: "Database Integration",
            description: "I offer database integration services with PostgreSQL, ensuring that data management is seamless and reliable for your applications.",
            image: f
        }
    ]

    const data = [
        {
            id: 0,
            title: "Web Application Development",
            description: "I offer custom web application development services, using modern technologies that ensure an exceptional user experience and optimal performance.",
            imgLink: a
        },
        {
            id: 1,
            title: "Responsive Design",
            description: "My designs are responsive and adaptable to any device, ensuring that your app looks and works great on mobile and desktop.",
            imgLink: e
        },
        {
            id: 2,
            title: "Maintenance and Support",
            description: "I provide ongoing maintenance and technical support to ensure that your application runs smoothly and is always up to date with the latest technologies.",
            imgLink: c
        }
    ];

    if (selectedElement > data.length || selectedElement < 0) {
        setSelectedElement(0);
    }

    const handleNext = () => {
        let newSelectedElement = selectedElement >= (data.length - 1) ? 0 : (selectedElement + 1);
        setSelectedElement(newSelectedElement);
    }

    const handlePrevious = () => {
        let newSelectedElement = selectedElement <= 0 ? (data.length - 1) : (selectedElement - 1);
        setSelectedElement(newSelectedElement);
    }

    return (
        <div className="home-container">
            {projects && charge ?
                <div>
                    <div className="home-header">
                        <h1>Welcome to my portfolio</h1>
                        <p>
                            I am a passionate fullstack web developer{"\n"}specialized in PostgreSQL, ExpressJS{"\n"}ReactJS, NodeJS, who transforms ideas into effective solutions.
                        </p>
                    </div>
                    <div className="carrusel-container">
                        <button onClick={handlePrevious}>{"<"}</button>
                        <div className="inner-carrusel" key={data[selectedElement].id}>
                            <div className="carrusel-inner-container">
                                <div className="element-data">
                                    <h3>{data[selectedElement].title}</h3>
                                    <p>{data[selectedElement].description}</p>
                                </div>
                                <div className="element-image">
                                    <img src={data[selectedElement].imgLink} alt={data[selectedElement].title + "-image"} className="img-fluid" />
                                </div>
                            </div>
                            <div className="navigation">
                                {data.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`nav-dot ${selectedElement === i ? 'active' : 'inactive'}`}
                                        onClick={() => setSelectedElement(i)}
                                    ></div>
                                ))}
                            </div>
                        </div>
                        <button onClick={handleNext}>{">"}</button>
                    </div>
                    <div className="home-title-element">
                        <h2>Specialized Services</h2>
                        <span>Transform your vision into reality with my professional web development services.</span>
                        <div className="home-grid-element">
                            {
                                services.map((e) => {
                                    return (<div className="home-element" key={e.title}>
                                        <img src={e.image} alt={e.title.split(' ').join('-') + "-image"} className='img-fluid' />
                                        <strong>{e.title}</strong>
                                        <span>{e.description}</span>
                                    </div>)
                                })
                            }
                        </div>

                    </div>
                </div>
                : !charge ? <div className='loader-conteiner'><Loader /></div>
                    : <div className='no-elements'>
                        <h1>Welcome to my portfolio</h1>
                        <p>
                            If you are seeing this message, it means that the server is not currently active, or the page has been discontinued.{"\n"}Although you will be able to navigate through it calmly, keep in mind that all functionality that depends on the server will be disabled.
                        </p>
                    </div>}
        </div>
    );
}