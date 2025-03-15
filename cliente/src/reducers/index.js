const initialState = {
    Projects: [],
    OriginalProjects: [],
    Details: null,
    thumbnail: null,
    needsUpdate: false,
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_PROJECTS":
            return {...state, Projects: action.payload, OriginalProjects: action.payload, needsUpdate: false};
        case "GET_PROJECT_DETAIL":
            return {...state, Details: action.payload};
        case "CREATE_PROJECT": 
            return {...state, needsUpdate: true};
        case "UPDATE_PROJECT":
            return {...state, needsUpdate: true};
        case "REMOVE_PROJECT":
            return {...state, needsUpdate: true};
        case "CLEAR_DETAIL": 
            return {...state, Details: null};
        case "SEND_MESSAGE":
            return {...state};
        default:
            return state;
    }
}

export default rootReducer;