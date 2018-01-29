import React from 'react';
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Button, FormControl, Alert, Well } from 'react-bootstrap';

import '../../assets/css/App.css';
import validateObjects from './validateObjects';

import { If } from 'react-if';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const required = value => (value ? "" : "required")

class CreateObject extends React.Component {

    renderField = ({ input, label, type, id, meta: { touched, error }, ...props }) => (
        <React.Fragment>
            {/* {touched && error && <span>{error}</span>} */}
            <FormControl className={`align-inline object-field-length ${(touched && error) ? 'error' : ''}`}
                {...input} type={type} placeholder={label} id={id}
            />
        </React.Fragment>
    );

    renderObjects = ({ fields, meta: { touched, error, submitFailed } }) => {
        return (
            <ul>
                <li>
                    <center>
                        <Field
                            name='repoName'
                            type='text'
                            component={this.renderField}
                            validate={required}
                            label="Repository Name"
                            id='repoName'
                        />
                        <div className="divider" />
                        <Button bsStyle="primary" onClick={() => fields.push({})}>Add New Object</Button>
                        <If condition={error !== undefined} >
                            <Alert bsStyle="warning" className="set-alert-width">
                                <strong>Error: </strong> {error}
                            </Alert>
                        </If>
                    </center>

                </li>
                {fields.map((object, index) => (
                    <li key={index}>
                        <br />
                        <center>
                            <Field
                                name={`${object}.key`}
                                type='text'
                                component={this.renderField}
                                validate={required}
                                label="Key"
                                id={`${object}.key`}
                            />
                            <div className="divider" />
                            <Field
                                name={`${object}.method`}
                                type='text'
                                component={this.renderField}
                                label="Method"
                                validate={required}
                                id={`${object}.key` + `${object}.method`}
                            />

                            <div className="divider" />
                            <Field
                                name={`${object}.value`}
                                type='text'
                                component={this.renderField}
                                label="Value"
                                validate={required}
                                id={`${object}.key` + `${object}.value`}
                            />

                            <div className="divider" />
                            <span
                                className="align-inline"
                                onClick={() => fields.remove(index)}
                                className="allIcons mdi mdi-delete-forever"
                            />

                        </center>
                    </li>
                )

                )}
            </ul>
        );
    }

    getUsername() {
        try {
            let url = window.location.search;
            let urlParam = url.substring(url.indexOf('?') + 1);
            let matches = urlParam.match(/=(.+)/);
            let username;
            if (matches) {
                username = matches[1];
            } else {
                username = 'guestuser' //not logged in
            }
            return username;
        } catch (err) {
            throw new Error('Unable to get username' + err.message);
        }

    }

    submit(data) {
        let username = this.getUsername()
        let storedEntry = JSON.parse(localStorage.getItem(username))
        let newObject = {};

        if (username in localStorage) { //useralready has some data
            if ('test' in storedEntry) { //append tests to newobj
                newObject['test'] = storedEntry.test
            }
            if ('repo' in storedEntry) { //has some repositories stored already
                let repoIndex = storedEntry.repo.findIndex(repo => repo.repoName === data.repoName)
                if (repoIndex !== (-1)) { //this repo exits already and now being modified
                    storedEntry.repo[repoIndex] = data //update existing
                } else {
                    storedEntry.repo = [...storedEntry.repo, data] //append to repo array
                }
                newObject['repo'] = storedEntry.repo; //add repo array for new obj
            }
        } else { //completely new user
            newObject.repo = [data]
        }

        localStorage.setItem(username, JSON.stringify(newObject))
        confirmAlert({
            title: 'Saved',
            message: 'Successfully saved all your objects!',
            confirmLabel: 'OK',
            cancelLabel: ''
        })
    }

    confirmDelete = (e) => {
        confirmAlert({
            title: 'Delete All?',
            message: 'Are you sure you want to permanently delete everything?',
            confirmLabel: 'Delete',
            cancelLabel: 'Cancel',
            onConfirm: () => { deleteRepo(e) },
        })

        const deleteRepo = (e) => {
            try {
                /* remove from local storage */
                let username = this.getUsername()
                let storedEntry = JSON.parse(localStorage.getItem(username))
                let repoIndex = storedEntry.repo.findIndex(repo => repo.repoName === this.props.form.ObjectRepo.values.repoName)
                if (repoIndex !== (-1)) { // delete from localstorage only if its available
                    storedEntry.repo.splice(repoIndex, 1)
                    let newObject = {};
                    if ('test' in storedEntry) {
                        newObject['test'] = storedEntry.test
                    }
                    newObject['repo'] = storedEntry.repo
                    localStorage.setItem(username, JSON.stringify(newObject))
                }
                /* remove from state */
                this.props.reset();
            } catch (err) {
                console.log('In err')
                throw new Error('Unable to delete repo', err.message)
            }
        }

    };

    initializeForm(repo) {
        try {
            this.props.initialize(repo);
        } catch (err) {
            throw new Error('Unable initialize form' + err.message);
        }
    }

    renderDropdown = ({ input, onBlur, id, meta: { touched, error }, ...props }) => {
        try {
            const username = this.getUsername();
            const allRepos = []

            if (username in localStorage) {
                const cachedObjects = JSON.parse(localStorage.getItem(username))
                if ('repo' in cachedObjects) {
                    for (var repo of cachedObjects.repo) {
                        let option = {
                            value: repo.repoName,
                            label: repo.repoName
                        }
                        allRepos.push(option)
                    }
                }
            }
            const handleBlur = e => e.preventDefault();

            return (
                <React.Fragment>
                    <Select {...input}
                        id="object__dropdown--width"
                        options={allRepos}
                        onChange={input.onChange}
                        onBlur={handleBlur}
                    />
                </React.Fragment>
            )
        } catch (err) {
            throw new Error('Unable to render dropdown' + err.message);
        }

    };

    editThisRepo = (e) => {
        try {
            let username = this.getUsername()
            let cachedEntry = JSON.parse(localStorage.getItem(username))
            let repoIndex = cachedEntry.repo.findIndex(repo => repo.repoName === this.props.form.ObjectRepo.values.editRepo.value)
            this.initializeForm(cachedEntry.repo[repoIndex]);
        } catch (err) {
            throw new Error('Unable to get repo for edit' + err.message);
        }
    }

    render() {
        console.log('RENDER')
        const { handleSubmit, pristine, submitting, invalid, reset } = this.props;
        return (
            <div id="obj_container">
                <div className="container">
                    <Field name="editRepo"
                        value="this.state.accountno"
                        component={this.renderDropdown}
                        placeholder="Select"
                    />
                    <div className="divider" />
                    <Button bsStyle="primary" disabled={pristine || submitting} onClick={this.editThisRepo.bind(this)}>Edit Repo</Button>
                    <Button id="setmargin__left" bsStyle="success" disabled={pristine || submitting || invalid} onClick={reset}>Create New Repo</Button>
                </div>

                <br />
                <form onSubmit={handleSubmit(this.submit.bind(this))}>
                    <Well>
                        <FieldArray name='objects' component={this.renderObjects} />
                        <center>
                            <Button bsStyle="default" disabled={submitting || invalid} onClick={this.confirmDelete.bind(this)}>Delete Repo</Button>
                            <div className="divider" />
                            <Button bsStyle="default" type="submit" disabled={pristine || submitting || invalid}>Submit</Button>
                        </center>
                    </Well>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        form: state.form
    }
}

CreateObject = connect(
    mapStateToProps,
)(CreateObject);

export default reduxForm({
    form: 'ObjectRepo',
    validate: validateObjects
})(CreateObject);
