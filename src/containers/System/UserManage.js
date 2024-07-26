import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getALLUsers } from "../../services/userService";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
    };
  }

  async componentDidMount() {
    let res = await getALLUsers("ALL");
    console.log("all user", res);
    if (res && res.errCode === 0) {
      this.setState(
        {
          arrUsers: res.users,
        },
        () => {
          console.log(this.state.arrUsers);
        }
      );
    }
  }
  /**
   * Life cycle react
   * Run component:
   * 1. Run constructor => init state
   * 2. Did mount (set state)
   * 3. Render
   * @returns
   */
  render() {
    console.log("check render", this.state);
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <div className="text-center title">Manage Users</div>
        <div className="users-table">
          <div className="container">
            <div className="row">
              <div className="mt-3 table-user">
                {/* <h3>Table users</h3> */}
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
                    {arrUsers &&
                      arrUsers.length > 0 &&
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
                                <i class="fas fa-edit"></i>
                              </button>
                              <button type="submit" className="btn-delete">
                                <i class="fas fa-trash-alt"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
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
