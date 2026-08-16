import React, { useState } from 'react';
import '../../styles/card.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { removeProject } from '../../actions';

const ProjectComponent = ({ project, isEdit, showDeleteButton }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showFullDescription, setShowFullDescription] = useState(false);

  let projectID = isEdit ? "NotCreatedYet" : project.uuid;

  let pD = project.publicationDate && project.publicationDate !== "undefined" 
    ? project.publicationDate.split("-")[2].slice(0, 2) + "/" + project.publicationDate.split("-")[1] + "/" + project.publicationDate.split("-")[0] 
    : "Work In Progress";

  const handleEdit = (e) => {
    e.preventDefault();
    if(project.uuid) navigate(`/projects/${project.uuid}`);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    if(project.uuid) {
      dispatch(removeProject(project.uuid));
      navigate('/');
    }
  }

  return (
    <div className="project-card" id={projectID}>
      <div className="project-image-container">
        {
          isEdit && !(project.thumbnail) 
            ? <div className="spinner"></div> 
            : <img src={project.thumbnail} alt={`Thumbnail of ${project.title}`} className="img-fluid" />
        }
      </div>
      <div className="project-details">
        <h3 className="project-name">{project.title} {"(" + pD + ")"}</h3>
        
        <p className={`project-description ${showFullDescription ? 'expanded' : 'collapsed'}`}>
          {project.description}
        </p>

        {project.description.length > 160 && (
          <button 
            className="toggle-description" 
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "show less" : "show more"}
          </button>
        )}

        <div className='project-arr'>
          <p className="project-technologies">
            {Array.isArray(project.techs) ? <strong>Technologies:</strong> : <strong>Technology:&nbsp;</strong>}
            {Array.isArray(project.techs)
              ? project.techs.map((tech, index) => (
                <span key={index} className="word">
                  &nbsp;{tech}{index === project.techs.length - 1 ? "." : ", "}
                </span>
              ))
              : project.techs}
          </p>
          <p className="project-collaborators">
            {Array.isArray(project.collaborators) ? <strong>Collaborators:</strong> : <strong>Collaborator:&nbsp;</strong>}
            {Array.isArray(project.collaborators)
              ? project.collaborators.map((collaborator, index) => (
                <span key={index} className="word">
                  &nbsp;{collaborator}{index === project.collaborators.length - 1 ? "." : ", "}
                </span>
              ))
              : project.collaborators}
          </p>
        </div>

        <div className={showDeleteButton ? "buttons-end-conteiner" : "full-width"}>
          {showDeleteButton && !isEdit && <button onClick={handleEdit} className="use-buttons-2">Edit</button>}

          {!isEdit && project.uuid && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="use-buttons-1">
              View Project
            </a>
          )}

          {showDeleteButton && !isEdit && <button onClick={handleDelete} className="use-buttons-2">Delete</button>}
        </div>

        {showDeleteButton && !isEdit ? <p className='project-asg'>{project.uuid}</p> : <div className='project-asg'></div>}
      </div>
    </div>
  );
};

export default ProjectComponent;