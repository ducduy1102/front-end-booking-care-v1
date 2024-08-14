import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { fetchAllDoctors, fetchAllScheduleTime } from "../../../store/actions";
import { dateFormat, LANGUAGES } from "../../../utils";
import { DatePicker } from "../../../components/Input";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { saveBulkScheduleDoctorService } from "../../../services/userService";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: {},
      listDoctors: [],
      currentDate: "",
      rangeTime: [],
    };
  }

  async componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllScheduleTime();
  }
  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.forEach((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;

        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  componentDidUpdate(preProps, prevState, snapshot) {
    if (preProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (preProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (preProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      // console.log("check data after", data);
      this.setState({
        rangeTime: data,
      });
    }
  }

  handleChange = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };

  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];

    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Please select doctor");
      return;
    }
    if (!currentDate) {
      toast.error("Invalid date");
      return;
    }
    // let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);

    // format về timestamp (dạng số)
    // let formattedDate = moment(currentDate).unix();
    let formattedDate = new Date(currentDate).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected);

      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formattedDate;
          object.timeType = schedule.keyMap;
          result.push(object);
          return result;
        });
      } else {
        toast.error("Invalid selected time!");
        return;
      }
    }

    let res = await saveBulkScheduleDoctorService({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formattedDate: formattedDate,
    });

    if (res && res.errCode === 0) {
      toast.success("Save info successfully!");
    } else {
      toast.error(res.message);
    }
    // console.log("check res save", res);
    // console.log("result", result);
  };

  render() {
    console.log("check state", this.state);
    let { rangeTime } = this.state;
    let { language } = this.props;
    console.log("check rangetime", this.state.rangeTime);
    return (
      <div className="manage-schedule-container">
        <div className="manage-schedule-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label htmlFor="" className="label">
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                placeholder={
                  <FormattedMessage id="manage-schedule.selectDoctor" />
                }
                value={this.state.selectedDoctor}
                onChange={this.handleChange}
                options={this.state.listDoctors}
              />
            </div>
            <div className="col-6 form-group">
              <label htmlFor="" className="label">
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                onChange={this.handleOnChangeDatePicker}
                className="form-control date-picker"
                value={this.state.currentDate[0]}
                minDate={new Date().setHours(0, 0, 0, 0)}
              />
            </div>
          </div>
          <div className="pick-hour-container">
            {rangeTime &&
              rangeTime.length > 0 &&
              rangeTime.map((item, index) => {
                return (
                  <button
                    key={`time-${index}`}
                    className={
                      item.isSelected
                        ? "btn btn-schedule active"
                        : "btn btn-schedule"
                    }
                    onClick={() => this.handleClickBtnTime(item)}
                  >
                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                  </button>
                );
              })}
          </div>
          <button
            className="btn btn-primary"
            onClick={() => this.handleSaveSchedule()}
          >
            <FormattedMessage id="manage-schedule.save" />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
