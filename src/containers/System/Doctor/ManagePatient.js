import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import { DatePicker } from "../../../components/Input";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
    };
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  render() {
    return (
      <div className="manage-patient-container">
        <div className="manage-patient-title">
          <FormattedMessage id="manage-patient.title" />
        </div>
        <div className="container manage-patient-body">
          <div className="row g-3">
            <div className="col-4">
              <label htmlFor="" className="form-label">
                Chọn ngày khám
              </label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control date-picker"
                value={this.state.currentDate}
              />
            </div>
            <div className="mt-3 mb-5 table-manage-patient">
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
                  <tr>
                    <th scope="row"></th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <button
                        className="btn-edit"
                        //   onClick={() => handleEditUser(item)}
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        type="submit"
                        className="btn-delete"
                        //   onClick={() => handleDeleteUser(item)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                  <>
                    <tr>
                      <td colSpan={9} className="text-center">
                        Not found users
                      </td>
                    </tr>
                  </>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
