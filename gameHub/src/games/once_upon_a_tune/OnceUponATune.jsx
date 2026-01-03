import { useEffect, useState, useRef } from "react";
import "./css/out.css";
import Box from "./utility/out_Box.jsx";
import StartBox from "./utility/out_StartBox.jsx";
import { audioFile } from "./utility/out_Audiofile.jsx";
function OnceUponATune(props) {
  const [hide, setHide] = useState(Array(10).fill(false));
  const [background, setBackground] = useState(null);
  const [song, setSong] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [current, setCurrent] = useState(0);
  const [level, setLevel] = useState(0);
  const [duration, setDuration] = useState();
  const [text, setText] = useState("");
  const [toggle, setToggle] = useState(false);
  const [genre, setGenre] = useState("");
  const [hint, setHint] = useState("");
  const [storeNum, setStoreNum] = useState(null);
  const [used, setUsed] = useState(false);
  function updateHide(index, value) {
    setHide((prev) => {
      const arr = [...prev];
      arr[index] = value;
      return arr;
    });
  }

  //sets the duration of the song and the text
  useEffect(() => {
    if (current <= 0) {
      setDuration(3000);
      setText(used? "Guess the song in 3 seconds: 3 Points":"Guess the song in 3 seconds: 4 Points");
    } else if (current == 1) {
      setDuration(7000);
      setText(used? "Guess the song in 3 seconds: 2 Points":"Guess the song in 7 seconds: 3 Points");
    } else if (current == 2) {
      setDuration(15000);
      setText(used? "Guess the song in 3 seconds: 1 Points":"Guess the song in 15 seconds: 2 Points");
    } else {
      return;
    }
  }, [current, used]);

  //randomly selects a random song and picks new one when level is increased
 useEffect(() => {
  let arr = genre === "all" ? audioFile : audioFile.filter((item) => item.genre === genre);

  if (arr.length === 0) return;

  let ran = Math.floor(Math.random() * arr.length);

  if (arr.length > 1) {
    while (ran === storeNum) {
      ran = Math.floor(Math.random() * arr.length);
    }
  }

  setStoreNum(ran);
  setSong(arr[ran].audio);
  setAnswer(arr[ran].name);
  setHint(arr[ran].singer)
}, [level, genre]);

  //handle audio play as well as pause
  useEffect(() => {
    if (!song) return;

    const audio = new Audio(song);
    audio.volume = 1;

    if (toggle) audio.play();

    const timer = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
      setToggle(false);
    }, duration);

    return () => {
      audio.pause();
      audio.currentTime = 0;
      clearTimeout(timer);
    };
  }, [toggle, duration]);

  //toggles the audio to play
  const handleAudio = () => {
    setToggle(true);
    updateHide(4, true);
  };
  //toggles the audio to play and set the current stage of the song
  const handleTime = () => {
    setToggle(true);
    setCurrent((prev) => prev + 1);
  };

  return (
    <>
      <div id="tuneWrapper">
        {!hide[0] && (
          <StartBox hide={hide} updateHide={updateHide} setGenre={setGenre} />
        )}
        {hide[1] && (
          <Box
            handleAudio={handleAudio}
            handleTime={handleTime}
            current={current}
            answer={answer}
            text={text}
            setCurrent={setCurrent}
            setLevel={setLevel}
            hide={hide}
            updateHide={updateHide}
            hint={hint}
            toggle={used}
            setToggle={setUsed}
          />
        )}
        <img src={background} alt="Cartoon Tree" id="out_backdrop" />
      </div>
    </>
  );
}

export default OnceUponATune;
