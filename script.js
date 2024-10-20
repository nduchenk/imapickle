"use strict";
const NUMBER_OF_COLUMNS_IN_A_ROW = 4;
const CHARACTERS_TABLE = new CharactersTable(
  NUMBER_OF_COLUMNS_IN_A_ROW,
  Character /*cell constructor*/
);
var SCROLL_POSITION = window.scrollY;

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
    window.scrollTo(0, SCROLL_POSITION);
  });
})();

getPage(CHARACTERS_TABLE.getNextPageNumber()).then((response) => {
  const results = response["results"];
  CHARACTERS_TABLE.updateCells(results);
});

window.addEventListener(
  "scroll",
  debounce(() => {
    const charactersTableContainer = document.getElementById(
      "charactersTableContainer"
    );

    if (charactersTableContainer.style.display !== "none") {
      SCROLL_POSITION = window.scrollY;
      const tableHeight = charactersTableContainer.scrollHeight;
      const maxScrollPosition = SCROLL_POSITION + window.innerHeight;

      // + 1 co we ceil to upper bound
      if (Math.ceil(maxScrollPosition) + 1 >= tableHeight) {
        getPage(CHARACTERS_TABLE.getNextPageNumber()).then((response) => {
          const results = response["results"];
          CHARACTERS_TABLE.updateCells(results);
        });
      }
    }
  }, 100)
);

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout); // Clear any previous timeout
    timeout = setTimeout(() => func.call(this, args), wait);
  };
}

// TODO: figure out what is scrollHeight, scrollY, innerHeight
