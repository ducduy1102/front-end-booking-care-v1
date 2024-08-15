import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import { getAllSpecialtyService } from "../../../services/userService";
import "./Specialty.scss";
import { withRouter } from "react-router-dom";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialtyService();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
    // console.log("data", this.state);
  }

  handleViewDetailSpecialty = (specialty) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${specialty.id}`);
    }
  };

  render() {
    let { dataSpecialty } = this.state;

    return (
      <div className="section-share section-specialty">
        <div className="container">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homepage.specialty-popular" />
              </span>
              <button className="btn-section">
                <FormattedMessage id="homepage.more-infor" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataSpecialty &&
                  dataSpecialty.length > 0 &&
                  dataSpecialty.map((item, index) => {
                    return (
                      <div
                        className="section-custom specialty-child"
                        key={`specialty-${index}`}
                        onClick={() => this.handleViewDetailSpecialty(item)}
                      >
                        <div
                          className="bg-img section-specialty"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <div className="section-title specialty-name">
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
