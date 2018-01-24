import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import { createTest } from '../actions/navigationActions';
import { initializeForm } from '../actions/createTestActions';
import '../../assets/css/App.css';

class ShowTest extends Component {
    componentDidMount() {

    }

    editThisTest = (test) => {
        this.props.initializeForm(test);
        this.props.createTest();
    }

    deleteThisTest = (feature, e) => {
        let username = this.getUsername();
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
        let username = this.getUsername();
        let cachedEntry = JSON.parse(localStorage.getItem(username))
        let test = "";

        if (username in localStorage) {
            if ('test' in cachedEntry) { //there are existing tests
                test = cachedEntry.test.map((test, index) => {
                    return (
                        <React.Fragment>
                            <li className='highlight-line test__align--left displayTest__padding' key={test.feature} >
                                <span className="allIcons mdi mdi-delete-forever test__align--right" onClick={this.deleteThisTest.bind(this, test.feature)} />
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
                            </li>
                            <br />
                        </React.Fragment>
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

    getUsername() {
        let url = window.location.search;
        let urlParam = url.substring(url.indexOf('?') + 1);
        let matches = urlParam.match(/=(.+)/);
        let username;
        if (matches) {
            username = matches[1];
        } else {
            username = 'guestuser' //not logged in
        }
        return username;
    }

    render() {
        return (
            <div className="col-sm-10 col-sm-offset-2 Mainbutton">
                <Panel>
                    <div id="myPanel">
                        <ul>
                            {this.existingTests(this)}
                        </ul>
                        {/* <p>You do not have any Test Suites currently</p> */}
                    </div>
                </Panel>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        navigation: state.navigation
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