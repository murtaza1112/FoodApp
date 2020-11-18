import React, { Component } from "react";
import Header from "./Header";
import {connect} from "react-redux";
import history from "../history";
import MidSection from "./MidSection";
class Landing extends Component {

  render() {
    if (this.props.auth === false) {
      history.push("/login");
    }
    
    return (
      <div>
        {/* Header  */}
        <Header />
        {/* MidSection */}
        <MidSection />
        {/* Quote */}
      </div>
    );
  }
}
const mapStateToProps = ({auth}) =>{
  return {auth}
}
export default connect(mapStateToProps,null)(Landing);
