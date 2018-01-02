import React from 'react';
import { Panel, Button, Checkbox, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { If, Then, Else } from 'react-if';
import AlertIcon from 'mdi-react/AlertIcon';

import { removeScenario, removeStep, scenarioDown, scenarioUp, stepUp, stepDown, save, disableInput, enableInput, removeFeature } from '../actions/createActions';

import '../../assets/css/App.css';

class DisplayCode extends React.Component {
    ShowButton = (x) => {
        x.opacity = 0.5;;

    }

    displayInputBox = (event, str, stepId, scenarioId) => {
        let scenarioIndex = this.props.create.scenarios.findIndex(scenario => scenario.scenarioId == scenarioId)
        let stepIndex = this.props.create.scenarios[scenarioIndex].steps.findIndex(step => step.stepId == stepId)

        let strArr = str.split(" ");
        let newArr = [];

        for (var i = 0, tot = strArr.length; i < tot; i++) {
            if (strArr[i].includes("<")) {

                let placeholder = strArr[i].substring(1, (strArr[i].length - 1));

                newArr.push(
                    <input type="text" placeholder={strArr[i]} className='stepInputField'
                        value={this.props.create.scenarios[scenarioIndex].steps[stepIndex][placeholder]}
                        onChange={this.props.save.bind(this, scenarioIndex, stepIndex, placeholder)}
                        disabled={this.props.create.scenarios[scenarioIndex].steps[stepIndex]["disabled"]}
                    />
                );

            } else {
                newArr.push(strArr[i]);
            }
        }

        const newStep = newArr.map((word, i) => {
            return (
                <div key={i} className='printStep'>
                    {word}&nbsp;
                </div>
            );
        })
        return newStep;
    }
    render() {

        const scenarios = this.props.create.scenarios.map((item) => {
            return (
                <li key={item.scenarioId}>
                    <p>
                        <Button className='allButtons' ><span className="allIcons mdi mdi-pencil" /></Button>
                        <Button className='allButtons' onClick={this.props.removeScenario.bind(this, item.scenarioId)}><span className="allIcons mdi mdi-delete" /></Button>
                        <Button className='allButtons' onClick={this.props.scenarioDown.bind(this, item.scenarioId)}><span className="allIcons mdi mdi-arrow-up-drop-circle-outline" /></Button>
                        <Button className='allButtons' onClick={this.props.scenarioUp.bind(this, item.scenarioId)}><span className="allIcons mdi mdi-arrow-down-drop-circle-outline" /></Button>
                        <span className="blueTag"> &nbsp;&emsp;Test Case: </span>{item.description}

                        <ul>
                            {
                                item.steps.map((step) => {
                                    return (
                                        <li key={step.stepId}>

                                            <Button className='allButtons' onClick={this.props.enableInput.bind(this, item.scenarioId, step.stepId)}><span className="allIcons mdi mdi-pencil" /></Button>
                                            <Button className='allButtons' onClick={this.props.removeStep.bind(this, step.stepId, item.scenarioId)}><span className="allIcons mdi mdi-delete" /></Button>
                                            <Button className='allButtons' onClick={this.props.stepDown.bind(this, item.scenarioId, step.stepId)}><span className="allIcons mdi mdi-arrow-up-drop-circle-outline" /></Button>
                                            <Button className='allButtons' onClick={this.props.stepUp.bind(this, item.scenarioId, step.stepId)}><span className="allIcons mdi mdi-arrow-down-drop-circle-outline" /></Button>
                                            <Button className='allButtons' onClick={this.props.disableInput.bind(this, item.scenarioId, step.stepId)}><span className="allIcons mdi mdi-content-save" /></Button>
                                            <span className="blueTag"> &nbsp;&emsp;&emsp;{step.stepOne} </span>{
                                                this.displayInputBox(this, step.stepTwo, step.stepId, item.scenarioId)
                                            }

                                        </li>);
                                })
                            }
                        </ul>
                    </p>
                    <br />
                </li>
            );
        });

        return (
            <div>
                <div className="col-sm-12 col-sm-offset-1">
                    <Panel header=".feature">
                        <If condition={this.props.create.feature != ''}>
                            <div className="featureCode" >

                                <Button className='allButtons'><span className="allIcons mdi mdi-pencil" /></Button>
                                <Button className='allButtons' onClick={this.props.removeFeature.bind(this)}><span className="allIcons mdi mdi-delete" /></Button>
                                <span className="orangeTag show-code"> &nbsp; Test Suite: </span> {this.props.create.feature}

                                <ul>
                                    {scenarios}
                                </ul>
                            </div>
                        </If>
                    </Panel>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        create: state.reducerCreate
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        removeScenario: (removeScenarioId) => {
            dispatch(removeScenario(removeScenarioId));
        },
        removeStep: (removeStepId, scenarioId) => {
            dispatch(removeStep(removeStepId, scenarioId));
        },
        scenarioDown: (scenarioId) => {
            dispatch(scenarioDown(scenarioId));
        },
        scenarioUp: (scenarioId) => {
            dispatch(scenarioUp(scenarioId));
        },
        stepDown: (scenarioId, stepId) => {
            dispatch(stepDown(scenarioId, stepId));
        },
        stepUp: (scenarioId, stepId) => {
            dispatch(stepUp(scenarioId, stepId));
        },
        save: (scenarioIndex, stepIndex, placeholder, event) => {
            dispatch(save(scenarioIndex, stepIndex, placeholder, event.target.value));
        },
        disableInput: (scenarioId, stepId) => {
            dispatch(disableInput(scenarioId, stepId));
        },
        enableInput: (scenarioId, stepId) => {
            dispatch(enableInput(scenarioId, stepId));
        },
        removeFeature: () => {
            dispatch(removeFeature());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCode);
