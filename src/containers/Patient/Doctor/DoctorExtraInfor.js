import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import "./DoctorExtraInfor.scss";
import { FormattedMessage } from "react-intl";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: true,
    };
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  showHideDetailPrice = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  render() {
    let { isShowDetailInfor } = this.state;

    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">ĐỊA CHỈ KHÁM</div>
          <div className="name-clinic">Phòng khám chuyên khoa da liễu</div>
          <div className="detail-address">
            207 Phố Huê- Hai Bà Trưng - Hà Nội
          </div>
        </div>
        <div className="content-down">
          {!isShowDetailInfor ? (
            <div className="short-infor">
              GIÁ KHÁM: 200.000đ.{" "}
              <span onClick={() => this.showHideDetailPrice(true)}>
                Xem chi tiết
              </span>
            </div>
          ) : (
            <>
              <div className="title-price">GIÁ KHÁM</div>
              <div className="up-container">
                <div className="left">
                  <div className="left-title">Giá khám</div>
                  <div className="note">
                    Giá khám chưa bao gồm chi phí chụp chiếu, xét nghiệm
                  </div>
                </div>
                <div className="right">
                  <div className="price">20000</div>
                </div>
              </div>
              <div className="down-container">
                <div className="payment">
                  Bệnh viện có các hình thức thanh toán: Chuyển khoản, tiền mặt,
                  thẻ tín dụng
                </div>
              </div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailPrice(false)}>
                  Ẩn bảng giá
                </span>
              </div>
            </>
          )}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
