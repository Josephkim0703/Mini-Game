import { useEffect, useState, useRef } from "react";
import "../css/ctc.css";

function ScriptBox(props) {
  const [speak, setSpeak] = useState("...");
  useEffect(() => {
    //if the props.index is greater then the length it means the dialog is over
    if (props.currentLine >= props.script.length) return;

    //tracks the current line and if that line requires an asnwer it stops at that line
    if (props.script[props.currentLine].requiresAnswer) {
      setSpeak(props.script[props.currentLine].text);
      return;
    }
    //else if it doesnt it sets the timer and writes out the line into speak variable
    const timer = setTimeout(() => {
      setSpeak(props.script[props.currentLine].text);
      props.setCurrentLine((prev) => prev + 1);
    }, props.script[props.currentLine].time);

    // console.log(currentLine)
    //refreshes timeout for new timeout
    return () => clearTimeout(timer);
  }, [props.currentLine, props.script]);

  const prevPhoneRef = useRef(null);

  const handlePhoneEnter = () => {
    props.setPhone((prev) => {
      prevPhoneRef.current = prev;
      return "/image/crackthecode/ctc_phone_fam.png";
    });
  };

  const handlePhoneLeave = () => {
    if (prevPhoneRef.current !== null) {
      props.setPhone(prevPhoneRef.current);
    }
  };

  return (
    <>
      <div id="textBox">
        <img
          id="ctc_phone"
          src={props.phone}
          alt="dectives phone"
          ref={props.phoneRef}
          onMouseEnter={() => handlePhoneEnter()}
          onMouseLeave={() => handlePhoneLeave()}
        />
        <h2>{speak}</h2>
        <img
          id="flashLight"
          src="/image/crackthecode/ctc_flashLight.png"
          alt="flash Light"
          ref={props.flashRef}
          onClick={props.handleFlash}
        />
      </div>
    </>
  );
}

export default ScriptBox;
