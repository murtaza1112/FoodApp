import React, { Component } from "react";
import "./AdminControl.css";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = (errors) => {
  let valid = true;
  console.log("Submit called:", errors);
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  console.log(valid);
  return valid;
};
//checking if number is valid
function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

// form = {};
class AdminControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      shortDescription: null,
      description: null,
      price: null,
      reviews: [],
      picUrl: null,
      errors: {
        name: "",
        shortDescription: "",
        description: "",
        price: "",
        picUrl: "",
        reviews: [],
      },
    };
  }
  //reviews are rating,description,name
  //errors are errors.review[i].rating

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    // let errors = this.state.errors;
    const temp = JSON.parse(JSON.stringify(this.state));

    if (name == "price") {
      if (isNumeric(value)) {
        if (parseInt(value, 10) >= 5)
          temp.errors[name] = "The max rating is 5.";
      } else {
        temp.errors[name] = "Please enter a valid integer number.";
      }
    }
    temp[name] = value;
    temp.errors[name] = value.length ? "" : `${name} is a required field.`;
    this.setState(temp);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Final values", this.state);
    if (validateForm(this.state.errors)) {
      console.info("Valid Form");
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
      console.log(temp, index, name);
      temp.reviews[index][name] = value;
      //   console.log(temp.reviews[index]);

      if (name == "rating") {
        console.log("Checking if number is rating.");
        if (isNumeric(value)) {
          if (parseInt(value, 10) >= 5)
            temp.errors.reviews[name] = "The max rating is 5.";
        } else {
          console.log("Error in nu,ber");
          temp.errors.reviews[name] = "Please enter a valid integer number.";
        }
      }
      temp.errors.reviews[index][name] = value.length ? "" : `${name} is a required field.`;

    //   console.log(temp);
    //   console.log(prevState);
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
                  title="rating"
                  onChange={(e) => this.handleChangeReview(index, e)}
                  noValidate
                />
                {this.state.errors.reviews[index].rating &&
                  this.state.errors.reviews[index].rating.length > 0 && (
                    <span className="error">
                      {this.state.errors.reviews[index].rating}
                    </span>
                  )}
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
      if (elem === "state" || elem === "errors" || elem === "picUrl") {
        return;
      }
      //   console.log(elem);
      if (elem === "reviews") {
        // console.log("Reviews rendered.");
        return <div className="reviews">{this.renderReviews()}</div>;
      }

      //   console.log(elem);
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
    const newState = JSON.parse(JSON.stringify(this.state));
    newState.reviews = newState.reviews.filter((element, id) => id != index);
    newState.errors.reviews.filter((element, id) => id != index);
    // console.log(newState);
    this.setState(newState);
    //   this.setState({...this.state,this.state.reviews.append({discription:"",name:"",value:""})});
  };
  render() {
    const { errors } = this.state;
    console.log(this.state);
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h2>Add A Form</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            {this.renderForm()}
            <div className="submit">
              <button type="button" onClick={this.addField}>
                Create
              </button>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AdminControl;
