import { useEffect, useState, useRef } from "react";

import "../css/out.css";
function Box(props) {
  const [value, setValue] = useState(null);
  const [answer, setAnswer] = useState(null);

  const handleAnswer = () => {
    let modifiedValue = value.toLowerCase().trim();
    setAnswer(modifiedValue);
  };
  return (
    <>
      <div id="out_BoxWrapper">
    
        
    
        <div id="out_input">
          <button type="button" onClick={props.handleAudio}>
            Play
          </button>

          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="button" onClick={handleAnswer}>
            Guess
          </button>
        </div>
        <h1>{answer}</h1>
      </div>
    </>
  );
}

export default Box;
