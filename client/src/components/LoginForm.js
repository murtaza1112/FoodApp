import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Container, Spinner, Alert } from "react-bootstrap";
import { checkUser } from "../actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../actions";
import "./LoginForm.css";

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

class LoginForm extends Component {
  state = {
    isClicked: 0,
  };
  handleSubmit = async (e) => {
    // console.log(e);
    // console.log(this.props);
    this.setState({ isClicked: this.state.isClicked + 1 });
    await this.props.checkUser(e);
    console.log(this.props.auth);
    this.setState({ isClicked: this.state.isClicked + 1 });
    // this.setState({isClicked:false});
  };
  componentDidUpdate() {
    // console.log("The form has updated.",this.state);
  }
  renderAlert() {
    if (this.state.isClicked) {
      {
        return (
          <div className="loginAlert">
              <i
                style={{ paddingRight: "3px" }}
                class="fa fa-exclamation-triangle"
                aria-hidden="true"
              ></i>
              The user does not exist.
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
            LOGIN
          </Button>
        </div>
      );
    }
  }
  render() {
    // console.log(this.state);
    // console.log("LOGIN FORM IS RENDERED.");
    if (this.props.auth === null) {
      return <div>Loading...</div>;
    }
    if (this.props.auth !== false) {
      return <Redirect to="/" />;
    }
    const { handleSubmit } = this.props;
    return (
      <Container className="LoginForm">
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="form-group">
            <Field name="email" component={renderField} label="Email" />
          </div>
          <div className="form-group">
            <Field
              name="password"
              type="password"
              component={renderField}
              label="password"
            />
          </div>
          <div className="form-group">{this.renderSubmit()}</div>
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
  // console.log(state);
  return { auth: state.auth };
};

const form = reduxForm({ form: "login", validate });

export default connect(mapStateToProps, actions)(form(LoginForm));
