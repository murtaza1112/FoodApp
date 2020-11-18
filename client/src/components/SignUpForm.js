import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Container, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../actions";
import "./SignUpForm.css";

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
  state = {
    isClicked: false,
  };
  handleSubmit = async (e) => {
    this.setState({ isClicked: this.state.isClicked + 1 });
    await this.props.createUser(e);
    this.setState({ isClicked: this.state.isClicked + 1 });
  };
  renderAlert() {
    if (this.state.isClicked) {
      {
        return (
          <div className="signUpAlert">
            <i
              style={{ paddingRight: "3px" }}
              class="fa fa-exclamation-triangle"
              aria-hidden="true"
            ></i>
            This user already exists.
          </div>
        );
      }
    }
  }
  renderSubmit() {
    // console.log("The button is rendered.", this.state);
    if (this.state.isClicked % 2 === 1) {
      return (
        <Button type="submit" variant="warning" block disabled>
          <Spinner animation="border" variant="light" />
        </Button>
      );
    } else {
      //not clicked even once OR clicked and wrong info given
      return (
        <div>
          {this.renderAlert()}
          <Button type="submit" variant="warning" block>
            Sign Up
          </Button>
        </div>
      );
    }
  }
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
      <Container className="SignUpForm">
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="form-group">
            <Field name="email" component={renderField} label="Email" />
          </div>
          <div className="form-group">
            <Field
              name="password"
              type="password"
              component={renderField}
              label="Password"
            />
          </div>
          <div className="form-group">
            <Field
              name="confirmPassword"
              type="password"
              component={renderField}
              label="Confirm Password"
            />
          </div>
          <div className="form-group">{this.renderSubmit()}</div>
        </form>
      </Container>
    );
  }
}

const validate = (values) => {
  // console.log(values);
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

  if (!values.confirmPassword) {
    errors.confirmPassword = "This field is required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "The passwords entered are not matching.";
  }
  return errors;
};

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const form = reduxForm({ form: "signup", validate });
export default connect(mapStateToProps, actions)(form(SignUpForm));
