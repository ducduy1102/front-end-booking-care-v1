import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <div className="container">
          <p>
            &copy; Copyright 2024 Duc Duy. More information, please visit my
            Facebook.
            <a
              href="https://www.facebook.com/ducduy1110"
              target="_blank"
              rel="noreferrer"
            >
              &#8594; Click here &#8592;
            </a>
          </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
