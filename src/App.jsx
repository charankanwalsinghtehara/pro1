import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import CookedGame from "./pages/CookedGame.jsx";
import Results from "./pages/Results.jsx";
import { questions } from "./data/questions.js";

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [playerName, setPlayerName] = useState("");
  const [gameQuestions, setGameQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  function startGame(name) {
    setPlayerName(name.trim() || "Bhai");
    setGameQuestions(shuffle(questions));
    setAnswers({});
    setScreen("quiz");
  }

  function finishGame(finalAnswers) {
    setAnswers(finalAnswers);
    setScreen("results");
  }

  function replay() {
    setAnswers({});
    setGameQuestions([]);
    setScreen("home");
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-left" aria-hidden="true" />
      <div className="ambient ambient-right" aria-hidden="true" />
      <Navbar />
      {screen === "home" && <Home onStart={startGame} />}
      {screen === "quiz" && <CookedGame questions={gameQuestions} onComplete={finishGame} />}
      {screen === "results" && <Results name={playerName} answers={answers} onReplay={replay} />}
      <footer className="site-footer">
        <span>THE FUNNY LAB © 2025</span>
        <span>MADE FOR THE CHRONICALLY ONLINE <span aria-hidden="true">♥</span></span>
      </footer>
    </div>
  );
}
