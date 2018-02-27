import React, { Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import 'react-select/dist/react-select.css';
import { confirmAlert } from 'react-confirm-alert';
import { Multiselect } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css'

import { addFeature, addScenario, addStep, addOption, addRepo, removeFeature } from '../actions/createTestActions';

class CreateTest extends Component {

    handleSubmit = (event) => {
        try {
            const username = this.props.login.username;
            const stored = JSON.parse(localStorage.getItem(username));

            let newObject = {};
            if ('repo' in stored) {
                newObject = {
                    repo: stored.repo
                }
            }
            let testsArr = []
            if ('test' in stored) { //already test suites exist
                testsArr = stored.test
                let testIndex = stored.test.findIndex(test => test.feature === this.props.create.feature)
                if (testIndex !== (-1)) { //this test suite exits already and now being modified
                    testsArr.splice(testIndex, 1) //remove existing
                }
            }

            testsArr.push(this.props.create)
            newObject['test'] = testsArr
            localStorage.setItem(username, JSON.stringify(newObject))

            confirmAlert({
                title: 'Saved',
                message: 'Successfully saved test!',
                confirmLabel: 'OK',
                cancelLabel: ''
            })
            event.preventDefault();
        } catch (error) {
            console.log('Submit Failed: ' + error.message)
        }
    }

    getRepos() {
        try {
            let username = this.props.login.username
            let repoNames = [];

            if (username in localStorage) {
                const cachedRepos = JSON.parse(localStorage.getItem(username))
                if ('repo' in cachedRepos) {
                    for (var repo of cachedRepos.repo) {
                        repoNames.push(repo.repoName)
                    }
                }
            }

            return repoNames;
        } catch (error) {
            console.log('Unable to retrieve repo names: ' + error.message)
        }
    }

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.handleSubmit}>
                    <center>
                        <Button bsStyle="default" onClick={this.props.removeFeature.bind(this)}>Create New</Button>
                        <div className="divider" />
                        <Button type="submit" bsStyle="primary" value="Submit" >Save Test</Button>
                    </center>
                    <br />
                    <div >

                        <div className="container">
                            <Multiselect
                                data={this.getRepos()}
                                placeholder='Select repository'
                                filter='contains'
                                textField='name'
                                onChange={this.props.addRepo.bind(this, this.props.login.username)}
                                defaultValue={this.props.create.repoNames}
                            />
                        </div>

                        <br />

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




                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        create: state.createTestReducer,
        login: state.login
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
        addRepo: (username, repoNames) => {
            dispatch(addRepo(repoNames, username));
        },
        removeFeature: () => {
            dispatch(removeFeature());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTest);