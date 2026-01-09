import { useEffect, useState, useRef } from "react";
import "../css/out.css";

function out_EndCredit(props){
    const [text, setText] = useState("");
  
    useEffect(() => {
        if(props.status === "win"){
            props.setBackground("/assets/onceuponatune/image/out_black.png");
            if(props.lives == 0){
                setText("Are you cheating? You are a machine!");
            }else if(props.lives == 1){
                setText("Nice job, you really know your music!");
            }else if(props.lives == 2){
                setText("Sing your heart out bro!");
            }else if(props.lives == 3){
                setText("Congrats, you know your stuff!");
            }else if(props.lives == 4){
                setText("One more can and you would have been wasted!");
            }
        }else{
                 props.setBackground("/assets/onceuponatune/image/out_black.png");
            if(props.point == 0){
                setText("Dude you're wasted!");
            }else if(props.point > 0 && props.point <=5){
                setText("Really that's all you got.");
            }else if(props.point > 5 && props.point <=10){
                setText("Better luck next time.");
            }else if(props.point > 10 && props.point < 13){
                setText("You got some ball knowledge, but not enough.");
            }else if(props.point == 14){
                setText("Just one more and you had! Nice try.");
            }
            
        }
    },[props.status]);

    return(
        <div id="out_endCredit">
            <h1>{text}</h1>
            <button type="button" onClick={props.handleMenu}><img src="/assets/onceuponatune/image/out_tryagain.png" alt="advil bottle that says try again" /></button>
        </div>
    );
}

export default out_EndCredit;