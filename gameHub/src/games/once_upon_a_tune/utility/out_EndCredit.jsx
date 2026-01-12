import { useEffect, useState, useRef } from "react";
import "../css/out.css";

function out_EndCredit(props) {
  const [text, setText] = useState("");
  const [blur, setBlur] = useState(0);
  const [img, setImg] = useState("/assets/onceuponatune/image/out_lose.png");

  useEffect(() => {
    if (props.status === "win") {
      setImg("/assets/onceuponatune/image/out_win.png");
      props.setBackground("/assets/onceuponatune/image/out_black.png");
      if (props.lives == 0) {
        setBlur(0);
        setText("Are you cheating? You are a machine!");
      } else if (props.lives == 1) {
        setBlur(1);
        setText("Nice job, you really know your music!");
      } else if (props.lives == 2) {
        setBlur(2);
        setText("Sing your heart out bro!");
      } else if (props.lives == 3) {
        setBlur(3);
        setText("Congrats, you know your stuff!");
      } else if (props.lives == 4) {
        setBlur(3.5);
        setText("One more can and you would have been wasted!");
      }
    } else {
      setImg("/assets/onceuponatune/image/out_lose.png");
      props.setBackground("/assets/onceuponatune/image/out_black.png");
      if (props.point == 0) {
        setBlur(5);
        setText("Dude you're wasted!");
      } else if (props.point > 0 && props.point <= 5) {
        setBlur(4.5);
        setText("Really that's all you got.");
      } else if (props.point > 5 && props.point <= 10) {
        setBlur(4);
        setText("Better luck next time.");
      } else if (props.point > 10 && props.point < 13) {
        setBlur(3);
        setText("You got some ball knowledge, but not enough.");
      } else if (props.point == 14) {
        setBlur(2);
        setText("Just one more and you had! Nice try.");
      }
    }
  }, [props.status]);

  return (
    <div id="out_endCredit">
      <img
        src={img}
        alt="paying for bill"
        style={{ filter: `blur(${blur}px)`, width: "30rem" }}
      />
      <h1 style={{ filter: `blur(${blur}px)` }}>{text}</h1>
      <button type="button" onClick={props.handleMenu}>
        <img
          src="/assets/onceuponatune/image/out_tryagain.png"
          alt="advil bottle that says try again"
        />
      </button>
    </div>
  );
}

export default out_EndCredit;
