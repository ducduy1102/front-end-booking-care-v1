import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import "./ManageSpecialty.scss";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CommonUtils } from "../../../utils";
import { createNewSpecialtyService } from "../../../services/userService";
import { toast } from "react-toastify";

// Initialize a markdown parser
const mdParser = new MarkdownIt();
class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
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
  handleSaveNewSpecialty = async () => {
    let res = await createNewSpecialtyService(this.state);
    if (res && res.errCode === 0) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  render() {
    return (
      <div className="container manage-specialty-container">
        <div className="manage-specialty-title">Manage Specialty</div>
        <div className="add-new-specialty row g-3">
          <div className="col-6">
            <label htmlFor="name" className="form-label">
              Tên chuyên khoa
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
              Tên chuyên khoa
            </label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => this.handleOnChangeImage(e)}
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
              className="btn-save-specialty"
              onClick={() => this.handleSaveNewSpecialty()}
            >
              Save
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
