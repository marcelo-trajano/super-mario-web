import React, { useState, useEffect } from "react";
import "./App.css";
const ALLOWED_KEYS = [
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Space",
];
const MAX_Y = 570;
const MIN_Y = 30;
const MAX_X = 1230;
const MIN_X = 30;

export default () => {
  const [pressed, setPressed] = useState([]);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [flipOver, setFlipOver] = useState(false);
  //const [run, setRun] = useState(false);
  const [jump, setJump] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    localStorage.setItem("positionX", positionX);
    localStorage.setItem("positionY", positionY);
  }, []);

  const handleKeyDown = React.useCallback(
    (event) => {
      const { key, code } = event;
      console.log(code);

      if (code === "Space") {
        //setJump(true);
      }

      if (ALLOWED_KEYS.includes(key) && !pressed.includes(key)) {
        let pos = 0;

        switch (key) {
          case "ArrowRight":
            setFlipOver(false);
            //setRun(true);
            pos = parseInt(localStorage.getItem("positionX"));
            if (pos < MAX_X) {
              pos += 30;
              localStorage.setItem("positionX", pos);
              setPositionX(pos);
              console.log("x: " + pos);
            }
            break;

          case "ArrowLeft":
            setFlipOver(true);
            //setRun(true);
            pos = parseInt(localStorage.getItem("positionX"));
            if (pos >= MIN_X) {
              pos -= 30;
              localStorage.setItem("positionX", pos);
              setPositionX(pos);
            }
            console.log("x: " + pos);
            break;

          case "ArrowUp":
            pos = parseInt(localStorage.getItem("positionY"));
            if (pos < MAX_Y) {
              pos += 30;
              localStorage.setItem("positionY", pos);
              setPositionY(pos);
              console.log("Y: " + pos);
            }
            break;

          case "ArrowDown":
            pos = parseInt(localStorage.getItem("positionY"));
            if (pos >= MIN_Y) {
              pos -= 30;
              localStorage.setItem("positionY", pos);
              setPositionY(pos);
              console.log("Y: " + pos);
            }
            break;
        }

        setPressed([...pressed, key]);
      }
    },
    [pressed]
  );

  return (
    <div className="App">
      <div className="mario-world">
        <div className="move-field">
          <div
            className={`mario ${flipOver ? `flip-over` : ``}${
              jump ? ` jump` : ``
            }`}
            style={{
              marginLeft: `${positionX}px`,
              marginBottom: `${positionY}px`,
            }}
          ></div>
          <div className={`lakitu ${flipOver ? `` : `flip-over`}`}></div>
        </div>
      </div>
    </div>
  );
};
