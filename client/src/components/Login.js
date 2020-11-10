import React, { Component } from "react";
import { Tabs,Tab,Button } from "react-bootstrap";
// import "./Login.css";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "./Login.css";

class LoginAndSignUp extends Component {
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
          <Button href="/auth/google">Google SignIn</Button>
        </div>
      </div>
    );
  }
}

export default LoginAndSignUp;
