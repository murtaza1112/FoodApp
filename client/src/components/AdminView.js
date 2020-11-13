import React, { Component } from "react";
import { connect } from "react-redux";
import ListCardTemplate from "./ListCardTemplate";

class AdminView extends Component {
  renderCards() {
    // console.log(this.props.list);
    var final = [];
    for (let key in this.props.list) {
      let value = this.props.list[key];
      //return values
      var items = Object.values(value);
      //   console.log(items);
      final = final.concat(
        items.map((elem) => {
        //   console.log(elem);
          return (
            <div>
              <ListCardTemplate details={elem} />
            </div>
          );
        })
      );
    }
    console.log(final);
    return final;
  }
  render() {
    return <div>{this.renderCards()}</div>;
  }
}

const mapStateToProps = ({ list }) => {
  return { list };
};
export default connect(mapStateToProps, null)(AdminView);
