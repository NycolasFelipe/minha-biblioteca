import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

// Lib
import classNames from "classnames";

const Navbar = () => {
  return (
    <nav className={classNames(styles.navbar)}>
      <div className={classNames(styles.container)}>
        <Link to="/home">
          <div className={classNames(styles.left)}>
            <h1>Lorem ipsum</h1>
          </div>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar;