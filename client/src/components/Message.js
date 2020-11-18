import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Alert } from "react-bootstrap";
import "./Message.css";
import * as actions from "../actions";
import { connect } from "react-redux";

class Message extends Component {
  renderMessages() {
    console.log(this.props.messages);
    console.log("The currnt messages are:",this.props.messages)
    const renderArray = this.props.messages.map((elem) => {
      this.props.removeMessage();
      return (
        <div class="flash">
          {elem.success ? (
            <Alert variant="success" dismissible>
              <Alert.Heading>{elem.success}</Alert.Heading>
            </Alert>
          ) : (
            <Alert variant="danger" dismissible>
              <Alert.Heading>{elem.error}</Alert.Heading>
            </Alert>
          )}
        </div>
      );
    });

    return renderArray;
  }
  render() {
    return ReactDOM.createPortal(
      <div>{this.renderMessages()}</div>,
      document.getElementById('message')
    );
  }
}

const mapStateToProps = (state) => {
  return { messages: state.message };
};
export default connect(mapStateToProps, actions)(Message);
