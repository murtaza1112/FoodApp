// import React, { Component } from "react";
// import "./ListCard.css";
// import { Card, Button, Modal } from "react-bootstrap";
// import DisplayModal from "./DisplayModal";
// import * as actions from "../actions";
// import {connect} from "react-redux";

// class ListCard extends Component {
//   state = { show: false };

//   //   handleShow = () => {

//   //     console.log("Switching on modal");
//   //     // console.log(this.state);
//   //     this.setState({ show: true });
//   //   };

//   //   handleClose = () => {
//   //     console.log("Closing modal");
//   //     this.setState({ show: false });
//   //   };

//   //   constructor(props) {
//   //     super(props);
//   //   }

//   //   GenerateModal = () => {
//   //     return (
//   //       <>

//   //       </>
//   //     );
//   //   };
//   handleAdd = () => {
//       console.log("adding");
//     this.props.addInList(this.props.details.id);
//   };
//   handleDelete = () => {
//       console.log("deleting");
//       console.log(this.props.details.id);
//     this.props.removeFromList(this.props.details.id);
//   };
//   generatePersonCard = () => {
//     const { details } = this.props;
//     console.log(details);
//     // console.log(this.state.show);
//     return (
//       <div className="ListCard">
//         <Card>
//           <Card.Body>
//             <Card.Title className="Heading">
//               <h2>{details.name}</h2>
//             </Card.Title>
//             <Card.Subtitle className="mb-2 price">
//               <i className="fa fa-rupee-sign" aria-hidden="true"></i>
//               {details.price}
//             </Card.Subtitle>
//             {!this.props.added ? (
//               <Button
//                 variant="warning"
//                 className="circular pulse"
//                 onClick={this.handleAdd}
//               >
//                 <i className="fa fa-plus" aria-hidden="true"></i>
//               </Button>

//             ) : (
//               <Button
//                 variant="light"
//                 className="circular pulse"
//                 onClick={this.handleDelete}
//               >
//                 <i className="fa fa-minus" aria-hidden="true"></i>
//               </Button>
//             )}

//             <Card.Text className="text text-muted">
//               {details.shortDescription}
//             </Card.Text>
//             <DisplayModal details={details} />
//           </Card.Body>
//         </Card>
//       </div>
//     );
//   };
//   generatePictureCard() {
//     const { details } = this.props;
//     return (
//       <div className="ListCard">
//         <img src={details.photoUrl}></img>
//       </div>
//     );
//   }
//   render() {
//     // console.log(this.props.details);
//     //return a image card or a person card
//     console.log(this.state.show);
//     return this.props.image
//       ? this.generatPictureCard()
//       : this.generatePersonCard();
//   }
// }

// const mapStateToProps = (state) => {
//     return {auth:state.auth};
// }

// export default connect(mapStateToProps,actions)(ListCard);
import React, { Component } from "react";
import "./ListCard.css";
import { Card, Button, Modal, Row, Container } from "react-bootstrap";
import DisplayModal from "./DisplayModal";
import * as actions from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//add details here in the form of json data
class ListCard extends Component {
  state = { show: false };
  renderAdd(){
    //if already added then disabled
    var disabled = false;
    var text = "Add To Favoutrites";
    var check = false;

    for(var i=0;i<this.props.auth.list.length;i++){
         if(this.props.auth.list[i]._id === this.props.details._id){
            check=true;
            break;
         }
    }
    console.log(this.props.details._id)
    console.log(this.props.auth.list);
    if(check){
      disabled = true;
      text = "Already Your Favorite :)";
    }
    return (
      <Button
        variant="warning"
        className="circular pulse"
        onClick={this.handleAdd}
        disabled={disabled}
      >
        {text}
      </Button>
    );
  }
  handleAdd = () => {
    console.log("adding");
    this.props.addInList(this.props.details);
  };
  handleDelete = () => {
    console.log("deleting",this.props.details._id);
    this.props.removeFromList(this.props.details._id);
  };
  generatePersonCard = () => {
    const { details } = this.props;
    console.log(details);
    // console.log(this.state.show);
    return (
      <div className="ListCard">
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
            {!this.props.added ? (
              this.renderAdd()
            ) : (
              <Button
                variant="warning-outline"
                onClick={this.handleDelete}
              >
                Delete
              </Button>
            )}


            {/* {this.renderButtons()} */}
            <div className="list-footer">
              <div className="list-body-text">
                <Card.Text className="text text-muted over">
                  {details.description}
                </Card.Text>
              </div>
              <DisplayModal details={details} />
            </div>
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

export default connect(mapStateToProps, actions)(ListCard);
