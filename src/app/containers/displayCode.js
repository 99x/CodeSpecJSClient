import React from 'react';
import { Panel, DropdownButton, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { If } from 'react-if';

import { removeScenario, removeStep, scenarioDown, scenarioUp, stepUp, stepDown, save, disableInput, enableInput, removeFeature } from '../actions/createTestActions';
import '../../assets/css/App.css';

class DisplayCode extends React.Component {
    enableTextField = (e) => {
        console.log("COMING HERE");
        document.getElementById(e.target.id).removeAttribute("readonly");
    }

    disableTextField = (e) => {
        console.log("DISBLE");
        document.getElementById(e.target.id).setAttribute("readonly", true);
    }

    displayInputBox = (event, str, stepId, scenarioId) => {
        let scenarioIndex = this.props.create.scenarios.findIndex(scenario => scenario.scenarioId === scenarioId)
        let stepIndex = this.props.create.scenarios[scenarioIndex].steps.findIndex(step => step.stepId === stepId)

        let strArr = str.split(" ");
        let newArr = [];

        for (var i = 0, tot = strArr.length; i < tot; i++) {

            if (strArr[i].includes("<")) {

                console.log(typeof stepId)
                console.log(typeof i)
                console.log(typeof i.toString())

                let placeholder = strArr[i].substring(1, (strArr[i].length - 1));
                let elementID = stepId + i.toString();

                newArr.push(
                    <input type="text" placeholder={strArr[i]} className='stepInputField' id={elementID}
                        value={this.props.create.scenarios[scenarioIndex].steps[stepIndex][placeholder]}
                        onChange={this.props.save.bind(this, scenarioIndex, stepIndex, placeholder)}

                    />
                );

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

    // onFocus = { this.props.enableInput.bind(this, scenarioIndex, stepIndex) }
    // onBlur = { this.props.disableInput.bind(this, scenarioIndex, stepIndex) }
    // readOnly={this.props.create.scenarios[scenarioIndex].steps[stepIndex]["disabled"]}

    // mouseEnter = (divId, text, e) => {
    //     let myElement = document.getElementById(text + '_li');
    //     if (myElement) {
    //         myElement.buttonId = divId;
    //         myElement.addEventListener('mouseleave', this.mouseOut, false)
    //         document.getElementById(divId).style.visibility = "visible";
    //     }
    // }

    // mouseOut = (e) => {
    //     document.getElementById(e.target.buttonId).style.visibility = "hidden";
    // }

    // showButtonOnClick = (divId, text, e) => {
    //     let myElement = document.getElementById(text);
    //     myElement.buttonId = divId;
    //     myElement.removeEventListener('mouseleave', this.mouseOut, false)
    // }

    render() {

        const scenarios = this.props.create.scenarios.map((item) => {
            return (
                <li key={item.scenarioId}>
                    <div className="padding highlight-line">
                        <span className="blueTag">&emsp; Test Case: </span>{item.description}

                        <div className="align-right">
                            <DropdownButton bsStyle="default" className="more-options" title={<span className="allIcons mdi mdi-dots-vertical" />}
                                noCaret id="dropdown-no-caret">
                                <MenuItem eventKey="1"><span className="allIcons mdi mdi-pencil" /></MenuItem>
                                <MenuItem eventKey="2" onClick={this.props.removeScenario.bind(this, item.scenarioId)}><span className="allIcons mdi mdi-delete" /></MenuItem>
                                <MenuItem eventKey="3" onClick={this.props.scenarioUp.bind(this, item.scenarioId)}><span className="allIcons mdi mdi-arrow-up-drop-circle-outline" /></MenuItem>
                                <MenuItem eventKey="4" onClick={this.props.scenarioDown.bind(this, item.scenarioId)}><span className="allIcons mdi mdi-arrow-down-drop-circle-outline" /></MenuItem>
                            </DropdownButton>
                        </div>
                    </div>

                    {/*
                    <div className="align-inline" id={item.scenarioId + "b"}>
                        <Button className='allButtons' ><span className="allIcons mdi mdi-pencil" /></Button>
                        <Button className='allButtons' onClick={this.props.removeScenario.bind(this, item.scenarioId)}><span className="allIcons mdi mdi-delete" /></Button>
                        <Button className='allButtons' onClick={this.props.scenarioDown.bind(this, item.scenarioId)}><span className="allIcons mdi mdi-arrow-up-drop-circle-outline" /></Button>
                        <Button className='allButtons' onClick={this.props.scenarioUp.bind(this, item.scenarioId)}><span className="allIcons mdi mdi-arrow-down-drop-circle-outline" /></Button>
                    </div>

                    <div className="align-inline" id={item.scenarioId}
                        onClick={this.showButtonOnClick.bind(this, item.scenarioId + "b", item.scenarioId)}
                        onMouseEnter={this.mouseEnter.bind(this, item.scenarioId + "b", item.scenarioId)} >
                        <span className="blueTag"> Test Case: </span>{item.description}
                    </div>
                    */}

                    <ul>
                        {
                            item.steps.map((step) => {
                                return (
                                    <li className="highlight-line" key={step.stepId} >
                                        <span className="blueTag"> &emsp;&emsp; {step.stepOne} </span>
                                        {this.displayInputBox(this, step.stepTwo, step.stepId, item.scenarioId)}
                                        <div className="align-right">
                                            <div className="align-right">
                                                <DropdownButton bsStyle="default" className="more-options" title={<span className="allIcons mdi mdi-dots-vertical" />}
                                                    noCaret id="dropdown-no-caret">
                                                    <MenuItem eventKey="2" onClick={this.props.removeStep.bind(this, step.stepId, item.scenarioId)}><span className="allIcons mdi mdi-delete" /></MenuItem>
                                                    <MenuItem eventKey="3" onClick={this.props.stepUp.bind(this, item.scenarioId, step.stepId)}><span className="allIcons mdi mdi-arrow-up-drop-circle-outline" /></MenuItem>
                                                    <MenuItem eventKey="4" onClick={this.props.stepDown.bind(this, item.scenarioId, step.stepId)}><span className="allIcons mdi mdi-arrow-down-drop-circle-outline" /></MenuItem>
                                                </DropdownButton>
                                            </div>
                                        </div>
                                    </li>);
                                {/*    
                                
                                        <div className="align-right">
                                            <DropdownButton bsStyle="warning" className="more-options" title={<span className="allIcons mdi mdi-dots-vertical" />}
                                                noCaret id="dropdown-no-caret">
                                                <MenuItem eventKey="1" ><span className="allIcons mdi mdi-pencil" /></MenuItem>
                                                <MenuItem eventKey="2" onClick={this.props.removeStep.bind(this, step.stepId, item.scenarioId)}><span className="allIcons mdi mdi-delete" /></MenuItem>
                                                <MenuItem eventKey="3" onClick={this.props.stepUp.bind(this, item.scenarioId, step.stepId)}><span className="allIcons mdi mdi-arrow-up-drop-circle-outline" /></MenuItem>
                                                <MenuItem eventKey="4" onClick={this.props.stepDown.bind(this, item.scenarioId, step.stepId)}><span className="allIcons mdi mdi-arrow-down-drop-circle-outline" /></MenuItem>
                                                <MenuItem eventKey="5" ><span className="allIcons mdi mdi-content-save" /></MenuItem>
                                            </DropdownButton>
                                        </div>
                                
                                
                                        <div className="align-inline" id={step.stepId + "b"}>
                                            <Button className='allButtons' onClick={this.props.enableInput.bind(this, item.scenarioId, step.stepId)}><span className="allIcons mdi mdi-pencil" /></Button>
                                            <Button className='allButtons' onClick={this.props.removeStep.bind(this, step.stepId, item.scenarioId)}><span className="allIcons mdi mdi-delete" /></Button>
                                            <Button className='allButtons' onClick={this.props.stepDown.bind(this, item.scenarioId, step.stepId)}><span className="allIcons mdi mdi-arrow-down-drop-circle-outline" /></Button>
                                            <Button className='allButtons' onClick={this.props.stepUp.bind(this, item.scenarioId, step.stepId)}><span className="allIcons mdi mdi-arrow-up-drop-circle-outline" /></Button>
                                            <Button className='allButtons' onClick={this.props.disableInput.bind(this, item.scenarioId, step.stepId)}><span className="allIcons mdi mdi-content-save" /></Button>
                                        </div>

                                        <div className="align-inline" id={step.stepId} onClick={this.showButtonOnClick.bind(this, step.stepId + "b", step.stepId)} >
                                            <span className="blueTag"> {step.stepOne} </span>
                                            {this.displayInputBox(this, step.stepTwo, step.stepId, item.scenarioId)}
                                        </div>
                                         */}

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
                            <span className="orangeTag "> Test Suite: </span> {this.props.create.feature}

                            <div className="align-right">
                                <DropdownButton bsStyle="default" className="more-options" title={<span className="allIcons mdi mdi-dots-vertical" />}
                                    noCaret id="dropdown-no-caret">
                                    <MenuItem eventKey="1"><span className="allIcons mdi mdi-pencil" /></MenuItem>
                                    <MenuItem eventKey="2" onClick={this.props.removeFeature.bind(this)}><span className="allIcons mdi mdi-delete" /></MenuItem>
                                </DropdownButton>
                            </div>
                        </div>

                        {/* 
                        <div className="align-inline" id="feature">
                            <Button className="allButtons" ><span className="allIcons mdi mdi-pencil" /></Button>
                            <Button className="allButtons" onClick={this.props.removeFeature.bind(this)}><span className="allIcons mdi mdi-delete" /></Button>
                        </div>

                        <div className="align-inline" id="feature-description"
                            onClick={this.showButtonOnClick.bind(this, "feature", "feature-description")}
                            onMouseEnter={this.mouseEnter.bind(this, "feature", "feature-description")} >
                            
                        </div>
                    */}
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
            dispatch(save(scenarioIndex, stepIndex, placeholder, event.target.value));
        },
        removeFeature: () => {
            dispatch(removeFeature());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCode);
