import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-share section-medical-facility">
        <div className="container">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Cơ sở y tế nổi bật</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="section-custom">
                  <div className="bg-img section-medical-facility"></div>
                  <div className="section-title">Bệnh viện xây dựng</div>
                </div>
                <div className="section-custom">
                  <div className="bg-img section-medical-facility"></div>
                  <div className="section-title">Bệnh viện xây dựng</div>
                </div>
                <div className="section-custom">
                  <div className="bg-img section-medical-facility"></div>
                  <div className="section-title">Bệnh viện xây dựng</div>
                </div>
                <div className="section-custom">
                  <div className="bg-img section-medical-facility"></div>
                  <div className="section-title">Bệnh viện xây dựng</div>
                </div>
                <div className="section-custom">
                  <div className="bg-img section-medical-facility"></div>
                  <div className="section-title">Bệnh viện xây dựng</div>
                </div>
                <div className="section-custom">
                  <div className="bg-img section-medical-facility"></div>
                  <div className="section-title">Bệnh viện xây dựng</div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
