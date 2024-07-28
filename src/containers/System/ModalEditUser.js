import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      roleId: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    // check ko rỗng
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        roleId: user.roleId,
      });
    }
    // console.log("mouting modal", this.props.currentUser);
  }

  toggle = () => {
    this.props.toggleUserModal();
  };

  handleOnChangeInput = (event, name) => {
    let copyState = { ...this.state };
    copyState[name] = event.target.value;
    this.setState({ ...copyState });
  };

  checkValidateInputs = () => {
    let arrInput = [
      "email",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
      "gender",
      "roleId",
    ];
    let isValid = true;
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        alert("Missing parameters: " + arrInput[i]);
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  handleEditUser = () => {
    let isValid = this.checkValidateInputs();
    if (isValid === true) {
      // call api create model
      this.props.editUser(this.state);
    }
    console.log("data", this.state);
  };

  render() {
    console.log("check props", this.props);
    return (
      <>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.toggle()}
          centered
          className="modal-user-container"
          size="lg"
        >
          <ModalHeader toggle={() => this.toggle()}>Edit user</ModalHeader>
          <ModalBody>
            <form className="row g-3">
              <div className="form-group col-sm-6">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.handleOnChangeInput(e, "email")}
                  disabled
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="*********"
                  id="password"
                  name="password"
                  disabled
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={(e) => this.handleOnChangeInput(e, "firstName")}
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={(e) => this.handleOnChangeInput(e, "lastName")}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={this.state.address}
                  onChange={(e) => this.handleOnChangeInput(e, "address")}
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  onChange={(e) => this.handleOnChangeInput(e, "phoneNumber")}
                />
              </div>
              <div className="form-group col-sm-3">
                <label className="form-label">Sex</label>
                <select
                  className="form-select"
                  name="gender"
                  value={this.state.gender}
                  onChange={(e) => this.handleOnChangeInput(e, "gender")}
                >
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
              </div>
              <div className="form-group col-sm-3">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  value={this.state.roleId}
                  onChange={(e) => this.handleOnChangeInput(e, "roleId")}
                >
                  <option value="1">Admin</option>
                  <option value="2">Doctor</option>
                  <option value="3">Patient</option>
                </select>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              className="px-3"
              onClick={() => this.toggle()}
            >
              Close
            </Button>
            <Button
              color="primary"
              className="px-3"
              onClick={() => this.handleEditUser()}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);