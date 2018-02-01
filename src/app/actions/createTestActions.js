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

export function editScenario(scenarioId, value) {
    return {
        type: "EDIT_SCENARIO_DESCRIPTION",
        payload: {
            scenarioId: scenarioId,
            value: value
        }
    };
}


export function addOption(option) {
    return {
        type: "ADD_OPTION",
        payload: option
    };
}

export function addRepo(repoNames, username) {
    return {
        type: "ADD_REPO",
        payload: {
            repoNames: repoNames,
            username: username
        }
    };
}

export function addStep(type) {
    return {
        type: "ADD_STEP",
        payload: {
            scenarioId: "1",
            stepOne: type
        }
    };
}

export function removeScenario(removeScenarioId) {
    return {
        type: "REMOVE_SCENARIO",
        payload: removeScenarioId
    };
}

export function removeStep(removeStepId, scenarioId) {
    return {
        type: "REMOVE_STEP",
        payload: {
            removeStepId: removeStepId,
            scenarioId: scenarioId
        }
    };
}

export function scenarioDown(scenarioId) {
    return {
        type: "SCENARIO_DOWN",
        payload: scenarioId
    };
}

export function scenarioUp(scenarioId) {
    return {
        type: "SCENARIO_UP",
        payload: scenarioId
    };
}

export function stepDown(scenarioId, stepId) {
    return {
        type: "STEP_DOWN",
        payload: {
            scenarioId: scenarioId,
            stepId: stepId
        }
    };
}

export function stepUp(scenarioId, stepId) {
    return {
        type: "STEP_UP",
        payload: {
            scenarioId: scenarioId,
            stepId: stepId
        }
    };
}

export function save(scenarioIndex, stepIndex, placeholder, eventVal) {
    return {
        type: "SAVE",
        payload: {
            scenarioIndex: scenarioIndex,
            stepIndex: stepIndex,
            key: placeholder,
            inputVal: eventVal
        }
    };
}

export function disableInput(scenarioId, stepId) {
    return {
        type: "DISABLE_INPUT",
        payload: {
            scenarioId: scenarioId,
            stepId: stepId
        }
    };
}

export function enableInput(scenarioId, stepId) {
    return {
        type: "ENABLE_INPUT",
        payload: {
            scenarioId: scenarioId,
            stepId: stepId
        }
    };
}

export function removeFeature() {
    return {
        type: "REMOVE_FEATURE",
        payload: {}
    };
}

export function initializeForm(cachedEntry) {
    return {
        type: "INITIALIZE_FORM",
        payload: cachedEntry
    }
}