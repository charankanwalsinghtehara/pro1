import { useState } from "react";

export default function Home({ onStart }) {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onStart(name.trim() || "Bhai");
  }

  return (
    <main className="home-screen">
      <div className="home-copy">
        <div className="hero-kicker"><span className="kicker-line" /> A HIGHLY QUESTIONABLE PERSONALITY TEST</div>
        <h1 className="hero-title">
          HOW COOKED
          <span>ARE YOU?<i aria-hidden="true">🔥</i></span>
        </h1>
        <p className="hero-tagline">15 questions. <span>Zero respect</span> for your ego.</p>
        <p className="hero-description">
          Answer honestly. Our highly unreliable system will calculate your level of bakchodi.
        </p>
        <form className="start-form" onSubmit={handleSubmit}>
          <label htmlFor="player-name">FIRST, WHAT DO WE CALL YOU?</label>
          <div className="name-entry">
            <span className="name-icon" aria-hidden="true">✳</span>
            <input
              id="player-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name, legend..."
              maxLength={24}
              autoComplete="given-name"
            />
          </div>
          <button className="button button-primary start-button" type="submit">
            START QUIZ <span aria-hidden="true">→</span>
          </button>
        </form>
        <div className="hero-footnote"><span aria-hidden="true">✦</span> 15 QUESTIONS <span aria-hidden="true">·</span> 0 JUDGEMENT <span aria-hidden="true">·</span> OKAY, SOME JUDGEMENT</div>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="hero-glow" />
        <div className="hero-emoji">🥵</div>
        <div className="float-chip chip-top">NO CAP 🧢</div>
        <div className="float-chip chip-bottom">100% SCIENTIFIC*</div>
        <span className="spark spark-one">✳</span>
        <span className="spark spark-two">✦</span>
        <span className="spark spark-three">✧</span>
      </div>
    </main>
  );
}
