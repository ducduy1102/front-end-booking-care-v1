import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class Specialty extends Component {
  render() {
    return (
      <div className="section-share section-specialty">
        <div className="container">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Chuyên khoa phổ biến</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="section-custom">
                  <div className="bg-img section-specialty"></div>
                  <div className="section-title">Cơ xương khớp</div>
                </div>
                <div className="section-custom">
                  <div className="bg-img section-specialty"></div>
                  <div className="section-title">Cơ xương khớp</div>
                </div>
                <div className="section-custom">
                  <div className="bg-img section-specialty"></div>
                  <div className="section-title">Cơ xương khớp</div>
                </div>
                <div className="section-custom">
                  <div className="bg-img section-specialty"></div>
                  <div className="section-title">Cơ xương khớp</div>
                </div>
                <div className="section-custom">
                  <div className="bg-img section-specialty"></div>
                  <div className="section-title">Cơ xương khớp</div>
                </div>
                <div className="section-custom">
                  <div className="bg-img section-specialty"></div>
                  <div className="section-title">Cơ xương khớp</div>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
