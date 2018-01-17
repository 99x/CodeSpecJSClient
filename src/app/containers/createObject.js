import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Button, FormControl, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../../assets/css/App.css';
import validateObjects from './validateObjects';
import { If } from 'react-if';

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

    submit() {
        //this
    }

    render() {

        const { handleSubmit, pristine, reset, submitting, invalid } = this.props;
        console.log("this.props")
        console.log(invalid);

        return (
            <form onSubmit={handleSubmit(this.submit.bind(this))}>
                <FieldArray name='objects' component={this.renderObjects} />
                <center>
                    <Button className="align-inline" type="submit" disabled={pristine || submitting || invalid}>Submit</Button>
                    <div className="divider" />
                    <Button className="align-inline" disabled={pristine || submitting} onClick={reset}> Clear All Values </Button>
                </center>
            </form>
        );
    }
}

export default reduxForm({
    form: 'ObjectRepo',
    validate: validateObjects
})(CreateObject); 