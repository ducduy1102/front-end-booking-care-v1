import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import "./DoctorExtraInfor.scss";
import { FormattedMessage } from "react-intl";
import { getExtraInforDoctorByIdService } from "../../../services/userService";
import NumberFormat, { NumericFormat } from "react-number-format";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInforDoctorByIdService(
        this.props.doctorIdFromParent
      );
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  showHideDetailPrice = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    let { language } = this.props;

    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="patient.extra-infor-doctor.text-address" />
          </div>
          <div className="name-clinic">{extraInfor?.nameClinic || ""}</div>
          <div className="detail-address">{extraInfor?.adressClinic || ""}</div>
        </div>
        <div className="content-down">
          {!isShowDetailInfor ? (
            <div className="short-infor">
              <FormattedMessage id="patient.extra-infor-doctor.price" />:
              {extraInfor?.priceTypeData && language === LANGUAGES.VI && (
                <NumberFormat
                  className="currency"
                  value={extraInfor.priceTypeData.valueVi}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"VND"}
                />
              )}
              {extraInfor?.priceTypeData && language === LANGUAGES.EN && (
                <NumberFormat
                  className="currency"
                  value={extraInfor.priceTypeData.valueEn}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"$"}
                />
              )}
              <span
                className="detail"
                onClick={() => this.showHideDetailPrice(true)}
              >
                {" "}
                <FormattedMessage id="patient.extra-infor-doctor.detail" />
              </span>
            </div>
          ) : (
            <>
              <div className="title-price">
                <FormattedMessage id="patient.extra-infor-doctor.price" />
              </div>
              <div className="up-container">
                <div className="left">
                  <div className="left-title">
                    <FormattedMessage id="patient.extra-infor-doctor.price" />
                  </div>
                  <div className="note">{extraInfor?.note || ""}</div>
                </div>
                <div className="right">
                  <div className="price">
                    {extraInfor?.priceTypeData && language === LANGUAGES.VI && (
                      <NumberFormat
                        value={extraInfor.priceTypeData.valueVi}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"VND"}
                      />
                    )}
                    {extraInfor?.priceTypeData && language === LANGUAGES.EN && (
                      <NumberFormat
                        value={extraInfor.priceTypeData.valueEn}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"$"}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="down-container">
                <div className="payment">
                  <FormattedMessage id="patient.extra-infor-doctor.payment" />:{" "}
                  {extraInfor?.paymentTypeData && language === LANGUAGES.VI
                    ? extraInfor.paymentTypeData.valueVi
                    : " "}
                  {extraInfor?.paymentTypeData && language === LANGUAGES.EN
                    ? extraInfor.paymentTypeData.valueEn
                    : " "}
                </div>
              </div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailPrice(false)}>
                  <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
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
