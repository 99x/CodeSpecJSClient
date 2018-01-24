import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Button, FormControl, Alert } from 'react-bootstrap';
import '../../assets/css/App.css';
import validateObjects from './validateObjects';
import { If } from 'react-if';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

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

        console.log(touched, error, submitFailed);
        return (
            <ul>
                <li>
                    <center>
                        <Button bsStyle="success" onClick={() => fields.push({})}>Add New Object</Button>
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
    }

    submit(e) {
        let storedEntry = JSON.parse(localStorage.getItem(this.getUsername()))

        let newObject;
        if (this.getUsername() in localStorage) {
            console.log("TEST IS DEFINED")
            newObject = {
                test: storedEntry.test,
                repo: e
            }
        } else {
            newObject = {
                repo: e
            }
        }

        localStorage.setItem(this.getUsername(), JSON.stringify(newObject))
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
            onConfirm: () => { this.props.reset() },
        })
    };

    componentDidMount() {
        this.initializeForm();
    }

    initializeForm() {
        if (this.getUsername() in localStorage) {
            const cachedObjects = JSON.parse(localStorage.getItem(this.getUsername()))
            console.log(cachedObjects.repo)
            this.props.initialize(cachedObjects.repo);
        }

    }

    render() {

        const { handleSubmit, pristine, submitting, invalid } = this.props;

        return (
            <form onSubmit={handleSubmit(this.submit.bind(this))}>
                <FieldArray name='objects' component={this.renderObjects} />
                <center>
                    <Button className="align-inline" type="submit" disabled={pristine || submitting || invalid}>Submit</Button>
                    <div className="divider" />
                    <Button className="align-inline" disabled={pristine || submitting} onClick={this.confirmDelete.bind(this)}> Clear All Values </Button>
                </center>
            </form>
        );
    }
}

export default reduxForm({
    form: 'ObjectRepo',
    validate: validateObjects
})(CreateObject); 