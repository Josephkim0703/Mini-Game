import { useEffect, useState, useRef } from "react";
function EndCredit(props) {

    const [text, setText] = useState("game over");
    useEffect(() => {
        if(props.gameOver.state == "win"){
            setText(<span>game over<br />Congradulations Officer!<br />I hope that we may meet again.</span>);
        }
    },[props.gameOver.state])
  return (
    <>
      <div style={{color : "white", fontFamily: "pixel"}} id="ctc_gameover">
        <h1>{text}</h1>
        <button type="button" onClick={props.restart}>Play Again</button>
      </div>
    </>
  );
}

export default EndCredit;
