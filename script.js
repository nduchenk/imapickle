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
const CHARACTERS_TABLE = new Array(STATIC_DATA_LENGTH);
const REST_DATA_SOURCE = "https://rickandmortyapi.com/api/character";

function Character(characterId, name, species, image_src, image_alt, status) {
  this.characterId = characterId || null;
  this.name = name || "";
  this.species = species || "";
  this.image_src = image_src || "";
  this.image_alt = image_alt || "Placeholder for character Picture";
  this.status = status || "";

  this.createCellNode = function () {
    let self = this;
    // cell
    const characterCell = document.createElement("td");
    characterCell.classList.add("characterCell");
    // cell-divcharacterCellContainer
    const characterCellContainer = document.createElement("div");
    characterCellContainer.classList.add("characterCellContainer");
    characterCellContainer.setAttribute("data-characterId", self.characterId);
    // image-div
    const characterImageContainer = document.createElement("div");
    characterImageContainer.classList.add("characterImageContainer");
    // image
    const image = document.createElement("img");
    image.src = self.image_src;
    image.alt = self.image_alt;
    image.classList.add("characterAvatar");
    // button
    const button = document.createElement("button");
    button.textContent = self.name;
    button.classList.add("characterButton");
    button.setAttribute("data-characterId", self.characterId);
    button.addEventListener("click", function () {
      // get characterId
      let characterId = this.getAttribute("data-characterId");

      const numCharacterId = Number(characterId);
      if (!Number.isInteger(numCharacterId)) {
        return;
      }

      console.log("HA" + characterId);

      getJsonData(REST_DATA_SOURCE + `/${characterId}`).then((jsonData) => {
        // set new character description
        const characterDescriptionContainer = document.getElementById(
          "characterDescriptionContainer"
        );
        const characterDescription = document.getElementById(
          "characterDescription"
        );
        characterDescription.innerText = JSON.stringify(jsonData);
        const charactersTableContainer = document.getElementById(
          "charactersTableContainer"
        );

        // change visibility of div elements
        charactersTableContainer.style.display = "none";
        characterDescriptionContainer.style.display = "block";
      });
    });

    // species
    const species = document.createElement("p");
    species.textContent = self.species;
    species.classList.add("characterSpecies");
    // status
    const status = document.createElement("p");
    status.textContent = self.status;
    status.classList.add("characterStatus");

    characterImageContainer.appendChild(image);
    characterCellContainer.appendChild(characterImageContainer);
    characterCellContainer.appendChild(button);
    characterCellContainer.appendChild(status);
    characterCellContainer.appendChild(species);
    characterCell.appendChild(characterCellContainer);

    return characterCell;
  };
}

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
    const cellNode = cell.createCellNode();
    row.appendChild(cellNode);
    CHARACTERS_TABLE.push(cell);
  }

  tableContainer.appendChild(table);
}

function setBackButton() {
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

  // Hmmmm... Seems the order is always same and follows tree logic.
  // Or it is better to select do select in a foor loop ???
  let characterSpecies = Array.from(
    document.getElementsByClassName("characterSpecies")
  );
  let characterStatus = Array.from(
    document.getElementsByClassName("characterStatus")
  );
  let chracterButtons = Array.from(
    document.getElementsByClassName("characterButton")
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
      characterAvatars[i].alt = "Profile picture of " + name;
    }
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
  setBackButton();
  setInitialTablePattern();
  await updateTables();
})();
