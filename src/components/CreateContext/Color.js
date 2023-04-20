import { useSelector, useDispatch } from "react-redux";
import { changeColor, selectColor } from "../../redux/reducer/canvasSlice";

import styles from "./Color.module.css";
import logo from "../../logo.svg";

const Color = () => {
  const color = useSelector(selectColor);
  const dispatch = useDispatch();

  return (
    <div>
      <h2 className={styles.h1}>Colors</h2>
      <div style={{ backgroundColor: color }}>
        <img
          className={styles.img}
          src={logo}
          alt="logo"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className={styles.btnGroup}>
        <button onClick={(color) => dispatch(changeColor("#FFFFFF"))}>
          White
        </button>
        <button onClick={(color) => dispatch(changeColor("orange"))}>
          Orange
        </button>
        <button onClick={(color) => dispatch(changeColor("yellow"))}>
          Yellow
        </button>
        <button onClick={(color) => dispatch(changeColor("pink"))}>Pink</button>
      </div>
    </div>
  );
};

export default Color;
