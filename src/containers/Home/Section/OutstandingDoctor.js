import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { fetchTopDoctor } from "../../../store/actions";
import { LANGUAGES } from "../../../utils";

class OutstandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctor();
  }

  render() {
    let arrDoctors = this.state.arrDoctors;
    // arrDoctors = arrDoctors.concat(arrDoctors);
    let { language } = this.props;

    return (
      <div className="section-share section-outstanding-doctor">
        <div className="container">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Bác sĩ nổi bật tuần qua</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {arrDoctors &&
                  arrDoctors.length > 0 &&
                  arrDoctors.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                    return (
                      <div
                        className="section-custom"
                        key={`top-doctor-${index}`}
                      >
                        <div className="custom-border">
                          <div className="outer-bg">
                            <div
                              className="bg-img section-outstanding-doctor"
                              style={{
                                backgroundImage: `url(${imageBase64})`,
                              }}
                            ></div>
                          </div>
                          <div className="text-center position">
                            <div className="section-title">
                              {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className="">Thần Kinh</div>
                          </div>
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
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
