import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class HandBook extends Component {
  render() {
    return (
      <div className="section-share section-handbook">
        <div className="container">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Cẩm nang</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="section-custom">
                  <div className="bg-img section-handbook"></div>
                  <div className="section-title">Cẩm nang</div>
                </div>
                <div className="section-custom">
                  <div className="bg-img section-handbook"></div>
                  <div className="section-title">Cẩm nang</div>
                </div>
                <div className="section-custom">
                  <div className="bg-img section-handbook"></div>
                  <div className="section-title">Cẩm nang</div>
                </div>
                <div className="section-custom">
                  <div className="bg-img section-handbook"></div>
                  <div className="section-title">Cẩm nang</div>
                </div>
                <div className="section-custom">
                  <div className="bg-img section-handbook"></div>
                  <div className="section-title">Cẩm nang</div>
                </div>
                <div className="section-custom">
                  <div className="bg-img section-handbook"></div>
                  <div className="section-title">Cẩm nang</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
