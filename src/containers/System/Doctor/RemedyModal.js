import React, { Component } from "react";
import { connect } from "react-redux";
import { CommonUtils, LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import "./RemedyModal.scss";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }
  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.dataModal !== prevProps.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleOnChangeImage = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
  };

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };

  render() {
    let { isOpenModal, closeRemedyModal } = this.props;
    return (
      <Modal
        isOpen={isOpenModal}
        className="remedy-modal-container"
        size="lg"
        centered
      >
        <div className="booking-modal-header">
          <span className="header-title">
            <FormattedMessage id="manage-patient.remedy-modal.title" />
          </span>
          <span className="header-close" onClick={closeRemedyModal}>
            <i className="fas fa-times"></i>
          </span>
        </div>
        <ModalBody>
          <div className="row g-3">
            <div className="col-6">
              <label htmlFor="email" className="form-label">
                <FormattedMessage id="manage-patient.remedy-modal.patient-email" />
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={this.state.email}
                onChange={(e) => this.handleOnChangeEmail(e)}
              />
            </div>
            <div className="col-6">
              <label htmlFor="" className="form-label">
                <FormattedMessage id="manage-patient.remedy-modal.select-remedy" />
              </label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => this.handleOnChangeImage(e)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleSendRemedy}>
            <FormattedMessage id="manage-patient.remedy-modal.send" />
          </Button>
          <Button color="secondary" onClick={closeRemedyModal}>
            <FormattedMessage id="manage-patient.remedy-modal.cancel" />
          </Button>
        </ModalFooter>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
