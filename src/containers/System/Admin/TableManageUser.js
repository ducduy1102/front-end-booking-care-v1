import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import { deleteUser, fetchAllUserStart } from "../../../store/actions";
// import { emitter } from "../../utils/emitter";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      userEdit: {},
    };
  }

  async componentDidMount() {
    this.props.fetchUsersRedux();
  }

  componentDidUpdate(preProps, prevState) {
    if (preProps.usersRedux !== this.props.usersRedux) {
      this.setState({
        usersRedux: this.props.usersRedux,
      });
    }
  }

  handleEditUser = () => {
    console.log("edit user");
  };

  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id);
  };
  render() {
    let arrUsers = this.state.usersRedux;
    // console.log("check users", this.props.usersRedux);
    // console.log("check state users", this.state.usersRedux);
    return (
      <div className="users-container">
        <div className="container">
          <div className="users-content">
            <div className="mt-3 mb-5 table-user">
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
                    <th>Role</th>
                    <th>Position</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {arrUsers && arrUsers.length > 0 ? (
                    arrUsers.map((item, index) => {
                      return (
                        <tr key={`user-${index}`}>
                          <th scope="row">{item.id}</th>
                          <td>{item.email}</td>
                          <td>{item.firstName}</td>
                          <td>{item.lastName}</td>
                          <td>{item.address}</td>
                          <td>{item.gender === 1 ? "Male" : "Female"}</td>
                          <td>{item.phoneNumber}</td>
                          <td>
                            {item.roleId === "R1"
                              ? "Admin"
                              : item.roleId === "R2"
                              ? "Doctor"
                              : "Patient"}
                          </td>
                          <td>{item.positionId} </td>
                          <td>
                            <button
                              className="btn-edit"
                              //   onClick={() => this.handleEditUser(item)}
                            >
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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersRedux: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsersRedux: () => dispatch(fetchAllUserStart()),
    deleteUserRedux: (id) => dispatch(deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
