import React, { Component } from "react";
import "./ListCard.css";
import { Card, Button, Modal } from "react-bootstrap";
import DisplayModal from "./DisplayModal";
import * as actions from "../actions";
import {connect} from "react-redux";

class ListCard extends Component {
  state = { show: false };

  //   handleShow = () => {

  //     console.log("Switching on modal");
  //     // console.log(this.state);
  //     this.setState({ show: true });
  //   };

  //   handleClose = () => {
  //     console.log("Closing modal");
  //     this.setState({ show: false });
  //   };

  //   constructor(props) {
  //     super(props);
  //   }

  //   GenerateModal = () => {
  //     return (
  //       <>

  //       </>
  //     );
  //   };
  handleAdd = () => {
      console.log("adding");
    this.props.addInList(this.props.details.id);
  };
  handleDelete = () => {
      console.log("deleting");
      console.log(this.props.details.id);
    this.props.removeFromList(this.props.details.id);
  };
  generatePersonCard = () => {
    const { details } = this.props;
    console.log(details);
    // console.log(this.state.show);
    return (
      <div className="ListCard">
        <Card>
          <Card.Body>
            <Card.Title className="Heading">
              <h2>{details.name}</h2>
            </Card.Title>
            <Card.Subtitle className="mb-2 price">
              <i className="fa fa-rupee-sign" aria-hidden="true"></i>
              {details.price}
            </Card.Subtitle>
            {!this.props.added ? (
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
            )}

            <Card.Text className="text text-muted">
              {details.shortDescription}
            </Card.Text>
            <DisplayModal details={details} />
          </Card.Body>
        </Card>
      </div>
    );
  };
  generatePictureCard() {
    const { details } = this.props;
    return (
      <div className="ListCard">
        <img src={details.photoUrl}></img>
      </div>
    );
  }
  render() {
    // console.log(this.props.details);
    //return a image card or a person card
    console.log(this.state.show);
    return this.props.image
      ? this.generatPictureCard()
      : this.generatePersonCard();
  }
}

const mapStateToProps = (state) => {
    return {auth:state.auth};
}

export default connect(mapStateToProps,actions)(ListCard);
