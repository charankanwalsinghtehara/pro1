import { useEffect, useState } from "react";
import { calculateScore, scoreToPercentage } from "../utils/calculateScore.js";
import { getCookedCategory } from "../utils/getCookedCategory.js";

export default function ResultCard({ name, answers, onReplay }) {
  const totalScore = calculateScore(answers);
  const percentage = scoreToPercentage(totalScore);
  const category = getCookedCategory(percentage);
  const highestScoringAnswer = Object.values(answers).reduce(
    (highest, answer) => (answer.score > highest.score ? answer : highest),
  );
  const [displayScore, setDisplayScore] = useState(0);
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    let frame;
    const duration = 1100;
    const start = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplayScore(Math.round(totalScore * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [totalScore]);

  async function shareResult() {
    const shareText = `${name} is ${category.name} ${category.emoji} — ${percentage}% cooked! Take the How Cooked Are You? quiz at The Funny Lab.`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "How Cooked Are You?", text: shareText });
        setShareMessage("Sent. Ab unko bhi pata chalega.");
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setShareMessage("Copied! Ab group chat mein apni beizzati share kar.");
    } catch {
      setShareMessage("Sharing isn't available here. Try copying your result manually.");
    }
  }

  return (
    <section className="result-card" aria-labelledby="result-title">
      <div className="result-topline">
        <span className="eyebrow">THE LAB HAS SPOKEN</span>
        <span className="result-stamp">100% UNOFFICIAL</span>
      </div>
      <div className="result-emoji" aria-hidden="true">{category.emoji}</div>
      <p className="result-greeting">Well, {name}...</p>
      <h1 id="result-title" className="result-category">{category.name}</h1>
      <p className="result-label">{category.label}</p>
      <p className="result-reaction">“{category.reaction}”</p>
      <div className="score-display" aria-label={`${displayScore} out of 150 points, ${percentage} percent cooked`}>
        <span className="score-number">{displayScore}</span>
        <span className="score-total">/ 150</span>
        <span className="score-percent">{percentage}% cooked</span>
      </div>
      <p className="result-roast">{category.roast}</p>
      <div className="top-answer">
        <span className="top-answer-label">YOUR MOST COOKED MOMENT</span>
        <p>“{highestScoringAnswer.text}”</p>
        <span className="top-answer-score">+{highestScoringAnswer.score} points of chaos</span>
      </div>
      <div className="result-actions">
        <button className="button button-primary" type="button" onClick={onReplay}>
          REPLAY <span aria-hidden="true">↻</span>
        </button>
        <button className="button button-secondary" type="button" onClick={shareResult}>
          SHARE RESULT <span aria-hidden="true">↗</span>
        </button>
      </div>
      <p className="share-message" role="status" aria-live="polite">{shareMessage}</p>
      <p className="result-disclaimer">No actual cooking expertise was used in this result.</p>
    </section>
  );
}
