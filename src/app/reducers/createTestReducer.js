import ShortUniqueId from 'short-unique-id';

const initialState = {
    feature: '',
    scenarios: [],
    activeIndex: '',
    selectedOption: ''
}

// const initialState = {
//     feature: '',
//     scenarios: [{
//         scenarioId: '',
//         description: '',
//         steps: [{
//             stepId: '',
//             stepOne: '',
//             stepTwo: '',
//             isEnabled: '',
//             elementKey: <ElementKey>
//         }]
//     }],
//     activeIndex: ''
// }

const uid = new ShortUniqueId();

const createTestReducer = (state = initialState, action) => {

    switch (action.type) {
        case "ADD_FEATURE":
            console.log("IN ADD FEATURE REDUCER")
            state = {
                ...state,
                feature: action.payload
            }
            break;

        case "ADD_SCENARIO": {
            if (state.feature === '' || action.payload === '') {
                console.log("ERROR MESSAGE : NEED TO ADD FEATURE FIRST")
                console.log("ERROR MESSAGE : SCENARIO CANNOT BE EMPTY")
                //SEND ERROR MESSAGE : NEED TO ADD FEATURE FIRST
                break;
            } else {
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

            if (arrayIndex === 0) {
                console.log("ERROR MESSAGE : NEED TO ADD Scenario FIRST")
                //SEND ERROR MESSAGE : NEED TO ADD Scenario FIRST
            } else if (state.selectedOption === "") {
                console.log("ERROR MESSAGE : Step cannot be empty")

            } else {
                let newStepId = uid.randomUUID(6);
                var newStep = {
                    stepId: newStepId,
                    stepOne: action.payload.stepOne,
                    stepTwo: state.selectedOption.label,
                    disabled: false
                }

                let strArr = state.selectedOption.label.split(" ");
                for (var i = 0, tot = strArr.length; i < tot; i++) {
                    if (strArr[i].includes("<")) {
                        let key = strArr[i].substring(1, (strArr[i].length - 1));
                        newStep[key] = '';
                    }
                }

                let newScenario = {};

                if (typeof state.scenarios[state.activeIndex].steps === "undefined") {

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

        case "ADD_OPTION": {
            const value = action.payload === null ? '' : action.payload
            state = {
                ...state,
                selectedOption: value
            }
            break;
        }

        case "REMOVE_SCENARIO": {
            let deleteScenarioId = state.scenarios.findIndex(scenario => scenario.scenarioId === action.payload)

            state = {
                ...state,
                scenarios: [...state.scenarios.slice(0, deleteScenarioId),
                ...state.scenarios.slice(deleteScenarioId + 1)]
            }
            break;
        }

        case "REMOVE_STEP": {
            let scenarioIndex = state.scenarios.findIndex(scenario => scenario.scenarioId === action.payload.scenarioId)
            let deleteStepIndex = state.scenarios[scenarioIndex].steps.findIndex(step => step.stepId === action.payload.removeStepId)

            let newScenario = {
                scenarioId: state.scenarios[scenarioIndex].scenarioId,
                description: state.scenarios[scenarioIndex].description,
                steps: [...state.scenarios[scenarioIndex].steps.slice(0, deleteStepIndex),
                ...state.scenarios[scenarioIndex].steps.slice(deleteStepIndex + 1)]
            }

            state = {
                ...state,
                scenarios: [...state.scenarios.slice(0, scenarioIndex),
                    newScenario,
                ...state.scenarios.slice(scenarioIndex + 1)]
            }
            break;
        }

        case "SCENARIO_DOWN": {
            let scenarioIndex = state.scenarios.findIndex(scenario => scenario.scenarioId === action.payload)

            if (scenarioIndex !== (state.scenarios.length - 1)) { //if not the last scenario
                let scenario = state.scenarios[scenarioIndex]
                let scenarioBelow = state.scenarios[scenarioIndex + 1]

                state = {
                    ...state,
                    scenarios: [...state.scenarios.slice(0, scenarioIndex),
                        scenarioBelow,
                        scenario,
                    ...state.scenarios.slice(scenarioIndex + 2)]
                }
            }
            break;
        }

        case "SCENARIO_UP": {
            let scenarioIndex = state.scenarios.findIndex(scenario => scenario.scenarioId === action.payload)

            if ((scenarioIndex - 1) !== -1) {
                let scenario = state.scenarios[scenarioIndex]
                let scenarioAbove = state.scenarios[scenarioIndex - 1]


                state = {
                    ...state,
                    scenarios: [...state.scenarios.slice(0, (scenarioIndex - 1)),
                        scenario,
                        scenarioAbove,
                    ...state.scenarios.slice(scenarioIndex + 1)]
                }
            }
            break;
        }

        case "STEP_DOWN": {

            let scenarioIndex = state.scenarios.findIndex(scenario => scenario.scenarioId === action.payload.scenarioId)
            let stepIndex = state.scenarios[scenarioIndex].steps.findIndex(scenario => scenario.stepId === action.payload.stepId)

            if (stepIndex !== (state.scenarios[scenarioIndex].steps.length - 1)) {
                let step = state.scenarios[scenarioIndex].steps[stepIndex]
                let stepBelow = state.scenarios[scenarioIndex].steps[stepIndex + 1]

                let newScenario = {
                    scenarioId: state.scenarios[scenarioIndex].scenarioId,
                    description: state.scenarios[scenarioIndex].description,
                    steps: [...state.scenarios[scenarioIndex].steps.slice(0, stepIndex),
                        stepBelow,
                        step,
                    ...state.scenarios[scenarioIndex].steps.slice(stepIndex + 2)]
                }

                state = {
                    ...state,
                    scenarios: [...state.scenarios.slice(0, scenarioIndex),
                        newScenario,
                    ...state.scenarios.slice(scenarioIndex + 1)]
                }
                console.log(state);
            }
            break;
        }

        case "STEP_UP": {
            let scenarioIndex = state.scenarios.findIndex(scenario => scenario.scenarioId === action.payload.scenarioId)
            let stepIndex = state.scenarios[scenarioIndex].steps.findIndex(scenario => scenario.stepId === action.payload.stepId)

            if ((stepIndex - 1) !== -1) {
                let step = state.scenarios[scenarioIndex].steps[stepIndex]
                let stepAbove = state.scenarios[scenarioIndex].steps[stepIndex - 1]

                let newScenario = {
                    scenarioId: state.scenarios[scenarioIndex].scenarioId,
                    description: state.scenarios[scenarioIndex].description,
                    steps: [...state.scenarios[scenarioIndex].steps.slice(0, (stepIndex - 1)),
                        step,
                        stepAbove,
                    ...state.scenarios[scenarioIndex].steps.slice(stepIndex + 1)]
                }

                state = {
                    ...state,
                    scenarios: [...state.scenarios.slice(0, scenarioIndex),
                        newScenario,
                    ...state.scenarios.slice(scenarioIndex + 1)]
                }
            }
            break;
        }

        case "SAVE": {
            let scenarioIndex = action.payload.scenarioIndex;
            let stepIndex = action.payload.stepIndex;

            let newStep = {
                ...state.scenarios[scenarioIndex].steps[stepIndex],
            }
            newStep[action.payload.key] = action.payload.inputVal;

            let newScenario = {
                scenarioId: state.scenarios[scenarioIndex].scenarioId,
                description: state.scenarios[scenarioIndex].description,
                steps: [...state.scenarios[scenarioIndex].steps.slice(0, (stepIndex)),
                    newStep,
                ...state.scenarios[scenarioIndex].steps.slice(stepIndex + 1)]
            }

            state = {
                ...state,
                scenarios: [...state.scenarios.slice(0, scenarioIndex),
                    newScenario,
                ...state.scenarios.slice(scenarioIndex + 1)]
            }
            break;
        }

        case "EDIT_SCENARIO_DESCRIPTION": {
            let scenarioIndex = state.scenarios.findIndex(scenario => scenario.scenarioId === action.payload.scenarioId)

            let newScenario = {
                ...state.scenarios[scenarioIndex],
                description: action.payload.value,
            }

            state = {
                ...state,
                scenarios: [...state.scenarios.slice(0, (scenarioIndex)),
                    newScenario,
                ...state.scenarios.slice(scenarioIndex + 1)
                ]
            }
            break;
        }

        // case "DISABLE_INPUT": {
        //     let scenarioIndex = state.scenarios.findIndex(scenario => scenario.scenarioId === action.payload.scenarioId)
        //     let stepIndex = state.scenarios[scenarioIndex].steps.findIndex(scenario => scenario.stepId === action.payload.stepId)
        //     let newStep = {
        //         ...state.scenarios[scenarioIndex].steps[stepIndex],
        //         disabled: true
        //     }

        //     let newScenario = {
        //         scenarioId: state.scenarios[scenarioIndex].scenarioId,
        //         description: state.scenarios[scenarioIndex].description,
        //         steps: [...state.scenarios[scenarioIndex].steps.slice(0, (stepIndex)),
        //             newStep,
        //         ...state.scenarios[scenarioIndex].steps.slice(stepIndex + 1)]
        //     }

        //     state = {
        //         ...state,
        //         scenarios: [...state.scenarios.slice(0, scenarioIndex),
        //             newScenario,
        //         ...state.scenarios.slice(scenarioIndex + 1)]
        //     }
        //     break;
        // }

        // case "ENABLE_INPUT": {
        //     let scenarioIndex = state.scenarios.findIndex(scenario => scenario.scenarioId === action.payload.scenarioId)
        //     let stepIndex = state.scenarios[scenarioIndex].steps.findIndex(scenario => scenario.stepId === action.payload.stepId)
        //     let newStep = {
        //         ...state.scenarios[scenarioIndex].steps[stepIndex],
        //         disabled: false
        //     }

        //     let newScenario = {
        //         scenarioId: state.scenarios[scenarioIndex].scenarioId,
        //         description: state.scenarios[scenarioIndex].description,
        //         steps: [...state.scenarios[scenarioIndex].steps.slice(0, (stepIndex)),
        //             newStep,
        //         ...state.scenarios[scenarioIndex].steps.slice(stepIndex + 1)]
        //     }

        //     state = {
        //         ...state,
        //         scenarios: [...state.scenarios.slice(0, scenarioIndex),
        //             newScenario,
        //         ...state.scenarios.slice(scenarioIndex + 1)]
        //     }
        //     break;
        // }

        case "REMOVE_FEATURE": {
            state = {
                feature: '',
                scenarios: [],
                activeIndex: '',
                selectedOption: ''
            }
            break;
        }

    }
    return state;
};

export default createTestReducer;