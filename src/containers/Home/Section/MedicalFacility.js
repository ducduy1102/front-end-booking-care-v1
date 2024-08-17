import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { getAllClinicService } from "../../../services/userService";
import { withRouter } from "react-router";
import { FormattedMessage } from "react-intl";
import "./MedicalFacility.scss";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinicService();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
    console.log("check res", res);
  }

  handleViewDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
    // alert("click me");
  };

  render() {
    let { dataClinics } = this.state;

    return (
      <div className="section-share section-medical-facility">
        <div className="container">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homepage.outstanding-medical-facilities" />
              </span>
              <button className="btn-section">
                <FormattedMessage id="homepage.more-infor" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataClinics &&
                  dataClinics.length > 0 &&
                  dataClinics.map((item, index) => {
                    return (
                      <div
                        className="section-custom clinic-child"
                        key={`clinic-${index}`}
                        onClick={() => this.handleViewDetailClinic(item)}
                      >
                        <div
                          className="bg-img section-medical-facility"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <div className="section-title clinic-name">
                          {item.name}
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
