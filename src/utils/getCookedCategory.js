import { cookedCategories } from "../data/results.js";

export function getCookedCategory(percentage) {
  const category = cookedCategories.find(
    ({ min, max }) => percentage >= min && percentage <= max,
  );

  if (!category) {
    throw new RangeError(`Cooked percentage must be between 0 and 100: ${percentage}`);
  }

  return category;
}
