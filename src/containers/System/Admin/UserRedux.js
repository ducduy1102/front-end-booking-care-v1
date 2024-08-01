import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import {
  fetchGenderStart,
  fetchPositionStart,
  fetchRoleStart,
} from "../../../store/actions";
import "../UserManage.scss";
import "./UserRedux.scss";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImagURL: "",
      isOpen: false,
    };
  }
  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // this.initLightboxJS(
    //   "Insert your License Key here",
    //   "Insert plan type here"
    // );

    // try {
    //   let res = await getAllCodeService("GENDER");
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArr: res.data,
    //     });
    //   }
    //   // console.log("res", res);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // component re-render => DidUpdate
    // so sánh hiện tại (this) và quá khứ (prev)
    // [3] vs []
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        roleArr: this.props.roleRedux,
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      this.setState({
        positionArr: this.props.positionRedux,
      });
    }
  }

  handleOnChangeImage = (e) => {
    let file = e.target.files[0];
    // console.log("objecturrl", objectUrl);
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImagURL: objectUrl,
      });
    }
  };
  openPreviewImage = () => {
    if (!this.state.previewImagURL) return;
    this.setState({
      isOpen: true,
    });
  };
  render() {
    // console.log("check state", this.state);
    const { language, isLoading } = this.props;
    const { genderArr, positionArr, roleArr } = this.state;
    // console.log("check props from redux", this.props);
    // console.log("check state from redux", this.state);
    return (
      <div className="container user-redux-container">
        <div className="title">User Manage Redux</div>
        {isLoading === true ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="user-redux-body">
            <div className="container">
              <div className="row">
                <form className="row g-3">
                  <div className="my-3 col-12">
                    <FormattedMessage id="manage-user.add" />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="email" className="form-label">
                      <FormattedMessage id="manage-user.email" />
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter your email..."
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="password" className="form-label">
                      <FormattedMessage id="manage-user.password" />
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Enter your password..."
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="firstName" className="form-label">
                      <FormattedMessage id="manage-user.first-name" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      placeholder="Enter your first name..."
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="lastName" className="form-label">
                      <FormattedMessage id="manage-user.last-name" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      placeholder="Enter your last name..."
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="phoneNumber" className="form-label">
                      <FormattedMessage id="manage-user.phone-number" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Enter your phone number..."
                    />
                  </div>
                  <div className="col-md-9">
                    <label htmlFor="address" className="form-label">
                      <FormattedMessage id="manage-user.address" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      placeholder="Enter your address..."
                    />
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="gender" className="form-label">
                      <FormattedMessage id="manage-user.gender" />
                    </label>
                    <select id="gender" className="form-select" name="gender">
                      {genderArr &&
                        genderArr.length > 0 &&
                        genderArr.map((item, index) => {
                          return (
                            <option key={`gender-${index}`}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="position" className="form-label">
                      <FormattedMessage id="manage-user.position" />
                    </label>
                    <select
                      id="position"
                      className="form-select"
                      name="position"
                    >
                      {positionArr &&
                        positionArr.length > 0 &&
                        positionArr.map((item, index) => {
                          return (
                            <option key={`position-${index}`}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="roleId" className="form-label">
                      <FormattedMessage id="manage-user.role" />
                    </label>
                    <select id="roleId" className="form-select" name="roleId">
                      {roleArr &&
                        roleArr.length > 0 &&
                        roleArr.map((item, index) => {
                          return (
                            <option key={`role-${index}`}>
                              {language === LANGUAGES.VI
                                ? item.valueVi
                                : item.valueEn}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="avatar" className="form-label">
                      <FormattedMessage id="manage-user.avatar" />
                    </label>
                    <div className="preview-img-container">
                      <input
                        type="file"
                        name=""
                        id="preview-img"
                        onChange={(e) => this.handleOnChangeImage(e)}
                        hidden
                      />
                      <label className="label-upload" htmlFor="preview-img">
                        Tải ảnh <i className="fas fa-cloud-upload-alt"></i>
                      </label>
                      <div
                        className="preview-img"
                        style={{
                          backgroundImage: `url(${this.state.previewImagURL})`,
                        }}
                        onClick={() => this.openPreviewImage()}
                      ></div>
                    </div>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      <FormattedMessage id="manage-user.save" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImagURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoading: state.admin.isLoading,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(fetchGenderStart()),
    getPositionStart: () => dispatch(fetchPositionStart()),
    getRoleStart: () => dispatch(fetchRoleStart()),

    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
