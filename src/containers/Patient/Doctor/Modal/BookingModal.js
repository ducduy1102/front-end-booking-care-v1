import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";
import "./BookingModal.scss";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import { DatePicker } from "../../../../components/Input";
import { fetchGenderStart } from "../../../../store/actions";
import Select from "react-select";
import { postPatientBookAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      doctorId: "",
      genders: "",
      timeType: "",
      isShowLoading: false,
    };
  }
  async componentDidMount() {
    this.props.fetchGender();
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.forEach((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;

        this.setState({ doctorId: doctorId, timeType: timeType });
      }
    }
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({ ...stateCopy });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleOnChangeSelect = (selectedOptions) => {
    this.setState({
      selectedGender: selectedOptions,
    });
  };

  buildTimeBooking(dataTime) {
    let { language } = this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      date = this.capitalizeFirstLetter(date);
      return `${time} &nbsp; ${date}`;
    }
    return "";
  }

  buildDoctorName = (dataTime) => {
    let { language } = this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;

      return `${name}`;
    }
    return "";
  };

  handleConfirmBooking = async () => {
    // validate input
    // let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);

    this.setState({
      isShowLoading: true,
    });

    let res = await postPatientBookAppointment({
      fullname: this.state.fullname,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataTime.date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });

    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success(res.message);
      this.props.closeBookingModal();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error(res.message);
    }
  };

  render() {
    let { isOpenModal, closeBookingModal, dataTime } = this.props;
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }

    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <Modal
            isOpen={isOpenModal}
            className="booking-modal-container"
            size="lg"
            centered
          >
            <div className="booking-modal-content">
              <div className="booking-modal-header">
                <span className="header-title">
                  <FormattedMessage id="patient.booking-modal.title" />
                </span>
                <span className="header-close" onClick={closeBookingModal}>
                  <i className="fas fa-times"></i>
                </span>
              </div>
              <div className="booking-modal-body">
                <div className="doctor-infor">
                  <ProfileDoctor
                    doctorId={doctorId}
                    isShowDescriptionDoctor={false}
                    dataTime={dataTime}
                    isShowLinkDetail={false}
                    isShowPrice={true}
                  />
                </div>
                <div className="row g-3">
                  <div className="col-6">
                    <label className="form-label" htmlFor="fullname">
                      <FormattedMessage id="patient.booking-modal.fullname" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullname"
                      value={this.state.fullname}
                      onChange={(e) => this.handleOnChangeInput(e, "fullname")}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label" htmlFor="phoneNumber">
                      <FormattedMessage id="patient.booking-modal.phoneNumber" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      value={this.state.phoneNumber}
                      onChange={(e) =>
                        this.handleOnChangeInput(e, "phoneNumber")
                      }
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label" htmlFor="">
                      <FormattedMessage id="patient.booking-modal.email" />
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={this.state.email}
                      onChange={(e) => this.handleOnChangeInput(e, "email")}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label" htmlFor="">
                      <FormattedMessage id="patient.booking-modal.address" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      value={this.state.address}
                      onChange={(e) => this.handleOnChangeInput(e, "address")}
                    />
                  </div>
                  <div className="">
                    <label className="form-label" htmlFor="">
                      <FormattedMessage id="patient.booking-modal.reason" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="reason"
                      value={this.state.reason}
                      onChange={(e) => this.handleOnChangeInput(e, "reason")}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label" htmlFor="">
                      <FormattedMessage id="patient.booking-modal.birthday" />
                    </label>
                    <DatePicker
                      onChange={this.handleOnChangeDatePicker}
                      className="form-control date-picker"
                      value={this.state.birthday}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label" htmlFor="">
                      <FormattedMessage id="patient.booking-modal.gender" />
                    </label>
                    <Select
                      placeholder={
                        <FormattedMessage id="patient.booking-modal.selectGender" />
                      }
                      value={this.state.selectedGender}
                      onChange={this.handleOnChangeSelect}
                      options={this.state.genders}
                    />
                  </div>
                </div>
              </div>
              <div className="booking-modal-footer">
                <button
                  className="btn-booking-confirm"
                  onClick={() => this.handleConfirmBooking()}
                >
                  <FormattedMessage id="patient.booking-modal.btnConfirm" />
                </button>
                <button
                  className="btn-booking-cancel"
                  onClick={closeBookingModal}
                >
                  <FormattedMessage id="patient.booking-modal.btnCancel" />
                </button>
              </div>
            </div>
          </Modal>
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGender: () => dispatch(fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
