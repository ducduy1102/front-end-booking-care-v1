import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./ManageClinic.scss";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CommonUtils } from "../../../utils";
import { createNewClinicService } from "../../../services/userService";
import { toast } from "react-toastify";

// Initialize a markdown parser
const mdParser = new MarkdownIt();
class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }
  componentDidMount() {}

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImage = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };
  handleSaveNewClinic = async () => {
    let res = await createNewClinicService(this.state);
    if (res && res.errCode === 0) {
      toast.success(res.message);
      this.setState({
        name: "",
        address: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error(res.message);
    }
  };

  render() {
    return (
      <div className="container manage-clinic-container">
        <div className="manage-clinic-title">
          <FormattedMessage id="manage-clinic.title" />
        </div>
        <div className="add-new-clinic row g-3">
          <div className="col-6">
            <label htmlFor="name" className="form-label">
              <FormattedMessage id="manage-clinic.name" />
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={this.state.name}
              onChange={(e) => this.handleOnChangeInput(e, "name")}
            />
          </div>
          <div className="col-6">
            <label htmlFor="" className="form-label">
              <FormattedMessage id="manage-clinic.image" />
            </label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => this.handleOnChangeImage(e)}
            />
          </div>
          <div className="address-clinic col-6">
            <label htmlFor="address" className="form-label">
              <FormattedMessage id="manage-clinic.address" />
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={this.state.address}
              onChange={(e) => this.handleOnChangeInput(e, "address")}
            />
          </div>
          <div className="md-editor-container">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="">
            <button
              className="btn-save-clinic"
              onClick={() => this.handleSaveNewClinic()}
            >
              <FormattedMessage id="manage-clinic.btn-save" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
