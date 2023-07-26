#!/usr/bin/node
const request = require('request');
const { argv } = require('process');
const BaseUrl = 'https://swapi-api.hbtn.io/api/films/';
function MakeRequest(url) {
  return new Promise(function (resolve, reject) {
    request(url, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve(JSON.parse(body));
      } else {
        reject(error || new Error('Request failed'));
      }
    });
  });
}
async function main() {
  if (argv.length < 3) {
    console.error('Please provide the Movie ID as the first argument.');
    process.exit(1);
  }
  try {
    const movieId = argv[2];
    const movie = await MakeRequest(BaseUrl + movieId);
    const characters = movie.characters;

    for (const characterUrl of characters) {
      const character = await MakeRequest(characterUrl);
      const characterName = character.name;
      console.log(characterName);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}
main();
