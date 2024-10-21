"use strict";
import { getNextUniqObjectId } from "./globals.js";

function Character(characterId, name, species, image_src, image_alt, status) {
  const CLASS_CELL = "characterCell";
  const CLASS_CELL_CONTAINER = "characterCellContainer";
  const CLASS_IMAGE_CONTAINER = "characterImageContainer";
  const CLASS_IMAGE = "characterAvatar";
  const CLASS_BUTTON = "characterButton";
  const CLASS_SPECIES = "characterSpecies";
  const CLASS_STATUS = "characterStatus";

  // used to set up uniq ids for each element in dom:
  this.objectId = getNextUniqObjectId();
  this.characterId = characterId || null;
  this.name = name || "";
  this.species = species || "";
  this.image_src = image_src || "";
  this.image_alt = image_alt || "Placeholder for character Picture";
  this.status = status || "";

  this.setCharacterProfile = function (
    characterId,
    name,
    species,
    status,
    image_src
  ) {
    // order is important: `setImage` will use `self.name` to set up proper `alt`
    let self = this;
    self.setCharacterId(characterId);
    self.setName(name);
    self.setSpecies(species);
    self.setStatus(status);
    self.setAvatar(image_src);
  };

  this.setCharacterId = function (characterId) {
    // Takes any value as `characterId` it is caller responsibility to check characterId;
    let self = this;
    self.characterId = characterId;
  };

  this.setName = function (name) {
    let self = this;

    if (name === null || name === undefined) {
      console.warn(`Name for id: ${self.characterId} is: ` + typeof name);
      return;
    }

    self.name = name;
    const button = document.getElementById(CLASS_BUTTON + self.objectId);
    button.innerText = name;
  };

  this.setSpecies = function (species) {
    let self = this;

    if (species === null || species === undefined) {
      console.warn(`Species for id: ${self.characterId} is: ` + typeof species);
      return;
    }

    self.species = species;
    const characterSpecies = document.getElementById(
      CLASS_SPECIES + self.objectId
    );
    characterSpecies.innerText = species;
  };

  this.setStatus = function (status) {
    let self = this;

    if (status === null || status === undefined) {
      console.warn(`Status for id: ${self.characterId} is: ` + typeof status);
      return;
    }

    self.status = status;
    const characterStatus = document.getElementById(
      CLASS_STATUS + self.objectId
    );
    characterStatus.innerText = status;
  };

  this.setAvatar = function (image_src) {
    let self = this;
    if (image_src === null || image_src === undefined) {
      console.warn(
        `Image source for id: ${self.characterId} is: ` + typeof image_src
      );
      return;
    }

    self.image_src = image_src;
    const characterAvatar = document.getElementById(
      CLASS_IMAGE + self.objectId
    );
    characterAvatar.src = image_src;
    characterAvatar.alt = "Profile picture of " + self.name;
  };

  this.createCharacterNode = function () {
    let self = this;
    // cell
    const characterCell = document.createElement("td");
    characterCell.classList.add(CLASS_CELL);
    characterCell.id = CLASS_CELL + self.objectId;
    // cell-divcharacterCellContainer
    const characterCellContainer = document.createElement("div");
    characterCellContainer.classList.add(CLASS_CELL_CONTAINER);
    characterCellContainer.id = CLASS_CELL_CONTAINER + self.objectId;
    characterCellContainer.setAttribute("data-characterId", self.characterId);
    // image-div
    const characterImageContainer = document.createElement("div");
    characterImageContainer.classList.add(CLASS_IMAGE_CONTAINER);
    characterImageContainer.id = CLASS_IMAGE_CONTAINER + self.objectId;
    // image
    const image = document.createElement("img");
    image.src = self.image_src;
    image.alt = self.image_alt;
    image.classList.add(CLASS_IMAGE);
    image.id = CLASS_IMAGE + self.objectId;
    // species
    const species = document.createElement("p");
    species.textContent = self.species;
    species.id = CLASS_SPECIES + self.objectId;
    species.classList.add(CLASS_SPECIES);
    // status
    const status = document.createElement("p");
    status.textContent = self.status;
    status.id = CLASS_STATUS + self.objectId;
    status.classList.add(CLASS_STATUS);
    // button
    const button = document.createElement("button");
    button.textContent = self.name;
    button.id = CLASS_BUTTON + self.objectId;
    button.classList.add(CLASS_BUTTON);
    button.addEventListener("click", function () {
      // get characterId
      let characterId = self.characterId;

      const numCharacterId = Number(characterId);
      if (!Number.isInteger(numCharacterId)) {
        return;
      }

      getCharacter(characterId).then((jsonData) => {
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

    characterImageContainer.appendChild(image);
    characterCellContainer.appendChild(characterImageContainer);
    characterCellContainer.appendChild(button);
    characterCellContainer.appendChild(status);
    characterCellContainer.appendChild(species);
    characterCell.appendChild(characterCellContainer);

    return characterCell;
  };
}

export { Character };

// TODO: set functions into a prototype so it is not an newly created object for each instance of Character
// TODO: check what kind of fun will happen if `createCharacterNode` called multiple times.
