import { useEffect, useMemo, useState } from "react";
import CatMascot from "../components/CatMascot.jsx";
import { catQuestions } from "../data/catQuestions.js";
import { personalities, secretPersonality } from "../data/personalities.js";
import { catDialogues, lieDetectorLines } from "../data/catDialogues.js";
import { calculatePersonality, emptyScores } from "../utils/calculatePersonality.js";
import { getFinalRoast } from "../utils/generateCatRoast.js";
import { canvasToBlob, generateShareCard } from "../utils/generateShareCard.js";

const intensityCopy = {
  mild: "Thoda ajeeb hai tu.",
  savage: "Bhai, tu alag hi namoona hai.",
  nuclear: "Tere decisions dekh ke calculator bhi resign kar dega.",
};

export default function CatPersonality({ onHome }) {
  const [phase, setPhase] = useState("welcome");
  const [name, setName] = useState("");
  const [intensity, setIntensity] = useState("savage");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerIds, setAnswerIds] = useState({});
  const [expression, setExpression] = useState("idle");
  const [speech, setSpeech] = useState("Mujhe sab pata hai.");
  const [lieMode, setLieMode] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const [dialogueSeed, setDialogueSeed] = useState(0);

  const question = catQuestions[questionIndex];
  const selectedId = answerIds[question?.id];
  const selectedAnswer = question?.answers.find((answer) => answer.id === selectedId);

  useEffect(() => {
    if (phase !== "quiz") return undefined;
    const timer = window.setTimeout(() => {
      setExpression("thinking");
      setSpeech(catDialogues[dialogueSeed % catDialogues.length]);
      setDialogueSeed((seed) => seed + 1);
    }, 14000);
    return () => window.clearTimeout(timer);
  }, [phase, questionIndex, dialogueSeed]);

  function startQuiz(event) {
    event.preventDefault();
    setAnswerIds({});
    setQuestionIndex(0);
    setExpression("suspicious");
    setSpeech(intensityCopy[intensity]);
    setLieMode(false);
    setPhase("quiz");
  }

  function selectAnswer(answer) {
    setAnswerIds((previous) => ({ ...previous, [question.id]: answer.id }));
    setExpression(answer.expression);
    setSpeech(answer.reaction);
  }

  function goBack() {
    if (questionIndex === 0) return;
    setLieMode(false);
    setQuestionIndex((index) => index - 1);
    setExpression("thinking");
    setSpeech("Apni personality bhi edit kar raha hai?");
  }

  function goNext() {
    if (!selectedId) return;
    setLieMode(false);
    if (questionIndex === catQuestions.length - 1) {
      setExpression("celebrating");
      setSpeech("Finally! Meri shift khatam.");
      setPhase("result");
      return;
    }
    setQuestionIndex((index) => index + 1);
    if ((questionIndex + 1) === 2 || (questionIndex + 1) === 5) {
      setLieMode(true);
      setExpression("suspicious");
      setSpeech(lieDetectorLines[(questionIndex + 1) % lieDetectorLines.length]);
    } else {
      setExpression("thinking");
      setSpeech(catDialogues[(questionIndex + dialogueSeed + 2) % catDialogues.length]);
    }
  }

  function replay() {
    setPhase("welcome");
    setName("");
    setIntensity("savage");
    setQuestionIndex(0);
    setAnswerIds({});
    setExpression("idle");
    setSpeech("Phir aa gaya? Self-respect ghar chhod aaya?");
    setLieMode(false);
    setShareStatus("");
  }

  const result = useMemo(() => {
    if (phase !== "result") return null;
    return calculatePersonality(Object.values(answerIds));
  }, [phase, answerIds]);

  const personality = useMemo(() => {
    if (!result) return null;
    if (result.slug === "secret") return secretPersonality;
    const base = personalities[result.slug];
    if (result.tiedCategories.length > 1) {
      const names = result.tiedCategories.map((slug) => personalities[slug].title);
      return {
        ...base,
        title: `HYBRID: ${names.join(" + ")}`,
        description: "Dono personalities ne 50-50 custody jeet li. Yeh result expected bhi hai aur not-so-expected bhi.",
        roast: `${base.roast} Aur uske saath, backup personality bhi on duty hai.`,
        observation: "Is specimen ko ek cat nahi, full zoo ka treatment chahiye.",
      };
    }
    return base;
  }, [result]);

  const finalRoast = personality ? getFinalRoast(intensity, personality.slug) : "";

  async function shareResult() {
    setShareStatus("");
    try {
      const canvas = await generateShareCard({ name: name.trim() || "Bhai", personality, percentage: result.percentage });
      const blob = await canvasToBlob(canvas);
      if (!blob) throw new Error("Image creation failed");
      const file = new File([blob], "cat-knows-everything.png", { type: "image/png" });
      const text = `THE CAT HAS JUDGED ME — ${personality.title} (${result.percentage}% match)\n${personality.roast}\nTHE FUNNY LAB`;
      if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        await navigator.share({ title: "The Cat Knows Everything", text, files: [file] });
        setShareStatus("Shared successfully.");
        return;
      }
      if (navigator.share) {
        await navigator.share({ title: "The Cat Knows Everything", text });
        setShareStatus("Shared successfully.");
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setShareStatus("Roast copied to clipboard.");
      }
      const link = document.createElement("a");
      link.download = "cat-knows-everything.png";
      link.href = URL.createObjectURL(blob);
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
      if (!navigator.clipboard?.writeText) setShareStatus("Image downloaded.");
    } catch (error) {
      if (error?.name !== "AbortError") setShareStatus("Sharing did not complete. Please try again.");
    }
  }

  if (phase === "welcome") {
    return (
      <main className="cat-screen cat-welcome">
        <section className="cat-welcome-copy">
          <span className="cat-eyebrow">PROJECT 03 · PERSONALITY ROAST</span>
          <h1>THE CAT KNOWS<br /><span>EVERYTHING</span> <b>🐈</b></h1>
          <p className="cat-tagline">7 questions. 9 results. Zero self-respect.</p>
          <p className="cat-description">Answer honestly. This cat has no manners.</p>
          <form className="cat-start-form" onSubmit={startQuiz}>
            <label htmlFor="cat-name">YOUR NAME</label>
            <input id="cat-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Name, legend..." maxLength={24} autoComplete="given-name" />
            <fieldset className="intensity-picker">
              <legend>ROAST INTENSITY</legend>
              {["mild", "savage", "nuclear"].map((level) => (
                <button key={level} type="button" className={intensity === level ? "intensity-active" : ""} onClick={() => setIntensity(level)}>
                  <strong>{level.toUpperCase()}</strong>
                  <span>{intensityCopy[level]}</span>
                </button>
              ))}
            </fieldset>
            <button className="cat-primary-button" type="submit">LET THE CAT JUDGE ME <span>→</span></button>
          </form>
          <p className="cat-warning">⚠ Warning: Your self-respect may not survive.</p>
        </section>
        <section className="cat-mascot-stage">
          <CatMascot expression={expression} />
          <div className="cat-speech">{speech}</div>
        </section>
      </main>
    );
  }

  if (phase === "quiz") {
    return (
      <main className="cat-screen cat-quiz">
        <div className="cat-quiz-top">
          <button className="cat-back-link" type="button" onClick={onHome}>← THE FUNNY LAB</button>
          <span>QUESTION {questionIndex + 1} / {catQuestions.length}</span>
        </div>
        <div className="cat-progress"><span style={{ width: `${((questionIndex + 1) / catQuestions.length) * 100}%` }} /></div>
        <section className="cat-question-layout">
          <div className="cat-question-card">
            <span className="cat-question-count">0{questionIndex + 1}</span>
            <h2>{question.text}</h2>
            <div className="cat-answer-list">
              {question.answers.map((answer, index) => (
                <button key={answer.id} type="button" className={selectedId === answer.id ? "cat-answer selected" : "cat-answer"} onClick={() => selectAnswer(answer)}>
                  <span>{String.fromCharCode(65 + index)}</span>
                  <strong>{answer.text}</strong>
                  <b>→</b>
                </button>
              ))}
            </div>
            {selectedAnswer && <div className="cat-answer-reaction">🐾 {selectedAnswer.reaction}</div>}
            <div className="cat-question-actions">
              <button type="button" className="cat-back-button" onClick={goBack} disabled={questionIndex === 0}>← BACK</button>
              <button type="button" className="cat-primary-button" onClick={goNext} disabled={!selectedId}>{questionIndex === catQuestions.length - 1 ? "JUDGE ME" : "NEXT"} <span>→</span></button>
            </div>
          </div>
          <aside className="cat-quiz-mascot">
            <CatMascot expression={expression} />
            <div className={`cat-speech ${lieMode ? "lie-speech" : ""}`}>
              {lieMode && <span>🐾 LIE DETECTOR</span>}
              {speech}
            </div>
          </aside>
        </section>
      </main>
    );
  }

  return (
    <main className={`cat-screen cat-result ${result.slug === "secret" ? "secret-result" : ""}`}>
      <button className="cat-back-link cat-result-home" type="button" onClick={onHome}>← THE FUNNY LAB</button>
      <section className="cat-result-card">
        {result.slug === "secret" && <div className="secret-ribbon">SECRET RESULT UNLOCKED</div>}
        <div className="cat-result-mascot"><CatMascot expression={personality.expression} celebrating /></div>
        <p className="cat-result-greeting">{name.trim() || "Bhai"} has been judged</p>
        <h1>{personality.emoji} {personality.title}</h1>
        <div className="cat-match"><strong>{result.percentage}%</strong><span>PERSONALITY MATCH</span></div>
        <p className="cat-roast">“{personality.roast}”</p>
        <div className="cat-observation">
          <span>CAT'S OBSERVATION</span>
          <p>{personality.observation}</p>
        </div>
        <p className="cat-description-final">{personality.description}</p>
        <p className="cat-final-roast">🐾 {finalRoast}</p>
        <div className="cat-result-actions">
          <button type="button" className="cat-primary-button" onClick={shareResult}>SHARE ROAST</button>
          <button type="button" className="cat-secondary-button" onClick={replay}>PLAY AGAIN</button>
        </div>
        <p className="share-status" role="status">{shareStatus}</p>
      </section>
    </main>
  );
}
