"use strict";
(function (global) {
  function CharactersTable(rows_num, columns_num, cell_constructor) {
    const CLASS_TABLE = "charactersTable";
    const CLASS_ROW = "charactersRow";

    this.tableId = ++UNIQ_OBJECT_ID;
    this.content = Array();
    this.cell_constructor = cell_constructor;

    const table = document.createElement("table");
    table.classList.add(CLASS_TABLE);
    table.id = CLASS_TABLE + this.tableId;
    this.node = table;

    function createRow() {
      const row = document.createElement("tr");
      row.classList.add(CLASS_ROW);
      return row;
    }

    for (let i = 0; i != rows_num; ++i) {
      let row = createRow();
      for (let j = 0; j != columns_num; ++j) {
        const cell = new cell_constructor();
        row.appendChild(cell.createCharacterNode());
        this.content.push(cell);
      }
      this.node.appendChild(row);
    }
  }

  global.CharactersTable = CharactersTable;
})(window);

// TODO: set functions into a prototype so it is not an newly created object for each instance of Character
// TODO: check what kind of fun will happen if `createCharacterNode` called multiple times.
