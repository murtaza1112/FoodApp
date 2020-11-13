import React, { useState } from "react";
// import Alert from "../components/Alert";

class FileUpload extends React.Component {
  state = {
    fileInputState: "",
    previewSource: "",
  };

  componentDidMount() {
    console.log(this.props.image);
    if (this.props.image)
      this.setState({ fileInputState: this.props.image, previewSource: this.props.image });
  }

  handleFileInputChange = (e) => {
    const file = e.target.files[0];
    this.previewFile(file);
    this.setState({ ...this.state, fileInputState: e.target.value });
  };

  previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.uploadImage(reader.result);
      this.setState({ ...this.setState,previewSource:reader.result });
    };
  };

  uploadImage = async (base64EncodedImage) => {
    try {
      //   await fetch("/api/upload", {
      //     method: "POST",
      //     body: JSON.stringify({ data: base64EncodedImage }),
      //     headers: { "Content-Type": "application/json" },
      //   });
      this.props.onImageUpload(base64EncodedImage);
      // setSuccessMsg("Image uploaded successfully");
      console.log("Image upload successful.")
    } catch (err) {
      console.error(err);
      // setErrMsg("Something went wrong!");
    }
  };
  render() {
    console.log(this.state);
    return (
      <div>
        {/* <Alert msg={errMsg} type="danger" /> */}
        {/* <Alert msg={successMsg} type="success" /> */}
        <span>Upload Image</span>
        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={this.handleFileInputChange}
          className="form-input"
          accept="image/x-png,image/gif,image/jpeg"
        />
        {this.props.error && <span className="error">{this.props.error}</span>}
        {this.state.previewSource && (
          <img src={this.state.previewSource} alt="chosen" style={{ height: "300px" }} />
        )}
      </div>
    );
  }
}

export default FileUpload;
