import ResultCard from "../components/ResultCard.jsx";

export default function Results({ name, answers, onReplay }) {
  return (
    <main className="results-screen">
      <ResultCard name={name} answers={answers} onReplay={onReplay} />
    </main>
  );
}
