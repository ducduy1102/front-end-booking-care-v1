import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLogin } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleLogin = async () => {
    // Trước khi login clear errMessage đi
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLogin(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({ errMessage: data.message });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        // console.log("login success");
      }
    } catch (error) {
      // console.log("test error", error.response);
      if (error?.response?.data) {
        this.setState({
          errMessage: error.response.data.message,
        });
      }
    }
  };

  handleOnChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleShowHidePassword = () => {
    // alert("click me");
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };

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
                value={this.state.username}
                className="form-control"
                placeholder="Enter your username"
                onChange={(e) => this.handleOnChangeUsername(e)}
              />
            </div>
            <div className="form-group login-input">
              <label className="text-label">Password</label>
              <div className="custom-input-password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  name="password"
                  value={this.state.password}
                  className="form-control"
                  placeholder="Enter your password"
                  onChange={(e) => {
                    this.handleOnChangePassword(e);
                  }}
                  onKeyDown={(e) => this.handleKeyDown(e)}
                />
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? "fas fa-eye"
                        : "fas fa-eye-slash"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="">
              <button className="btn-login" onClick={() => this.handleLogin()}>
                Login
              </button>
            </div>
            <div className="">
              <span className="forgot-password">Forgot your password</span>
            </div>
            <div className="mt-3 text-center">
              <span className="text-other-login">Or Login With</span>
            </div>
            <div className="social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
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
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
