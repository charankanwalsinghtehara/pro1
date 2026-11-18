export default function ProgressBar({ current, total }) {
  const progress = (current / total) * 100;

  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label="Quiz progress"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
    >
      <div className="progress-fill" style={{ width: `${progress}%` }} />
      <span className="progress-spark" style={{ left: `${progress}%` }} aria-hidden="true">✦</span>
    </div>
  );
}
