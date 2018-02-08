import React from 'react';
import { Panel, DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { If } from 'react-if';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { DropdownList } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css'

import { editScenario, addFeature, removeScenario, removeStep, scenarioDown, scenarioUp, stepUp, stepDown, save, removeFeature } from '../actions/createTestActions';
import '../../assets/css/App.css';

class EditTest extends React.Component {

    confirmDelete = (type, scenarioId, stepId, e) => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to permanently delete this?',
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            onConfirm: () => {
                if (type === "feature") {
                    this.props.removeFeature()
                } else if (type === "scenario") {
                    this.props.removeScenario(scenarioId)
                } else if (type === "step") {
                    this.props.removeStep(stepId, scenarioId)
                }
            },

        })
    };

    editDescription = (div, e) => {
        document.getElementById(div).removeAttribute("readonly");
        document.getElementById(div).classList.add("description__edit--show");
    }

    disableEditDescription = (div, e) => {
        document.getElementById(div).setAttribute("readonly", true);
        document.getElementById(div).classList.remove("description__edit--show");
    }

    enableTextField = (e) => {
        document.getElementById(e.target.id).removeAttribute("readonly");
    }

    disableTextField = (e) => {
        document.getElementById(e.target.id).setAttribute("readonly", true);
    }

    displayInputBox = (event, str, stepId, scenarioId) => {
        let scenarioIndex = this.props.create.scenarios.findIndex(scenario => scenario.scenarioId === scenarioId)
        let stepIndex = this.props.create.scenarios[scenarioIndex].steps.findIndex(step => step.stepId === stepId)

        let strArr = str.split(" ");
        let newArr = [];

        for (var i = 0, tot = strArr.length; i < tot; i++) {

            if (strArr[i].includes("<")) {

                let placeholder = strArr[i].substring(1, (strArr[i].length - 1));
                let elementID = stepId + i.toString();

                // if placeholder === ElementKey then give the dropdown 
                if (placeholder === 'ElementKey') {
                    newArr.push(
                        <div className='dropdown_customized '>
                            <DropdownList
                                data={this.props.create.repos}
                                textField='key'
                                placeholder={placeholder}
                                className='dropdown_customized'
                                onChange={this.props.save.bind(this, scenarioIndex, stepIndex, placeholder)}
                                groupBy='name'
                                filter='contains'
                            />
                        </div>

                    );

                } else {
                    newArr.push(
                        <input readOnly type="text" placeholder={placeholder} className='stepInputField' id={elementID}
                            value={this.props.create.scenarios[scenarioIndex].steps[stepIndex][placeholder]}
                            onChange={this.props.save.bind(this, scenarioIndex, stepIndex, placeholder)}
                            onFocus={this.enableTextField.bind(this)}
                            onBlur={this.disableTextField.bind(this)}
                        />
                    );
                }

            } else {
                newArr.push(strArr[i]);
            }
        }

        const newStep = newArr.map((word, i) => {
            return (
                <React.Fragment key={i}>
                    {word}&nbsp;
                </React.Fragment>
            );
        })
        return newStep;
    }

    render() {
        const scenarios = this.props.create.scenarios.map((item) => {
            return (
                <li key={item.scenarioId}>
                    <div className="padding highlight-line">
                        <span className="blueTag">&emsp; Test Case: </span>
                        <div className="align-inline">
                            <input readOnly type="text" placeholder='placeholder' className='description__edit' id={item.scenarioId}
                                value={item.description}
                                onChange={this.props.editScenario.bind(this, item.scenarioId)}
                                onBlur={this.disableEditDescription.bind(this, item.scenarioId)}
                            />
                        </div>


                        <div className="Object__float--right">
                            <DropdownButton bsStyle="default" className="more-options" title={<span className="allIcons mdi mdi-dots-vertical" />}
                                noCaret id="dropdown-no-caret">
                                <MenuItem eventKey="1" onClick={this.editDescription.bind(this, item.scenarioId)}><span className="allIcons mdi mdi-pencil" /></MenuItem>
                                <MenuItem eventKey="2" onClick={this.confirmDelete.bind(this, "scenario", item.scenarioId)}><span className="allIcons mdi mdi-delete" /></MenuItem>
                                <MenuItem eventKey="3" onClick={this.props.scenarioUp.bind(this, item.scenarioId)}><span className="allIcons mdi mdi-arrow-up-drop-circle-outline" /></MenuItem>
                                <MenuItem eventKey="4" onClick={this.props.scenarioDown.bind(this, item.scenarioId)}><span className="allIcons mdi mdi-arrow-down-drop-circle-outline" /></MenuItem>
                            </DropdownButton>
                        </div>
                    </div>

                    <ul>
                        {
                            item.steps.map((step) => {
                                return (
                                    <li className="highlight-line " key={step.stepId} >
                                        <div className="Object__float--left flex-container">
                                            <span className="blueTag"> &emsp;&emsp; {step.stepOne} </span>
                                            <div className="divider" />
                                            {this.displayInputBox(this, step.stepTwo, step.stepId, item.scenarioId)}
                                        </div>
                                        <div className="Object__float--right">
                                            <DropdownButton bsStyle="default" className="more-options " title={<span className="allIcons mdi mdi-dots-vertical" />}
                                                noCaret id="dropdown-no-caret">
                                                <MenuItem eventKey="2" onClick={this.confirmDelete.bind(this, "step", item.scenarioId, step.stepId)}><span className="allIcons mdi mdi-delete" /></MenuItem>
                                                <MenuItem eventKey="3" onClick={this.props.stepUp.bind(this, item.scenarioId, step.stepId)}><span className="allIcons mdi mdi-arrow-up-drop-circle-outline" /></MenuItem>
                                                <MenuItem eventKey="4" onClick={this.props.stepDown.bind(this, item.scenarioId, step.stepId)}><span className="allIcons mdi mdi-arrow-down-drop-circle-outline" /></MenuItem>
                                            </DropdownButton>
                                        </div>
                                        <div class="clear" />
                                    </li>);
                            })
                        }
                    </ul>

                    <br />
                </li>
            );
        });

        return (
            <Panel className="align-center" header=".feature">
                <If condition={this.props.create.feature !== ''}>
                    <div className="code-font">
                        <div className="highlight-line">
                            <span className="orangeTag "> Test Suite: </span>
                            <div className="align-inline">
                                <input readOnly type="text" placeholder='placeholder' className='description__edit' id='feature'
                                    value={this.props.create.feature}
                                    onChange={this.props.addFeature.bind(this)}
                                    onBlur={this.disableEditDescription.bind(this, "feature")}
                                />
                            </div>

                            <div className="Object__float--right">
                                <DropdownButton bsStyle="default" className="more-options" title={<span className="allIcons mdi mdi-dots-vertical" />}
                                    noCaret id="dropdown-no-caret">
                                    <MenuItem eventKey="1" onClick={this.editDescription.bind(this, "feature")}><span className="allIcons mdi mdi-pencil" /></MenuItem>
                                    <MenuItem eventKey="2" onClick={this.confirmDelete.bind(this, "feature")}><span className="allIcons mdi mdi-delete" /></MenuItem>
                                </DropdownButton>
                            </div>
                        </div>

                        <ul>
                            {scenarios}
                        </ul>
                    </div>
                </If>
            </Panel>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        create: state.createTestReducer
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
            if (placeholder !== 'ElementKey') {
                event = event.target.value
            }
            dispatch(save(scenarioIndex, stepIndex, placeholder, event));
        },
        removeFeature: () => {
            dispatch(removeFeature());
        },
        addFeature: (e) => {
            dispatch(addFeature(e.target.value));
        },
        editScenario: (scenarioId, e) => {
            dispatch(editScenario(scenarioId, e.target.value));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTest);
