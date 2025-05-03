import styles from "./Footer.module.css";

// Lib
import classNames from "classnames";

const Footer = () => {
  return (
    <footer className={classNames(styles.footer)}>
      <div className={classNames(styles.container)}>
        <h6>Footer</h6>
        <p><strong>Lorem:</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p><strong>Ipsum:</strong> Lorem ipsum dolor sit amet.</p>
      </div>
    </footer>
  )
}

export default Footer