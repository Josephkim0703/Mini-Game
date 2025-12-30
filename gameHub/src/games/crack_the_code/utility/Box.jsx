import { useEffect, useState, useRef } from "react";
import { Moon } from "lunarphase-js";
import { initialScript } from "../utility/Script.jsx";
import elements from "../json/elements.json";
import "../css/ctc.css";
function Box(props) {
  const [temp, setTemp] = useState(null);
  const [temp2, setTemp2] = useState(null);
  const [temp3, setTemp3] = useState(null);
  const [placeHolder, setPlaceHolder] = useState("");
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState("");
  const [lives, setLives] = useState(0);
  const [heart, setHeart] = useState([
    { state: "1", color: "rgb(0, 161, 0)" },
    { state: "1", color: "rgb(0, 161, 0)" },
    { state: "1", color: "rgb(0, 161, 0)" },
    { state: "1", color: "rgb(0, 161, 0)" },
    { state: "1", color: "rgb(0, 161, 0)" },
  ]);
  //question are handled here when index updates
  useEffect(() => {
    //grabs previous full moon date
    function fetchMoon() {
      setPlaceHolder("Enter: Number");
      const date = new Date();
      const age = Math.floor(Moon.lunarAge(date));
      setAnswer(age);
    }
    //grabs recent lottery numebers
    async function fetchLottery() {
      setPlaceHolder("Enter: Number");
      try {
        const res = await fetch(
          "https://api.apiverve.com/v1/lottery?numbers=megamillions",
          {
            headers: {
              "x-api-key": "8e24f808-d74e-46cf-8b9d-d0cc8bb6cdde",
            },
          }
        );

        const data = await res.json();
        const winningNumbers = data?.data?.numbers?.sort((a, b) => a - b) || [];

        if (winningNumbers.length > 0) {
          const total = winningNumbers.reduce((acc, num) => acc + num, 0);
          const average = total / winningNumbers.length;
          setAnswer(Math.floor(average));
        }
      } catch (err) {
        console.error("Error fetching lottery data:", err);
      }
    }
    //gets random word then converts to morse code
    async function fetchMorse() {
      setPlaceHolder("Enter: Word");
      let randomWord = "";
      try {
        const resWord = await fetch(
          "https://random-word-api.herokuapp.com/word"
        );
        const data = await resWord.json();
        randomWord = data[0];
        if (!randomWord) throw new Error("No word returned");
      } catch (err) {
        console.error("Error fetching word data:", err);
        return;
      }
      const cleanWord = randomWord.replace(/-/g, " ").trim();
      const MORSE_MAP = {
        a: ".-",
        b: "-...",
        c: "-.-.",
        d: "-..",
        e: ".",
        f: "..-.",
        g: "--.",
        h: "....",
        i: "..",
        j: ".---",
        k: "-.-",
        l: ".-..",
        m: "--",
        n: "-.",
        o: "---",
        p: ".--.",
        q: "--.-",
        r: ".-.",
        s: "...",
        t: "-",
        u: "..-",
        v: "...-",
        w: ".--",
        x: "-..-",
        y: "-.--",
        z: "--..",
        " ": " / ",
      };

      function textToMorse(text) {
        return text
          .toLowerCase()
          .split("")
          .map((char) => MORSE_MAP[char] || "")
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();
      }
      if (!cleanWord) {
        setAnswer("temporary");
        setTemp(textToMorse("temporary"));
      } else {
        const lower = cleanWord.toLowerCase();
        setAnswer(lower);
        setTemp(textToMorse(lower));
      }
    }
    //grabs two elements then create an equation to find a third element
    function fetchElements() {
      setPlaceHolder("Enter: Name");
      const size = elements.length;

      let num1 = Math.floor(Math.random() * size);
      let num2 = Math.floor(Math.random() * size);
      while (num1 === num2) {
        num2 = Math.floor(Math.random() * size);
      }

      setTemp(elements[num1].name);
      setTemp2(elements[num2].name);

      const higher = Math.max(
        elements[num1].atomicNumber,
        elements[num2].atomicNumber
      );
      const lower = Math.min(
        elements[num1].atomicNumber,
        elements[num2].atomicNumber
      );

      const atomicNum = higher - lower;
      const newElement = elements.find((el) => el.atomicNumber === atomicNum);
      setAnswer(newElement.name.toLowerCase());
    }
    //generates two random lines of binary then decodes them into decimal finds the difference and coverts back to binary
    function fetchBinary() {
      setPlaceHolder("Enter: Binary Digits");
      const randomBinary = Math.floor(Math.random() * 2 ** 16)
        .toString(2)
        .padStart(16, "0");
      setTemp(randomBinary.slice(0, 8) + " " + randomBinary.slice(8));

      //convert binary to a numerical value
      let binary = [128, 64, 32, 16, 8, 4, 2, 1];
      let count = 0;
      let count1 = 0;
      for (let i = 0; i < 8; i++) {
        if (randomBinary[i] == 1) {
          count += binary[i];
        }
      }
      for (let i = 8; i < 16; i++) {
        if (randomBinary[i] == 1) {
          count1 += binary[i - 8];
        }
      }

      //convert numerical value back to binary
      let ans = 0;
      if (count < count1) ans = count1 - count;
      else ans = count - count1;
      let numCount = ans;
      let ansBinary = "";
      for (let i = 0; i < 8; i++) {
        if (numCount >= binary[i]) {
          if (numCount - binary[i] < 0) {
            numCount;
            ansBinary += "0";
          } else {
            numCount = numCount - binary[i];
            ansBinary += "1";
          }
        } else {
          numCount;
          ansBinary += "0";
        }
      }
      setAnswer(ansBinary);
    }
    //nothing happened
    function fetchOnepiece() {
      setPlaceHolder("Enter: Sentence");
      setAnswer("nothing happened");
    }
    //generates a phyics problem
    function fetchSpeed() {
      setPlaceHolder("Enter: (# yes) or (# no)");
      let BA = 30;
      let BB = Math.floor(Math.random() * (25 - 5 + 1)) + 5;
      let distance = Math.floor(Math.random() * (40 - 5 + 1)) + 5;
      let speed = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
      let gravity = 9.8;

      setTemp(BB);
      setTemp2(distance);
      setTemp3(speed);
      let motion = Math.floor(speed * Math.sqrt((2 * (BA - BB)) / gravity));
      let success = motion >= distance;

      console.log(motion, distance, success);
      setAnswer(success ? motion + " yes" : motion + " no");
    }
    //generates a lat and long and grabs a location
    async function fetchLocation() {
      setPlaceHolder("Enter: Word");
      let location = "Unknown";
      let lat = 0;
      let lon = 0;
      while (location == "Unknown" || location == undefined) {
        lat = Math.random() * 180 - 90;
        lon = Math.random() * 360 - 180;
        const res = await fetch(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${lat.toFixed(
            4
          )}&lon=${lon.toFixed(4)}&apiKey=4566cca66c154e8f87ae36260bca12f8`
        );
        const data = await res.json();
        location = data.features[0].properties.country;
      }
      if (location !== "Unknown") {
        setTemp(lat);
        setTemp2(lon);
        setAnswer(location.toLowerCase().normalize("NFD"));
      }
    }
    //generates a deck of card probability question
    function fetchCards() {
      setPlaceHolder("Enter: Number");
      let num = Math.floor(Math.random() * 3);

      let question = [
        {
          text: (
            <span>
              You draw two cards at random from a standard 52-card deck. <br />
              What is the probability that both cards are Aces, given that at
              least one of the two drawn cards is the{" "}
              <span style={{ color: "red" }}>Ace of Spades?</span>
              <br />
              <span style={{ color: "rgb(255,190,0)" }}>
                (Clue: 1326 ways to draw two cards <br /> (Format: #/#))
              </span>
            </span>
          ),
          ans: "1/17",
        },
        {
          text: (
            <span>
              You randomly select one card and place it on the table. The side
              facing up is <span style={{ color: "red" }}>Red</span>. What is
              the probability that the other side is also{" "}
              <span style={{ color: "red" }}>Red</span>?
              <br />
              Card 1: Red on both sides (<span style={{ color: "red" }}>R</span>
              /<span style={{ color: "red" }}>R</span>)
              <br />
              Card 2: Blue on both sides (
              <span style={{ color: "blue" }}>B</span>/
              <span style={{ color: "blue" }}>B</span>)
              <br />
              Card 3: Red on one side, Blue on the other (
              <span style={{ color: "red" }}>R</span>/
              <span style={{ color: "blue" }}>B</span>)
              <br />
              <span style={{ color: "rgb(255,190,0)" }}>
                (Clue: 6 available faces (Format: #/#))
              </span>
            </span>
          ),
          ans: "2/3",
        },
        {
          text: (
            <span>
              You are dealing cards from a standard deck one at a time. <br />
              How many cards do you need to deal, at minimum, to have a greater
              than 50% chance that at least two of the cards dealt share the
              exact same rank
              <br />
              <span style={{ color: "red" }}>
                (e.g., two Queens, two Fours, etc.)?
              </span>
              <br />
              <span style={{ color: "rgb(255,190,0)" }}>
                (Clue: Focus on the probability of failure)
              </span>
            </span>
          ),
          ans: "6",
        },
      ];

      setTemp(question[num].text);
      setAnswer(question[num].ans);
    }
    //final question
    function fetchMoral() {
      setPlaceHolder("Yes or No officer...");
      setAnswer("");
    }

    if (props.index === 0) fetchMoon();
    else if (props.index === 1) fetchLottery();
    else if (props.index === 2) fetchMorse();
    else if (props.index === 3) fetchElements();
    else if (props.index === 4) fetchBinary();
    else if (props.index === 5) fetchOnepiece();
    else if (props.index === 6) fetchSpeed();
    else if (props.index === 7) fetchLocation();
    else if (props.index === 8) fetchCards();
    else if (props.index === 9) fetchMoral();
    console.log("Answer: " + answer);
  }, [props.index]);
  //Scriptline injections
  useEffect(() => {
    if (props.script[props.currentLine].requiresAnswer == "placeholder_1") {
      props.setScript((prev) => {
        const newArr = [...prev];
        newArr[props.currentLine] = {
          text: (
            <span>
              .- -. ... .-- . .-. .. ...
              <br />( {temp} )
              <br />
              <span style={{ color: "rgb(255, 190, 0)" }}>
                (Clue: Translate)
              </span>
            </span>
          ),
          time: 0,
          requiresAnswer: true,
        };
        return newArr;
      });
    } else if (
      props.script[props.currentLine].requiresAnswer == "placeholder_2"
    ) {
      props.setScript((prev) => {
        const newArr = [...prev];
        newArr[props.currentLine] = {
          text: (
            <span>
              Take ({temp}) and ({temp2}). Find their positions on the table,
              thats your key. <br />
              The difference between those two numbers reveals the door to your
              answer.
              <br />
              <span style={{ color: "rgb(255, 190, 0)" }}>
                (Clue: Element Name)
              </span>
            </span>
          ),
          time: 0,
          requiresAnswer: true,
        };
        return newArr;
      });
    } else if (
      props.script[props.currentLine].requiresAnswer == "placeholder_3"
    ) {
      props.setScript((prev) => {
        const newArr = [...prev];
        newArr[props.currentLine] = {
          text: (
            <span>
              Officer… your terminal just flashed two codes: <br />( {temp} )
              <br />
              Convert them to decimal, subtract the smaller from the larger,
              then turn the result back into <br /> 8-bit binary.
              <br />
              <span style={{ color: "rgb(255,190,0)" }}>(Clue: Convert)</span>
            </span>
          ),
          time: 0,
          requiresAnswer: true,
        };
        return newArr;
      });
    } else if (
      props.script[props.currentLine].requiresAnswer == "placeholder_4"
    ) {
      props.setScript((prev) => {
        const newArr = [...prev];
        newArr[props.currentLine] = {
          text: (
            <span>
              A person is sprinting at ({temp3} m/s) on Building A, which is (
              30 meters ) high. <br />
              Building B stands at ({temp} meters) tall and is <br />({temp2}{" "}
              meters) away. <br />
              With gravity at ( 9.8 m/s² ), will they make the jump or fail?{" "}
              <br />
              <span style={{ color: "rgb(255,190,0)" }}>
                (Clue: Round down)
              </span>
            </span>
          ),
          time: 0,
          requiresAnswer: true,
        };
        return newArr;
      });
    } else if (
      props.script[props.currentLine].requiresAnswer == "placeholder_5"
    ) {
      props.setScript((prev) => {
        const newArr = [...prev];
        newArr[props.currentLine] = {
          text: (
            <span>
              A bird takes flight and soars
              <br />
              <strong>Up:</strong> ( {temp.toFixed(4)} ) and{" "}
              <strong>Across:</strong> ( {temp2.toFixed(4)} )
              <br />
              Follow the path of the bird… where will it land?
              <br />
              <span style={{ color: "rgb(255,190,0)" }}>(Clue: Country)</span>
            </span>
          ),
          time: 0,
          requiresAnswer: true,
        };
        return newArr;
      });
    } else if (
      props.script[props.currentLine].requiresAnswer == "placeholder_6"
    ) {
      props.setScript((prev) => {
        const newArr = [...prev];
        newArr[props.currentLine] = {
          text: <span>{temp}</span>,
          time: 0,
          requiresAnswer: true,
        };
        return newArr;
      });
    } else if (
      props.script[props.currentLine].requiresAnswer == "placeholder_7"
    ) {
      props.setScript((prev) => {
        const newArr = [...prev];
        newArr[props.currentLine] = {
          text: <span>{temp}</span>,
          time: 0,
          requiresAnswer: true,
        };
        return newArr;
      });
    }
    if (props.currentLine == initialScript.length - 3) {
      props.setPhone("/image/crackthecode/ctc_phone_fam.png");
    } else {
      props.setPhone("/image/crackthecode/ctc_phone_pickUp.png");
    }
  }, [props.currentLine]);

  //handle defuse button
  const handleClick = () => {
    const normalized = value.trim().toLowerCase();
    if (props.index === 9) {
      if (!["yes", "no"].includes(normalized)) {
        setValue("");
        return;
      }
      if (normalized == "no") {
        setTemp(
          "Justice always feels heavier when you’re the one holding the timer… thank you for playing my game, officer."
        );
        setTimeout(() => {
          props.setGameover((prev) => ({ ...prev, state: "win", over: true }));
        }, 9000);
      } else {
        setTemp(
          "You chose to carry the weight instead of ending it. Fascinating… thank you for playing my game, officer."
        );
        setTimeout(() => {
          props.setGameover((prev) => ({ ...prev, state: "win", over: true }));
        }, 9000);
      }
      setValue("");
      props.setCurrentLine((prev) => prev + 1);
      props.setIndex((prev) => prev + 1);
      return;
    }
    if (normalized == answer) {
      props.setCurrentLine((prev) => prev + 1);
      props.setIndex((prev) => prev + 1);
      setValue("");
    } else if (lives < 4) {
      setValue("");
      setLives((prevLife) => prevLife + 1);
      setHeart((prev) => {
        const newArr = [...prev];
        newArr[lives] = {
          ...newArr[lives],
          color: "rgb(218, 0, 0)",
          state: "0",
        };
        return newArr;
      });
    } else {
      props.setGameover((prev) => ({ ...prev, state: "lose", over: true }));
    }
  };
  //handle timer
  const [timerSeconds, setTimerSeconds] = useState(10 * 60);
  const formatTime = (sec) => {
    if (sec < 0) return "00:00";

    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTimerSeconds((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timerSeconds == 0) {
      props.setGameover((prev) => ({ ...prev, state: "lose", over: true }));
    }
  }, [timerSeconds]);
  //handle num pad on bomb
  const handleKeyboard = (num) => {
    setValue((prev) => {
      return prev + String(num);
    });
  };

  return (
    <>
      <div id="BoxWrapper" style={{ opacity: props.style.opacity1 }}>
        <img
          src="/image/crackthecode/bomb_module.png"
          alt="bomb"
          id="bomb_module"
        />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder={placeHolder}
        />
        <div id="timer">
          <h1>{formatTime(timerSeconds)}</h1>
        </div>
        <div id="keyboard">
          <span>
            <button type="button" onClick={() => handleKeyboard(1)}>
              1
            </button>
            <button type="button" onClick={() => handleKeyboard(2)}>
              2
            </button>
            <button type="button" onClick={() => handleKeyboard(3)}>
              3
            </button>
          </span>
          <span>
            <button type="button" onClick={() => handleKeyboard(4)}>
              4
            </button>
            <button type="button" onClick={() => handleKeyboard(5)}>
              5
            </button>
            <button type="button" onClick={() => handleKeyboard(6)}>
              6
            </button>
          </span>
          <span>
            <button type="button" onClick={() => handleKeyboard(7)}>
              7
            </button>
            <button type="button" onClick={() => handleKeyboard(8)}>
              8
            </button>
            <button type="button" onClick={() => handleKeyboard(9)}>
              9
            </button>
          </span>
          <span>
            <button type="button" onClick={() => handleKeyboard(0)}>
              0
            </button>
            <button type="button" onClick={handleClick} id="enterButton">
              Enter
            </button>
          </span>
        </div>
        <div id="healthBar">
          {heart.map((x, index) => (
            <button
              key={index}
              className="heart"
              style={{ backgroundColor: x.color }}
            ></button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Box;
