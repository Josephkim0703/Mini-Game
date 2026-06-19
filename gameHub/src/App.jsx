import "/main.css";
import { useState, useCallback, useRef } from "react";
import CrackTheCode from "./games/crack_the_code/CrackTheCode.jsx";
import OnceUponATune from "./games/once_upon_a_tune/StuckInMyHead.jsx";

function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [hide, setHide] = useState(true);
  const [muted, setMuted] = useState(false);
  const [dark, setDark] = useState(false);

  const games = [
    {
      name: "Crack The Code",
      theme: "secret",
      description:
        "Defuse the bomb before time runs out — and don't let the lights stay off.",
      component: CrackTheCode,
      link: null,
      thumbnail: `${import.meta.env.BASE_URL}assets/wallpapers/crackthecode.png`,
      status: "active",
    },
    {
      name: "Stuck In My Head",
      theme: "groove",
      description:
        "An earworm guessing game. How well do you really know your tunes?",
      component: OnceUponATune,
      link: null,
      thumbnail: `${import.meta.env.BASE_URL}assets/wallpapers/stuckinmyhead.png`,
      status: "active",
    },
    {
      name: "Devil Fruit Encyclopedia",
      theme: "wanted",
      description: "Explore the world of Devil Fruits and their powers.",
      component: () => <div>Off Site</div>,
      link: "https://josephkim0703.github.io/devil-fruit-encyclopedia/",
      thumbnail: `${import.meta.env.BASE_URL}assets/wallpapers/onepiece.jpg`,
      status: "active",
    },
    {
      name: "Domain Expansion",
      theme: "cursed",
      description: "Step into the domain — a Jujutsu Kaisen tribute.",
      component: () => <div>Off Site</div>,
      link: "https://josephkim0703.github.io/Domain-Expansion/",
      thumbnail: `${import.meta.env.BASE_URL}assets/wallpapers/domainExpansion2.png`,
      status: "active",
    },
    {
      name: "Coming Soon",
      theme: "soon",
      description: "This page hasn't been written yet…",
      component: () => <div>Coming Soon!</div>,
      thumbnail: `${import.meta.env.BASE_URL}assets/wallpapers/construction.png`,
      status: "none",
    },
    {
      name: "Coming Soon",
      theme: "soon",
      description: "This page hasn't been written yet…",
      component: () => <div>Coming Soon!</div>,
      thumbnail: `${import.meta.env.BASE_URL}assets/wallpapers/construction.png`,
      status: "none",
    },
  ];

  const handleClick = (index) => {
    if (games[index].link === null) {
      setCurrentGame(index);
      setHide(false);
    }
  };

  const handleReturn = () => {
    setCurrentGame(null);
    setHide(true);
  };

  const handleAudio = () => {
    setMuted((prev) => !prev);
  };

  const audioCtxRef = useRef(null);
  const playThock = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (
        window.AudioContext || window.webkitAudioContext
      )();
    }
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    // sine "thump" — the deep body of a cream switch
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(95, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.05);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0.7, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);

    // very short noise burst — just the subtle "impact" layer
    const bufferSize = Math.floor(ctx.sampleRate * 0.04);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 10);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // low-pass keeps it muffled/creamy — cut everything above ~250 Hz
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1500;
    lp.Q.value = 0.8;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    noise.connect(lp);
    lp.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
  }, []);

  const GameComponent =
    currentGame !== null ? games[currentGame].component : null;

  return (
    <div id="mainWrapper" className={dark ? "dark-mode" : ""}>
      {hide && <div className="library-glow" />}

      {hide && (
        <div id="homePage">
          <header>
            <h1>
              <span className="title-magic">
                {"Kimonsters Library".split("").map((ch, i) => (
                  <span key={i} className="title-letter">
                    {ch === " " ? " " : ch}
                  </span>
                ))}
              </span>
              <span className="header-ornament">
                games, experiments, and other things I made instead of sleeping
              </span>
            </h1>
          </header>

          <div className="library-divider">⬥ ⬦ ⬥</div>

          <main>
            {games.map((game, index) => (
              <a href={game.link} key={index}>
                <div
                  className={`plate plate--${game.theme}`}
                  onMouseEnter={playThock}
                >
                  <button onClick={() => handleClick(index)}>
                    <img src={game.thumbnail} alt={game.name} />
                  </button>
                  <div className="plate-caption">
                    <h3>{game.name}</h3>
                    <p>{game.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </main>

          <footer>
            <h2>Hi! I&rsquo;m Kimonster. This is where my boredom goes.</h2>
          </footer>
        </div>
      )}

      {!hide && currentGame !== null && (
        <div id="gamePage">
          <button
            onClick={handleReturn}
            type="button"
            id="returnButton"
            className="homeButtons"
          >
            &#8634;
          </button>
          {GameComponent && <GameComponent volume={muted ? 0 : 0.1} />}
          <button
            onClick={handleAudio}
            type="button"
            id="volumnButton"
            className="homeButtons"
          >
            {muted ? "🕨" : "🕪"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
