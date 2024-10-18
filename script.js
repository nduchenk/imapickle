"use strict";

const CHARACTERS_TABLE = new CharactersTable(
  20 /*columns*/,
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

getJsonData(REST_DATA_SOURCE).then((response) => {
  const results = response["results"];
  CHARACTERS_TABLE.updateCells(results);
});
