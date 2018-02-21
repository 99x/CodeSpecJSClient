import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Panel } from 'react-bootstrap';
import { createTest } from '../actions/navigationActions';
import { initializeForm } from '../actions/createTestActions';
import '../../assets/css/App.css';

class ShowTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            runningStates: []
        }
        this.startRunningTest = this.startRunningTest.bind(this);
    }

    startRunningTest = (index) => {
        let newObj = {
            isRunning: true,
            testCompleted: false
        }
        this.updateState(newObj, index);

        setTimeout(() => {
            let newObj = {
                isRunning: false,
                testCompleted: true
            }
            this.updateState(newObj, index)
        }, 2000);

    }

    updateState = (newObj, index) => {
        let stateArr = [...this.state.runningStates.slice(0, index),
            newObj,
        ...this.state.runningStates.slice(index + 1)]

        this.setState({
            runningStates: stateArr
        })
    }

    editThisTest = (test) => {
        this.props.initializeForm(test);
        this.props.createTest(); //navigate to create test page
    }

    deleteThisTest = (feature, e) => {
        let username = this.props.login.username
        let cachedEntry = JSON.parse(localStorage.getItem(username))

        let testIndex = cachedEntry.test.findIndex(test => test.feature === feature);
        cachedEntry.test.splice(testIndex, 1); //remove existing

        let newObject = {
            repo: cachedEntry.repo,
            test: cachedEntry.test
        }

        localStorage.setItem(username, JSON.stringify(newObject));
        this.forceUpdate(); //to rerender component
    }

    existingTests = () => {
        let username = this.props.login.username
        let cachedEntry = JSON.parse(localStorage.getItem(username))
        let test = "";

        if (username in localStorage) {
            if ('test' in cachedEntry) { //there are existing tests
                test = cachedEntry.test.map((test, index) => {
                    this.state.runningStates.push({ isRunning: false, testCompleted: false })
                    return (
                        <li className='highlight-line test__align--left displayTest__padding' key={test.feature} >
                            <span className="allIcons mdi mdi-delete-forever test__align--right" onClick={this.deleteThisTest.bind(this, test.feature)} />
                            <Button bsSize="xsmall" className="test__align--right" bsStyle="success" onClick={this.startRunningTest.bind(this, index)}>Run</Button>
                            {
                                this.state.runningStates[index].isRunning ?
                                    <div>
                                        <span className="allIcons mdi mdi-checkbox-blank-circle test__align--right blink" />
                                        <span className="allIcons mdi mdi-checkbox-blank-circle test__align--right blink" />
                                        <div className="divider" />
                                    </div>
                                    :
                                    this.state.runningStates[index].testCompleted ?
                                        <div className="test__align--right">
                                            <a target="_blank" href="#">3 Passed, 2 Failed</a>
                                            <div className="divider" />
                                        </div>
                                        :
                                        <div></div>
                            }
                            <div onClick={this.editThisTest.bind(this, test)}>
                                <span className="blueTag"> Test Suite: </span>{test.feature}
                                <ul>
                                    {
                                        test.scenarios.map((scenario) => {
                                            return (
                                                <li key={scenario.scenarioId}>
                                                    &emsp;&emsp;<span className="orangeTag">Test Case: </span>{scenario.description}
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                            <br />
                        </li>

                    );
                })
            } else {
                test = (
                    <React.Fragment>
                        <h4>You do not have any Test Suites currently</h4>
                        <br />
                        <p>Start creating your tests!</p>
                    </React.Fragment>
                )
            }
        } else {
            test = (
                <React.Fragment>
                    <h4>You do not have any Test Suites currently</h4>
                    <br />
                    <p>Create an object repository first and then start creating your tests!</p>
                </React.Fragment>
            )
        }
        return test;
    }

    render() {
        return (

            <div className="col-sm-10 col-sm-offset-2 Mainbutton customized_panel">
                <Panel className="panel-size">
                    <div id="myPanel">
                        <ul>
                            {this.existingTests(this)}
                        </ul>
                    </div>
                </Panel>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        navigation: state.navigation,
        login: state.login
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createTest: () => {
            dispatch(createTest());
        },
        initializeForm: (cachedEntry) => {
            dispatch(initializeForm(cachedEntry))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowTest);