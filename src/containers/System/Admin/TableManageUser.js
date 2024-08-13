import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import { deleteUser, fetchAllUserStart } from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

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

  handleEditUser = (user) => {
    this.props.handleEditUserFromParentKey(user);
    console.log("user edit", user);
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
                    <th>
                      <FormattedMessage id="manage-user.email" />
                    </th>
                    <th>
                      <FormattedMessage id="manage-user.first-name" />
                    </th>
                    <th>
                      <FormattedMessage id="manage-user.last-name" />
                    </th>
                    <th>
                      <FormattedMessage id="manage-user.address" />
                    </th>
                    <th>
                      <FormattedMessage id="manage-user.gender" />
                    </th>
                    <th>
                      <FormattedMessage id="manage-user.phone-number" />
                    </th>
                    <th>
                      <FormattedMessage id="manage-user.role" />
                    </th>
                    <th>
                      <FormattedMessage id="manage-user.position" />
                    </th>
                    <th>
                      <FormattedMessage id="manage-user.actions" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {arrUsers && arrUsers.length > 0 ? (
                    arrUsers.map((item, index) => {
                      const gender = this.props.genderRedux.find(
                        (g) => g.keyMap === item.gender
                      );
                      const position = this.props.positionRedux.find(
                        (p) => p.keyMap === item.positionId
                      );
                      const role = this.props.roleRedux.find(
                        (r) => r.keyMap === item.roleId
                      );

                      return (
                        <tr key={`user-${index}`}>
                          <th scope="row">{item.id}</th>
                          <td>{item.email}</td>
                          <td>{item.firstName}</td>
                          <td>{item.lastName}</td>
                          <td>{item.address}</td>
                          <td>
                            {gender && this.props.language === LANGUAGES.VI
                              ? gender.valueVi
                              : gender && this.props.language === LANGUAGES.EN
                              ? gender.valueEn
                              : ""}
                          </td>
                          <td>{item.phoneNumber}</td>
                          <td>
                            {role && this.props.language === LANGUAGES.VI
                              ? role.valueVi
                              : role.valueEn}
                          </td>
                          <td>
                            {position && this.props.language === LANGUAGES.VI
                              ? position.valueVi
                              : position && this.props.language === LANGUAGES.VI
                              ? position.valueEn
                              : ""}
                          </td>
                          <td>
                            <button
                              className="btn-edit"
                              onClick={() => this.handleEditUser(item)}
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
              <MdEditor
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
              />
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
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsersRedux: () => dispatch(fetchAllUserStart()),
    deleteUserRedux: (id) => dispatch(deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
