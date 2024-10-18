"use strict";
(function (global) {
  const CLASS_TABLE = "charactersTable";
  const CLASS_ROW = "charactersRow";

  function createRow() {
    const row = document.createElement("tr");
    row.classList.add(CLASS_ROW);
    return row;
  }

  function CharactersTable(columns_num, cell_constructor) {
    this.tableId = ++UNIQ_OBJECT_ID;
    this.content = Array();
    this.cell_constructor = cell_constructor;
    this.columns_num = columns_num;
    this.current_rows_num = 0;

    const table = document.createElement("table");
    table.classList.add(CLASS_TABLE);
    table.id = CLASS_TABLE + this.tableId;
    this.node = table;
  }

  CharactersTable.prototype.updateCells = function (data) {
    // will add new cells if can't fit into existing.
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

      // create new cell in table
      if (cell === undefined) {
        let current_row = null;
        // check if need to create a new row!
        if (self.current_rows_num * self.columns_num <= self.content.length) {
          const new_row = createRow();
          self.node.appendChild(new_row);
          self.current_rows_num += 1;
          current_row = new_row;
        } else {
          current_row = Array.from(
            self.node.getElementsByClassName(CLASS_ROW)
          ).at(-1);
        }

        const newCell = new self.cell_constructor();
        current_row.appendChild(newCell.createCharacterNode());
        cell = newCell;
        self.content.push(cell);
      }

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

// TODO: do not create whole table on a fly ? preinit some part of it ?
// TODO: `cell.setCharacterProfile`: this might get wrong very easy, create spearate class for name, species, status, image and add type checks ?
// TODO: set functions into a prototype so it is not an newly created object for each instance of Character
// TODO: check what kind of fun will happen if `createCharacterNode` called multiple times.
// TODO: check if data can fit into a table 1 time and do not crate cells in a loop ?
