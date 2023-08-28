const emoji = require("node-emoji");
const r_e = (length = 4) => {
  let emojis = [];
  while (emojis.length < length) {
    const random_emoji = emoji.random().emoji;
    if (!emojis.includes(random_emoji)) {
      emojis.push(random_emoji);
    }
  }

  for (let i = emojis.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [emojis[i], emojis[j]] = [emojis[j], emojis[i]];
  }
  let trueIndex = Math.floor(Math.random() * emojis.length);
  let trueEmoji = emojis[trueIndex];
  return { emojis: emojis, true: trueEmoji };
};
module.exports = r_e;