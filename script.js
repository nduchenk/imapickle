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

function updateDescriptionPage(id) {
  const characterDescription = document.getElementById("characterDescription");
  characterDescription.innerText = "Placeholder for ID: " + id;
}

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

    // update description page
    updateDescriptionPage(button.id);
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
