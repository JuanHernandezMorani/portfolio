import '../../styles/creationForm.css';
import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import ProjectComponent from '../card/ProjectComponent.jsx';
import { createProject, updateProject, getProjectDetail } from '../../actions';
import Swal from 'sweetalert2';

const dateRegex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const linkRegex = /^(https?:\/\/)?(([-a-zA-Z0-9]{1,63}\.)*?[a-zA-Z0-9]([-a-zA-Z0-9]{0,253}[a-zA-Z0-9])?\.[a-zA-Z]{2,63})|((\d{1,3}\.){3}\d{1,3})(:\d{1,5})?((\/|\?)((%[0-9a-f]{2})|[-\w+?\\/@~#&=])*)?$/;
function validate(project) {
    const errors = {};

    if (!project.title) errors.title = 'El nombre es obligatorio.';
    if (project.title.length < 3) errors.title = 'El nombre debe tener mínimo 3 caracteres.';
    if (project.link && !linkRegex.test(project.link)) errors.link = 'El link debe tener un formato URL válido';
    if (project.publicationDate && !dateRegex.test(project.publicationDate)) errors.publicationDate = 'La fecha debe tener un formato válido (YYYY-MM-DD)';

    return errors;
}

export default function CreationForm({ projectUUID }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const { uuid } = useParams();
    const projectToEdit = projectUUID || uuid;
    const [projectData, setProjectData] = useState({
        title: '',
        link: '',
        techs: '',
        collaborators: '',
        status: 'complete',
        publicationDate: '',
        description: ''
    });

    useEffect(() => {
        async function fetchProject() {
            if (projectToEdit) {
                const project = await dispatch(getProjectDetail(projectToEdit));
                if (project.payload) {
                    setProjectData({
                        ...project.payload,
                        publicationDate: project.payload.publicationDate 
                            ? project.payload.publicationDate.split('T')[0] 
                            : ''
                    });
                }
            }
        }
        fetchProject();
    }, [projectToEdit, dispatch]);
    

    useEffect(() => {
        const textareas = document.querySelectorAll("textarea");
        textareas.forEach((textarea) => {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        });
    }, [projectData]);

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
        const newIndex = Math.min(Math.max(0, Number(e.target.value)), techs.length - 1);
        [techs[index], techs[newIndex]] = [techs[newIndex], techs[index]];
        setProjectData({ ...projectData, techs });
    }
    function handleCollabOrderChange(index, e) {
        const collaborators = [...projectData.collaborators];
        const newCIndex = Math.min(Math.max(0, Number(e.target.value)), collaborators.length - 1);
        [collaborators[index], collaborators[newCIndex]] = [collaborators[newCIndex], collaborators[index]];
        setProjectData({ ...projectData, collaborators });
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



    function handleSubmit(e) {
        e.preventDefault();
        const validationErrors = validate(projectData);
        setErrors(validationErrors);
        setIsLoading(true);

        if (Object.keys(validationErrors).length === 0) {
            const action = projectToEdit ? updateProject(projectToEdit, projectData) : createProject(projectData);
            dispatch(action)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: projectToEdit ? 'Proyecto actualizado con éxito' : 'Proyecto creado con éxito'
                    });
                    navigate('/');
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ocurrió un error',
                        text: 'No se pudo completar la acción'
                    });
                })
                .finally(() => setIsLoading(false));
        } else{
            setIsLoading(false);
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
                        <h3>Status</h3>
                        <select name='status' value={projectData.status} onChange={handleChange}>
                            <option value="complete">complete</option>
                            <option value="incomplete">incomplete</option>
                            <option value="abandoned">abandoned</option>
                        </select>
                    </div>
                    <div>
                        <h3>Techs</h3>
                        <select value={Array.isArray(projectData.techs) ? "multiple" : "single"} onChange={(e) => setProjectData({ ...projectData, techs: e.target.value === "single" ? "" : [] })} className='input-text'>
                            <option value="single">One Tech</option>
                            <option value="multiple">Multiple Techs</option>
                        </select>
                        {Array.isArray(projectData.techs) ? (
                            <>
                                <button className="addButton" type="button" onClick={handleAddTech}>Add</button>
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
                                name="techs"
                                value={projectData.techs}
                                onChange={(e) => setProjectData({ ...projectData, techs: e.target.value })}
                                placeholder="Tech"
                                className='input-text-c'
                            />
                        )}
                    </div>
                    <div>
                        <h3>Collaborators</h3>
                        <select value={Array.isArray(projectData.collaborators) ? "multiple" : "single"} onChange={(e) => setProjectData({ ...projectData, collaborators: e.target.value === "single" ? "" : [] })} className='input-text'>
                            <option value="single">One collaborator</option>
                            <option value="multiple">Multiple colaborators</option>
                        </select>

                        {Array.isArray(projectData.collaborators) ? (
                            <>
                                <button className="addButton" type="button" onClick={handleAddCollaborator}>Add</button>
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
                                placeholder="Collaborator"
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
                    {projectToEdit ? <button type='submit' className='create-button'>Save Project</button> : <button type='submit' className='create-button'>Create Project</button>}
                </form>
                {isLoading && (
                <div className="creation-loader-overlay">
                    <div className="creation-spinner"></div>
                </div>
            )}
            </div>
            <div className='project-component-side'>
                <ProjectComponent project={projectData} isEdit={true} />
            </div>
        </div>
    );
}