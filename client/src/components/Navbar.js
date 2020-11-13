import React, { Component } from "react";
// import "./Navbar.css";
import { Link } from "react-router-dom";
import { Navbar as NavBar, Nav } from "react-bootstrap";
import * as actions from "../actions";
import { connect } from "react-redux";

// class Navbar extends Component {
//   state = { changeIcon: true };
//   constructor(props){
//       super(props);
//   }
//   onHamburgerClick() {
//     var open = document.getElementById("hamburger");
//     var { changeIcon } = this.state;

//     var overlay = document.querySelector(".overlay");
//     var Nav = document.querySelector(".Navbar");
//     var nav = document.querySelector("nav");
//     var icon = document.querySelector(".menu-toggle i");

//     if (changeIcon) {
//       icon.classList.remove("fa-bars");
//       icon.classList.add("fa-times");
//     } else {
//       icon.classList.remove("fa-times");
//       icon.classList.add("fa-bars");
//     }

//     overlay.classList.toggle("menu-open");
//     Nav.classList.toggle("Navd");
//     nav.classList.toggle("menu-open");
//     console.log(changeIcon);

//     this.setState({ changeIcon: !changeIcon });
//   }

//   render() {
//     console.log(this.state);
//     return (
//       <header class="Navbar">
//         <h1 class="brand">
//           <Link to="index.html">
//             Foo<span>D</span>zie
//           </Link>
//         </h1>
//         <div
//           class="menu-toggle"
//           id="hamburger"
//           onClick={()=>this.onHamburgerClick()}
//         >
//           <i class="fas fa-bars"></i>
//         </div>
//         <div class="overlay"></div>
//         <div class="container">
//           <nav>
//             <ul>
//               <li>
//                 <Link to="/">Home</Link>
//               </li>
//               <li>
//                 <Link to="/list">My Favourites</Link>
//               </li>
//               <li>
//                 <Link to="/signin">SignIn</Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </header>
//     );
//   }
// }

class Navbar extends React.Component {

  onLogOut = () =>{
    this.props.LogOutUser();
  }
  render() {
    // console.log(this.props);
    console.log(this.props.auth);

    return (
      <NavBar sticky="top" bg="dark" expand="lg">
        <NavBar.Brand href="/">Foodzie</NavBar.Brand>
        <NavBar.Toggle aria-controls="basic-navbar-nav" />
        <NavBar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/list" className="nav-link">
              My Favourites
            </Link>

            {this.props.auth ? (
              <Link className="nav-link" onClick={this.onLogOut}>
                Logout
              </Link>
            ) : (
              <Link className="nav-link" to="/login">
                Login
              </Link>
            )}

            {this.props.auth && this.props.auth.admin ? (
              <Link className="nav-link" to="/admin">Show Items</Link>
            ) : (
              <span></span>
            )}
            {this.props.auth && this.props.auth.admin ? (
              <Link className="nav-link" to="/admin/new">
                Add Item
              </Link>
            ) : (
              <span></span>
            )}
          </Nav>
        </NavBar.Collapse>
      </NavBar>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return { auth: state.auth };
};

export default connect(mapStateToProps, actions)(Navbar);
