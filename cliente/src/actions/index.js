import axios from "axios";
import Swal from 'sweetalert2';

const server = process.env.REACT_APP_SERVER;

export function getProjects(){
    return async function (dispatch) {
        try {
            const res = await axios.get(`${server}/projects`);
            dispatch({
                type:"GET_PROJECTS",
                payload: res.data
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error 500',
                text: error.response.data.message || 'The server responded with an error, please try again later, if the error persists, please contact support.'
            });
        }
    }
}

export function getProjectDetail(uuid){
    return async function (dispatch){
        try {
            const res = await axios.get(`${server}/projects/${uuid}`);
            return dispatch({
                type: "GET_PROJECT_DETAIL",
                payload: res.data
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error 404',
                text: error.response.data.message || 'Project info dont found, see if that project data is correct, and try again.'
            });
        }
    }
}

export function sendMSG(data){
    return async function (dispatch) {
        try {
            const res = await axios.post(`${server}/mails/send`, data);
            
            return dispatch({
                type: "SEND_MESSAGE",
                payload: res.data
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error 500',
                text: error.response.data.message || 'Algo salio mal',
                footer: 'Porfavor vuelva a intentarlo nuevamente mas tarde, o pongase en contacto con soporte.'
            });
        }
    }
}

export function createProject(projectData){
    return async function (dispatch) {
        try {
            const response = await axios.post(`${server}/projects/`, projectData);
            dispatch({
                type: "CREATE_PROJECT",
                payload: response.data
            });
            Swal.fire({
                icon: 'success',
                title: 'Done',
                text: 'Project created successfully.',
              });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error 412',
                text: error.response.data.message || 'Cant create project',
            });
        }
    }
}

export function updateProject(uuid, updatedPost) {
    return async function (dispatch) {
      try {
        const response = await axios.put(`${server}/projects/${uuid}`, updatedPost);
        if (response.status >= 200 && response.status < 400) {
            dispatch({
                type: 'UPDATE_PROJECT',
                payload: response.data,
              });
            Swal.fire({
                icon: 'success',
                title: 'Done',
                text: 'Project updated successfully.',
              });
        }        
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.response.data.message || 'Cant update project',
        });
      }
    };
}

export function removeProject(uuid){
    return async function(dispatch){
        try{        
        const response = await axios.delete(`${server}/projects/${uuid}`);
        dispatch({
            type: "REMOVE_PROJECT",
            payload: response.data
        });
        Swal.fire({
            icon: 'success',
            title: 'Done',
            text: 'Project removed successfully.',
          });
    }
        catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Error 412',
                text: error.response.data.message || 'Cant delete Project',
            });
        }
    }
}


export function clearDetail(){
    return {
        type: "CLEAR_DETAIL"
    }
}