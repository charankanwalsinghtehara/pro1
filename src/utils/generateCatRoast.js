export function getFinalRoast(intensity, slug) {
  const mild = [
    "Screenshot le aur apne doston ko dikha.",
    "The cat says: thoda ajeeb hai tu.",
  ];
  const savage = [
    "Teri personality dekh ke mujhe apni billi wali life achhi lagne lagi.",
    "Main jaanwar hoon, phir bhi tujhse zyada mature hoon.",
    "Tujhe test karna meri zindagi ki sabse badi galti thi.",
  ];
  const nuclear = [
    "Aaj se tera naam mere contacts mein 'Do Not Feed' hai.",
    "Tere decisions dekh ke calculator bhi resign kar dega.",
    "Teri personality ka diagnosis dekh ke therapist ne cat ko refer kar diya.",
  ];
  const library = intensity === "mild" ? mild : intensity === "nuclear" ? nuclear : savage;
  let seed = [...slug].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return library[seed % library.length];
}
