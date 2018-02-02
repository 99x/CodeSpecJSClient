import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../assets/css/App.css';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import Body from './body';
import { viewDashboard, viewTests, createTest, objectRepo } from '../actions/navigationActions'

class Header extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <h1 className="App-title">CodeSpecJS</h1>
                    <h4 className="App-intro">
                        Define all your Test Suits and Test Cases with ease.
                    </h4>
                </header>

                <Navbar className="Navbar" inverse collapseOnSelect>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={1} onClick={() => { this.props.viewDashboard() }}>Dashboard</NavItem>
                            <NavItem eventKey={2} onClick={() => { this.props.viewTests() }}>Your Tests</NavItem>
                            <NavItem eventKey={3} onClick={() => { this.props.createTest() }}>Create Test</NavItem>
                            <NavItem eventKey={4} onClick={() => { this.props.objectRepo() }}>Object Repo</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Body showDashboard={this.props.navigation.dashboard} showCreate={this.props.navigation.create} showView={this.props.navigation.view} showRepo={this.props.navigation.repo} />

            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        navigation: state.navigation
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        viewDashboard: () => {
            dispatch(viewDashboard());
        },
        viewTests: () => {
            dispatch(viewTests());
        },
        createTest: () => {
            dispatch(createTest());
        },
        objectRepo: () => {
            dispatch(objectRepo());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);