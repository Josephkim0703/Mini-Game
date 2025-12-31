import "/main.css";
import { useEffect, useState, useRef } from "react";
import CrackTheCode from "./games/crack_the_code/CrackTheCode.jsx";
import OnceUponATune from "./games/once_upon_a_tune/OnceUponATune.jsx";
function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [hide, setHide] = useState(true);
  const [muted, setMuted] = useState(false);

  const games = [
    {
      name: "Crack The Code",
      component: CrackTheCode,
      link: null,
      thumbnail: "/assets/wallpapers/crackthecode.png",
      status: "active",
    },
    {
      name: "Once Upon A Tune",
      component: OnceUponATune,
      link: null,
      thumbnail: "/assets/wallpapers/onceuponatune.jpg",
      status: "active",
    },
    {
      name: "",
      component: () => <div>Off Site</div>,
      link: "https://josephkim0703.github.io/devil-fruit-encyclopedia/",
      thumbnail: "/assets/wallpapers/onepiece.jpg",
      status: "active",
    },
    {
      name: "",
      component: () => <div>Off Site</div>,
      link: "https://josephkim0703.github.io/Domain-Expansion/",
      thumbnail: "/assets/wallpapers/domainExpansion2.png",
      status: "active",
    },
    {
      name: "",
      component: () => <div>Coming Soon!</div>,
      thumbnail: "/assets/wallpapers/construction.png",
      status: "none",
    },
    {
      name: "",
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
      {hide && (
        <div id="homePage">
          <header>
            <h1>Kimonsters Laboratory</h1>
            <h2></h2>
          </header>

          <main>
            {games.map((game, index) => (
              <a href={game.link} key={index}>
                <button onClick={() => handleClick(index)}>
                  <img src={game.thumbnail} alt={game.name} />
                </button>
              </a>
            ))}
          </main>

          <footer>
            <h2>Hi! I'm Kimonster. This is where my boredom goes.</h2>
          </footer>
        </div>
      )}
      {!hide && currentGame !== null && (
        <div id="gamePage">
          <button onClick={handleReturn} type="button" id="returnButton" className="homeButtons">
            &#8634;
          </button>
          {GameComponent && <GameComponent volume={muted ? 0 : 0.5 } />}
          <button
            onClick={handleAudio}
            type="button"
            id="volumnButton"
            className="homeButtons"
          >{muted ?  "🕨": "🕪" }</button>
        </div>
      )}
    </div>
  );
}

export default App;
