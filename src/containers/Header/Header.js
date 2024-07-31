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

class Header extends Component {
  changeLanguage = (language) => {
    // alert(language);
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    const { processLogout, language } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>

        <div className="languages">
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
