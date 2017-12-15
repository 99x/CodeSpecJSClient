import React from 'react';
import { Panel, Button, Checkbox } from 'react-bootstrap';
import { connect } from 'react-redux';
import './css/App.css';

class DisplayCode extends React.Component {

    buttons = () => {
        console.log("Calling buttons");
        return (
            <div>
                <Button className='allButtons'><img src={require('./assets/edit_icon.png')} alt="edit" width="20" height="20" /></Button>
                <Button className='allButtons'><img src={require('./assets/delete-icon.png')} alt="delete" width="20" height="20" /></Button>
                <Button className='allButtons'><img src={require('./assets/up-arrow.png')} alt="up" width="20" height="20" /></Button>
                <Button className='allButtons'><img src={require('./assets/down-arrow.svg')} alt="down" width="20" height="20" /></Button>
            </div>
        );
    };

    render() {

        var scenarios = this.props.create.scenarios.map(function (item) {
            return (
                <p key={item.scenarioId}>
                    <p>
                        {this.buttons}
                        <span className="blueTag">Scenario: </span>{item.description}
                    </p>
                    <ul>
                        {
                            item.steps.map(function (step) {
                                return (
                                    <li key={step.stepId}>
                                        <p><span className="blueTag">{step.stepOne} </span>{step.stepTwo}</p>
                                    </li>);
                            })
                        }
                    </ul>
                </p>
            );
        });

        return (
            <div>
                <div className="col-sm-10 col-sm-offset-2">
                    <Panel header=".feature">
                        <p> <Button className='allButtons'><img src={require('./assets/edit_icon.png')} alt="edit" width="20" height="20" /></Button>
                            <Button className='allButtons'><img src={require('./assets/delete-icon.png')} alt="delete" width="20" height="20" /></Button>
                            <Button className='allButtons'><img src={require('./assets/up-arrow.png')} alt="up" width="20" height="20" /></Button>
                            <Button className='allButtons'><img src={require('./assets/down-arrow.svg')} alt="down" width="20" height="20" /></Button>
                            <span className="orangeTag"> Feature: </span> {this.props.create.feature} </p>
                        {scenarios}
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
