import { useState } from "react";

export default function Home({ onStart, onCat }) {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onStart(name.trim() || "Bhai");
  }

  return (
    <main className="home-screen lab-home">
      <section className="lab-hero">
        <div className="lab-games-grid">
          <article className="lab-game-card lab-game-primary">
            <span className="lab-card-kicker">GAME 01 · BAKCHODI METER</span>
            <h2>HOW COOKED ARE YOU? 🔥</h2>
            <p>15 questions. Zero respect for your ego.</p>
            <form className="start-form" onSubmit={handleSubmit}>
              <label htmlFor="player-name">FIRST, WHAT DO WE CALL YOU?</label>
              <div className="name-entry">
                <span className="name-icon" aria-hidden="true">✳</span>
                <input id="player-name" type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name, legend..." maxLength={24} autoComplete="given-name" />
              </div>
              <button className="button button-primary start-button" type="submit">START QUIZ <span aria-hidden="true">→</span></button>
            </form>
          </article>
          <article className="lab-game-card lab-game-cat">
            <span className="lab-card-kicker">GAME 03 · NEW</span>
            <div className="lab-cat-mini" aria-hidden="true">🐈</div>
            <h2>THE CAT KNOWS EVERYTHING</h2>
            <p>Let a cat expose your personality.</p>
            <button className="button button-primary start-button" type="button" onClick={onCat}>PLAY NOW <span aria-hidden="true">→</span></button>
          </article>
        </div>
      </section>
    </main>
  );
}
