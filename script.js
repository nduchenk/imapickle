"use strict";
const NUMBER_OF_COLUMNS_IN_A_ROW = 4;
const CHARACTERS_TABLE = new CharactersTable(
  NUMBER_OF_COLUMNS_IN_A_ROW,
  Character /*cell constructor*/
);

// attach table to its parent node.
(function () {
  const tableContainer = document.getElementById("charactersTableContainer");
  tableContainer.appendChild(CHARACTERS_TABLE.node);
})();

// Set up button on profile description page.
(function () {
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
})();

getPage(CHARACTERS_TABLE.getNextPageNumber()).then((response) => {
  const results = response["results"];
  CHARACTERS_TABLE.updateCells(results);
});

window.addEventListener("scroll", () => {
  const charactersTableContainer = document.getElementById(
    "charactersTableContainer"
  );

  if (charactersTableContainer.style.display !== "none") {
    const tableHeight = charactersTableContainer.scrollHeight;
    const scrollPosition = window.scrollY + window.innerHeight;

    // + 1 co we ceil to upper bound
    if (Math.ceil(scrollPosition) + 1 >= tableHeight) {
      getPage(CHARACTERS_TABLE.getNextPageNumber()).then((response) => {
        const results = response["results"];
        CHARACTERS_TABLE.updateCells(results);
      });
    }
  }
});

// TODO: figure out what is scrollHeight, scrollY, innerHeight
