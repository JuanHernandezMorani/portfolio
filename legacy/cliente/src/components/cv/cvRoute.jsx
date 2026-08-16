import React from 'react';
import '../../styles/cvRoute.css';

const CvRoute = () => {
  const educationData = [
    { title: "Self-Taught Learning in Udemy", subtitle: "Web Design and Video-Game Development", location: "Cordoba, Argentina", date: "Apr 2025 - On going" },
    { title: "Egg LXP - Argentina Programa 4.0", subtitle: "Backend Developer", location: "Buenos Aires, Argentina", date: "Dec 2022 - May 2023" },
    { title: "EF SET", subtitle: "C1 English Certificate", location: "Buenos Aires, Argentina", date: "Nov 2022" },
    { title: "SoyHenry Bootcamp - Argentina", subtitle: "Full Stack Web Developer", location: "Buenos Aires, Argentina", date: "Aug 2022 - Nov 2022" },
    { title: "Self-Taught Learning", subtitle: "Web Design and Development", location: "Buenos Aires, Argentina", date: "Jan 2022 - On going" }
  ];

  const experienceData = [
    {
      title: "Full Stack Web Developer",
      company: "Boom Studios",
      date: "Jan 2025 - On going",
      tasks: [
        "Developing client websites and ensuring a fully responsive design for all devices.",
        "Optimized backend and server configurations tailored to each client's needs.",
        "Improved system efficiency by 15% for user bases between 100 to 1000 clients.",
        "Data Entry Project (Feb 24 - Mar 10, 2025): Managed product data for an e-commerce on MiTiendaNube platform—reviewed duplicates, uploaded images and descriptions, and assigned categories for 4000+ products."
      ]
    },
    {
      title: "Full Stack Web Developer",
      company: "Freelance",
      date: "Dec 2024 - On going",
      tasks: [
        "Researched CSS equivalents and responsive display techniques.",
        "Implemented calculation-based features in web applications.",
        "Developed full-stack apps using JavaScript, SQL, and HTML."
      ]
    },
    {
      title: "Java Game Developer",
      company: "Freelance",
      date: "May 2023 - On going",
      tasks: [
        "Wrote clean and efficient code in Java for custom gameplay mechanics.",
        "Developed interactive game elements, improving engagement and stability."
      ]
    },
    {
      title: "Full Stack Web Developer",
      company: "Henry Bootcamp & Egg LXP",
      date: "Sep 2022 - Nov 2023",
      tasks: [
        "Collaborated in team-based full-stack development projects.",
        "Built scalable backend models using Node.js and PostgreSQL, enabling secure user authentication.",
        "Ran tests, and resolved bugs efficiently."
      ]
    }
  ];

  return (
    <div className="container">
      <header className="header">
        <h1>Juan Braian Hernandez Morani</h1>
        <p>Av. Velez Sarsfield 1237 • Cordoba, X5000JJM • juan.hernandez.morani@gmail.com • +5493512513177</p>
        <p>https://portfolio-juan-braian-hernandez-moranis-projects.vercel.app/</p>
      </header>

      <section className="section">
        <h2>Education and Certifications</h2>
        <div className="entries">
          {educationData.map((edu, index) => (
            <div key={index} className="entry">
              <p><strong>{edu.title}</strong><br />{edu.subtitle}</p>
              <p className="details">{edu.location}<br />{edu.date}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Professional Experience</h2>
        <div className="entries">
          {experienceData.map((exp, index) => (
            <div key={index}>
              <div className="entry">
                <p><strong>{exp.title}</strong>, {exp.company}</p>
                <p className="details">{exp.date}</p>
              </div>
              <ul className="tasks">
                {exp.tasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Skills</h2>
        <p><strong>Technical:</strong> HTML, CSS, JavaScript, Java, C#, Node.js, React/Redux, Express, PostgreSQL, API Integration, Front-end Frameworks, Responsive Design, Problem-Solving</p>
        <p><strong>Tools:</strong> Microsoft Office (Word, Excel, PowerPoint)</p>
        <p><strong>Soft:</strong> Communication, Teamwork, Time Management, Adaptability</p>
        <p><strong>Languages:</strong> Spanish (Native), English (Advanced)</p>
      </section>
    </div>
  );
};

export default CvRoute;