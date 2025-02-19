import { React } from 'react';
import { useSelector } from "react-redux";
import '../styles/projects.css';
import ProjectComponent from '../components/card/ProjectComponent.jsx';

export default function Projects () {
    const projects = useSelector(state => state.OriginalProjects);
      
    function selectElement() {
        return (
            <div className="inner-port-component">
              {projects?.map((project, index) => (
                <ProjectComponent
                  key={index}
                  project={project}
                />
              ))}
            </div>
        );
    }

    return (
        <div className="projects-container">
            <h2 className="projects-title">Project Gallery</h2>
            <p>A visual selection of my works</p>
            <div className="projects-inner">
                {selectElement()}
            </div>
        </div>
    );
}