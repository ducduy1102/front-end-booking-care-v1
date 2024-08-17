import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import { DatePicker } from "../../../components/Input";
import { getAllPatientForDoctorService } from "../../../services/userService";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      dataPatient: [],
    };
  }
  async componentDidMount() {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(
      new Date(currentDate).setHours(0, 0, 0, 0)
    ).getTime();
    this.getDataPatient(user, formatedDate);
    console.log(this.state);
  }

  getDataPatient = async (user, formatedDate) => {
    let res = await getAllPatientForDoctorService({
      doctorId: user.id,
      date: formatedDate,
    });

    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
    console.log("res", res);
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(
          new Date(currentDate).setHours(0, 0, 0, 0)
        ).getTime();
        this.getDataPatient(user, formatedDate);
      }
    );
  };

  handleConfirm = () => {};

  handleSendInvoice = () => {};

  render() {
    let { language } = this.props;
    let { dataPatient } = this.state;
    return (
      <div className="manage-patient-container">
        <div className="manage-patient-title">
          <FormattedMessage id="manage-patient.title" />
        </div>
        <div className="container manage-patient-body">
          <div className="row g-3">
            <div className="col-4">
              <label htmlFor="" className="form-label">
                <FormattedMessage id="manage-patient.select-date" />
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
                      <FormattedMessage id="manage-patient.time" />
                    </th>
                    <th>
                      <FormattedMessage id="manage-patient.fullname" />
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
                      <FormattedMessage id="manage-user.actions" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataPatient && dataPatient.length > 0 ? (
                    dataPatient.map((item, index) => {
                      return (
                        <tr key={`patient-${index}`}>
                          <th scope="row">{item.id}</th>
                          <td>{item?.patientData.email}</td>
                          <td>
                            {language === LANGUAGES.VI
                              ? item?.timeTypeDataPatient.valueVi
                              : item?.timeTypeDataPatient.valueEn}
                          </td>
                          <td>{item?.patientData.firstName}</td>
                          <td>{item?.patientData.address}</td>
                          <td>
                            {language === LANGUAGES.VI
                              ? item?.patientData?.genderData.valueVi
                              : item?.patientData.genderData.valueEn}
                          </td>
                          <td>{item?.patientData.phoneNumber}</td>
                          <td>
                            <button
                              className="btn-confirm"
                              onClick={() => this.handleConfirm(item)}
                            >
                              <FormattedMessage id="manage-patient.confirm" />
                              {/* <i class="fas fa-check-square"></i> */}
                            </button>
                            <button
                              type="submit"
                              className="btn-send-invoice"
                              onClick={() => this.handleSendInvoice(item)}
                            >
                              <FormattedMessage id="manage-patient.send" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <>
                      <tr>
                        <td colSpan={9} className="text-center">
                          <FormattedMessage id="manage-patient.not-found-patient" />
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
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
