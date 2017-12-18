import ShortUniqueId from 'short-unique-id';

const initialState = {
    feature: '',
    scenarios: [],
    activeIndex: ''
}

// const initialState = {
//     feature: '',
//     scenarios: [{
//         scenarioId: '',
//         description: '',
//         steps: [{
//             stepId: '',
//             stepOne: '',
//             stepTwo: ''
//         }]
//     }],
//     activeIndex: ''
// }

const uid = new ShortUniqueId();

const reducerCreate = (state = initialState, action) => {

    switch (action.type) {
        case "ADD_FEATURE":
            state = {
                ...state,
                feature: action.payload
            }
            break;

        case "ADD_SCENARIO": {
            if (state.feature == '') {
                console.log("ERROR MESSAGE : NEED TO ADD FEATURE FIRST")
                //SEND ERROR MESSAGE : NEED TO ADD FEATURE FIRST
                break;
            } else {
                console.log(state.scenarios.length);
                let scenarioId = uid.randomUUID(6);
                let newScenario = {
                    scenarioId: scenarioId,
                    description: action.payload,
                    steps: []
                }
                state = {
                    ...state,
                    activeIndex: state.scenarios.length,
                    scenarios: [...state.scenarios, newScenario]
                }
            }
            break;
        }
        case "ADD_STEP": {

            let arrayIndex = state.scenarios.length

            if (arrayIndex == 0) {
                console.log("ERROR MESSAGE : NEED TO ADD Scenario FIRST")
                //SEND ERROR MESSAGE : NEED TO ADD Scenario FIRST
            } else {
                let newStep = {
                    stepId: uid.randomUUID(6),
                    stepOne: action.payload.stepOne,
                    stepTwo: action.payload.stepTwo
                }

                let newScenario = {};
                if (state.scenarios[state.activeIndex].steps.length == 0) {

                    newScenario = {
                        scenarioId: state.scenarios[state.activeIndex].scenarioId,
                        description: state.scenarios[state.activeIndex].description,
                        steps: [newStep]
                    }
                } else {

                    newScenario = {
                        scenarioId: state.scenarios[state.activeIndex].scenarioId,
                        description: state.scenarios[state.activeIndex].description,
                        steps: [...state.scenarios[state.activeIndex].steps, newStep]
                    }
                }

                state = {
                    ...state,
                    scenarios: [...state.scenarios.slice(0, state.activeIndex),
                        newScenario,
                    ...state.scenarios.slice(state.activeIndex + 1)]
                }
            }

            break;
        }
        case "REMOVE_SCENARIO":
            let deleteScenarioId = state.scenarios.findIndex(scenario => scenario.scenarioId == action.payload)

            state = {
                ...state,
                scenarios: [...state.scenarios.slice(0, deleteScenarioId),
                ...state.scenarios.slice(deleteScenarioId + 1)]
            }
            break;

        case "REMOVE_STEP":
            let scenarioIndex = state.scenarios.findIndex(scenario => scenario.scenarioId == action.payload.scenarioId)
            let deleteStepIndex = state.scenarios[scenarioIndex].steps.findIndex(step => step.stepId == action.payload.removeStepId)
            console.log("scnearioIndex" + scenarioIndex)
            console.log("step Index" + deleteStepIndex)

            let newScenario = {
                scenarioId: state.scenarios[scenarioIndex].scenarioId,
                description: state.scenarios[scenarioIndex].description,
                steps: [...state.scenarios[scenarioIndex].steps.slice(0, deleteStepIndex),
                ...state.scenarios[scenarioIndex].steps.slice(deleteStepIndex + 1)]
            }
            console.log(newScenario);

            state = {
                ...state,
                scenarios: [...state.scenarios.slice(0, scenarioIndex),
                    newScenario,
                ...state.scenarios.slice(scenarioIndex + 1)]
            }
            break;
    }
    return state;
};

export default reducerCreate;