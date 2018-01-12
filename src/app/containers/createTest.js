import React, { Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';

import { connect } from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { addFeature, addScenario, addStep, addOption } from '../actions/createTestActions';

class CreateTest extends Component {
    render() {
        return (
            <div>
                <br />
                <div className="form">

                    <div className="container">
                        <FormControl componentClass="input" className="form-control" placeholder="Enter Test Suite Description" inputRef={(ref) => { this.input = ref }} />
                        <div className="divider" />
                        <Button bsStyle="primary" onClick={() => this.props.addFeature(this.input.value)}>Add Test Suite</Button>
                    </div>

                    <br />

                    <div className="container">
                        <FormControl componentClass="input" className="form-control" placeholder="Enter Test Case Description" inputRef={(ref2) => { this.input2 = ref2 }} />
                        <div className="divider" />
                        <Button bsStyle="primary" onClick={() => this.props.addScenario(this.input2.value)}>Add Test Case</Button>
                    </div>

                    <br />

                    <div className="container">
                        <FormControl id="input-field" componentClass="select">
                            <option value="given">Given</option>
                            <option value="when">When</option>
                            <option value="then">Then</option>
                            <option value="and">And</option>
                            <option value="but">But</option>
                        </FormControl>

                        <div className="divider" />

                        <div id="drop-down-set-width">
                            <Select id="dropdown" value={this.props.create.selectedOption.value} onChange={this.props.addOption}
                                options={[
                                    { value: 'navigate', label: 'Navigate to <URL>' },
                                    { value: 'enter', label: 'I enter <InputValue> to the <ElementKey>' },
                                    { value: 'click', label: 'Click on <ElementKey>' },
                                    { value: 'contentHasText', label: 'The content of <ElementKey> has text <ExpectedText>' },
                                    { value: 'elementContainsText', label: 'Element <ElementKey> contains text <ExpectedText>' },
                                    { value: 'waitToAppear', label: 'Wait for <ElementKey> to appear' },
                                    { value: 'waitToContainText', label: 'Wait for <ElementKey> to contain text <ExpectedText>' },
                                    { value: 'waitForSeconds', label: 'Wait for <Seconds> seconds' },
                                    { value: 'switchFrame', label: 'Switch to main frame' },
                                    { value: 'switchIFrame', label: 'Switch to iframe <ElementKey>' },
                                    { value: 'switchPopup', label: 'Switch to popup window <Window/TabIndex>' },
                                    { value: 'selectValue', label: 'Select value <Value> from <ElementKey>' },
                                    { value: 'acceptAlert', label: 'Accept the confirmation alert' },
                                    { value: 'alertSays', label: 'The alert message says <ExpectedText>' },
                                    { value: 'dismissDialog', label: 'I Dismiss the confirm dialog' },
                                    { value: 'acceptDialog', label: 'I Accept the confirm dialog' },
                                    { value: 'enterIntoPrompt', label: 'I enter <InputText> into prompt' },
                                    { value: 'dragAndDrop', label: 'I drag <DragableElementKey> and drop on to <DroppableElementKey>' },
                                    { value: 'iRead', label: 'I read the content of element <ElementKey> and store in variable <VariableKey> as a <VariableType>' },
                                    { value: 'iStore', label: 'I store the value <Value> in variable <VariableKey> as a <VariableType>' },
                                    { value: 'equals', label: 'The value in variable <Variablekey> of type <VariableType> equals to <Value>' },
                                    { value: 'add', label: 'I Add variable <Variablekey> to <Variablekey> and store in <Variablekey>' },
                                    { value: 'substract', label: 'I Subtract variable <Variablekey1> from <Variablekey2> and store in <Variablekey3>' },
                                    { value: 'multiply', label: 'I Multiply variable <Variablekey1> from <Variablekey2> and store in <Variablekey3>' },
                                    { value: 'divide', label: 'I Divide variable <Variablekey1> from <Variablekey2> and store in <Variablekey3>' },
                                    { value: 'populate', label: 'I populate <ElementKey> with the value of variable <VariableKey> of type <VariableType>' },
                                    { value: 'upload', label: 'I Upload <FilePath> to <ElementKey>' },
                                    { value: 'clickWhenActive', label: 'Click on <ElementKey> when active' },
                                    { value: 'switchMainFrame', label: 'Switch to main frame' },
                                ]}
                            />
                        </div>
                        <div className="divider" />

                        <Button type="submit" bsStyle="success" id="submitButton" onClick={this.props.addStep.bind(this)}>Build Grammer </Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        create: state.createTestReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addFeature: (featureDescription) => {
            dispatch(addFeature(featureDescription));
        },
        addScenario: (scenarioDescription) => {
            dispatch(addScenario(scenarioDescription));
        },
        addStep: (steps) => {
            let type = document.getElementById('input-field').options[document.getElementById('input-field').selectedIndex].text;
            dispatch(addStep(type));
        },
        addOption: (option) => {
            dispatch(addOption(option))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTest);