export function addFeature(functionDescription) {
    return {
        type: "ADD_FEATURE",
        payload: functionDescription
    };
}

export function addScenario(scenarioDescription) {
    return {
        type: "ADD_SCENARIO",
        payload: scenarioDescription
    };
}

export function addStep(type, detail) {
    return {
        type: "ADD_STEP",
        payload: {
            scenarioId: "1",
            stepOne: type,
            stepTwo: detail
        }
    };
}

export function removeScenario(removeScenarioId) {
    return {
        type: "REMOVE_SCENARIO",
        payload: removeScenarioId
    };
}