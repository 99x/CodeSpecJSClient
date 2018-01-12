import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';

import DisplayCode from '../containers/displayCode';
import CreateTest from '../containers/createTest';
import CreateObject from './../containers/createObject';




class Body extends Component {
    render() {
        var content = "";
        if (this.props.showView) {
            content = (
                <div>
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
            content = (
                <div>
                    <CreateTest />
                    <br />
                    <DisplayCode />
                </div>
            );
        } else if (this.props.showRepo) {
            content = (
                <CreateObject />
            );
        }
        return content;
    }
}

export default Body;
