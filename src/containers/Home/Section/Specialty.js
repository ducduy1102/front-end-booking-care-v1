import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div className="section-specialty">
        <div className="container">
          <div className="specialty-container">
            <div className="specialty-header">
              <span className="title-section">Chuyên khoa phổ biến</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="specialty-body">
              <Slider {...settings}>
                <div className="specialty-custom">
                  <div className="bg-img"></div>
                  <div className="specialty-title">Cơ xương khớp</div>
                </div>
                <div className="specialty-custom">
                  <div className="bg-img"></div>
                  <div className="specialty-title">Cơ xương khớp</div>
                </div>
                <div className="specialty-custom">
                  <div className="bg-img"></div>
                  <div className="specialty-title">Cơ xương khớp</div>
                </div>
                <div className="specialty-custom">
                  <div className="bg-img"></div>
                  <div className="specialty-title">Cơ xương khớp</div>
                </div>
                <div className="specialty-custom">
                  <div className="bg-img"></div>
                  <div className="specialty-title">Cơ xương khớp</div>
                </div>
                <div className="specialty-custom">
                  <div className="bg-img"></div>
                  <div className="specialty-title">Cơ xương khớp</div>
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
