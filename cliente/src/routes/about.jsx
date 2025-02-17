import React from "react";
import '../styles/about.css';

export default function About() {
    const data = [
        {
            title: "Experience in PERN development",
            description: "I have solid experience in building web applications using the PERN stack (PostgreSQL, Express.js, React and Node.js). I have worked on various projects that involve the implementation of efficient and scalable systems, always focused on optimizing performance and user experience.",
            image: "a"
        },
        {
            title: "Tailored solutions",
            description: "I specialize in offering customized solutions that adapt to the specific needs of each client. From planning and design to implementation and maintenance, I ensure that each project meets the highest standards of quality and functionality.",
            image: "b"
        },
        {
            title: "Teamwork and leadership",
            description: "I firmly believe in the power of teamwork and collaboration. I have led development teams on multiple projects, fostering a positive and productive work environment where each member can contribute their unique skills to achieve common goals.",
            image: "c"
        }
    ]

    const skills = [
        {
            title: "Mastery of JavaScript and frameworks",
            description: "I have extensive knowledge of JavaScript and its most popular frameworks, such as React and Node.js. I use these tools to create interactive and dynamic applications that improve user experience and optimize system functionality.",
            image: "d"
        },
        {
            title: "Database experience",
            description: "I am an expert in database management, especially PostgreSQL. I am in charge of designing efficient database schemas and optimizing queries to ensure optimal performance in the applications I develop.",
            image: "e"
        },
        {
            title: "DevOps knowledge",
            description: "In addition to my development skills, I have knowledge of DevOps practices. This includes implementing CI/CD, using containers like Docker, and managing servers, allowing me to ensure an agile and efficient workflow across all my projects.",
            image: "f"
        }
    ]

    return (
        <div className="about-container">
            <h2>Fullstack Web Developer</h2>
            <span>Committed to excellence in web development.</span>
            <div>
                {
                    data.map((e) => {
                        <div>
                            <div>
                                <strong>{e.title}</strong>
                                <p>{e.description}</p>
                            </div>
                            <div>
                                <img src={e.image} alt={e.title + '-img'} />
                            </div>
                        </div>
                    })
                }
            </div>
            <h2>My technical skills</h2>
            <span>Proficient in various development technologies.</span>
            <div>
                {
                    skills.map( (s) => {
                        <div>
                            <div>
                                <strong>{s.title}</strong>
                                <p>{s.description}</p>
                            </div>
                            <div>
                                <img src={s.image} alt={s.title + '-img'} />
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
}