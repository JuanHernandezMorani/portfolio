import React from "react";

export default function Tools () {
    const tools = [
        { name: "Bootstrap", link: "https://getbootstrap.com", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain-wordmark.svg" },
        { name: "CSS3", link: "https://www.w3schools.com/css/", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" },
        { name: "ExpressJs", link: "https://expressjs.com", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" },
        { name: "Git", link: "https://git-scm.com/", img: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" },
        { name: "HTML5", link: "https://www.w3.org/html/", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" },
        { name: "JavaScript", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
        { name: "NodeJs", link: "https://nodejs.org", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" },
        { name: "PostgreSQL", link: "https://www.postgresql.org", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" },
        { name: "Postman", link: "https://postman.com", img: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
        { name: "React", link: "https://reactjs.org/", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" },
        { name: "Redux", link: "https://redux.js.org", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" },
        { name: "Sass", link: "https://sass-lang.com", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" },
        { name: "Unity", link: "https://unity.com/", img: "https://www.vectorlogo.zone/logos/unity3d/unity3d-icon.svg" },
        { name: "VueJs", link: "https://vuejs.org/", img: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original-wordmark.svg" },
        { name: "Java", link: "https://www.java.com/es/", img: "https://www.vectorlogo.zone/logos/java/java-icon.svg" },
        { name: "NextJs", link: "https://nextjs.org/", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/NeXT_logo.svg/492px-NeXT_logo.svg.png" },
        { name: "MySQL", link: "https://www.mysql.com/", img: "https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg" },
        { name: "NPM", link: "https://www.npmjs.com/", img: "https://www.vectorlogo.zone/logos/npmjs/npmjs-ar21.svg" },
        { name: "C#", link: "https://en.wikipedia.org/wiki/C_Sharp_(programming_language)", img: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Logo_C_sharp.svg" },
    ];

    return (
        <div className="tools-container bg-gray-100 p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Technologies & Tools</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {tools.map((tool) => (
                    <li key={tool.name} className="flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <a href={tool.link} target="_blank" rel="noreferrer">
                            <img src={tool.img} alt={tool.name} className="w-12 h-12 mb-2" />
                        </a>
                        <p className="text-gray-700 font-medium">{tool.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}