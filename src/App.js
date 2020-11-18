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
const MOVE = 30;
const PRESS_RIGHT_KEY = "ArrowRight";
const PRESS_LEFT_KEY = "ArrowLeft";
const PRESS_UP_KEY = "ArrowUp";
const PRESS_DOWN_KEY = "ArrowDown";

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
        setJump(true);
        //setJump(false);
      }

      if (ALLOWED_KEYS.includes(key) && !pressed.includes(key)) {
        let position = 0;

        switch (key) {
          case PRESS_RIGHT_KEY:
            setFlipOver(false);
            //setRun(true);
            position = parseInt(localStorage.getItem("positionX"));
            if (position < MAX_X) {
              position += MOVE;
              localStorage.setItem("positionX", position);
              setPositionX(position);
              console.log("x: " + position);
            }
            break;

          case PRESS_LEFT_KEY:
            setFlipOver(true);
            //setRun(true);
            position = parseInt(localStorage.getItem("positionX"));
            if (position >= MIN_X) {
              position -= MOVE;
              localStorage.setItem("positionX", position);
              setPositionX(position);
            }
            console.log("x: " + position);
            break;

          case PRESS_UP_KEY:
            position = parseInt(localStorage.getItem("positionY"));
            if (position < MAX_Y) {
              position += MOVE;
              localStorage.setItem("positionY", position);
              setPositionY(position);
              console.log("Y: " + position);
            }
            break;

          case PRESS_DOWN_KEY:
            position = parseInt(localStorage.getItem("positionY"));
            if (position >= MIN_Y) {
              position -= MOVE;
              localStorage.setItem("positionY", position);
              setPositionY(position);
              console.log("Y: " + position);
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
            className={`mario${flipOver ? ` flip-over` : ``}${
              jump ? ` jump-up` : ``
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
