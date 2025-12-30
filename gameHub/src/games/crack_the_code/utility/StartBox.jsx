import "../css/ctc.css";

function StartBox(props) {
  const startGame = () => {
    props.setAudio("/image/sounds/ctc_music_2.mp3");
    props.updateHide(0, true);
    props.setStyle((prev) => ({ ...prev, blur: 0 }));
    props.updateHide(3, true);
    setTimeout(() => {
      props.setStyle((prev) => ({ ...prev, scale: 9 }));
      props.setStyle((prev) => ({ ...prev, translate: "150px" }));

      setTimeout(() => {
        props.setBackground("/image/crackthecode/ctc_backdrop_open.png");
        props.setStyle((prev) => ({ ...prev, opacity: 0 }));

        setTimeout(() => {
          props.setBackground("/image/crackthecode/ctc_black.jpg");
          props.updateHide(2, true);
          props.setStyle((prev) => ({ ...prev, transition: "none" }));
          props.setStyle((prev) => ({ ...prev, scale: 1 }));
          props.setStyle((prev) => ({ ...prev, translate: "0px" }));

          setTimeout(() => {
            let on = true;

            const int = setInterval(() => {
              props.setBackground(
                on
                  ? "/image/crackthecode/ctc_black.jpg"
                  : "/image/crackthecode/ctc_darkroom.png"
              );
              on = !on;
            }, 250);

            setTimeout(() => clearInterval(int), 1250);

            setTimeout(() => {
              let on = true;
              setTimeout(() => {
                props.phoneRef.current.classList.add("phone-shake");
                props.setPhone("/image/crackthecode/ctc_phone.png");
                setTimeout(() => {
                  props.phoneRef.current.classList.remove("phone-shake");
                  props.setPhone("/image/crackthecode/ctc_phone_pickUp.png");
                }, 2500);
              }, 8300);

              const int = setInterval(() => {
                props.setBackground(
                  on
                    ? "/image/crackthecode/ctc_guytiedup.png"
                    : "/image/crackthecode/ctc_guytiedup_open.png"
                );
                on = !on;
              }, 300);

              setTimeout(() => clearInterval(int), 1500);
              setTimeout(() => {
                props.updateHide(1, true);
                props.setStartGame(true);
              }, 31800);
            }, 1250);
          }, 0);
        }, 12000);
      }, 550);
    }, 4000);
  };

  return (
    <>
      <div id="startBox">
        <h1 style={{ color: "rgb(255,190,0)" }}>Crack the Code</h1>
        <h2>
          Welcome, Officer.
          <br />
          <span style={{ color: "blue" }}>Your mission is simple:</span> defuse
          the bomb before the timer reaches zero.
        </h2>
        <hr />
        <h1 style={{ color: "rgb(255,190,0)" }}>How to Play</h1>
        <h2>
          As you progress, you will be required to enter codes to continue.
          <br />
          Each incorrect answer causes a
          <span style={{ color: "green" }}> green</span> light to turn
          <span style={{ color: "red" }}> red</span>.
          <br />
          When all <span style={{ color: "green" }}> green</span> lights turn
          <span style={{ color: "red" }}> red</span>, the game is over.
        </h2>
        <img
          src="/image/crackthecode/tutorial_1.jpg"
          alt="Green and red indicator lights on the bomb module"
        />
        <hr />
         <span style={{display: "flex", width : "31rem"}}>
        <h2>Every so often the lights will turn off and you will no longer be able to see <br />
        use the Flash light to turn the lights back on</h2>
         <img style={{width : "5rem"}}
          src="/image/crackthecode/ctc_flashLight.png"
          alt="Green and red indicator lights on the bomb module"
        /></span>
        <hr />
        <span style={{display: "flex", width : "27rem"}}>
        <h2>
          <span style={{ color: "blue" }}>
            You can enter answers in two ways:
          </span>
          <br />
          by using your keyboard or by pressing the number pad on the bomb.
        </h2>
        <img
          src="/image/crackthecode/tutorial_3.jpg"
          alt="Number pad on the bomb module"
          style={{width : "7rem"}}
        />
       
        </span>
         <hr />
        <h2>
          When using keyboard, make sure to
          <span style={{ color: "red" }}> click</span> on the screen before
          typing or deleting
        </h2>
        <img
          src="/image/crackthecode/tutorial_2.jpg"
          alt="Input screen on the bomb module"
        />
        <hr />
        <h2>
          Press the <span style={{ color: "green" }}>green</span> ENTER button
          to submit your answer.
        </h2>
        <img
          src="/image/crackthecode/tutorial_4.jpg"
          alt="Enter button on the bomb module"
        />
        <hr />
        <h2>Good luck, Officer and may God protect your soul.</h2>

        <button type="button" onClick={startGame}>
          Start Game
        </button>
      </div>
    </>
  );
}

export default StartBox;
