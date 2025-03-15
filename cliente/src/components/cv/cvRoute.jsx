import React from 'react';
import '../../styles/cvRoute.css';

const CvRoute = () => {
    const educationData = [
        { title: "Egg LXP - Argentina Programa", subtitle: "FullStack Developer", location: "Buenos Aires, Argentina", date: "Dec 2022 - Nov 2023" },
        { title: "Self-taught Study", subtitle: "Web Design", location: "Buenos Aires, Argentina", date: "Jan 2022 - Present" },
        { title: "SoyHenry Bootcamp - Argentina", subtitle: "FullStack Web Developer", location: "Buenos Aires, Argentina", date: "Aug 2022 - Nov 2022" }
      ];
      
      const experienceData = [
        { title: "Full Stack Web Developer", company: "Boom Studios", date: "Jan 2025 - Present", tasks: ["Set up a professional page for clients.", "Applied responsive design principles.", "Design the right server for each client."] },
        { title: "Full Stack Web Developer", company: "Own", date: "Dec 2024 - Dec 2024", tasks: ["Investigation of CSS equivalents and display sizes.", "Implementation of calculating functions.", "Used JavaScript, SQL, and HTML to develop applications."] },
        { title: "Java Video-Game Developer", company: "Own", date: "May 2023 - Present", tasks: ["Design neat and efficient code using Java.", "Designed and implemented gameplay mechanics."] },
        { title: "Full Stack Web Developer", company: "Henry Bootcamp and Egg XLP", date: "Sep 2022 - Nov 2023", tasks: ["Development of back models.", "Team organization.", "Testing and error resolution."] }
      ];

    return (
    <div className="container">
      <header className="header">
        <h1>Juan Braian Hernandez Morani</h1>
        <p>Av. Velez Sarsfield 1237 • Cordoba, X5000JJM • juan.hernandez.morani@gmail.com • +5493512513177</p>
      </header>

      <section className="section">
        <h2>Education</h2>
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
        <h2>Experience</h2>
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
        <p><strong>Language:</strong> Spanish, English</p>
      </section>
    </div>
  );
};

export default CvRoute;
