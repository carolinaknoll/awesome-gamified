import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-top">
          <ul className="social-list">
            <li className="social-small-box"><a href="mailto:carolinasknoll@gmail.com"><i className="social-icon fas fa-envelope"></i></a></li>
            <li className="social-small-box"><a href="https://www.linkedin.com/in/carolinaknoll"><i className="social-icon fab fa-linkedin"></i></a></li>
            <li className="social-small-box"><a href="https://github.com/carolinaknoll"><i className="social-icon fab fa-github"></i></a></li>
            <li className="social-small-box"><a href="https://twitter.com/carolina_knoll"><i className="social-icon fab fa-twitter"></i></a></li>
            <li className="social-small-box"><a href="http://codepen.io/carolinaknoll/"><i className="social-icon fab fa-codepen"></i></a></li>
            <li className="social-small-box"><a href="http://www.freecodecamp.com/carolinaknoll"><i className="social-icon fab fa-free-code-camp"></i></a></li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p>Handcrafted with <i className="fa fa-heart"></i> and <i className="fa fa-coffee"></i> by Carolina Knoll.</p>
        </div>
      </footer>
    );
  }
}
