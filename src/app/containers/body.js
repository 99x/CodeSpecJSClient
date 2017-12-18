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
                                <option value="enter"> I enter &lt;Input Value&gt; to the &lt;Element Key&gt; </option>
                                <option value="click"> Click on &lt;Element Key&gt; </option>
                                <option value="click"> The content of &lt;Element Key&gt; has text &lt;Expected Text&gt; </option>
                                <option value="click"> Element &lt;Element Key&gt; contains text &lt;Expected Text&gt; </option>
                                <option value="click"> Wait for &lt;Element Key&gt; to appear </option>
                                <option value="click"> Wait for &lt;Element Key&gt; to contain text &lt;Expected Text&gt; </option>
                                <option value="click"> Wait for &lt;Seconds&gt; seconds </option>
                                <option value="click"> Switch to main frame </option>
                                <option value="click"> Switch to iframe &lt;Element key&gt; </option>
                                <option value="click"> Switch to popup window &lt;Window or Tab Index&gt; </option>
                                <option value="click"> Select value &lt;Value&gt; from &lt;Element Key&gt; </option>
                                <option value="click"> Accept the confirmation alert </option>
                                <option value="click"> The alert message says &lt;Expected Text&gt; </option>
                                <option value="click"> I Dismiss the confirm dialog </option>
                                <option value="click"> I Accept the confirm dialog </option>
                                <option value="click"> I enter &lt;Input Text&gt; into prompt </option>
                                <option value="click"> I drag &lt;Dragable Element Key&gt; and drop on to &lt;Droppable Element Key&gt; </option>
                                <option value="click"> I read the content of element &lt;Element Key&gt; and store in variable &lt;Variable Key&gt; as a &lt;Variable Type&gt; </option>
                                <option value="click"> I store the value &lt;Value&gt; in variable &lt;Variable Key&gt; as a &lt;Variable Type&gt; </option>
                                <option value="click"> The value in variable &lt;Variable key&gt; of type &lt;Variable Type&gt; equals to &lt;Value&gt; </option>
                                <option value="click"> I Add variable &lt;Variable1 key&gt; to &lt;Variable2 key&gt; and store in &lt;Variable3 key&gt; </option>
                                <option value="click"> I Subtract variable &lt;Variable1 key&gt; from &lt;Variable2 key&gt; and store in &lt;Variable3 key&gt; </option>
                                <option value="click"> I Multiply variable &lt;Variable1 key&gt; from &lt;Variable2 key&gt; and store in &lt;Variable3 key&gt; </option>
                                <option value="click"> I Divide variable &lt;Variable1 key&gt; from &lt;Variable2 key&gt; and store in &lt;Variable3 key&gt; </option>
                                <option value="click"> I populate &lt;Element Key&gt; with the value of variable &lt;Variable Key&gt; of type &lt;Variable Type&gt; </option>
                                <option value="click"> I Upload &lt;File Path&gt; to &lt;Element Key&gt; </option>
                                <option value="click"> Click on &lt;Element Key&gt; when active </option>
                            </FormControl>

                            <div className="divider" />

                            <Button type="submit" bsStyle="success" id="submitButton" onClick={this.props.addStep.bind(this)}>Build Grammer </Button>
                        </div>
                    </div>

                    <br />
                    <DisplayCode />

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