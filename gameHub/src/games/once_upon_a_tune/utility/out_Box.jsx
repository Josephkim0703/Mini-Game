import { useEffect, useState, useRef } from "react";
import { audioFile } from "./out_Audiofile.jsx";
import "../css/out.css";
function Box(props) {
  const [value, setValue] = useState("");
  const [point, setPoint] = useState(0);
  const [lives, setLives] = useState(0);
  const [heart, setHeart] = useState([
    { state: "1", color: "rgb(0, 161, 0)" },
    { state: "1", color: "rgb(0, 161, 0)" },
    { state: "1", color: "rgb(0, 161, 0)" },
    { state: "1", color: "rgb(0, 161, 0)" },
    { state: "1", color: "rgb(0, 161, 0)" },
  ]);

  //handles answers
  const handleAnswer = () => {
    if (!value) return;

    const modifiedValue = value.toLowerCase().replace(/'/g, "").trim();
    const correctAnswer = props.answer.toLowerCase().replace(/'/g, "").trim();

    if (modifiedValue !== correctAnswer) {
      setValue("");

      setLives((prevLife) => {
        setHeart((prev) => {
          const arr = [...prev];
          if (arr[prevLife]) {
            arr[prevLife] = {
              ...arr[prevLife],
              color: "rgb(218, 0, 0)",
              state: "0",
            };
          }
          return arr;
        });
        return prevLife + 1;
      });

      console.log("no");
    } else {
      props.setCurrent(0);
      props.setLevel((prev) => prev + 1);
      setValue("");
      
      if (props.current <= 0) {
        setPoint((prev) => prev + 3);
      } else if (props.current === 1) {
        setPoint((prev) => prev + 2);
      } else {
        setPoint((prev) => prev + 1);
      }
      props.updateHide(4, false);
      console.log("yes");
    }
  };

  //handle what happens if you lose
  useEffect(() => {
    if(lives >= 5){
      console.log("lose")
    }
  },[lives])
  return (
    <>
      <div id="out_BoxWrapper">
        <div id="out_input">
          <button type="button" onClick={props.handleAudio}>
            Play
          </button>
          {props.hide[4] && <button type="button" onClick={props.handleTime}>
            Increase Time
          </button>}
          

          <input
            id="out_inputBox"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="button" onClick={handleAnswer}>
            Guess
          </button>
        </div>
        <h1>{props.answer}</h1>
        <h1>{props.text}</h1>
        <h1>{point}</h1>
        <div id="out_healthBar">
          {heart.map((x, i) => (
            <div
              key={i}
              className="out_attempts"
              style={{ backgroundColor: x.color }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Box;
