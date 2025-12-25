import { useEffect, useState, useRef } from "react";
function EndCredit(props) {

    const [text, setText] = useState(<span style={{color: "red", fontSize: "4rem"}}>Game over</span>);
    useEffect(() => {
        if(props.gameOver.state == "win"){
            setText(<span><span style={{color: "green", fontSize: "4rem"}}>Game over</span><br /><span style={{fontSize : "2rem"}}>Congradulations Officer!<br />I hope that we may meet again.</span></span>);
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
