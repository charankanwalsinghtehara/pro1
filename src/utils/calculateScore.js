export function calculateScore(answers) {
  return Object.values(answers).reduce((total, answer) => total + answer.score, 0);
}

export function scoreToPercentage(totalScore) {
  return Math.round((totalScore / 150) * 100);
}
