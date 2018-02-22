import React, { Component } from 'react';
import { Well, Panel } from 'react-bootstrap';

class Dashboard extends Component {
    render() {
        return (
            <React.Fragment>
                <Panel bsSize="small" header="Test Suite: Sample Test Suite 1">
                    <center>
                        <div className="align-inline">
                            <iframe width="520" height="290" seamless frameBorder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSj1ytWaSU6ng28bHJ7OcJtjbC2mIqVbVURFm1uc54czef0OYfy2J05dDx-c2LAjxwlnR2EfmzVG6j9/pubchart?oid=1340983100&amp;format=interactive"></iframe>
                            <iframe width="470" height="290" seamless frameBorder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSj1ytWaSU6ng28bHJ7OcJtjbC2mIqVbVURFm1uc54czef0OYfy2J05dDx-c2LAjxwlnR2EfmzVG6j9/pubchart?oid=1079753516&amp;format=interactive"></iframe>
                            <iframe width="296.5" height="290" seamless frameBorder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSj1ytWaSU6ng28bHJ7OcJtjbC2mIqVbVURFm1uc54czef0OYfy2J05dDx-c2LAjxwlnR2EfmzVG6j9/pubchart?oid=474246580&amp;format=interactive"></iframe>
                        </div>
                    </center>
                </Panel>

                <Panel bsSize="small" header="Test Suite: Sample Test Suite 2">
                    <center>
                        <div className="align-inline">
                            <iframe width="520" height="290" seamless frameBorder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSj1ytWaSU6ng28bHJ7OcJtjbC2mIqVbVURFm1uc54czef0OYfy2J05dDx-c2LAjxwlnR2EfmzVG6j9/pubchart?oid=1340983100&amp;format=interactive"></iframe>
                            <iframe width="470" height="290" seamless frameBorder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSj1ytWaSU6ng28bHJ7OcJtjbC2mIqVbVURFm1uc54czef0OYfy2J05dDx-c2LAjxwlnR2EfmzVG6j9/pubchart?oid=872314850&amp;format=interactive"></iframe>
                            <iframe width="295" height="290" seamless frameBorder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSj1ytWaSU6ng28bHJ7OcJtjbC2mIqVbVURFm1uc54czef0OYfy2J05dDx-c2LAjxwlnR2EfmzVG6j9/pubchart?oid=1009737518&amp;format=interactive"></iframe>
                        </div>
                    </center>
                </Panel>
            </React.Fragment>
        );
    }

}

export default Dashboard;
