"use strict";

const CHARACTERS_TABLE = new CharactersTable(5, 4, Character);

const tableContainer = document.getElementById("charactersTableContainer");
tableContainer.appendChild(CHARACTERS_TABLE.node);

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
    let cell = CHARACTERS_TABLE.content[i];
    console.log(cell);

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

// kind of main function ;)
(async () => {
  setBackButtonOnDescriptionView();
  await updateTables();
})();
