import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import {} from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: null,
      description: "",
    };
  }

  handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor }, () =>
      console.log(`Option selected:`, this.state.selectedDoctor)
    );
  };

  async componentDidMount() {}

  componentDidUpdate(preProps, prevState) {}

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
    console.log("handleEditorChange", html, text);
  };

  handleSaveContentMarkdown = () => {
    console.log("check state", this.state);
  };

  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  render() {
    const { selectedDoctor } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="container">
          <div className="manage-doctor-title">
            Tạo thông tin chi tiết bác sĩ
          </div>
          <div className="intro-info">
            <div className="content-left">
              <label htmlFor="doctor">Chọn bác sĩ</label>
              <Select
                value={selectedDoctor}
                onChange={this.handleChange}
                options={options}
              />
            </div>
            <div className="content-right">
              <label htmlFor="content-right">Thông tin giới thiệu</label>
              <textarea
                className="form-control"
                name=""
                rows={4}
                id="content-right"
                onChange={(e) => this.handleOnChangeDesc(e)}
                value={this.state.description}
              ></textarea>
            </div>
          </div>
          <div className="manage-doctor-editor">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
            />
          </div>
          <button
            className="save-content-doctor"
            onClick={() => this.handleSaveContentMarkdown()}
          >
            Lưu thông tin
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersRedux: state.admin.users,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
