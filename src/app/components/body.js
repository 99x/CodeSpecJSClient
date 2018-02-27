import React, { Component } from 'react';

import CreateTest from '../containers/createTest';
import CreateObject from './../containers/createObject';
import EditTest from './../containers/editTest';
import ShowTest from './../containers/showTests';
import Dashboard from './dashboard';

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
                <React.Fragment>
                    <CreateTest />
                    <br />
                    <EditTest />
                </React.Fragment>
            );
        } else if (this.props.showRepo) {
            content = (
                <CreateObject />
            );
        } else if (this.props.showDashboard) {
            content = (
                <div>
                    <Dashboard />
                </div>
            );
        }
        return content;
    }
}

export default Body;
