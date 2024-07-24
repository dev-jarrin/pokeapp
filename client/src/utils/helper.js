function capitalizeFirstWord(str) {
  if (!str) return str;

  let words = str.split(" ");

  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

  return words.join(" ");
}

export { capitalizeFirstWord };
