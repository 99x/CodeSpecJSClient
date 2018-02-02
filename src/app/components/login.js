import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormControl } from 'react-bootstrap';

import { Helmet } from 'react-helmet';
import Header from './header';
import { addUser } from './../actions/loginActions';
import '../../assets/css/login.css';

class Login extends Component {
    handleSubmit(username, password) {
        if (username === '' || password === '') {
            console.log("required still")
        } else {
            var url = new URL(window.location.href);
            url.searchParams.set('username', username);

            this.props.addUser(username, password)
            window.history.replaceState(null, null, url);
        }

    }

    render() {
        if (this.props.login.username !== '' && this.props.login.password !== '') {
            return (
                <Header />
            )
        } else {
            return (
                <React.Fragment>
                    <Helmet>
                        <style>{'body { background-color: #2d2d2d; }'}</style>
                    </Helmet>

                    <div className="container">
                        <div className="login">
                            <h4>Welcome </h4>
                            <hr />
                            <div className="login-inner">
                                <FormControl type="text" className="form-control email" inputRef={(ref) => { this.username = ref }} placeholder="Enter username" />
                                <FormControl type="password" inputRef={(ref) => { this.pass = ref }} placeholder="Password" />
                                <br />
                                <Button className="btn btn-block btn-lg btn-success submit" onClick={() => this.handleSubmit(this.username.value, this.pass.value)}>Login</Button>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        login: state.login
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addUser: (username, password) => {
            dispatch(addUser(username, password));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);