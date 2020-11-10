import React, { Component } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Carousel>
          <Carousel.Item>
            <img src="/assets/italian3.jpg" alt="Third slide" />
            <Carousel.Caption>
              <h3>Italian</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="/assets/italian2.jpg" alt="Third slide" />
            <Carousel.Caption>
              <h3>Continental</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="/assets/italian2.jpg" alt="Third slide" />

            <Carousel.Caption>
              <h3>Indian</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="/assets/italian2.jpg" alt="Third slide" />

            <Carousel.Caption>
              <h3>Chinese</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default Header;
