import styles from "./HomeView.module.css";

// Lib
import classNames from "classnames";

const HomeView = () => {
  return (
    <>
      <main className={classNames("page", styles.container)}>
        <h1 className={styles.title}>Home</h1>
      </main>
    </>
  )
}

export default HomeView