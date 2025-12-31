import { useEffect, useState, useRef } from "react";
import "./css/out.css";
import Box from "./utility/out_Box.jsx";
import { audioFile } from "./utility/out_Audiofile.jsx";
function OnceUponATune(props) {
  const [hide, setHide] = useState(Array(10).fill(false));
  const [background, setBackground] = useState();
  const [song, setSong] = useState(audioFile[0]);
  const [current, setCurrent] = useState(0);
  // useEffect(() => {
  //  const ran = Math.floor(Math.random() * audioFile.length);
  //    setSong(audioFile[ran]);
  // }, []);

  function updateHide(index, value) {
    setHide((prev) => {
      const arr = [...prev];
      arr[index] = value;
      return arr;
    });
  }

  const bgmRef = useRef(null);
  const handleAudio = () => {
    setCurrent((prev) => prev + 1);
    console.log(current)
    if (!bgmRef.current) {
      bgmRef.current = new Audio(song.audio);
      bgmRef.current.loop = false;
      bgmRef.current.volume = 0.5;
    }
    bgmRef.current.play();
  };

  useEffect(() => {
    return () => {
      if (bgmRef.current) {
        bgmRef.current.pause();
        bgmRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div id="tuneWrapper">
        <Box handleAudio={handleAudio} />
        <img src={background} alt="Cartoon Tree" id="out_backdrop" />
      </div>
    </>
  );
}

export default OnceUponATune;
