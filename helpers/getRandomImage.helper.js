const { default: axios } = require("axios");

async function getRandomImage() {
  const MAX_NUMBER = 826;

  const randomNumber = Math.random() * MAX_NUMBER;
  let round = Math.ceil(randomNumber);

  if (round === 0) {
    round = 1;
  }

  const res = await axios.get(`https://rickandmortyapi.com/api/character/${round}`);

  const character = res.data;

  return character.image;
}

module.exports = getRandomImage;
