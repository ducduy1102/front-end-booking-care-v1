import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import { LANGUAGES } from "../../../utils";
import "./DoctorSchedule.scss";
import moment from "moment";
import "moment/locale/vi";
import { getScheduleDoctorByDateService } from "../../../services/userService";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
    };
  }
  componentDidMount() {
    console.log("moment vie", moment(new Date()).format("dddd - DD/MM"));
    console.log(
      "moment en",
      moment(new Date()).locale("en").format("ddd - DD/MM")
    );
    this.setArrDays(this.props.language);
  }

  setArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        object.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM");
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    this.setState({ allDays: allDays });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setArrDays(this.props.language);
    }
  }

  handleOnChangeSelectDate = async (e) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = e.target.value;

      let res = await getScheduleDoctorByDateService(doctorId, date);
      console.log("check res schedule", res);
    }
  };

  render() {
    let { allDays } = this.state;
    return (
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select onChange={(e) => this.handleOnChangeSelectDate(e)}>
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item, index) => {
                return (
                  <option key={`allday-${index}`} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="all-available-time"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
