import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
class UserAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div className="container user-admin-container">
        <div className="title">User Admin</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAdmin);