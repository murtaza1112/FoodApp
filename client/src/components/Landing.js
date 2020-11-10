import React, { Component } from "react";
import Header from "./Header";

import MidSection from "./MidSection";
class Landing extends Component {
  static propTypes = {};

  render() {
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

export default Landing;
