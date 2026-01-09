import { useEffect, useState, useRef } from "react";
import "./css/out.css";
import Box from "./utility/out_Box.jsx";
import StartBox from "./utility/out_StartBox.jsx";
import EndBox from "./utility/out_EndCredit.jsx";
import { audioFile } from "./utility/out_Audiofile.jsx";
function StuckInMyHead(props) {
  const [hide, setHide] = useState(Array(10).fill(false));
  const [background, setBackground] = useState(
    "/assets/onceuponatune/image/out_background_1.jpg"
  );
  const [song, setSong] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [current, setCurrent] = useState(0);
  const [level, setLevel] = useState(0);
  const [duration, setDuration] = useState(null);
  const [text, setText] = useState("");
  const [toggle, setToggle] = useState(false);
  const [genre, setGenre] = useState("");
  const [hint, setHint] = useState("");
  const [storeNum, setStoreNum] = useState([]);
  const [used, setUsed] = useState(false);
  const [lives, setLives] = useState(0);
  const [status, setStatus] = useState("");
  const [point, setPoint] = useState(0);
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
      setText(
        used ? (
          <span>
            Guess the song in <b>3 seconds</b>: 3 Points
          </span>
        ) : (
          "Guess the song in 3 seconds: 4 Points"
        )
      );
    } else if (current == 1) {
      setDuration(7000);
      setText(
        used ? (
          <span>
            Guess the song in <b>7 seconds</b>: 2 Points
          </span>
        ) : (
          "Guess the song in 7 seconds: 3 Points"
        )
      );
    } else if (current == 2) {
      setDuration(15000);
      setText(
        used ? (
          <span>
            Guess the song in <b>15 seconds</b>: 1 Points
          </span>
        ) : (
          "Guess the song in 15 seconds: 2 Points"
        )
      );
    } else {
      return;
    }
  }, [current, used]);

  //randomly selects a random song and picks new one when level is increased
  useEffect(() => {
    let arr =
      genre === "all"
        ? audioFile
        : audioFile.filter((item) =>
            Array.isArray(item.genre)
              ? item.genre.includes(genre) // OR logic
              : item.genre === genre
          );

    if (arr.length === 0) return;

    if (storeNum.length >= arr.length) {
      setStoreNum([]);
      return;
    }

    let ran;

    if (arr.length > 1) {
      do {
        ran = Math.floor(Math.random() * arr.length);
      } while (storeNum.includes(ran));
    } else {
      ran = 0;
    }

    setStoreNum((prev) => [...prev, ran]);

    setSong(arr[ran].audio);
    setAnswer(arr[ran].name);
    setHint(arr[ran].singer);
  }, [level, genre]);

  //when genre changes empty used songs array
  useEffect(() => {
    setStoreNum([]);
  }, [genre]);

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
//handle reset back to menu
    const handleMenu = () => {
    setPoint(0)
    setCurrent(0);
    setLives(0)
    setLevel((prev) => prev + 1);
    setBackground("/assets/onceuponatune/image/out_floor.png");
    updateHide(6, false);
    updateHide(4, false);
    updateHide(2, true);
    updateHide(3, true);
    updateHide(0, false);
    updateHide(1, false);
    updateHide(7, false);
  };

  return (
    <>
      <div id="tuneWrapper">
        {!hide[0] && (
          <StartBox
            hide={hide}
            updateHide={updateHide}
            setGenre={setGenre}
            setBackground={setBackground}
          />
        )}
        {hide[7] && (
          <EndBox
            lives={lives}
            updateHide={updateHide}
            status={status}
            point={point}
            setBackground={setBackground}
            handleMenu={handleMenu}
          />
        )}

        {hide[1] && (
          <Box
            handleMenu={handleMenu}
            point={point}
            setPoint={setPoint}
            setStatus={setStatus}
            lives={lives}
            setLives={setLives}
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
            setBackground={setBackground}
          />
        )}
        <img src={background} alt="Cassette player wall" id="out_backdrop" />
      </div>
    </>
  );
}

export default StuckInMyHead;
