(function (global) {
  function Character(characterId, name, species, image_src, image_alt, status) {
    this.characterId = characterId || null;
    this.name = name || "";
    this.species = species || "";
    this.image_src = image_src || "";
    this.image_alt = image_alt || "Placeholder for character Picture";
    this.status = status || "";

    this.createCharacterNode = function () {
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

  global.Character = Character;
})(window);
