// import "./App.css";
import React from "react";
import {Router, Route ,Switch} from "react-router-dom";
import * as actions from "../actions";
import { connect } from "react-redux";
import Login from "./Login";
import Landing from "./Landing";
import List from "./List";
import Navbar from "./Navbar";
import AdminView from "./AdminView";
import AdminNew from "./AdminNew";
import AdminEdit from "./AdminEdit";
import history from "../history";


class App extends React.Component {
  componentDidMount() {
    // debugger;
    console.log("get user.")
    this.props.fetchUser();
    // this.props.fetchItems("italian");
    // this.props.fetchItems("continental");
    // this.props.fetchItems("indian");
    // this.props.fetchItems("chinese");
  }
  render() {
    console.log(this.state)
    if (this.props.auth === false) {
      history.push("/login");
    }
    if(this.props.auth===null){
      return(
        <div>
          Loading...
        </div>
      )
    }
    return (
      <div className="App">
        {/* Navbar  */}
        <Router history={history}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/list" component={List} />
            <Route exact path="/login" component={Login} />

            <Route exact path="/admin" component={AdminView} />
            <Route exact path="/admin/new" component={AdminNew} />
            <Route exact path="/admin/edit/:id" component={AdminEdit} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return { auth: state.auth };
};

export default connect(mapStateToProps, actions )(App);
