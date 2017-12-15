const initialState = {
    activeId: 0
}

const activeScenario = (state = initialState, action) => {

    switch (action.type) {
        case "UPDATE_ACTIVE":
            state = {
                activeId: action.payload
            }
            break;
    }
    return state;
};

export default activeScenario;