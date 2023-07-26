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
        reject(error);
      }
    });
  });
}

async function main() {
  try {
    const movie = await MakeRequest(BaseUrl + argv[2]);
    const characters = movie.characters;

    for (const element of characters) {
      const character = await MakeRequest(element);
      const CharacterName = character.name;
      console.log(CharacterName);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
