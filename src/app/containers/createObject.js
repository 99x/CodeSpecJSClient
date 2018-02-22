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

    renderField = ({ input, label, type, id, meta: { touched, error }, ...props }) => {
        return (
            <React.Fragment>
                <FormControl className={`align-inline object-field-length ${(touched && error) ? 'error' : ''}`}
                    {...input} type={type} placeholder={label} id={id}
                />
            </React.Fragment>
        );
    }


    renderDropDown = ({ input, label, type, id, meta: { touched, error }, ...props }) => {
        const handleBlur = e => e.preventDefault();
        const options = [
            { value: 'id', label: 'Id' },
            { value: 'css', label: 'Css' },
            { value: 'xpath', label: 'Xpath' },
            { value: 'model', label: 'Model' },
            { value: 'binding', label: 'Binding' }
        ]
        return (
            <React.Fragment>
                <Select {...input}
                    id="dropdown-width"
                    value={input.value.value ? input.value.value : "id"}
                    options={options}
                    onChange={input.onChange}
                    onBlur={handleBlur}
                    autosize={false}
                />
            </React.Fragment>
        )
    }

    renderObjects = ({ fields, meta: { touched, error, submitFailed } }) => {
        return (
            <ul>

                <li >
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

                        <div className="object_container">
                            <Field
                                name={`${object}.key`}
                                type='text'
                                component={this.renderField}
                                // validate={required}
                                label="Key"
                                id={`${object}.key`}
                            />
                            <div className="divider" />
                            <Field
                                name={`${object}.method`}
                                type='dropdown'
                                component={this.renderDropDown}
                                label="Method"
                                id={`${object}.key${object}.method`}
                            />

                            <div className="divider" />
                            <Field
                                name={`${object}.value`}
                                type='text'
                                component={this.renderField}
                                label="Value"
                                // validate={required}
                                id={`${object}.key${object}.value`}
                            />

                            <div className="divider" />
                            <span
                                onClick={() => fields.remove(index)}
                                className="allIcons mdi mdi-delete-forever align-inline"
                            />
                        </div>

                    </li>
                )

                )}

            </ul>
        );
    }

    submit(data) {
        let username = this.props.login.username
        let storedEntry = JSON.parse(localStorage.getItem(username))
        let newObject = {};

        // remove empty objects
        let newArr = data.objects.filter(value => Object.keys(value).length !== 0)

        //replace objects array only if its updated
        if (newArr.length !== data.objects.length) {
            data.objects = newArr
        }

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
                let username = this.props.login.username
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
                this.initializeForm()
            } catch (err) {
                console.log('Unable to delete repo: ' + err.message)
            }
        }

    };

    editThisRepo = (e) => {
        try {
            let username = this.props.login.username
            let cachedEntry = JSON.parse(localStorage.getItem(username))
            let repoIndex = cachedEntry.repo.findIndex(repo => repo.repoName === this.props.form.ObjectRepo.values.editRepo.value)
            this.initializeForm(e, cachedEntry.repo[repoIndex]);
        } catch (err) {
            console.log('Unable to get repo for edit: ' + err.message)
        }
    }

    initializeForm(event, repo) {
        try {
            if (typeof repo === undefined) {
                repo = {
                    objects: [],
                    repoName: ''
                }
            }
            this.props.destroy();
            this.props.initialize(repo);
        } catch (err) {
            console.log('Unable initialize form' + err.message);
        }
    }

    renderRepoDropdown = ({ input, onBlur, id, meta: { touched, error }, ...props }) => {
        try {
            const username = this.props.login.username
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
            console.log('Unable to render dropdown' + err.message);
        }

    };



    render() {
        const { handleSubmit, pristine, submitting, invalid } = this.props;

        return (
            <React.Fragment>
                <div className="object_container">
                    <Field name="editRepo"
                        component={this.renderRepoDropdown}
                    />
                    <div className="divider" />
                    <Button bsStyle="primary" onClick={this.editThisRepo.bind(this)}>Edit Repo</Button>
                    <Button id="setmargin__left" bsStyle="success" onClick={this.initializeForm.bind(this)}>Create New Repo</Button>
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
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        form: state.form,
        login: state.login
    }
}

CreateObject = connect(
    mapStateToProps,
)(CreateObject);

export default reduxForm({
    form: 'ObjectRepo',
    validate: validateObjects
})(CreateObject);
