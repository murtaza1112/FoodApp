// import "./App.css";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import * as actions from "../actions";
import { connect } from "react-redux";
import Login from "./Login";
import Landing from "./Landing";
import List from "./List";
import Navbar from "./Navbar";

class App extends React.Component {
  componentDidMount() {
    console.log("get user.")
    this.props.fetchUser();
  }
  render() {
    console.log(this.state)
    return (
      <div className="App">
        {/* Navbar  */}
        <BrowserRouter>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/list" component={List} />
          <Route exact path="/login" component={Login} />
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return { auth: state.auth };
};

export default connect(mapStateToProps, actions )(App);
