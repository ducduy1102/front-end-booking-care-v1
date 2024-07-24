import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="text-login">Login</div>
            <div className="form-group login-input">
              <label className="text-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter your username"
              />
            </div>
            <div className="form-group login-input">
              <label className="text-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
              />
            </div>
            <div className="">
              <button className="btn-login">Login</button>
            </div>
            <div className="">
              <span className="forgot-password">Forgot your password</span>
            </div>
            <div className="mt-3 text-center">
              <span className="text-other-login">Or Login With</span>
            </div>
            <div className="social-login">
              <i class="fab fa-google-plus-g google"></i>
              <i class="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
