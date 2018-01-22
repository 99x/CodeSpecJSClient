import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';

import CreateTest from '../containers/createTest';
import CreateObject from './../containers/createObject';
import EditTest from './../containers/editTest';
import ShowTest from './../containers/showTests';

class Body extends Component {
    render() {
        var content = "";
        if (this.props.showView) {
            content = (
                <div>
                    <ShowTest />
                </div>
            );
        } else if (this.props.showCreate) {
            content = (
                <div>
                    <CreateTest />
                    <br />
                    <EditTest />
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
