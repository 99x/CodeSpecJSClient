import ShortUniqueId from 'short-unique-id';

const initialState = {
    feature: '',
    scenarios: [],
    repoNames: [],
    repoObjects: [],
    activeIndex: '',
    deleteConfirmation: []
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
            state = {
                ...state,
                feature: action.payload,
                deleteConfirmation: [...state.deleteConfirmation, { id: 'feature', delete: true, open: false }]
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
                    scenarios: [...state.scenarios, newScenario],
                    deleteConfirmation: [...state.deleteConfirmation, { id: scenarioId, delete: true, open: false }]
                }
            }
            break;
        }

        case "ADD_STEP": {
            let arrayIndex = state.scenarios.length

            if (arrayIndex === 0) {
                console.log("ERROR MESSAGE : NEED TO ADD Scenario FIRST")
                //SEND ERROR MESSAGE : NEED TO ADD Scenario FIRST

            } else {
                let newStepId = uid.randomUUID(6);
                var newStep = {
                    stepId: newStepId,
                    stepOne: action.payload.stepOne,
                    stepTwo: action.payload.stepTwo,
                    disabled: false
                }

                let strArr = action.payload.stepTwo.split(" ");

                // Add an empty object key in the name of the element
                for (var i = 0, tot = strArr.length; i < tot; i++) {
                    if (strArr[i].includes("<")) {
                        let key = strArr[i].substring(1, (strArr[i].length - 1));
                        newStep[key] = '';
                    }
                }

                let scenarioIndex = state.scenarios.findIndex(scenario => scenario.scenarioId === action.payload.scenarioId)
                let newScenario = {
                    scenarioId: state.scenarios[scenarioIndex].scenarioId,
                    description: state.scenarios[scenarioIndex].description,
                };

                if (typeof state.scenarios[scenarioIndex].steps === "undefined") {
                    newScenario["steps"] = [newStep]
                } else {
                    newScenario["steps"] = [...state.scenarios[scenarioIndex].steps, newStep]
                }

                state = {
                    ...state,
                    scenarios: [...state.scenarios.slice(0, scenarioIndex),
                        newScenario,
                    ...state.scenarios.slice(scenarioIndex + 1)],
                    deleteConfirmation: [...state.deleteConfirmation, { id: newStepId, delete: true, open: false }]
                }
            }

            break;
        }

        // case "ADD_OPTION": {
        //     const value = action.payload === null ? '' : action.payload
        //     state = {
        //         ...state,
        //         selectedOption: value
        //     }
        //     break;
        // }

        case "ADD_REPO": {
            try {
                let storedEntry = JSON.parse(localStorage.getItem(action.payload.username))
                let newRepos = []
                for (var repo of storedEntry.repo) {
                    //ignore if repo exists in state already - to be implemented
                    let newObj = {}
                    for (var j = 0; j < action.payload.repoNames.length; j++) {
                        if (repo.repoName === action.payload.repoNames[j]) {
                            for (var obj of repo.objects) {
                                newObj = {
                                    key: obj.key,
                                    name: repo.repoName
                                }
                                newRepos.push(newObj)
                            }
                            break;
                        }
                    }
                }

                state = {
                    ...state,
                    repoObjects: newRepos,
                    repoNames: action.payload.repoNames
                }
            } catch (error) {
                console.log('ERROR: ADD_REPO failed: ' + error.message)
            } finally {
                break;
            }
        }

        case "REMOVE_SCENARIO": {
            let deleteScenarioId = state.scenarios.findIndex(scenario => scenario.scenarioId === action.payload)
            let deleteConfirmationId = state.deleteConfirmation.findIndex(item => item.id === action.payload)
            state = {
                ...state,
                scenarios: [...state.scenarios.slice(0, deleteScenarioId),
                ...state.scenarios.slice(deleteScenarioId + 1)],
                deleteConfirmation: [...state.deleteConfirmation.slice(0, deleteConfirmationId),
                ...state.deleteConfirmation.slice(deleteConfirmationId + 1)]
            }
            break;
        }

        case "REMOVE_STEP": {
            let scenarioIndex = state.scenarios.findIndex(scenario => scenario.scenarioId === action.payload.scenarioId)
            let deleteStepIndex = state.scenarios[scenarioIndex].steps.findIndex(step => step.stepId === action.payload.removeStepId)
            let deleteConfirmationId = state.deleteConfirmation.findIndex(item => item.id === action.payload.removeStepId)
            let newScenario = {
                ...state.scenarios[scenarioIndex],
                scenarioId: state.scenarios[scenarioIndex].scenarioId,
                description: state.scenarios[scenarioIndex].description,
                steps: [...state.scenarios[scenarioIndex].steps.slice(0, deleteStepIndex),
                ...state.scenarios[scenarioIndex].steps.slice(deleteStepIndex + 1)]
            }

            state = {
                ...state,
                scenarios: [...state.scenarios.slice(0, scenarioIndex),
                    newScenario,
                ...state.scenarios.slice(scenarioIndex + 1)],
                deleteConfirmation: [...state.deleteConfirmation.slice(0, deleteConfirmationId),
                ...state.deleteConfirmation.slice(deleteConfirmationId + 1)]
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

        case "REMOVE_FEATURE": {
            state = {
                feature: '',
                scenarios: [],
                repoNames: [],
                repoObjects: [],
                deleteConfirmation: []
            }
            break;
        }

        case "INITIALIZE_FORM": {
            console.log('initializing form')
            console.log(action.payload)
            state = action.payload;
            break;
        }

        case "HANDLE_DELETE": {
            let index = state.deleteConfirmation.findIndex(obj => obj.id === action.payload.id)
            if (index !== -1) {
                let currentDeleteState = !(state.deleteConfirmation[index].delete)

                let newObj = {
                    ...state.deleteConfirmation[index],
                    delete: currentDeleteState,
                }

                state = {
                    ...state,
                    deleteConfirmation: [...state.deleteConfirmation.slice(0, index),
                        newObj,
                    ...state.deleteConfirmation.slice(index + 1)
                    ]
                }
            }

        }

        case "TOGGLE_DELETE": {
            let index = state.deleteConfirmation.findIndex(obj => obj.id === action.payload.id)
            if (index !== -1) {
                let currentOpenState = !(state.deleteConfirmation[index].open)

                let newObj = {
                    id: action.payload.id,
                    delete: state.deleteConfirmation[index].delete,
                    open: currentOpenState
                }

                state = {
                    ...state,
                    deleteConfirmation: [...state.deleteConfirmation.slice(0, index),
                        newObj,
                    ...state.deleteConfirmation.slice(index + 1)
                    ]
                }
            }

        }

    }
    return state;
};

export default createTestReducer;