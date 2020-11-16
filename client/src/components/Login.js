import React, { Component } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
// import "./Login.css";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "./Login.css";
import { connect } from "react-redux";
import * as actions from "../actions";

class LoginAndSignUp extends Component {
  onGoogleSign = () => {
    this.props.googleSignIn();
    console.log("Google sign in called.");
  };
  render() {
    return (
      <div className="Login">
        <div className="auth">
          <Tabs defaultActiveKey="Login" id="uncontrolled-tab-example">
            <Tab eventKey="Login" title="Login">
              <LoginForm />
            </Tab>
            <Tab eventKey="SignUp" title="SignUp">
              <SignUpForm />
            </Tab>
          </Tabs>
          {/* <Button onClick={this.onGoogleSign}>Google SignIn</Button> */}
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(LoginAndSignUp);
