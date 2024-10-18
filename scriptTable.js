"use strict";
(function (global) {
  function CharactersTable(rows_num, columns_num, cell_constructor) {
    const CLASS_TABLE = "charactersTable";
    const CLASS_ROW = "charactersRow";

    this.tableId = ++UNIQ_OBJECT_ID;
    this.content = Array();
    this.cell_constructor = cell_constructor;
    this.rows_num = rows_num;
    this.columns_num = columns_num;

    const table = document.createElement("table");
    table.classList.add(CLASS_TABLE);
    table.id = CLASS_TABLE + this.tableId;
    this.node = table;

    function createRow() {
      const row = document.createElement("tr");
      row.classList.add(CLASS_ROW);
      return row;
    }

    for (let i = 0; i != this.rows_num; ++i) {
      let row = createRow();
      for (let j = 0; j != this.columns_num; ++j) {
        const cell = new cell_constructor();
        row.appendChild(cell.createCharacterNode());
        this.content.push(cell);
      }
      this.node.appendChild(row);
    }
  }

  CharactersTable.prototype.updateCells = function (data) {
    let self = this;

    if (data === null || !(data instanceof Array)) {
      console.error("Received wrong data type: " + typeof results);
      return;
    }

    for (let i = 0; i != data.length; ++i) {
      let character = data[i];
      let cell = self.content[i];

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
  };

  global.CharactersTable = CharactersTable;
})(window);

// TODO: set functions into a prototype so it is not an newly created object for each instance of Character
// TODO: check what kind of fun will happen if `createCharacterNode` called multiple times.
