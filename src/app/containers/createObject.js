import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../../assets/css/App.css';
import validate from './validate';
// validate={required}

const required = value => (value ? "" : "required")

class CreateObject extends React.Component {

    enableTextField = (e) => {
        document.getElementById(e.target.id).removeAttribute("readonly");
    }

    disableTextField = (e) => {
        document.getElementById(e.target.id).setAttribute("readonly", true);
    }

    renderField = ({ input, label, type, id, meta: { touched, error } }) => (

        <React.Fragment>
            {/* {touched && error && <span>{error}</span>}  */}

            <FormControl className={`align-inline object-field-length ${(touched && error) ? 'error' : ''}`}
                {...input} type={type} placeholder={label} id={id}
                touchOnBlur={this.enableTextField.bind(this)}
                touchOnChange={this.disableTextField.bind(this)}
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
        console.log(this.props);
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

const mapStateToProps = (state, ownProps) => {
    return {
        objects: state.form
    }
}

const mapDispatchToProps = (dispatch) => ({
    // ...
});

CreateObject = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateObject);

export default reduxForm({
    form: 'ObjectRepo',
    validate
})(CreateObject); 