import React from "react";
import styles from "./ErrorMessage.module.css";

function ErrorMessage({ message }) {
  return (
    <div className={styles.ErrorMessage}>{message}</div>
  )
}
export default ErrorMessage
