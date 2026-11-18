export default function CatMascot({ expression = "idle", celebrating = false }) {
  return (
    <div className={`cat-mascot cat-${expression} ${celebrating ? "cat-celebrating" : ""}`} aria-label={`Orange cat looks ${expression}`}>
      <div className="cat-tail" />
      <div className="cat-body">
        <span className="cat-paw cat-paw-left">•</span>
        <span className="cat-paw cat-paw-right">•</span>
        <div className="cat-head">
          <span className="cat-ear cat-ear-left" />
          <span className="cat-ear cat-ear-right" />
          <span className="cat-stripe stripe-one" />
          <span className="cat-stripe stripe-two" />
          <span className="cat-eyebrow brow-left" />
          <span className="cat-eyebrow brow-right" />
          <span className="cat-eye eye-left" />
          <span className="cat-eye eye-right" />
          <span className="cat-nose">•</span>
          <span className="cat-mouth" />
        </div>
      </div>
      <span className="cat-spark cat-spark-one">✦</span>
      <span className="cat-spark cat-spark-two">✧</span>
    </div>
  );
}
