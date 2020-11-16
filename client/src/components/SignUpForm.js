import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../actions";

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <label className="control-label">{label}</label>
    <div>
      <input
        {...input}
        placeholder={label}
        type={type}
        className="form-control"
      />
      {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

class SignUpForm extends Component {
  handleSubmit = (e) => {
    console.log(e);
    this.props.createUser(e);
  };

  render() {
    // console.log(this.props);
    if (this.props.auth === null) {
      return <div>Loading...</div>;
    }
    if (this.props.auth) {
      return <Redirect to="/" />;
    }
    const { handleSubmit } = this.props;
    return (
      <Container>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="form-group">
            <Field name="email" component={renderField} label="Email" />
          </div>
          <div className="form-group">
            <Field name="password" type="password" component={renderField} label="password" />
          </div>
          <div className="form-group">
            <Button type="submit" block variant="warning">SIGNUP</Button>
          </div>
        </form>
      </Container>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.password) {
    errors.password = "This field is required";
  } else if (values.password.length < 10) {
    errors.password =
      "The password must contain minimum 10 characters or more.";
  }
  if (!values.email) {
    errors.email = "This field is required.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const form = reduxForm({ form: "signup", validate });
export default connect(mapStateToProps, actions)(form(SignUpForm));

