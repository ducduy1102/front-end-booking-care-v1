import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import {
  fetchAllDoctors,
  saveDetailDoctor,
  getRequiredDoctorInfor,
} from "../../../store/actions";
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
      // save to markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: null,
      description: "",
      listDoctors: [],
      hasOldData: false,

      // save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: null,
      selectedPayment: null,
      selectedProvince: null,
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  async componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfor();
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.forEach((item, index) => {
        let object = {};
        let labelVi =
          type === "USERS"
            ? `${item.lastName} ${item.firstName}`
            : item.valueVi;
        let labelEn =
          type === "USERS"
            ? `${item.firstName} ${item.lastName}`
            : item.valueEn;

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
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
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
    if (preProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice);
      let dataSelectPayment = this.buildDataInputSelect(resPayment);
      let dataSelectProvince = this.buildDataInputSelect(resProvince);
      console.log(dataSelectPrice, dataSelectPayment, dataSelectProvince);
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });

      console.log("allRequiredDoctorInfor", this.props.allRequiredDoctorInfor);
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
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
            <FormattedMessage id="admin.manage-doctor.title" />
          </div>
          <div className="intro-infor">
            <div className="content-left">
              <label className="label">
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              </label>
              <Select
                placeholder="Chọn bác sĩ"
                value={this.state.selectedDoctor}
                onChange={this.handleChange}
                options={this.state.listDoctors}
              />
            </div>
            <div className="content-right">
              <label className="label" htmlFor="content-right">
                <FormattedMessage id="admin.manage-doctor.intro" />
              </label>
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
          <div className="more-infor-extra">
            <div className="row">
              <div className="col-4 infor-child-block">
                <label className="label" htmlFor="">
                  Chọn giá
                </label>
                <Select
                  placeholder="Chọn giá"
                  // value={this.state.selectedDoctor}
                  // onChange={this.handleChange}
                  options={this.state.listPrice}
                />
              </div>
              <div className="col-4 infor-child-block">
                <label className="label" htmlFor="">
                  Chọn phương thức thanh toán
                </label>
                <Select
                  placeholder="Chọn phương thức thanh toán"
                  // value={this.state.selectedDoctor}
                  // onChange={this.handleChange}
                  options={this.state.listPayment}
                />
              </div>
              <div className="col-4 infor-child-block">
                <label className="label" htmlFor="">
                  Chọn tỉnh/thành
                </label>
                <Select
                  placeholder="Chọn tỉnh/thành"
                  // value={this.state.selectedDoctor}
                  // onChange={this.handleChange}
                  options={this.state.listProvince}
                />
              </div>
              <div className="col-4 infor-child-block">
                <label className="label" htmlFor="">
                  Tên phòng khám
                </label>
                <input type="text" className="form-control" ame="" id="" />
              </div>
              <div className="col-4 infor-child-block">
                <label className="label" htmlFor="">
                  Địa chỉ phòng khám
                </label>
                <input type="text" className="form-control" ame="" id="" />
              </div>
              <div className="col-4 infor-child-block">
                <label className="label" htmlFor="">
                  Note
                </label>
                <input type="text" className="form-control" ame="" id="" />
              </div>
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
              <span>
                <FormattedMessage id="admin.manage-doctor.save" />
              </span>
            ) : (
              <span>
                <FormattedMessage id="admin.manage-doctor.add" />
              </span>
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
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(fetchAllDoctors()),
    getAllRequiredDoctorInfor: () => dispatch(getRequiredDoctorInfor()),
    saveDetailDoctor: (data) => dispatch(saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
