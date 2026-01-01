import { useEffect, useState, useRef } from "react";
import "../css/out.css";

function out_StartBox(props) {

      const handleStart = () => {
        props.updateHide(2, true);
        props.updateHide(3, true);
  }
  const handleGenre = (x) => {
       props.setGenre(x);
       props.updateHide(0, true);
       props.updateHide(1, true)
  }

  return (
    <>
      <div id="out_StartBox">
        {!props.hide[2] && <button type="button" onClick={handleStart}>Start</button>}
        {props.hide[3] && <>
        <button type="button" onClick={() => handleGenre("all")}>All</button>
        <button type="button" onClick={() => handleGenre("pop")}>Pop</button>
        <button type="button" onClick={() => handleGenre("r&b")}>R&B</button>
        <button type="button" onClick={() => handleGenre("rap")}>Rap</button>
        </>
        }
      </div>
    </>
  );
}

export default out_StartBox;
