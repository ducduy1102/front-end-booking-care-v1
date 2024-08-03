import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import {
  createNewUser,
  editUser,
  fetchGenderStart,
  fetchPositionStart,
  fetchRoleStart,
} from "../../../store/actions";
import "../UserManage.scss";
import "./UserRedux.scss";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";
import TableManageUser from "./TableManageUser";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",

      action: "",
      userEditId: "",
    };
  }
  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.usersRedux !== this.props.usersRedux) {
      const { genderArr, positionArr, roleArr } = this.state;

      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        gender: genderArr && genderArr.length > 0 ? genderArr[0].key : "",
        position:
          positionArr && positionArr.length > 0 ? positionArr[0].key : "",
        role: roleArr && roleArr.length > 0 ? roleArr[0].key : "",
        avatar: "",
        action: CRUD_ACTIONS.CREATE,
      });
    }
    // component re-render => DidUpdate
    // so sánh hiện tại (this) và quá khứ (prev)
    // [3] vs []
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: this.props.genderRedux,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: this.props.roleRedux,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: this.props.positionRedux,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].key : "",
      });
    }
  }

  handleOnChangeImage = (e) => {
    let file = e.target.files[0];
    // console.log("objecturrl", objectUrl);
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: file,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  checkValidateInput = () => {
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
    ];
    let isValid = true;

    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert(`This ${arrCheck[i]} is required`);
        break;
      }
    }
    return isValid;
  };

  handleSaveUser = (event) => {
    event.preventDefault();
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      // fire redux create user
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
      });
      console.log("submit", this.state);
    }
    if (action === CRUD_ACTIONS.EDIT) {
      // fire redux edit user
      this.props.editUserRedux({
        id: this.state.userEditId,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        // avatar: this.state.avatar
      });

      console.log("submit", this.state);
    }
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({ ...copyState });
  };

  handleEditUserFromParent = (user) => {
    console.log("check handle Edit User From Parent", user);
    this.setState({
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      role: user.roleId,
      position: user.positionId,
      avatar: "",
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };

  render() {
    // console.log("check state", this.state);
    const { language, isLoading } = this.props;
    const { genderArr, positionArr, roleArr } = this.state;
    // console.log("check props from redux", this.props);
    // console.log("check state from redux", this.state);

    const {
      email,
      password,
      firstName,
      lastName,
      address,
      phoneNumber,
      gender,
      position,
      role,
      avatar,
    } = this.state;
    return (
      <div className="container user-redux-container">
        <div className="title">User Manage Redux</div>
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
                    value={email}
                    onChange={(e) => this.onChangeInput(e, "email")}
                    disabled={this.state.action === "EDIT" ? true : false}
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
                    value={password}
                    onChange={(e) => this.onChangeInput(e, "password")}
                    disabled={
                      this.state.action === CRUD_ACTIONS.EDIT ? true : false
                    }
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
                    value={firstName}
                    onChange={(e) => this.onChangeInput(e, "firstName")}
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
                    value={lastName}
                    onChange={(e) => this.onChangeInput(e, "lastName")}
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
                    value={phoneNumber}
                    onChange={(e) => this.onChangeInput(e, "phoneNumber")}
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
                    value={address}
                    onChange={(e) => this.onChangeInput(e, "address")}
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="gender" className="form-label">
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    id="gender"
                    className="form-select"
                    name="gender"
                    value={gender}
                    onChange={(e) => this.onChangeInput(e, "gender")}
                  >
                    {genderArr &&
                      genderArr.length > 0 &&
                      genderArr.map((item, index) => {
                        return (
                          <option key={`gender-${index}`} value={item.key}>
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
                    value={position}
                    onChange={(e) => this.onChangeInput(e, "position")}
                  >
                    {positionArr &&
                      positionArr.length > 0 &&
                      positionArr.map((item, index) => {
                        return (
                          <option key={`position-${index}`} value={item.key}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-md-3">
                  <label htmlFor="role" className="form-label">
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select
                    id="role"
                    className="form-select"
                    name="role"
                    value={role}
                    onChange={(e) => this.onChangeInput(e, "role")}
                  >
                    {roleArr &&
                      roleArr.length > 0 &&
                      roleArr.map((item, index) => {
                        return (
                          <option key={`role-${index}`} value={item.key}>
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
                      name="preview-img"
                      id="preview-img"
                      onChange={(e) => this.handleOnChangeImage(e)}
                      hidden
                    />
                    <label className="label-upload" htmlFor="preview-img">
                      <FormattedMessage id="manage-user.upload-image" />{" "}
                      <i className="fas fa-cloud-upload-alt"></i>
                    </label>
                    <div
                      className="preview-img"
                      style={{
                        backgroundImage: `url(${this.state.previewImgURL})`,
                      }}
                      onClick={() => this.openPreviewImage()}
                    ></div>
                  </div>
                </div>
                <div className="my-3 col-12">
                  <button
                    type="submit"
                    className={
                      this.state.action === CRUD_ACTIONS.EDIT
                        ? "btn btn-warning"
                        : "btn btn-primary"
                    }
                    onClick={(e) => this.handleSaveUser(e)}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                      <FormattedMessage id="manage-user.edit" />
                    ) : (
                      <FormattedMessage id="manage-user.save" />
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <TableManageUser
          handleEditUserFromParentKey={this.handleEditUserFromParent}
        />

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
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
    // isLoading: state.admin.isLoading,
    language: state.app.language,
    usersRedux: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(fetchGenderStart()),
    getPositionStart: () => dispatch(fetchPositionStart()),
    getRoleStart: () => dispatch(fetchRoleStart()),
    createNewUser: (data) => dispatch(createNewUser(data)),
    editUserRedux: (data) => dispatch(editUser(data)),

    // processLogout: () => dispatch(actions.processLogout()),
    // previewImgURLRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
