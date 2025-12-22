import "/main.css";
import { useEffect, useState, useRef } from "react";
import CrackTheCode from "./games/crack_the_code/CrackTheCode.jsx";

function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [hide, setHide] = useState(true);

  const games = [
    {
      name: "Crack The Code",
      component: <CrackTheCode />,
      link: null,
      thumbnail: "/image/wallpapers/crackthecode.png",
      status: "active",
    },
    {
      name: "",
      component: <div>Coming Soon!</div>,
      link: 'https://josephkim0703.github.io/devil-fruit-encyclopedia/',
      thumbnail: "/image/wallpapers/onepiece.jpg",
      status: "none",
    },
    {
      name: "",
      component: <div>Coming Soon!</div>,
      link: 'https://josephkim0703.github.io/Domain-Expansion/',
      thumbnail: "/image/wallpapers/domainExpansion2.png",
      status: "none",
    },
    {
      name: "",
      component: <div>Coming Soon!</div>,
      thumbnail: "/image/wallpapers/construction.png",
      status: "none",
    },
    {
      name: "",
      component: <div>Coming Soon!</div>,
      thumbnail: "/image/wallpapers/construction.png",
      status: "none",
    },
    {
      name: "",
      component: <div>Coming Soon!</div>,
      thumbnail: "/image/wallpapers/construction.png",
      status: "none",
    },
  ];

  const handleClick = (index) => {
    if(games[index].link === null){
        setCurrentGame(index);
        setHide(false);
    }
  };

  const handleReturn = () => {
    setCurrentGame(null);
    setHide(true);
  };

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
              <a href={game.link} key={index}><button  onClick={() => handleClick(index)} >
                <img
                  src={game.thumbnail}
                  alt={game.name}
                />
              </button></a>
            ))}
          </main>

          <footer>
            <h2>Hi! I'm Kimonster. This is where my boredom goes.</h2>
          </footer>
        </div>
      )}
      {!hide && currentGame !== null && (
        <div id="gamePage">
          <button onClick={handleReturn} type="button" id="returnButton">&#8634;</button>
          {games[currentGame].component}
        </div>
      )}
    </div>
  );
}

export default App;
