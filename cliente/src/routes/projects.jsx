import { React } from 'react';
import { useSelector } from "react-redux";
import '../styles/projects.css';
import ProjectComponent from '../components/card/ProjectComponent.jsx';
import { useNavigate } from 'react-router-dom';

export default function Projects() {
  const projects = useSelector(state => state.OriginalProjects);
  const isAuthenticated = sessionStorage.getItem("auth");
  const navigate = useNavigate();

  const handleCreation = (e) => {
    e.preventDefault();
    navigate("/addProject");
  }

  return (
    <div className="projects-container">
      <h2 className="projects-title">Project Gallery</h2>
      {isAuthenticated ? <button onClick={handleCreation} className="use-buttons">Add New Project</button> : <></>}
      <div className="projects-inner">
        <div className="inner-port-component">
          {projects?.map((project, index) => (
            <ProjectComponent
              key={index}
              project={project}
              isEdit={false}
              showDeleteButton={isAuthenticated}
            />
          ))}
        </div>
      </div>
    </div>
  );
}