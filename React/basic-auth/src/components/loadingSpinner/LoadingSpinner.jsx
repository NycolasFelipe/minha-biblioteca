import styles from "./LoadingSpinner";

import SpinnerIcon from "src/assets/svg/spinner.svg"

const LoadingSpinner = ({ width = "24" }) => {
  return (
    <img
      src={SpinnerIcon}
      className={styles.spinner}
      style={{ width: width + "px" }}
      alt="Loading Spinner"
    />
  )
}

export default LoadingSpinner