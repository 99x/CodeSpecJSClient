import React from 'react';
import { Well, Panel, DropdownButton, MenuItem, Button, FormControl } from 'react-bootstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { DropdownList } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css'

import { toggleDelete, handleDelete, addOption, editScenario, addFeature, addStep, removeScenario, removeStep, scenarioDown, scenarioUp, stepUp, stepDown, save, removeFeature } from '../actions/createTestActions';
import '../../assets/css/App.css';

class EditTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            grammerOption: 'Given'
        }
    }

    dropdownToggle(id, newValue) {
        if (this._forceOpen) {
            this.props.toggleDelete(true, id)
            this._forceOpen = false;
        } else if (id !== undefined) {
            this.props.toggleDelete(newValue, id)
        }
    }
    menuItemClickedThatShouldntCloseDropdown() {
        this._forceOpen = true;
    }

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
                                dropUp
                                data={this.props.create.repoObjects}
                                textField='key'
                                placeholder={placeholder}
                                className='dropdown_customized'
                                onChange={this.props.save.bind(this, scenarioIndex, stepIndex, placeholder)}
                                groupBy='name'
                                filter='contains'
                                defaultValue={this.props.create.scenarios[scenarioIndex].steps[stepIndex][placeholder]}
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

    getMenuOpen = (id) => {
        try {
            let index = this.props.create.deleteConfirmation.findIndex(item => item.id === id)
            return (this.props.create.deleteConfirmation[index].open)
        } catch (error) {
            console.log("ERROR: Cannot find object: " + id + "  in deleteConfirmation array")
        }

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


                        <div className="Object__float--right" >
                            <DropdownButton open={this.getMenuOpen(item.scenarioId)} onToggle={this.dropdownToggle.bind(this, item.scenarioId)} bsStyle="default" className="more-options" title={<span className="allIcons mdi mdi-dots-vertical" />}
                                noCaret id="dropdown-no-caret">
                                <MenuItem eventKey="1" onClick={this.editDescription.bind(this, item.scenarioId)}><button className="allIcons mdi mdi-pencil"></button></MenuItem>
                                <MenuItem eventKey="2" onClick={this.props.scenarioUp.bind(this, item.scenarioId)}><button className="allIcons mdi mdi-arrow-up-drop-circle-outline" /></MenuItem>
                                <MenuItem eventKey="3" onClick={this.props.scenarioDown.bind(this, item.scenarioId)}><button className="allIcons mdi mdi-arrow-down-drop-circle-outline" /></MenuItem>
                                <MenuItem eventKey="4" onClick={() => this.menuItemClickedThatShouldntCloseDropdown()}>{this.getDeleteContent('scenario', item.scenarioId)}</MenuItem>
                            </DropdownButton>
                        </div>
                    </div>

                    <ul>
                        {
                            item.steps.map((step) => {
                                return (
                                    <li className=" padding highlight-line " key={step.stepId} >
                                        <div className="Object__float--left flex-container">
                                            <span className="blueTag"> &emsp;&emsp; {step.stepOne} </span>
                                            <div className="divider" />
                                            {this.displayInputBox(this, step.stepTwo, step.stepId, item.scenarioId)}
                                        </div>
                                        <div className="Object__float--right" >
                                            <DropdownButton bsStyle="default" open={this.getMenuOpen(step.stepId)} onToggle={this.dropdownToggle.bind(this, step.stepId)} className="more-options" title={<span className="allIcons mdi mdi-dots-vertical" />}
                                                noCaret id="dropdown-no-caret">
                                                <MenuItem eventKey="1" onClick={this.props.stepUp.bind(this, item.scenarioId, step.stepId)}><button className="allIcons mdi mdi-arrow-up-drop-circle-outline" /></MenuItem>
                                                <MenuItem eventKey="2" onClick={this.props.stepDown.bind(this, item.scenarioId, step.stepId)}><button className="allIcons mdi mdi-arrow-down-drop-circle-outline" /></MenuItem>
                                                <MenuItem eventKey="3" onClick={() => this.menuItemClickedThatShouldntCloseDropdown()}>{this.getDeleteContent('step', step.stepId, item.scenarioId)}</MenuItem>
                                            </DropdownButton>
                                        </div>
                                        <div className="clear" />
                                    </li>);
                            })
                        }
                    </ul>


                    <div className="flex-container options_padding">
                        <div className='option_width'>
                            <DropdownList
                                dropUp
                                data={['Given', 'When', 'Then', 'And', 'But']}
                                value={this.state.grammerOption}
                                onChange={value => this.setState({ grammerOption: value })}
                            />
                        </div>
                        <div className="divider" />
                        <div className='optionTwo_width'>

                            <DropdownList
                                dropUp
                                onChange={this.props.addStep.bind(this, this.state.grammerOption, item.scenarioId)}
                                filter='contains'
                                placeholder='Select Grammer'
                                data={[
                                    'Navigate to <URL>',
                                    'I enter <InputValue> to the <ElementKey>',
                                    'Click on <ElementKey>',
                                    'The content of <ElementKey> has text <ExpectedText>',
                                    'Element <ElementKey> contains text <ExpectedText>',
                                    'Wait for <ElementKey> to appear',
                                    'Wait for <ElementKey> to contain text <ExpectedText>',
                                    'Wait for <Seconds> seconds',
                                    'Switch to main frame',
                                    'Switch to iframe <ElementKey>',
                                    'Switch to popup window <Window/TabIndex>',
                                    'Select value <Value> from <ElementKey>',
                                    'Accept the confirmation alert',
                                    'The alert message says <ExpectedText>',
                                    'I Dismiss the confirm dialog',
                                    'I Accept the confirm dialog',
                                    'I enter <InputText> into prompt',
                                    'I drag <ElementKey> and drop on to <ElementKey>',
                                    'I read the content of element <ElementKey> and store in variable <VariableKey> as a <VariableType>',
                                    'I store the value <Value> in variable <VariableKey> as a <VariableType>',
                                    'The value in variable <Variablekey> of type <VariableType> equals to <Value>',
                                    'I Add variable <Variablekey> to <Variablekey> and store in <Variablekey>',
                                    'I Subtract variable <Variablekey1> from <Variablekey2> and store in <Variablekey3>',
                                    'I Multiply variable <Variablekey1> from <Variablekey2> and store in <Variablekey3>',
                                    'I Divide variable <Variablekey1> from <Variablekey2> and store in <Variablekey3>',
                                    'I populate <ElementKey> with the value of variable <VariableKey> of type <VariableType>',
                                    'I Upload <FilePath> to <ElementKey>',
                                    'Click on <ElementKey> when active',
                                    'Switch to main frame'
                                ]}
                            />
                        </div>

                    </div>



                    <br />
                </li>
            );
        });

        return (
            <div className="col-sm-10 col-sm-offset-1  ">
                <Well header=".feature">
                    {
                        this.props.create.feature === '' ?
                            <div></div>
                            :
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
                                        <DropdownButton open={this.getMenuOpen('feature')} onToggle={this.dropdownToggle.bind(this, 'feature')} bsStyle="default" className="more-options" title={<span className="allIcons mdi mdi-dots-vertical" />}
                                            noCaret id="dropdown-no-caret">
                                            <MenuItem eventKey="1" onClick={this.editDescription.bind(this, "feature")}><button className="allIcons mdi mdi-pencil"></button></MenuItem>
                                            <MenuItem eventKey="2" onClick={() => this.menuItemClickedThatShouldntCloseDropdown()}>{this.getDeleteContent('feature', 'feature')}</MenuItem>
                                        </DropdownButton>
                                    </div>
                                </div>

                                <ul>
                                    {scenarios}
                                </ul>
                            </div>
                    }
                </Well>
            </div>
        );
    }



    getDeleteContent = (type, id, scenId) => {
        let index = this.props.create.deleteConfirmation.findIndex(obj => obj.id === id)
        var content = "";
        if (this.props.create.deleteConfirmation[index].delete) {
            if (type === "feature") {
                content = (
                    <button className="allIcons mdi mdi-delete" onClick={() => this.props.handleDelete('feature')} />
                )
            } else {
                content = (
                    <button className="allIcons mdi mdi-delete" onClick={() => this.props.handleDelete(id)} />
                )
            }

        } else {
            if (type === "feature") {
                content = (
                    <span>
                        Confirm ? <button className="allIcons mdi mdi-check-circle" onClick={() => this.props.removeFeature()} /> <button onClick={() => this.props.handleDelete('feature')} className="allIcons mdi mdi-close-circle"></button>
                    </span>
                )
            } else if (type === "scenario") {
                content = (
                    <span>
                        Confirm ? <button onClick={() => this.props.removeScenario(id)} className="allIcons mdi mdi-check-circle" /> <button onClick={() => this.props.handleDelete(id)} className="allIcons mdi mdi-close-circle"></button>
                    </span>
                )

            } else if (type === "step") {
                content = (
                    <span>
                        Confirm ? <button onClick={() => this.props.removeStep(id, scenId)} className="allIcons mdi mdi-check-circle" /> <button onClick={() => this.props.handleDelete(id)} className="allIcons mdi mdi-close-circle"></button>
                    </span>
                )
            }
        }
        return (content);
    }
}

const mapStateToProps = (state) => {
    return {
        create: state.createTestReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {  //bindActionCreators ?
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
        },
        addStep: (option, scenarioId, steps) => {
            dispatch(addStep(option, steps, scenarioId));
        },
        handleDelete: (id) => {
            dispatch(handleDelete(id))
        },
        toggleDelete: (newVal, id) => {
            dispatch(toggleDelete(id, newVal))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTest);
