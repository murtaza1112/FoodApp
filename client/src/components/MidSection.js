import React from "react";
import "./MidSection.css";
import { Container, Row, Tab, Tabs, Col } from "react-bootstrap";
import ListCard from "./ListCard";
import * as actions from "../actions";
import { connect } from "react-redux";

class MidSection extends React.Component {
  renderCards(type) {
    return Object.values(this.props.list[type]).map((elem) => {
      // console.log(elem);
      return (
        <Col xs={12} sm={12} md={6} lg={3}>
          <ListCard key={elem._id} details={elem} />
        </Col>
      );
    });
  }
  render() {
    // console.log(this.state);
    // console.log(this.props.list);
    return (
      <div className="MidSection">
        <div className="MidSection_Heading">
          {/* Heading */}
          <h1>Foodzie</h1>
        </div>
        <div className="MidSection_Tabs">
          <Tabs defaultActiveKey="Indian">
            <Tab eventKey="Chinese" title="Chinese">
              <div class="MidSection_Heading">
                <h1>Chinese</h1>
              </div>
              <Row>{this.renderCards("chinese")}</Row>
            </Tab>
            <Tab eventKey="Indian" title="Indian">
              <div class="MidSection_Heading">
                <h1>Indian</h1>
              </div>
              <Row>{this.renderCards("indian")}</Row>
            </Tab>
            <Tab eventKey="Italian" title="Italian">
              <div class="MidSection_Heading">
                <h1>Italian</h1>
              </div>
              <Row>{this.renderCards("italian")}</Row>
            </Tab>
            <Tab eventKey="Continental" title="Continental">
              <div class="MidSection_Heading">
                <h1>Continental</h1>
              </div>
              <Row>{this.renderCards("continental")}</Row>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, list }) => {
  return { auth, list };
};
export default connect(mapStateToProps, actions)(MidSection);
