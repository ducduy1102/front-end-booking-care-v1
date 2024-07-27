import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
    };
  }

  async componentDidMount() {
    await this.getAllUsers();
  }

  getAllUsers = async () => {
    let res = await getAllUsers("ALL");
    // console.log("all user", res);
    if (res && res.errCode === 0) {
      this.setState({
        arrUsers: res.users,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  createNewUser = async (data) => {
    try {
      const res = await createNewUserService(data);
      if (res && res.errCode !== 0) {
        alert(res.message);
      } else {
        await this.getAllUsers();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUsers();
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * Life cycle react
   * Run component:
   * 1. Run constructor => init state
   * 2. Did mount (set state)
   * 3. Render
   * @returns
   */
  render() {
    // console.log("check render", this.state);
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <div className="container">
          <ModalUser
            isOpen={this.state.isOpenModalUser}
            toggleUserModal={this.toggleUserModal}
            createNewUser={this.createNewUser}
          />
          <div className="text-center title">Manage Users</div>
          <div className="mx-1">
            <button
              className="btn btn-primary btn-add-new"
              onClick={() => this.handleAddNewUser()}
            >
              <i className="fa fa-plus-circle "></i> Add new user
            </button>
          </div>
          <div className="users-content">
            <div className="mt-3 table-user">
              <table className="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Gender</th>
                    <th>Phone Number</th>
                    <th>RoleId</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {arrUsers && arrUsers.length > 0 ? (
                    arrUsers.map((item, index) => {
                      return (
                        <tr key={`user-${index}`}>
                          <th scope="row">{item.id}</th>
                          <td> {item.email} </td>
                          <td> {item.firstName} </td>
                          <td> {item.lastName} </td>
                          <td> {item.address} </td>
                          <td> {item.gender}</td>
                          <td> {item.phoneNumber} </td>
                          <td> {item.roleId} </td>
                          <td>
                            <button className="btn-edit">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              type="submit"
                              className="btn-delete"
                              onClick={() => this.handleDeleteUser(item)}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <>
                      <tr>
                        <td colSpan={9} className="text-center">
                          Not found users
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
            {/* <ModalUser
        onHide={onHideModalUser}
        show={isShowModalUser}
        action={actionModalUser}
        dataModalUser={dataModalUser}
      /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
