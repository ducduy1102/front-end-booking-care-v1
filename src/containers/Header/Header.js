import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions";
import viFlag from "../../assets/images/vietnam-flag.svg";
import enFlag from "../../assets/images/en-flag.svg";
import { FormattedMessage } from "react-intl";

class Header extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    const { processLogout, language, userInfo } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>

        <div className="languages">
          <span className="welcome">
            <FormattedMessage id="home-header.welcome" />,{" "}
            {userInfo?.firstName ? userInfo.firstName : "User"} !
          </span>
          <div
            className={language === "vi" ? "language-vi active" : "language-vi"}
          >
            <img
              src={viFlag}
              alt=""
              className="img-vi"
              onClick={() => this.changeLanguage(LANGUAGES.VI)}
            />
            <span
              className="text-vi"
              onClick={() => this.changeLanguage(LANGUAGES.VI)}
            >
              VN
            </span>
          </div>
          <div
            className={language === "en" ? "language-en active" : "language-en"}
          >
            <img
              src={enFlag}
              alt=""
              className="img-en"
              onClick={() => this.changeLanguage(LANGUAGES.EN)}
            />
            <span
              className="text-en"
              onClick={() => this.changeLanguage(LANGUAGES.EN)}
            >
              EN
            </span>
          </div>
          {/* nút logout */}
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
