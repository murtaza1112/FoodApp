import React, { Component } from "react";
import { fetchUser } from "../actions";
import { connect } from "react-redux";
import { Alert, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./List.css";
import data from "../misc/data";
import ListCard from "./ListCard";

class List extends Component {
  //   componentDidMount() {
  //     this.props.fetchUser();
  //   }
  renderCards() {
    console.log(this.props.auth);
    if (this.props.auth.list.length === 0) {
      return (
        <div className="nolist">
          <p>
            You currently have not marked any dish as your favourite.:(
            <br />
            Do check out the HomePage:)
          </p>
        </div>
      );
    }

    var ret = this.props.auth.list.map((elem) => {
      console.log(elem.itemId);
      return <ListCard details={data[elem.itemId]} added/>;
    });
    return ret;
  }
  renderError() {
    return (
      <Alert variant="danger" className="alertHeading">
        <Alert.Heading>ERROR!</Alert.Heading>
        <p>
          You are not authorised to view this page . Please Login to the website
          .
        </p>
        <div>
          <Link to="/login">
            <Button variant="light">Click here to Login</Button>
          </Link>
        </div>
      </Alert>
    );
  }
  renderLoading() {
    console.log("The data is loading.");
    return (
      <div className="Loading">Please wait we are fetching your data.</div>
    );
  }
  render() {
    console.log(this.props.auth === null);

    return (
      <div className="List">
        <div className="header">
          <h1>My Favourites</h1>
        </div>
        {this.props.auth === null
          ? this.renderLoading()
          : this.props.auth === false
          ? this.renderError()
          : this.renderCards()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("mpa called.", state);
  return { auth: state.auth };
}
export default connect(mapStateToProps, { fetchUser })(List);
