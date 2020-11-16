import React, { Component } from "react";
import "./AdminNew.css";
import FileUpload from "./FileUpload";
import * as actions from "../actions";
import { connect } from "react-redux";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

//checking if number is valid
function isNumeric(value) {
  var val = /^-?\d+$/.test(value);
  //   console.log(val);
  return val;
}

function isFloat(val) {
  val = parseFloat(val);
  return !isNaN(val);
}

class AdminNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      description: null,
      price: null,
      reviews: [],
      image: null,
      type: "italian",
      errors: {
        name: "",
        description: "",
        price: "",
        image: "",
        reviews: [],
        review: null,
      },
    };
  }
  //reviews are rating,description,name
  //errors are errors.review[i].rating

  validateForm = () => {
    let valid = true;
    console.log("Submit called:", this.state);
    var temp = JSON.parse(JSON.stringify(this.state));
    Object.keys(this.state).forEach((val) => {
      if (val === "errors") return;

      if (val === "reviews") {
        if (this.state.errors.reviews.length === 0) {
          valid = false;
          temp.errors.review = `Please add at least one review.`;
          return;
        }
        console.log("The size if filled");

        this.state.errors.reviews.forEach((review, index) => {
          //check is review exists
          if (!this.state.reviews[index].description) {
            temp.errors.reviews[index].description =
              "Description is a required field.";
            valid = false;
          }
          if (!this.state.reviews[index].name) {
            temp.errors.reviews[index].name = "Name is a required field.";
            valid = false;
          }
          if (!this.state.reviews[index].rating) {
            temp.errors.reviews[index].rating = "Rating is a required field.";
            valid = false;
          }

          if (this.state.errors.reviews[index].rating) valid = false;
        });
        return;
      }
      const value = this.state[val];
      console.log(val, value);
      if (!value) {
        valid = false;
        temp.errors[val] = `${val} is a required field.`;
      }
      //value exists
      if (temp.errors[val]) {
        valid = false;
      }
    });
    //   console.log(valid);
    if (!valid) this.setState(temp);
    return valid;
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    // let errors = this.state.errors;
    const temp = JSON.parse(JSON.stringify(this.state));

    temp.errors[name] = value.length ? "" : `${name} is a required field.`;

    if (name == "price") {
      //   console.log(value);
      if (value.length === 0) temp.errors[name] = "Price is a required field.";
      else if (!isFloat(value)) {
        // console.log("Invalid number.");
        temp.errors[name] = "Please enter a valid integer.";
      } else {
        temp.errors[name] = "";
      }
    }
    temp[name] = value;
    // console.log(value.length);
    this.setState(temp);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Final values", this.state);

    if (this.validateForm()) {
      //api call to backend storing values
      console.info("Valid Form");
      const temp = JSON.parse(JSON.stringify(this.state));
      delete temp.errors;
      this.props.createItem(temp,temp.type);
    } else {
      console.error("Invalid Form");
    }
  };

  handleChangeReview = (index, event) => {
    event.preventDefault();
    //  debugger;

    const { name, value } = event.target;
    // let errors = this.state.errors;
    this.setState((prevState) => {
      let temp = JSON.parse(JSON.stringify(prevState));
      //   console.log(temp, index, name);
      temp.reviews[index][name] = value;
      // console.log(temp.reviews[index]);
      temp.errors.reviews[index][name] = value.length
        ? ""
        : `${name} is a required field.`;

      if (name == "rating") {
        // console.log(value);
        if (value.length === 0)
          temp.errors.reviews[index][name] = "Rating is a required field.";
        if (
          !isNumeric(value) ||
          parseInt(value, 10) > 5 ||
          parseInt(value, 10) <= 0
        ) {
          //   console.log("Invalid number.");
          temp.errors.reviews[index][name] =
            "Please enter a valid integer from 1 to 5.";
        } else {
          temp.errors.reviews[index][name] = "";
        }
      }
      //   console.log(value.length);

      // console.log(temp);
      // console.log(prevState);
      return temp;
    });
  };
  renderReviews = () => {
    // console.log(this.state.reviews);

    return (
      <div>
        {this.state.reviews.map((elem, index) => {
          return (
            <div className="review">
              <div className="Name">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  title="name"
                  value={this.state.reviews[index].name}
                  onChange={(e) => this.handleChangeReview(index, e)}
                  noValidate
                />
              </div>
              {this.state.errors.reviews[index].name &&
                this.state.errors.reviews[index].name.length > 0 && (
                  <span className="error">
                    {this.state.errors.reviews[index].name}
                  </span>
                )}
              <div className="description">
                <label>description</label>
                <input
                  type="text"
                  name="description"
                  title="description"
                  value={this.state.reviews[index].description}
                  onChange={(e) => this.handleChangeReview(index, e)}
                  noValidate
                />
                {this.state.errors.reviews[index].description &&
                  this.state.errors.reviews[index].description.length > 0 && (
                    <span className="error">
                      {this.state.errors.reviews[index].description}
                    </span>
                  )}
              </div>
              <div className="rating">
                <label>rating</label>
                <input
                  type="text"
                  name="rating"
                  value={this.state.reviews[index].rating}
                  title="rating"
                  onChange={(e) => this.handleChangeReview(index, e)}
                  noValidate
                />
                {
                  //  console.log(this.state.errors.reviews[index].rating),
                  this.state.errors.reviews[index].rating &&
                    this.state.errors.reviews[index].rating.length > 0 && (
                      <span className="error">
                        {this.state.errors.reviews[index].rating}
                      </span>
                    )
                }
              </div>
              <div className="delete-button">
                <button type="button" onClick={() => this.handleDelete(index)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  renderForm = () => {
    var ret = [];
    // console.log(this.state);

    ret = Object.keys(this.state).map((elem, index) => {
      if (elem === "state" || elem === "errors" || elem === "image") {
        return;
      }
      if (elem === "type") {
        return (
          <div className="dropdown">
            <label for="type">Choose a Dish:</label>
            <select id="type" name="type" onChange={this.handleChange}>
              <option value="italian">Italian</option>
              <option value="indian">Indian</option>
              <option value="chinese">Chinese</option>
              <option value="continental">Continental</option>
            </select>
          </div>
        );
      }
      // console.log(elem);
      if (elem === "reviews") {
        // console.log("Reviews rendered.");
        return <div className="reviews">{this.renderReviews()}</div>;
      }

      // console.log(elem);
      if (elem === "price") {
        // console.log("price added.");
        return (
          <div className={elem}>
            <label>{elem}</label>
            <input
              type="text"
              name="price"
              name={elem}
              onChange={this.handleChange}
              value={this.state.price}
              pattern="[1-5]{1}"
              title="price"
              noValidate
            />
            {this.state.errors[elem] && this.state.errors[elem].length > 0 && (
              <span className="error">{this.state.errors[elem]}</span>
            )}
          </div>
        );
      }
      return (
        <div className={elem}>
          <label>{elem}</label>
          <input
            type="text"
            name={elem}
            onChange={this.handleChange}
            value={this.state[elem]}
            noValidate
          />
          {this.state.errors[elem] && this.state.errors[elem].length > 0 && (
            <span className="error">{this.state.errors[elem]}</span>
          )}
        </div>
      );
    });
    // console.log(ret);
    return ret;
  };
  addField = () => {
    const newState = JSON.parse(JSON.stringify(this.state));
    if (newState.reviews.length === 0) {
      newState.errors.review = "";
    }
    newState.reviews.push({ description: null, rating: null, name: null });
    newState.errors.reviews.push({
      description: null,
      rating: null,
      name: null,
    });
    // console.log(newState);
    this.setState(newState);
    //   this.setState({...this.state,this.state.reviews.append({discription:"",name:"",value:""})});
  };
  handleDelete = (index) => {
    //  console.log(index);
    const newState = JSON.parse(JSON.stringify(this.state));
    newState.reviews = newState.reviews.filter((element, id) => id != index);
    newState.errors.reviews.filter((element, id) => id != index);
    // console.log(newState);
    if (newState.reviews.length === 0) {
      newState.errors.review = `Please add at least one review.`;
    }
    this.setState(newState);
    //   this.setState({...this.state,this.state.reviews.append({discription:"",name:"",value:""})});
  };

  onImageUpload = (image) => {
    var temp = JSON.parse(JSON.stringify(this.state));
    temp.errors.image = "";
    temp.image = image;
    this.setState(temp);
  };
  render() {
    const { errors } = this.state;
    console.log(this.state);
    return (
      <div className="adminNew wrapper">
        <div className="form-wrapper">
          <h2>Add An Item</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            {this.renderForm()}
            <div className="submit">
              <FileUpload
                onImageUpload={this.onImageUpload}
                error={this.state.errors.image}
              />
              <button type="button" onClick={this.addField}>
                Create
              </button>
              {this.state.errors.review &&
                this.state.errors.review.length > 0 && (
                  <span className="error">{this.state.errors.review}</span>
                )}
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null,actions)(AdminNew);
