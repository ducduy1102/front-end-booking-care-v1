import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import { fetchAllDoctors, saveDetailDoctor } from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { getDetailInforDoctorService } from "../../../services/userService";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: null,
      description: "",
      listDoctors: [],
      hasOldData: false,
    };
  }

  async componentDidMount() {
    this.props.fetchAllDoctors();
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.forEach((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;

        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    // console.log("inputdata", inputData);
    return result;
  };

  componentDidUpdate(preProps, prevState, snapshot) {
    if (preProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (preProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
    // console.log("handleEditorChange", html, text);
  };

  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleSaveContentMarkdown = () => {
    // console.log("check state", this.state);
    let hasOldData = this.state.hasOldData;
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
  };

  handleChange = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    let res = await getDetailInforDoctorService(selectedDoctor.value);
    console.log(`Option selected:`, res);
    if (res && res.errCode === 0 && res?.data?.Markdown) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
  };

  render() {
    let { hasOldData } = this.state;
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
                value={this.state.selectedDoctor}
                onChange={this.handleChange}
                options={this.state.listDoctors}
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
              value={this.state.contentMarkdown}
            />
          </div>
          <button
            className={
              hasOldData ? "save-content-doctor" : "create-content-doctor"
            }
            onClick={() => this.handleSaveContentMarkdown()}
          >
            {hasOldData ? (
              <span>Lưu thông tin</span>
            ) : (
              <span>Tạo thông tin</span>
            )}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
