import React from 'react';
import { Panel, Button, Checkbox, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { If, Then, Else } from 'react-if';

import { removeScenario, removeStep, scenarioDown, scenarioUp, stepUp, stepDown } from '../actions/createActions';

import '../../assets/css/App.css';

class DisplayCode extends React.Component {

    displayInputBox = (event, str) => {
        let strArr = str.split(" ");
        let newArr = [];

        for (var i = 0, tot = strArr.length; i < tot; i++) {
            if (strArr[i].includes("<")) {
                newArr.push(<input type="text" placeholder={strArr[i]} className='stepInputField' />);
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

        console.log(newStep)
        return newStep;
    }
    render() {

        const scenarios = this.props.create.scenarios.map((item) => {
            return (
                <li key={item.scenarioId}>
                    <p>
                        <Button className='allButtons'><img src={require('../../assets/images/edit_icon.png')} alt="edit" width="20" height="20" /></Button>
                        <Button className='allButtons' onClick={this.props.removeScenario.bind(this, item.scenarioId)}><img src={require('../../assets/images/delete-icon.png')} alt="delete" width="20" height="20" /></Button>
                        <Button className='allButtons' onClick={this.props.scenarioDown.bind(this, item.scenarioId)}><img src={require('../../assets/images/down-arrow.svg')} alt="down" width="20" height="20" /></Button>
                        <Button className='allButtons' onClick={this.props.scenarioUp.bind(this, item.scenarioId)}><img src={require('../../assets/images/up-arrow.png')} alt="up" width="20" height="20" /></Button>
                        <span className="blueTag"> &nbsp;&emsp;Scenario: </span>{item.description}
                    </p>
                    <ul>
                        {
                            item.steps.map((step) => {
                                return (
                                    <li key={step.stepId}>

                                        <Button className='allButtons'><img src={require('../../assets/images/edit_icon.png')} alt="edit" width="20" height="20" /></Button>
                                        <Button className='allButtons' onClick={this.props.removeStep.bind(this, step.stepId, item.scenarioId)}><img src={require('../../assets/images/delete-icon.png')} alt="delete" width="20" height="20" /></Button>
                                        <Button className='allButtons' onClick={this.props.stepDown.bind(this, item.scenarioId, step.stepId)}><img src={require('../../assets/images/down-arrow.svg')} alt="down" width="20" height="20" /></Button>
                                        <Button className='allButtons' onClick={this.props.stepUp.bind(this, item.scenarioId, step.stepId)}><img src={require('../../assets/images/up-arrow.png')} alt="up" width="20" height="20" /></Button>
                                        <Button className='allButtons'><img src={require('../../assets/images/save.svg')} alt="up" width="20" height="20" /></Button>
                                        <span className="blueTag"> &nbsp;&emsp;&emsp;{step.stepOne} </span>{
                                            this.displayInputBox(this, step.stepTwo)
                                        }
                                    </li>);
                            })
                        }
                    </ul>
                </li>
            );
        });

        return (
            <div>
                <div className="col-sm-12 col-sm-offset-1">
                    <Panel header=".feature">
                        <div className="featureCode">
                            <p> <Button className='allButtons'><img src={require('../../assets/images/edit_icon.png')} alt="edit" width="20" height="20" /></Button>
                                <Button className='allButtons'><img src={require('../../assets/images/delete-icon.png')} alt="delete" width="20" height="20" /></Button>
                                <span className="orangeTag"> &nbsp; Feature: </span> {this.props.create.feature} </p>
                            <ul>
                                {scenarios}
                            </ul>
                        </div>
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayCode);
