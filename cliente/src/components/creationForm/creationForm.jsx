import '../../styles/creationForm.css';
import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import ProjectComponent from '../card/ProjectComponent.jsx';
import { createProject, updateProject, getProjectDetail } from '../../actions';
import Swal from 'sweetalert2';

const dateRegex = "^{4}(0?[1-9]|1[012])(0?[1-9]|[12][0-9]|3[01])$";
const linkRegex = "^(https?:\\/\\/)?((([-a-z0-9]{1,63}\\.)*?[a-z0-9]([-a-z0-9]{0,253}[a-z0-9])?\\.[a-z]{2,63})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{1,5})?((\\/|\\?)((%[0-9a-f]{2})|[-\\w\\+\\.\\?\\/@~#&=])*)?$";


function validate(project) {

    
    const errors = {};
    if (!project.title) errors.title = 'El nombre es obligatorio.';
    if (project.title.length < 3) errors.title = 'El nombre debe tener mínimo 3 caracteres.';
    if (!project.link) errors.link = 'El link es obligatorio';
    if(project.link && !linkRegex.test(project.link)) errors.link = 'El link debe tener un formato url valido';
    if (!project.publicationDate) errors.publicationDate = 'La fecha de publicacion es obligatoria';
    if(project.publicationDate && !dateRegex.test(project.publicationDate)) errors.publicationDate = 'La fecha debe tener un formato valido';
    return errors;
}

export default function CreationForm({ projectUUID }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const { uuid } = useParams();
    const projectToEdit = projectUUID || uuid;
    const [projectData, setProjectData] = useState({
        title: 'undefined',
        link: 'undefined',
        techs: [],
        collaborators: [],
        status: 'published',
        publicationDate: "undefined",
        description: "unkown"
    });

    useEffect(() => {
        if (projectToEdit) {
            dispatch(getProjectDetail(projectToEdit));
        }
    }, [projectToEdit, dispatch]);

    function handleChange(e) {
        setProjectData({ ...projectData, [e.target.name]: e.target.value });
        setErrors(validate({ ...projectData, [e.target.name]: e.target.value }));
    }

    function handleAddTech() {
        setProjectData((prevState) => ({
            ...prevState,
            techs: [...prevState.techs, ""],
        }));
    }
    
    function handleRemoveTech(index) {
        setProjectData((prevState) => {
            const newTechs = [...prevState.techs];
            newTechs.splice(index, 1);
            return { ...prevState, techs: newTechs };
        });
    }
    
    function handleTechChange(index, e) {
        setProjectData((prevState) => {
            const newTechs = [...prevState.techs];
            newTechs[index] = e.target.value;
            return { ...prevState, techs: newTechs };
        });
    }
    
    function handleTechOrderChange(index, e) {
        const techs = [...projectData.techs];
        if (e.target.value < 0 || e.target.value > (techs.length - 1)) {
            return e.target.value = index;
        }
        if (techs[e.target.value] === undefined || techs[e.target.value] === null) {
            techs[e.target.value] = techs[index];
            techs.splice(index, 1);
            setProjectData({ ...projectData, techs });
        }
        else {
            var aux = techs[index];
            techs[index] = techs[e.target.value];
            techs[e.target.value] = aux;
            setProjectData({ ...projectData, techs });
        }
    
    }

    function handleAddCollaborator() {
        setProjectData((prevState) => ({
            ...prevState,
            collaborators: [...prevState.collaborators, ""],
        }));
    }

    function handleRemoveCollaborator(index) {
        setProjectData((prevState) => {
            const newCollaborators = [...prevState.collaborators];
            newCollaborators.splice(index, 1);
            return { ...prevState, collaborators: newCollaborators };
        });
    }

    function handleCollaboratorChange(index, e) {
        setProjectData((prevState) => {
            const newCollaborators = [...prevState.collaborators];
            newCollaborators[index] = e.target.value;
            return { ...prevState, collaborators: newCollaborators };
        });
    }

    function handleCollabOrderChange(index, e) {
        const collaborators = [...projectData.collaborators];
        if (e.target.value < 0 || e.target.value > (collaborators.length - 1)) {
            return e.target.value = index;
        }
        if (collaborators[e.target.value] === undefined || collaborators[e.target.value] === null) {
            collaborators[e.target.value] = collaborators[index];
            collaborators.splice(index, 1);
            setProjectData({ ...projectData, collaborators });
        }
        else {
            var aux = collaborators[index];
            collaborators[index] = collaborators[e.target.value];
            collaborators[e.target.value] = aux;
            setProjectData({ ...projectData, collaborators });
        }

    }

    document.querySelectorAll("textarea").forEach(textarea => {
        if (textarea.id) {
            const adjustHeight = () => {
                textarea.style.height = "auto";
                textarea.style.height = textarea.scrollHeight + "px";
            };

            textarea.addEventListener("input", adjustHeight);
            adjustHeight();
        }
    });

    function handleSubmit(e) {
        e.preventDefault();
        let errors = validate(projectData);
        if (!errors.title && !errors.link && !errors.publicationDate) {
            if (!!projectToEdit) {
                dispatch(updateProject(projectToEdit, projectData));
                Swal.fire({
                    icon: 'success',
                    title: 'Proyecto actualizado con éxito',
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' }
                }).then(() => navigate('/'));
            }
            else {
                dispatch(createProject(projectData));
                Swal.fire({
                    icon: 'success',
                    title: 'Proyecto creado con éxito',
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' }
                }).then(() => navigate('/'));
            };
            
        }
    }

    return (
        <div className='creation-form-container'>
            <div className='creation-form-component'>
                <form onSubmit={handleSubmit} className='form-container'>
                    {projectToEdit ? <button type='submit' className='create-button'>Save Project</button> : <button type='submit' className='create-button'>Create Project</button>}
                    <div>
                        <h3>Title</h3>
                        <textarea value={projectData.title} id={projectData.title} name='title' placeholder='title...' onChange={handleChange} className='input-text-2' />
                        {errors.title && <p className='input-errors'>{errors.title}</p>}
                    </div>
                    <div>
                        <h3>Link</h3>
                        <textarea value={projectData.link} id={projectData.link} name='link' placeholder='link...' onChange={handleChange} className='input-text-2' />
                        {errors.link && <p className='input-errors'>{errors.link}</p>}
                    </div>
                    <div>
                    <h3>Techs</h3>
                    <select onChange={(e) => setProjectData({ ...projectData, collaborators: e.target.value === "single" ? "" : [] })} className='input-text'>
                        <option value="single">One Tech</option>
                        <option value="multiple">Multiple Techs</option>
                    </select>
                    {Array.isArray(projectData.techs) ? (
                        <>
                            <button type="button" onClick={handleAddTech}>Add Tech</button>
                            {projectData.techs.map((tech, index) => (
                                <div key={index}>
                                    <input type="text" value={tech} onChange={(e) => handleTechChange(index, e)} placeholder={`Tech ${index + 1}`} className='input-text' />
                                    <input type='number' name='tech-order' value={index} onChange={(e) => handleTechOrderChange(index, e)} min='0' className='order-input' />
                                    <button type="button" onClick={() => handleRemoveTech(index)} className='content-button'>Delete</button>
                                </div>
                            ))}
                        </>
                    ) : (
                        <input
                            type="text"
                            name="collaborators"
                            value={projectData.collaborators}
                            onChange={(e) => setProjectData({ ...projectData, techs: e.target.value })}
                            placeholder="Nombre del colaborador"
                            className='input-text-c'
                        />
                    )}
                    </div>
                    <div>
                    <h3>Collaborators</h3>
                    <select onChange={(e) => setProjectData({ ...projectData, collaborators: e.target.value === "single" ? "" : [] })} className='input-text'>
                        <option value="single">One collaborator</option>
                        <option value="multiple">Multiple colaborators</option>
                    </select>

                    {Array.isArray(projectData.collaborators) ? (
                        <>
                            <button type="button" onClick={handleAddCollaborator}>Add collaborator</button>
                            {projectData.collaborators.map((collab, index) => (
                                <div key={index}>
                                    <input type="text" value={collab} onChange={(e) => handleCollaboratorChange(index, e)} placeholder={`Colaborador ${index + 1}`} className='input-text' />
                                    <input type='number' name='collab-order' value={index} onChange={(e) => handleCollabOrderChange(index, e)} min='0' className='order-input' />
                                    <button type="button" onClick={() => handleRemoveCollaborator(index)} className='content-button'>Delete</button>
                                </div>
                            ))}
                        </>
                    ) : (
                        <input
                            type="text"
                            name="collaborators"
                            value={projectData.collaborators}
                            onChange={(e) => setProjectData({ ...projectData, collaborators: e.target.value })}
                            placeholder="Nombre del colaborador"
                            className='input-text-c'
                        />
                    )}
                    </div>
                        <div>
                        <h3>Publication Day</h3>
                        <input type="date" value={projectData.publicationDate} id={projectData.publicationDate} name='publicationDate' onChange={handleChange} min="2019-01-01" className='input-text-2' />
                        {errors.publicationDate && <p className='input-errors'>{errors.publicationDate}</p>}
                    </div>
                    <div>
                        <h3>Description</h3>
                        <textarea value={projectData.description} id={projectData.description} name='description' placeholder='description...' onChange={handleChange} className='input-text-2' />
                    </div>
                </form>
            </div>
            <div>
                <ProjectComponent project={projectData} />
            </div>
        </div>
    );
}