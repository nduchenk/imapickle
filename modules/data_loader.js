"use strict";
const REST_DATA_SOURCE = "https://rickandmortyapi.com/api/character";

async function getPage(pageNumber) {
  return getJsonData(REST_DATA_SOURCE + `/?page=${pageNumber}`);
}

async function getCharacter(characterId) {
  return getJsonData(REST_DATA_SOURCE + `/${characterId}`);
}

async function getJsonData(url) {
  try {
    console.info(`GET request to: ${url}`);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export { getPage, getCharacter };

//   const MOCK_DATA_SOURCE = {
//     characters: Array.from(Array(20).keys()).map((id) => {
//       return {
//         id: id,
//         name: "Pickle" + id,
//         status: "Marinated",
//         species: "Cucumber",
//         image: "http://127.0.0.1:8888/image/" + id,
//       };
//     }),
//   };
