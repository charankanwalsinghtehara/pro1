import { useState } from "react";
import ProgressBar from "../components/ProgressBar.jsx";
import QuestionCard from "../components/QuestionCard.jsx";

export default function CookedGame({ questions, onComplete }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const currentQuestion = questions[questionIndex];
  const selectedAnswer = answers[currentQuestion.id];

  function selectAnswer(answer) {
    setAnswers((previousAnswers) => {
      if (previousAnswers[currentQuestion.id]) return previousAnswers;
      return { ...previousAnswers, [currentQuestion.id]: answer };
    });
  }

  function goNext() {
    if (!selectedAnswer) return;
    if (questionIndex === questions.length - 1) {
      onComplete(answers);
      return;
    }
    setQuestionIndex((index) => index + 1);
  }

  return (
    <main className="game-screen">
      <div className="game-heading">
        <span className="eyebrow">HOW COOKED ARE YOU?</span>
        <span className="game-progress-label">{questionIndex + 1} of {questions.length} <span>questions</span></span>
      </div>
      <ProgressBar current={questionIndex + 1} total={questions.length} />
      <QuestionCard
        question={currentQuestion}
        questionNumber={questionIndex + 1}
        total={questions.length}
        selectedAnswer={selectedAnswer}
        onSelect={selectAnswer}
        onNext={goNext}
      />
    </main>
  );
}
