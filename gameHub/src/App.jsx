import "/main.css";
import { useState } from "react";
import CrackTheCode from "./games/crack_the_code/CrackTheCode.jsx";
import OnceUponATune from "./games/once_upon_a_tune/StuckInMyHead.jsx";

const DUST_PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${4 + (i * 37 + i * i * 13) % 92}%`,
  size: `${1.5 + (i * 7) % 3}px`,
  dur: `${12 + (i * 11) % 16}s`,
  delay: `${(i * 1.7) % 14}s`,
  drift: `${(i % 2 === 0 ? 1 : -1) * (10 + (i * 9) % 30)}px`,
}));

function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [hide, setHide] = useState(true);
  const [muted, setMuted] = useState(false);

  const games = [
    {
      name: "Crack The Code",
      description: "Defuse the bomb before time runs out — and don't let the lights stay off.",
      component: CrackTheCode,
      link: null,
      thumbnail: "/assets/wallpapers/crackthecode.png",
      status: "active",
    },
    {
      name: "Stuck In My Head",
      description: "An earworm guessing game. How well do you really know your tunes?",
      component: OnceUponATune,
      link: null,
      thumbnail: "/assets/wallpapers/stuckinmyhead.png",
      status: "active",
    },
    {
      name: "Devil Fruit Encyclopedia",
      description: "A catalogue of every devil fruit on the Grand Line.",
      component: () => <div>Off Site</div>,
      link: "https://josephkim0703.github.io/devil-fruit-encyclopedia/",
      thumbnail: "/assets/wallpapers/onepiece.jpg",
      status: "active",
    },
    {
      name: "Domain Expansion",
      description: "Step into the domain — a Jujutsu Kaisen tribute.",
      component: () => <div>Off Site</div>,
      link: "https://josephkim0703.github.io/Domain-Expansion/",
      thumbnail: "/assets/wallpapers/domainExpansion2.png",
      status: "active",
    },
    {
      name: "Coming Soon",
      description: "This page hasn't been written yet…",
      component: () => <div>Coming Soon!</div>,
      thumbnail: "/assets/wallpapers/construction.png",
      status: "none",
    },
    {
      name: "Coming Soon",
      description: "This page hasn't been written yet…",
      component: () => <div>Coming Soon!</div>,
      thumbnail: "/assets/wallpapers/construction.png",
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

  const GameComponent =
    currentGame !== null ? games[currentGame].component : null;

  return (
    <div id="mainWrapper">
      <div className="library-glow" />

      {DUST_PARTICLES.map((p) => (
        <div
          key={p.id}
          className="dust-particle"
          style={{
            left: p.left,
            "--size": p.size,
            "--dur": p.dur,
            "--delay": p.delay,
            "--drift": p.drift,
          }}
        />
      ))}

      {hide && (
        <div id="homePage">
          <header>
            <h1>
              Kimonsters Library
              <span className="header-ornament">
                ✦ &nbsp; A Collection of Curios &nbsp; ✦
              </span>
            </h1>
            <h2>step inside &mdash; the shelves are always open</h2>
          </header>

          <div className="library-divider">⬥ ⬦ ⬥</div>

          <main>
            {games.map((game, index) => (
              <a href={game.link} key={index}>
                <div className="plate">
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
          {GameComponent && <GameComponent volume={muted ? 0 : 0.5} />}
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
