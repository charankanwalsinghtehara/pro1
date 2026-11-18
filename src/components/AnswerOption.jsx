export default function AnswerOption({
  answer,
  index,
  selected,
  disabled,
  onSelect,
}) {
  return (
    <button
      className={`answer-option${selected ? " is-selected" : ""}`}
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
    >
      <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
      <span className="answer-text">{answer.text}</span>
      <span className="answer-arrow" aria-hidden="true">{selected ? "✓" : "↗"}</span>
    </button>
  );
}
