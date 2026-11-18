import { describe, expect, it } from "vitest";
import { questions } from "../data/questions.js";
import { calculateScore, scoreToPercentage } from "./calculateScore.js";
import { getCookedCategory } from "./getCookedCategory.js";

describe("quiz data and scoring", () => {
  it("contains 15 questions with four unique reactions and valid scores each", () => {
    expect(questions).toHaveLength(15);
    for (const question of questions) {
      expect(question.answers).toHaveLength(4);
      expect(new Set(question.answers.map(({ reaction }) => reaction)).size).toBe(4);
      expect(question.answers.every(({ score }) => score >= 0 && score <= 10)).toBe(true);
    }
  });

  it("sums one recorded answer per question and converts the total to a percentage", () => {
    const answers = {
      1: { score: 10 },
      2: { score: 7 },
      3: { score: 3 },
    };
    expect(calculateScore(answers)).toBe(20);
    expect(scoreToPercentage(30)).toBe(20);
    expect(scoreToPercentage(31)).toBe(21);
  });

  it.each([
    [0, "UNBOTHERED LEGEND"],
    [20, "UNBOTHERED LEGEND"],
    [21, "SLIGHTLY COOKED"],
    [40, "SLIGHTLY COOKED"],
    [41, "CERTIFIED BAKCHOD"],
    [60, "CERTIFIED BAKCHOD"],
    [61, "DEEP FRIED"],
    [80, "DEEP FRIED"],
    [81, "BEYOND SAVING"],
    [100, "BEYOND SAVING"],
  ])("maps %i%% to %s", (percentage, expectedName) => {
    expect(getCookedCategory(percentage).name).toBe(expectedName);
  });

  it("rejects percentages outside the valid range", () => {
    expect(() => getCookedCategory(-1)).toThrow(RangeError);
    expect(() => getCookedCategory(101)).toThrow(RangeError);
  });
});
