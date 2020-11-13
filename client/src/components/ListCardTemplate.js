import React, { Component } from "react";
import "./ListCardTemplate.css";
import { Card, Button, Modal, Row, Container } from "react-bootstrap";
import DisplayModal from "./DisplayModal";
import * as actions from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//add details here in the form of json data
class ListCardTemplate extends Component {
  state = { show: false };

  handleAdd = () => {
    console.log("adding");
    this.props.addInList(this.props.details.id);
  };
  handleDelete = () => {
    console.log("deleting");
    console.log(this.props.details._id);
    this.props.removeItem(this.props.details._id,this.props.details.type);
  };
  generatePersonCard = () => {
    const { details } = this.props;
    console.log(details);
    // console.log(this.state.show);
    return (
      <div className="ListCardTemplate">
        <Card>
          <Card.Body>
            <Container>
              <Row>
                <img
                  src={details.image}
                  style={{ width: "100%" }}
                  alt="Sorry the image could not be loaded."
                />
              </Row>
            </Container>
            <Card.Title className="Heading">
              <h2>{details.name}</h2>
            </Card.Title>
            <Card.Subtitle className="mb-2 price">
              <i className="fa fa-rupee-sign" aria-hidden="true"></i>
              {details.price}
            </Card.Subtitle>
            {/* {!this.props.added ? (
              <Button
                variant="warning"
                className="circular pulse"
                onClick={this.handleAdd}
              >
                <i className="fa fa-plus" aria-hidden="true"></i>
              </Button>
            ) : (
              <Button
                variant="light"
                className="circular pulse"
                onClick={this.handleDelete}
              >
                <i className="fa fa-minus" aria-hidden="true"></i>
              </Button>
            )} */}

            {/* {this.renderButtons()} */}
            <div className="list-footer">
              <div className="list-body-text">
                <Card.Text className="text text-muted over">
                  {details.description}
                </Card.Text>
              </div>
              <DisplayModal details={details} />
            </div>
            <Link to={`/admin/edit/${details._id}`}>
              <Button block variant="light">
                Edit
              </Button>
            </Link>
            <Button block variant="warning" onClick={this.handleDelete}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  };

  render() {
    // console.log(this.props.details);
    //return a image card or a person card
    console.log(this.props.details);
    console.log(this.state.show);
    return this.generatePersonCard();
  }
}

const mapStateToProps = ({ auth, list }) => {
  return { auth, list };
};

export default connect(mapStateToProps, actions)(ListCardTemplate);
