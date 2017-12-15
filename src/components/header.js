import React, { Component } from 'react';
import './css/App.css';
// import CodeList from '../containers/codeList'
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import Body from './body';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            create: false,
            view: true,
        };
    }
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
                            <NavItem eventKey={1} onClick={() => { this.setState({ view: true }); this.setState({ create: false }) }}>Your Tests</NavItem>
                            <NavItem eventKey={2} onClick={() => { this.setState({ create: true }); this.setState({ view: false }) }}>Create Test</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Body showCreate={this.state.create} showView={this.state.view} />

            </div>
        );
    }
}

export default Header;
