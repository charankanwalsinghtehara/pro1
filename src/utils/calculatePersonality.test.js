import { describe, expect, it } from "vitest";
import { catQuestions } from "../data/catQuestions.js";
import { secretAnswerIds, calculatePersonality } from "./calculatePersonality.js";

describe("cat personality scoring", () => {
  it("contains exactly seven questions and 28 unique answer reactions", () => {
    expect(catQuestions).toHaveLength(7);
    const answers = catQuestions.flatMap((question) => question.answers);
    expect(answers).toHaveLength(28);
    expect(new Set(answers.map((answer) => answer.reaction)).size).toBe(28);
  });

  it("can produce every normal personality", () => {
    const winningChoices = {
      overthinker: ["q1a", "q3c", "q5c", "q7b"],
      lazy: ["q1d", "q2c", "q4c", "q6c", "q7a"],
      bakchod: ["q1b", "q3b", "q5d", "q6d"],
      mainCharacter: ["q2b", "q4b", "q6b", "q7d"],
      anger: ["q3d", "q5b"],
      emotional: ["q3c", "q5c", "q7c"],
      intellectual: ["q2a", "q3a", "q4a", "q5a", "q6a"],
      chaos: ["q1c", "q2d", "q4d"],
    };
    Object.entries(winningChoices).forEach(([slug, answerIds]) => {
      const result = calculatePersonality(answerIds);
      expect(result.slug).toBe(slug);
    });
  });

  it("recognizes ties and unlocks only the exact secret combination", () => {
    const tie = calculatePersonality(["q1a", "q1b"]);
    expect(tie.tiedCategories.length).toBeGreaterThanOrEqual(2);
    expect(calculatePersonality(secretAnswerIds).slug).toBe("secret");
    expect(calculatePersonality([...secretAnswerIds.slice(0, -1), "q7a"]).slug).not.toBe("secret");
  });
});
