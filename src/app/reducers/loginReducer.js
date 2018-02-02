const initialState = {
    username: '',
    password: ''
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_USER": {
            state = {
                username: action.payload.username,
                password: action.payload.password
            }
            break;
        }
    }
    return state;
}

export default loginReducer;