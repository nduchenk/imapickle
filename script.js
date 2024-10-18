const STATIC_DATA_LENGTH = 20;
// const STATIC_DATA_SOURCE = Array.from(Array(STATIC_DATA_LENGTH).keys()).map(
//   (id) => {
//     return {
//       id: id,
//       name: "Pickle" + id,
//       status: "Marinated",
//       species: "Cucumber",
//       image: "http://127.0.0.1:8888/image/" + id,
//     };
//   }
// );
const CHARACTERS_TABLE = new Array();
const REST_DATA_SOURCE = "https://rickandmortyapi.com/api/character";

function setInitialTablePattern() {
  function createTable() {
    const table = document.createElement("table");
    table.classList.add("charactersTable");
    return table;
  }

  function createRow() {
    const row = document.createElement("tr");
    row.classList.add("charactersRow");
    return row;
  }

  const tableContainer = document.getElementById("charactersTableContainer");
  const table = createTable();

  let row = createRow();

  // create table with 5 cells in each row
  for (let i = 0; i != STATIC_DATA_LENGTH; ++i) {
    if (i % 5 === 0) {
      row = createRow();
      table.appendChild(row);
    }
    const cell = new Character();
    const characterNode = cell.createCharacterNode();
    row.appendChild(characterNode);
    CHARACTERS_TABLE.push(cell);
  }

  tableContainer.appendChild(table);
}

function setBackButtonOnDescriptionView() {
  // Set up back to table button.
  let backToCharactersTableButton = document.getElementById(
    "backToCharactersTableButton"
  );

  backToCharactersTableButton.addEventListener("click", function () {
    const characterDescriptionContainer = document.getElementById(
      "characterDescriptionContainer"
    );
    const charactersTableContainer = document.getElementById(
      "charactersTableContainer"
    );
    characterDescriptionContainer.style.display = "none";
    charactersTableContainer.style.display = "block";
  });
}

async function updateTables() {
  const jsonData = await getJsonData(REST_DATA_SOURCE);
  const results = jsonData["results"];
  // const results = STATIC_DATA_SOURCE;

  if (results === null || !(results instanceof Array)) {
    console.error("Received wrong data type: " + typeof results);
    return;
  }

  for (let i = 0; i != results.length; ++i) {
    let character = results[i];
    let cell = CHARACTERS_TABLE[i];

    let characterId = character.id;
    if (characterId === null || characterId === undefined) {
      console.error("Character `id` is: ", typeof characterId);
      continue;
    }

    // TODO: this might get wrong very easy, create spearate class for name, species, status, image and add type checks ?
    cell.setCharacterProfile(
      characterId,
      character.name,
      character.species,
      character.status,
      character.image
    );
  }
}

async function getJsonData(url) {
  try {
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

// kind of main function ;)
(async () => {
  setBackButtonOnDescriptionView();
  setInitialTablePattern();
  await updateTables();
})();
