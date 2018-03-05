const initialState = {
    dashboard: true,
    create: false,
    view: false,
    repo: false
}

const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "VIEW_DASHBOARD": {
            state = {
                dashboard: true,
                create: false,
                view: false,
                repo: false
            }
            break;
        }
        case "VIEW_TESTS": {
            state = {
                dashboard: false,
                create: false,
                view: true,
                repo: false
            }
            break;
        }
        case "CREATE_TEST": {
            state = {
                dashboard: false,
                create: true,
                view: false,
                repo: false
            }
            break;
        }
        case "OBJECT_REPOSITORY": {
            state = {
                dashboard: false,
                create: false,
                view: false,
                repo: true
            }
            break;
        }
    }
    return state;
}

export default navigationReducer;