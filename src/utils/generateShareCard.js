export function canvasToBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png", 1));
}

export async function generateShareCard({ name, personality, percentage }) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
  gradient.addColorStop(0, "#160d26");
  gradient.addColorStop(0.55, "#28133d");
  gradient.addColorStop(1, "#4e1d55");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1080, 1080);

  ctx.fillStyle = "#ff70ba";
  ctx.font = "700 30px sans-serif";
  ctx.fillText("THE CAT KNOWS EVERYTHING", 70, 90);
  ctx.fillStyle = "#ffb15f";
  ctx.font = "700 22px sans-serif";
  ctx.fillText(`THE CAT HAS JUDGED ${String(name).toUpperCase()}`, 70, 145);

  ctx.beginPath();
  ctx.arc(540, 405, 185, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,153,86,.16)";
  ctx.fill();
  ctx.fillStyle = "#ff9a56";
  ctx.font = "700 210px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(personality.emoji, 540, 470);

  ctx.fillStyle = "#f9f3fb";
  ctx.font = "700 56px sans-serif";
  ctx.fillText(personality.title, 540, 650);
  ctx.fillStyle = "#ff70ba";
  ctx.font = "700 42px sans-serif";
  ctx.fillText(`${percentage}% PERSONALITY MATCH`, 540, 715);

  ctx.fillStyle = "#f1dfed";
  ctx.font = "600 34px sans-serif";
  const lines = wrapText(ctx, `"${personality.roast}"`, 900);
  lines.forEach((line, index) => ctx.fillText(line, 540, 790 + index * 44));

  ctx.fillStyle = "#ff9a56";
  ctx.font = "700 28px sans-serif";
  ctx.fillText("THE FUNNY LAB", 540, 990);
  ctx.textAlign = "start";
  return canvas;
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else line = test;
  });
  if (line) lines.push(line);
  return lines.slice(0, 3);
}
