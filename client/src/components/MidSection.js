import React from "react";
import "./MidSection.css";
import { Container, Row, Tab, Tabs,Col } from "react-bootstrap";
import ListCard from "./ListCard";
import data from "../misc/data";

class MidSection extends React.Component {
  render() {
    console.log(this.state);
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
            </Tab>
            <Tab eventKey="Indian" title="Indian">
              <div class="MidSection_Heading">
                <h1>Indian</h1>
              </div>
              <Row>
                <Col xs={12} sm={12} md={6} lg={3}>
                  <ListCard details={data[0]} />
                </Col>
                <Col xs={12} sm={12} md={6} lg={3}>
                  <ListCard details={data[1]} />
                </Col>
                <Col xs={12} sm={12} md={6} lg={3}>
                  <ListCard details={data[0]} />
                </Col>
                <Col xs={12} sm={12} md={6} lg={3}>
                  <ListCard details={data[0]} />
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="Italian" title="Italian">
              <div class="MidSection_Heading">
                <h1>Italian</h1>
              </div>
            </Tab>
            <Tab eventKey="Continental" title="Continental">
              <div class="MidSection_Heading">
                <h1>Continental</h1>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default MidSection;
