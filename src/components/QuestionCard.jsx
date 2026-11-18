import AnswerOption from "./AnswerOption.jsx";

export default function QuestionCard({
  question,
  questionNumber,
  total,
  selectedAnswer,
  onSelect,
  onNext,
}) {
  const isLast = questionNumber === total;

  return (
    <section className="question-card" aria-labelledby="question-title">
      <div className="question-meta">
        <span className="eyebrow">THE COOKING HAS BEGUN</span>
        <span className="question-count">{String(questionNumber).padStart(2, "0")} <span>/ {total}</span></span>
      </div>
      <h1 id="question-title" className="question-title">{question.question}</h1>
      <p className="answer-prompt">Choose your most honest answer. We can tell when you lie. Probably.</p>
      <div className="answer-list">
        {question.answers.map((answer, index) => (
          <AnswerOption
            key={`${question.id}-${answer.text}`}
            answer={answer}
            index={index}
            selected={selectedAnswer === answer}
            disabled={Boolean(selectedAnswer)}
            onSelect={() => onSelect(answer)}
          />
        ))}
      </div>
      {selectedAnswer && (
        <div className="answer-reaction" role="status" aria-live="polite">
          <span aria-hidden="true">↳</span> {selectedAnswer.reaction}
        </div>
      )}
      <div className="question-footer">
        <span className="tiny-note">NO WRONG ANSWERS. JUST BAD DECISIONS.</span>
        <button className="button button-primary next-button" type="button" onClick={onNext} disabled={!selectedAnswer}>
          {isLast ? "SHOW MY DAMAGE" : "NEXT QUESTION"}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
