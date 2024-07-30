import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="container">
          <div className="section-about-header">
            Truyền thông nói gì về Đức Duy?
          </div>
          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/MhQKe-aERsU"
                title="Ed Sheeran - Shape Of You ( cover by J.Fla )"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <div className="content-right">
              <p>
                &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quasi assumenda eius laudantium quas. Aliquid, sit reiciendis.
                Repellendus, asperiores similique odit sunt veritatis omnis
                excepturi, non aperiam dolor cumque delectus perferendis. Lorem
                ipsum, dolor sit amet consectetur adipisicing elit. Saepe
                consequuntur, vitae tenetur ea amet aliquam odio odit obcaecati
                esse quod dolore fugiat ab pariatur laudantium est
                reprehenderit, sed voluptate distinctio?&rdquo;
              </p>
            </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
