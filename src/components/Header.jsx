import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <div>
        <h1>The Love Meter</h1>
      </div>
      <nav>
        <ul>
          <li>
            <a
              href="https://twitter.com/xoluwaseyi"
              rel="noreferrer"
              target="_blank"
            >
              <i class="fa fa-twitter" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/xoluwaseyi"
              rel="noreferrer"
              target="_blank"
            >
              <i class="fa fa-github" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a
              href="https://seyiportfolio.netlify.app"
              rel="noreferrer"
              target="_blank"
            >
              <i class="fa fa-user-circle" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
