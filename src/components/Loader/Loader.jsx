import React from "react";
import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <ClipLoader color="blue" size={50} />
    </div>
  );
}
