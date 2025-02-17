
import '../styles/home.css';
import React, { useEffect, useState } from 'react';
import Carrusel from '../components/carrusel/carrusel.jsx';
import { getProjects } from '../actions';
import { useDispatch } from 'react-redux';

export default function Home() {
    const [charge, setCharge] = useState(false);
    const dispatch = useDispatch();
    const projects = useSelector(state => state.OriginalProjects);

    useEffect(() => {
        if (!charge) {
            if (!projects) dispatch(getProjects());
            setCharge(true);
        }
    }, [dispatch]);

    const services = [
        {
            title: "Frontend Development",
            description: "I specialize in creating attractive and functional user interfaces using React and other cutting-edge technologies to improve user interaction.",
            image: "a"
        },
        {
            title: "Backend Development",
            description: "I implement robust solutions on the backend with Node.js and Express, ensuring that your application handles data efficiently and securely.",
            image: "b"
        },
        {
            title: "Database Integration",
            description: "I offer database integration services with PostgreSQL, ensuring that data management is seamless and reliable for your applications.",
            image: "c"
        }
    ]

    const clients = [
        {
            title: "Excellent work",
            description: "Juan Braian transformed our ideas into an incredible application. Their attention to detail and professionalism were exceptional.",
            image: "d"
        },
        {
            title: "Great experience",
            description: "Working with Juan was a pleasure. He perfectly understood our needs and delivered a final product that exceeded our expectations.",
            image: "e"
        },
        {
            title: "100% recommended",
            description: "I recommend Juan to anyone looking for a competent and reliable web developer. Your dedication is admirable.",
            image: "f"
        }
    ]

    return (
        <div className="home-container">
            {!projects && charge ?
                <div>
                    <div className="home-header">
                        <h1>Welcome to my portfolio</h1>
                        <p>
                            I am a passionate fullstack web developer, specialized in PostgreSQL, ExpressJS, ReactJS, NodeJS, who transforms ideas into effective solutions.
                        </p>
                    </div>
                    <div className="home-carrusel">
                        <Carrusel />
                    </div>
                    <div>
                        <h2>Specialized Services</h2>
                        <span>Transforma tu visión en realidad con mis servicios profesionales de desarrollo web.</span>
                        {
                            services.map((e) => {
                                <div className="home-element">
                                    <img src={e.image} alt={e.title.join('-') + "-image"} />
                                    <strong>{e.title}</strong>
                                    <span>{e.description}</span>
                                </div>
                            })
                        }
                    </div>
                    <div>
                        <h2>What my clients say</h2>
                        <span>My client's opinions are a fundamental part of my work.</span>
                        <div>
                            {
                                clients.map((e) => {
                                    <div className="home-element">
                                        <img src={e.image} alt={e.title.join('-') + "-image"} />
                                        <strong>{e.title}</strong>
                                        <span>{e.description}</span>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
                : charge ? <div>LOADING...</div>
                    : <div>No data found</div>}
        </div>
    );
}
