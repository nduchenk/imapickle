// const INITIAL_CHARACTERS_TABLE_LENGTH = 20;
// const STATIC_DATA_LENGTH = 20;
// const STATIC_DATA_SOURCE = Array.from(Array(STATIC_DATA_LENGTH).keys()).map(
//   (id) => {
//     return {
//       id: id,
//       name: "Pickle" + id,
//       status: "Marinated",
//       species: "Cucumber",
//       image: "http://localhost:8888/image",
//     };
//   }
// );
const REST_DATA_SOURCE = "https://rickandmortyapi.com/api/character";

// Set up buttons for each character to its description.
let buttons = Array.from(document.getElementsByClassName("ButtonName"));

for (let i = 0; i != buttons.length; ++i) {
  let button = buttons[i];

  button.addEventListener("click", function () {
    const description = document.getElementById(
      "characterDescriptionContainer"
    );
    const charactersTableContainer = document.getElementById(
      "charactersTableContainer"
    );

    let characterId = this.getAttribute("data-characterId");
    updateDescriptionPage(characterId);
    charactersTableContainer.style.display = "none";
    description.style.display = "block";
  });
}

// Set up back to table button.
let backToCharactersTableButton = document.getElementById(
  "backToCharactersTableButton"
);

backToCharactersTableButton.addEventListener("click", function () {
  const description = document.getElementById("characterDescriptionContainer");
  const charactersTableContainer = document.getElementById(
    "charactersTableContainer"
  );
  description.style.display = "none";
  charactersTableContainer.style.display = "block";
});

async function updateTables() {
  const jsonData = await getJsonData(REST_DATA_SOURCE);
  const results = jsonData["results"];

  if (results === null || !(results instanceof Array)) {
    console.error("Received wrong data type: " + typeof results);
    return;
  }

  // Hmmmm... Seems the order is always same and follows tree logic.
  // Or it is better to select do select in a foor loop ???
  let characterSpecies = Array.from(
    document.getElementsByClassName("characterSpecies")
  );
  let characterStatus = Array.from(
    document.getElementsByClassName("characterStatus")
  );
  let chracterButtons = Array.from(
    document.getElementsByClassName("ButtonName")
  );
  let characterAvatars = Array.from(
    document.getElementsByClassName("characterAvatar")
  );

  // TODO: refactor this spaghetti
  for (let i = 0; i != results.length; ++i) {
    let character = results[i];

    let characterId = character["id"];
    if (characterId === null || characterId === undefined) {
      console.error("Character `id` is: ", typeof characterId);
      continue;
    }

    let characterButton = chracterButtons[i];
    characterButton.setAttribute("data-characterId", characterId);
    let name = character["name"];
    if (name === null || name === undefined) {
      console.warn(`Name for id: ${characterId} is: ` + typeof name);
    } else {
      characterButton.innerText = name;
    }

    let status = character["status"];
    if (status === null || status === undefined) {
      console.warn(`Status for id: ${characterId} is: ` + typeof status);
    } else {
      characterStatus[i].innerText = status;
    }

    let species = character["species"];
    if (species === null || species === undefined) {
      console.warn(`Species for id: ${characterId} is: ` + typeof species);
    } else {
      characterSpecies[i].innerText = species;
    }

    let image_src = character["image"];
    if (image_src === null || image_src === undefined) {
      console.warn(
        `Image source for id: ${characterId} is: ` + typeof image_src
      );
    } else {
      characterAvatars[i].src = image_src;
    }
  }
}

// update description page
function updateDescriptionPage(characterId) {
  const characterDescription = document.getElementById("characterDescription");
  characterDescription.innerText = "Placeholder for ID: " + characterId;
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

(async () => {
  await updateTables();
})();
