import React, { Component } from "react";
import { connect } from "react-redux";
import ListCardTemplate from "./ListCardTemplate";
import * as actions from "../actions";
import { Row, Container, Col } from "react-bootstrap";
import  "./AdminView.css";

class AdminView extends Component {
  componentDidMount() {
    this.props.fetchItems("italian");
    this.props.fetchItems("continental");
    this.props.fetchItems("indian");
    this.props.fetchItems("chinese");
  }
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
            <Col xs={12} sm={12} md={6} lg={3}>
              <ListCardTemplate details={elem} />
            </Col>
          );
        })
      );
    }
    console.log(final);
    return final;
  }
  render() {
    return (
      <div className="AdminView">
        <Container style={{ maxWidht: "1050px" }}>
          <Row>{this.renderCards()}</Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ list }) => {
  return { list };
};
export default connect(mapStateToProps, actions)(AdminView);
