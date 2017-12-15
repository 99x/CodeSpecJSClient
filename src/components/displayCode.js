import React from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import './css/App.css';

class DisplayCode extends React.Component {

    render() {

        var scenarios = this.props.create.scenarios.map(function (item) {
            return (
                <li key={item.scenarioId}>
                    <p><span className="blueTag">Scenario: </span>{item.description}</p>
                    <ul>
                        {

                            item.steps.map(function (step) {
                                console.log("step");
                                console.log(step);
                                return (
                                    <li key={step.stepId}>
                                        <p><span className="blueTag">{step.stepOne} </span>{step.stepTwo}</p>
                                    </li>);
                            })
                        }
                    </ul>
                </li>
            );
        });

        return (
            <div>
                <div className="col-sm-10 col-sm-offset-2">
                    <Panel header=".feature">
                        <p> <span className="orangeTag">Feature: </span> {this.props.create.feature} </p>
                        <ul>
                            {scenarios}
                        </ul>
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

export default connect(mapStateToProps)(DisplayCode);
