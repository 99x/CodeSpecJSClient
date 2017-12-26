import React, { Component } from 'react';
import { Button, FormControl, Panel, Form } from 'react-bootstrap';

import { connect } from 'react-redux';
import Select from 'react-select';

import DisplayCode from './displayCode'
import { addFeature, addScenario, addStep } from '../actions/createActions';
import '../../assets/css/App.css';

class Body extends Component {
    render() {
        var content = "";
        if (this.props.showView) {
            content = (
                <div>
                    <center><Button bsStyle="primary" className="MainButton">Create New Test Suite</Button></center>
                    <div className="col-sm-10 col-sm-offset-2 Mainbutton">
                        <Panel>
                            <div id="myPanel">
                                <p>You do not have any Test Suites currently</p>
                            </div>
                        </Panel>
                    </div>
                </div>
            );
        } else if (this.props.showCreate) {
            // console.log(this.props);
            content = (
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
                        <div>

                        </div>
                        <div className="container">
                            <FormControl id="input-field" componentClass="select">
                                <option value="given">Given</option>
                                <option value="when">When</option>
                                <option value="then">Then</option>
                                <option value="and">And</option>
                                <option value="but">But</option>
                            </FormControl>

                            <div className="divider" />

                            <FormControl componentClass="select" id="dropdown">
                                <option value="navigate">Navigate to &lt;URL&gt; </option>
                                <option value="enter"> I enter &lt;InputValue&gt; to the &lt;ElementKey&gt; </option>
                                <option value="click"> Click on &lt;ElementKey&gt; </option>
                                <option value="contentOf"> The content of &lt;ElementKey&gt; has text &lt;ExpectedText&gt; </option>
                                <option value="click"> Element &lt;ElementKey&gt; contains text &lt;ExpectedText&gt; </option>
                                <option value="click"> Wait for &lt;ElementKey&gt; to appear </option>
                                <option value="click"> Wait for &lt;ElementKey&gt; to contain text &lt;ExpectedText&gt; </option>
                                <option value="click"> Wait for &lt;Seconds&gt; seconds </option>
                                <option value="click"> Switch to main frame </option>
                                <option value="click"> Switch to iframe &lt;ElementKey&gt; </option>
                                <option value="click"> Switch to popup window &lt;Window/TabIndex&gt; </option>
                                <option value="click"> Select value &lt;Value&gt; from &lt;ElementKey&gt; </option>
                                <option value="click"> Accept the confirmation alert </option>
                                <option value="click"> The alert message says &lt;ExpectedText&gt; </option>
                                <option value="click"> I Dismiss the confirm dialog </option>
                                <option value="click"> I Accept the confirm dialog </option>
                                <option value="click"> I enter &lt;InputText&gt; into prompt </option>
                                <option value="click"> I drag &lt;DragableElementKey&gt; and drop on to &lt;DroppableElementKey&gt; </option>
                                <option value="click"> I read the content of element &lt;ElementKey&gt; and store in variable &lt;VariableKey&gt; as a &lt;VariableType&gt; </option>
                                <option value="click"> I store the value &lt;Value&gt; in variable &lt;VariableKey&gt; as a &lt;VariableType&gt; </option>
                                <option value="click"> The value in variable &lt;Variablekey&gt; of type &lt;VariableType&gt; equals to &lt;Value&gt; </option>
                                <option value="click"> I Add variable &lt;Variablekey&gt; to &lt;Variablekey&gt; and store in &lt;Variablekey&gt; </option>
                                <option value="click"> I Subtract variable &lt;Variablekey1&gt; from &lt;Variablekey2&gt; and store in &lt;Variablekey3&gt; </option>
                                <option value="click"> I Multiply variable &lt;Variablekey1&gt; from &lt;Variablekey2&gt; and store in &lt;Variablekey3&gt; </option>
                                <option value="click"> I Divide variable &lt;Variablekey1&gt; from &lt;Variablekey2&gt; and store in &lt;Variablekey3&gt; </option>
                                <option value="click"> I populate &lt;ElementKey&gt; with the value of variable &lt;VariableKey&gt; of type &lt;VariableType&gt; </option>
                                <option value="click"> I Upload &lt;FilePath&gt; to &lt;ElementKey&gt; </option>
                                <option value="click"> Click on &lt;ElementKey&gt; when active </option>
                            </FormControl>

                            <div className="divider" />

                            <Button type="submit" bsStyle="success" id="submitButton" onClick={this.props.addStep.bind(this)}>Build Grammer </Button>
                        </div>
                    </div>

                    <br />
                    <div className="col-sm-10  col-sm-offset-1">
                        <DisplayCode />
                    </div>


                </div>
            );
        }
        return content;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        create: state.reducerCreate
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
            let detail = document.getElementById('dropdown').options[document.getElementById('dropdown').selectedIndex].text;
            // console.log(activeId);
            dispatch(addStep(type, detail));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Body);