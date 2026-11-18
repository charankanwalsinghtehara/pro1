import { catQuestions } from "../data/catQuestions.js";

export const emptyScores = () => ({
  overthinker: 0, lazy: 0, bakchod: 0, mainCharacter: 0,
  anger: 0, emotional: 0, intellectual: 0, chaos: 0,
});

// Rare, documented Easter egg: all seven "maximum chaos" choices.
// With 4^7 possible answer sequences, this exact combination is 1 in 16384.
export const secretAnswerIds = ["q1c", "q2d", "q3d", "q4d", "q5c", "q6d", "q7d"];

export function calculatePersonality(answerIds) {
  const scores = emptyScores();
  answerIds.forEach((answerId) => {
    catQuestions.forEach((question) => {
      const answer = question.answers.find((option) => option.id === answerId);
      if (answer) Object.entries(answer.scores).forEach(([category, points]) => {
        scores[category] += points;
      });
    });
  });

  const secretUnlocked = secretAnswerIds.every((answerId) => answerIds.includes(answerId));
  if (secretUnlocked) return { scores, slug: "secret", score: 21, percentage: 100, tiedCategories: [] };

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const topScore = ranked[0][1];
  const tiedCategories = ranked.filter(([, score]) => score === topScore).map(([slug]) => slug);
  const slug = tiedCategories[0];
  const total = Object.values(scores).reduce((sum, value) => sum + value, 0);
  const percentage = total ? Math.round((topScore / total) * 100) : 0;
  return { scores, slug, score: topScore, percentage, tiedCategories };
}
