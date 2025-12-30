import { useEffect, useState, useRef } from "react";
import "./css/ctc.css";
import Box from "./utility/Box.jsx";
import StartBox from "./utility/StartBox.jsx";
import Script from "./utility/ScriptBox.jsx";
import EndCredit from "./utility/EndCredit.jsx";
import { initialScript } from "./utility/Script.jsx";

function CrackTheCode(props) {
  const [gameOver, setGameover] = useState({ over: false, state: null });
  const [explosion, setExplosion] = useState(
    "/image/crackthecode/explosion.gif"
  );
  const [audio, setAudio] = useState("/image/sounds/ctc_music_4.mp3");
  const [startGame, setStartGame] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [index, setIndex] = useState(0);
  const [hide, setHide] = useState(Array(10).fill(false));
  const [currentLine, setCurrentLine] = useState(0);
  const [script, setScript] = useState(initialScript);
  const [phone, setPhone] = useState("/image/crackthecode/ctc_phone_blank.png");
  const [style, setStyle] = useState({
    blur: 9,
    scale: 1,
    translate: "0px",
    opacity: 1,
    opacity1: 1,
    transition: "filter 1s ease-in, transform 5s ease-in-out",
    width: "10rem",
  });
  const [background, setBackground] = useState(
    "/image/crackthecode/ctc_backdrop.png"
  );
  const phoneRef = useRef(null);
  const flashRef = useRef(null);
  function updateHide(index, value) {
    setHide((prev) => {
      const arr = [...prev];
      arr[index] = value;
      return arr;
    });
  }

  //handles game effect where every 30 seconds light turn off and must use light to turn back on
  useEffect(() => {
    if (!startGame || isDark) return;

    const timeout = setTimeout(() => {
      flashRef.current.classList.add("light-pulse");
      setBackground("/image/crackthecode/ctc_black.jpg");
      setStyle((prev) => ({ ...prev, opacity1: 0 }));
      setIsDark(true);
    }, 37000);

    return () => clearTimeout(timeout);
  }, [startGame, isDark]);
  const handleFlash = () => {
    if (!startGame || !isDark) return;
    flashRef.current.classList.remove("light-pulse");
    setBackground("/image/crackthecode/ctc_guytiedup.png");
    setStyle((prev) => ({ ...prev, opacity1: 1 }));
    setIsDark(false);
  };

  //handles what happens when the game is over
  useEffect(() => {
    if (gameOver.over == true) {
      setBackground("/image/crackthecode/ctc_black.jpg");
      updateHide(3, false);
      updateHide(1, false);
      setAudio("/image/sounds/ctc_victory.mp3");
      setBgmloop(false);
      if (gameOver.state == "lose") {
        updateHide(4, true);
        updateHide(5, true);
        setAudio("/image/sounds/ctc_explosion.mp3");
        setBgmloop(false);
        setTimeout(() => {
          setBackground("/image/crackthecode/ctc_black.jpg");
          updateHide(5, false);
        }, 1000);
      } else {
        updateHide(4, true);
      }
    }
  }, [gameOver]);

  //restart the game
  const restart = () => {
    setStyle({
      blur: 9,
      scale: 1,
      translate: "0px",
      opacity: 1,
      opacity1: 1,
      transition: "filter 1s ease-in, transform 5s ease-in-out",
      width: "10rem",
    });
    updateHide(0, false);
    updateHide(1, false);
    updateHide(3, false);
    updateHide(2, true);
    updateHide(4, false);
    updateHide(5, false);
    setCurrentLine(0);
    setIndex(0);
    setStartGame(false);
    setPhone("/image/crackthecode/ctc_phone_blank.png");
    setBackground("/image/crackthecode/ctc_backdrop.png");
    setIsDark(false);
    setAudio("/image/sounds/ctc_music_4.mp3");
    setBgmloop(true);
  };

  //audio
  const bgmRef = useRef(null);
  const [bgmloop, setBgmloop] = useState(true);
  useEffect(() => {
    bgmRef.current = new Audio(audio);
    bgmRef.current.loop = bgmloop;
    bgmRef.current.play();
    bgmRef.current.volume = 0.5;

    return () => {
      bgmRef.current.pause();
      bgmRef.current.currentTime = 0;
      bgmRef.current = null;
    };
  }, [audio]);

  useEffect(() => {
    if (bgmRef.current) {
      bgmRef.current.volume = props.volume;
    }
  }, [props.volume]);

  return (
    <>
      <div id="crackWrapper">
        {!hide[0] && (
          <StartBox
            updateHide={updateHide}
            setStyle={setStyle}
            setBackground={setBackground}
            setPhone={setPhone}
            phoneRef={phoneRef}
            startGame={startGame}
            setStartGame={setStartGame}
            setAudio={setAudio}
          />
        )}
        {hide[1] && (
          <Box
            index={index}
            setIndex={setIndex}
            currentLine={currentLine}
            setCurrentLine={setCurrentLine}
            setBackground={setBackground}
            script={script}
            setScript={setScript}
            style={style}
            setPhone={setPhone}
            setGameover={setGameover}
            setAudio={setAudio}
          />
        )}
        {hide[3] && (
          <Script
            phone={phone}
            currentLine={currentLine}
            setCurrentLine={setCurrentLine}
            script={script}
            setScript={setScript}
            style={style}
            setPhone={setPhone}
            phoneRef={phoneRef}
            flashRef={flashRef}
            handleFlash={handleFlash}
            gameOver={gameOver}
          />
        )}

        {hide[4] && <EndCredit gameOver={gameOver} restart={restart} />}
        {!hide[2] && (
          <>
            <div id="ctc_backdrop_lights" style={{ opacity: style.opacity }}>
              <div className="light red"></div>
              <div className="light blue"></div>
            </div>
          </>
        )}
        {hide[5] && <img src={explosion} alt="explosion" id="ctc_explosion" />}
        <img
          src={background}
          alt="dirty alleyway"
          id="ctc_backdrop"
          style={{
            filter: `blur(${style.blur}px)`,
            transform: `scale(${style.scale}) translateY(${style.translate})`,
            transition: style.transition,
          }}
        />
      </div>
    </>
  );
}

export default CrackTheCode;
