const initialState = {
    title: '',
    body: '',
    category: '',
    photo: ''
}

const UPDATE_TITLE = "UPDATE_TITLE";
const UPDATE_BODY = "UPDATE_BODY";
const UPDATE_CATEGORY = "UPDATE_CATEGORY"
const UPDATE_PHOTO = "UPDATE_PHOTO";


export function updateTitle(title) {
    return {
        type: UPDATE_TITLE,
        payload: title
    }
}

export function updateBody(body) {
    return {
        type: UPDATE_BODY,
        payload: body
    }
}

export function updateCategory(category) {
    return {
        type: UPDATE_CATEGORY,
        payload: category
    }
}

export function updatePhoto(photo) {
    return {
        type: UPDATE_PHOTO,
        payload: photo
    }
}



export default function reducer(state = initialState, action) {
    var { payload, type } = action;
    switch(type) {
        case UPDATE_TITLE:
            return Object.assign({}, state, { title: payload });
        case UPDATE_BODY:
            return Object.assign({}, state, { body: payload });
        case UPDATE_CATEGORY:
            return Object.assign({}, state, { category: payload });
        case UPDATE_PHOTO:
            return Object.assign({}, state, { photo: payload });
        default:
            return state;
    }
}