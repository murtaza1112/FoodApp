import React, { useState } from "react";
import { Carousel, Button, Modal, Container } from "react-bootstrap";
import "./DisplayModal.css";

// to do get size of all reviews

function maxReviewSize(currentString) {
  var reviews = document.querySelectorAll(".carousel-caption")
  var carousel = document.querySelector("."+currentString);
    // .map((elem) => elem.box.offsetHeight);

  var Height = 0;
  for(var i=0;i<reviews.length;i++){
      console.log(reviews[i].clientHeight);
      Height = Math.max(Height,reviews[i].clientHeight);
  }
  console.log(reviews);
  console.log(Height);
  console.log(carousel);
  if(carousel)
  console.log("Carousel height is :",carousel.clientHeight);
//   if(carousel.clientHeight<)
}
function renderStars(value) {
  var ret = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= value) ret.push(<i class="fas fa-star" aria-hidden="true" />);
    else ret.push(<i class="far fa-star" aria-hidden="true" />);
  }
//   console.log(ret);
  return ret;
}
function DisplayModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { details } = props;
  console.log(details);
  const url = details.image;
  var currentString = `carousel`+details.id;
  return (
    <div class="cardModal">
      <Button variant="light" className="readMore" onClick={handleShow}>
        Read More
      </Button>

      <Modal show={show} onHide={handleClose} className="cardModal">
        <Modal.Header className="heading" closeButton>
          {details.name}
        </Modal.Header>
        <Modal.Body>
          <Carousel indicators={false} className={currentString}>
            {console.log(details.reviews),console.log(details)}
            {details && details.reviews && details.reviews.map((review) => {
              return (
                // <div className="carousel_item">

                <Carousel.Item>
                  <img src={url} />
                  <Carousel.Caption>
                    <p>{review.description}</p>
                    <h4>{`-` + review.name}</h4>
                    <span class="stars">
                      {renderStars(review.rating).map((elem) => elem)}
                    </span>
                  </Carousel.Caption>
                </Carousel.Item>
                // </div>
              );
            })}
          </Carousel>
        </Modal.Body>
        <Modal.Footer>{details.description}</Modal.Footer>
      </Modal>
    </div>
  );
}

export default DisplayModal;
