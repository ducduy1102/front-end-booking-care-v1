import React, { Component } from "react";
import { connect } from "react-redux";

// import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils";
import { processLogout, changeLanguageApp } from "../../store/actions";
import viFlag from "../../assets/images/vietnam-flag.svg";
import enFlag from "../../assets/images/en-flag.svg";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      console.log("role", role);
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
    }

    this.setState({ menuApp: menu });
    console.log("userInfo", this.props.userInfo);
  }

  render() {
    const { processLogout, language, userInfo } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
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
    processLogout: () => dispatch(processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
