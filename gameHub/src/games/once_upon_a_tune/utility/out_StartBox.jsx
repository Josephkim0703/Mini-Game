import { useEffect, useState, useRef } from "react";
import "../css/out.css";

function out_StartBox(props) {
  const handleStart = () => {
    props.updateHide(2, true);
    props.updateHide(3, true);
    props.setBackground("/assets/onceuponatune/image/out_floor.png");
  };
  const handleGenre = (x) => {
    props.setGenre(x);
    props.updateHide(0, true);
    props.updateHide(1, true);
    props.setBackground("/assets/onceuponatune/image/out_background_1.jpg");
  };

  return (
    <>
      <div id="out_StartBox">
        {!props.hide[2] && (
          <div id="out_instruction">
            <button type="button" onClick={handleStart}>
              <img
                src="/assets/onceuponatune/image/out_startButton.png"
                alt="start button"
              />
            </button>
            <img
              src="/assets/onceuponatune/image/out_dartboard.png"
              alt="dart board"
            />
          </div>
        )}
        {props.hide[3] && (
          <div id="out_option_buttons">
            <button type="button" onClick={() => handleGenre("all")}>
              <img src="/assets/onceuponatune/image/out_bandaid.png" alt="bandaid" />
            </button>
            <button type="button" onClick={() => handleGenre("pop")}>
              <img src="/assets/onceuponatune/image/out_gum.png" alt="gum" />
            </button>
            <button type="button" onClick={() => handleGenre("r&b")}>
              <img src="/assets/onceuponatune/image/out_chapstick.png" alt="chapstick" />
            </button>
            <button type="button" onClick={() => handleGenre("rap")}>
              <img src="/assets/onceuponatune/image/out_cig.png" alt="cigarette bud" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default out_StartBox;
