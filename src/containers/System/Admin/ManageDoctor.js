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
      selectedDoctor: "",
      description: "",
      listDoctors: [],
      hasOldData: false,

      // save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
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
      if (type === "USERS") {
        inputData.forEach((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.forEach((item, index) => {
          let object = {};
          let labelVi = item.valueVi;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.forEach((item, index) => {
          let object = {};
          let labelVi = item.valueVi;
          let labelEn = item.valueEn;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
    }
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

    if (preProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
      let { resPrice, resPayment, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      console.log(dataSelectPrice, dataSelectPayment, dataSelectProvince);
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
    if (preProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      let { resPrice, resPayment, resProvince } =
        this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
    // console.log(stateCopy);
    // this.setState({
    //   description: event.target.value,
    // });
  };

  handleChange = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    let res = await getDetailInforDoctorService(selectedDoctor.value);
    // console.log(`Option selected:`, res);
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

  handleChangeSelectDoctorInfor = (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({ ...stateCopy });
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

      priceId: this.state.selectedPrice.value,
      paymentId: this.state.selectedPayment.value,
      provinceId: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
  };

  render() {
    let { hasOldData } = this.state;
    // console.log(this.state);
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
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.select-doctor" />
                }
                value={this.state.selectedDoctor}
                onChange={this.handleChange}
                options={this.state.listDoctors}
                name={"selectedDoctor"}
              />
            </div>
            <div className="content-right">
              <label className="label" htmlFor="description">
                <FormattedMessage id="admin.manage-doctor.intro" />
              </label>
              <textarea
                className="form-control"
                rows={4}
                id="description"
                onChange={(e) => this.handleOnChangeText(e, "description")}
                value={this.state.description}
              ></textarea>
            </div>
          </div>
          <div className="more-infor-extra">
            <div className="row">
              <div className="col-4 infor-child-block">
                <label className="label" htmlFor="">
                  <FormattedMessage id="admin.manage-doctor.price" />
                </label>
                <Select
                  placeholder={
                    <FormattedMessage id="admin.manage-doctor.price" />
                  }
                  value={this.state.selectedPrice}
                  onChange={this.handleChangeSelectDoctorInfor}
                  options={this.state.listPrice}
                  name="selectedPrice"
                />
              </div>
              <div className="col-4 infor-child-block">
                <label className="label" htmlFor="">
                  <FormattedMessage id="admin.manage-doctor.payment" />
                </label>
                <Select
                  placeholder={
                    <FormattedMessage id="admin.manage-doctor.payment" />
                  }
                  value={this.state.selectedPayment}
                  onChange={this.handleChangeSelectDoctorInfor}
                  options={this.state.listPayment}
                  name="selectedPayment"
                />
              </div>
              <div className="col-4 infor-child-block">
                <label className="label" htmlFor="">
                  <FormattedMessage id="admin.manage-doctor.province" />
                </label>
                <Select
                  placeholder={
                    <FormattedMessage id="admin.manage-doctor.province" />
                  }
                  value={this.state.selectedProvince}
                  onChange={this.handleChangeSelectDoctorInfor}
                  options={this.state.listProvince}
                  name="selectedProvince"
                />
              </div>
              <div className="col-4 infor-child-block">
                <label className="label" htmlFor="nameClinic">
                  <FormattedMessage id="admin.manage-doctor.name-clinic" />
                </label>
                <input
                  id="nameClinic"
                  type="text"
                  className="form-control"
                  value={this.state.nameClinic}
                  onChange={(e) => this.handleOnChangeText(e, "nameClinic")}
                />
              </div>
              <div className="col-4 infor-child-block">
                <label className="label" htmlFor="addressClinic">
                  <FormattedMessage id="admin.manage-doctor.address-clinic" />
                </label>
                <input
                  id="addressClinic"
                  type="text"
                  className="form-control"
                  value={this.state.addressClinic}
                  onChange={(e) => this.handleOnChangeText(e, "addressClinic")}
                />
              </div>
              <div className="col-4 infor-child-block">
                <label className="label" htmlFor="note">
                  <FormattedMessage id="admin.manage-doctor.note" />
                </label>
                <input
                  id="note"
                  type="text"
                  className="form-control"
                  value={this.state.note}
                  onChange={(e) => this.handleOnChangeText(e, "note")}
                />
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
