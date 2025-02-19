import React from 'react';
import '../../styles/card.css';

const ProjectComponent = ({ project, isEdit }) => {
/*

falta usar publicationDate, description, status

*/
let projectID = isEdit ? project.uuid : "NotCreatedYet"

  return (
    <div className="project-card" id={projectID}>
      <div className="project-image-container">
        {
          isEdit ? <img src={project.image} alt={`Thumbnail of ${project.title}`} className="img-fluid" /> : <div className="spinner"></div>
        }
      </div>
      <div className="project-details">
        <h3 className="project-name">{project.title}</h3>
        <p className="project-technologies">
          <strong>Technologies:</strong> { Array.isArray(project.techs) ? project.techs.join(', ') : project.techs}
        </p>
        <p className="project-collaborators">
          <strong>Collaborators:</strong> { Array.isArray(project.collaborators) ? project.collaborators.join(', ') : project.collaborators}
        </p>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
          View Project
        </a>
      </div>
    </div>
  );
};

export default ProjectComponent;
