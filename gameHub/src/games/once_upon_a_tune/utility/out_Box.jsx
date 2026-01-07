import { useEffect, useState, useRef } from "react";
import "../css/out.css";
function Box(props) {
  const [value, setValue] = useState("");
  const [point, setPoint] = useState(0);
  const [lives, setLives] = useState(0);
  const [heart, setHeart] = useState([
    "/assets/onceuponatune/image/out_life0.png",
    "/assets/onceuponatune/image/out_life1.png",
    "/assets/onceuponatune/image/out_life2.png",
    "/assets/onceuponatune/image/out_life3.png",
    "/assets/onceuponatune/image/out_life4.png",
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
            arr[
              prevLife
            ] = `/assets/onceuponatune/image/out_life_crushed${prevLife}.png`;
          }
          return arr;
        });
        return prevLife + 1;
      });
    } else {
      props.setCurrent(0);
      props.setLevel((prev) => prev + 1);
      setValue("");
      if (props.current <= 0) {
        setPoint((prev) => (props.toggle ? prev + 3 : prev + 4));
      } else if (props.current === 1) {
        setPoint((prev) => (props.toggle ? prev + 2 : prev + 3));
      } else {
        setPoint((prev) => (props.toggle ? prev + 1 : prev + 2));
      }
      props.updateHide(4, false);
      props.updateHide(6, false);
      props.setToggle(false);
    }
  };

  //handle what happens if you lose
  useEffect(() => {
    if (lives >= 5) {
      console.log("lose");
    } else if (point >= 15) {
      console.log("Win");
    }
  }, [lives, point]);

  const handleHint = () => {
    props.updateHide(6, true);
    props.setToggle(true);
  };

  const handleSkip = () => {
    if (point > 0) {
      setPoint((prev) => prev - 1);
      props.setCurrent(0);
      props.setLevel((prev) => prev + 1);
      setValue("");
      props.updateHide(4, false);
      props.updateHide(6, false);
      props.setToggle(false);
    }
  };

  const handleMenu = () => {
    props.setCurrent(0);
    props.setLevel((prev) => prev + 1);
    props.updateHide(6, false);
    props.updateHide(4, false);
    props.updateHide(2, true);
    props.updateHide(3, true);
    props.setBackground("/assets/onceuponatune/image/out_floor.png");
    props.updateHide(0, false);
    props.updateHide(1, false);
  };
  return (
    <>
      <div id="out_BoxWrapper">
        <div id="out_input">
          <div id="out_buttons">
             <input
             placeholder="CLICK TO TYPE..."
            id="out_inputBox"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div id="input_left">
          <button type="button" onClick={props.handleAudio} style={{backgroundColor: "green"}}>
            PLAY
          </button>
          {props.hide[4] && (
            <button type="button" onClick={props.handleTime} style={{fontSize: "12px"}}>
              INCREASE TIME
            </button>
          )}
          <button type="button" onClick={handleAnswer} style={{backgroundColor: "green"}}>
            GUESS
          </button>
          
          </div>
         <div id="input_right">
          <button type="button" onClick={handleHint}>
            HINT
          </button>
          <button type="button" onClick={handleSkip}>
            SKIP
          </button>
          <button type="button" onClick={handleMenu} style={{backgroundColor: "black"}}>
            MENU
          </button>
          </div>
          </div>
          <img src="/assets/onceuponatune/image/out_mixingtable.png" alt="" />
        </div>
      
          {props.answer}
        <div id="out_healthBar">
          <h1>{props.text}</h1>
          <h1>Points: {point} / 15</h1>
          {props.hide[6] && (
            <div id="hint">
              <h1>{props.hint}</h1>
            
            </div>
          )}

          <div id="out_lives">
            {heart.map((x, i) => (
              <div key={i} className="out_attempts">
                <img src={x} alt="beer can" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Box;
