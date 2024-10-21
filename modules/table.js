"use strict";
import { getNextUniqObjectId } from "./globals.js";

const CLASS_TABLE = "charactersTable";
const CLASS_ROW = "charactersRow";

function createRow() {
  const row = document.createElement("tr");
  row.classList.add(CLASS_ROW);
  return row;
}

function CharactersTable(columns_num, cell_constructor) {
  this.tableId = getNextUniqObjectId();
  this.content = Array();
  this.cell_constructor = cell_constructor;
  this.columns_num = columns_num;
  this.current_rows_num = 0;
  this.current_max_page_loaded = 0;

  const table = document.createElement("table");
  table.classList.add(CLASS_TABLE);
  table.id = CLASS_TABLE + this.tableId;
  this.node = table;
}

CharactersTable.prototype.getNextPageNumber = function (max_page) {
  let self = this;
  return self.current_max_page_loaded + 1;
};
CharactersTable.prototype.getCurrentMaxPageLoaded = function () {
  let self = this;
  return self.current_max_page_loaded;
};
CharactersTable.prototype.extendCharacters = function (response) {
  // always extends existing content
  let self = this;

  const data = response["results"];
  if (!(data instanceof Array)) {
    console.error("Received wrong data type: " + typeof results);
    return;
  }

  for (let i = 0; i != data.length; ++i) {
    try {
      // create new cell in table if needed.
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

      const newCell = new self.cell_constructor(data[i]);
      self.content.push(newCell);
      current_row.appendChild(newCell.node);
    } catch (err) {
      console.error(`Failed to set character: ${err}`);
      continue;
    }
  }

  self.current_max_page_loaded += 1;
};

export { CharactersTable };

// TODO: do not create whole table on a fly ? preinit some part of it ?
// TODO: `cell.setCharacterProfile`: this might get wrong very easy, create spearate class for name, species, status, image and add type checks ?
// TODO: set functions into a prototype so it is not an newly created object for each instance of Character
// TODO: check what kind of fun will happen if `createCharacterNode` called multiple times.
// TODO: check if data can fit into a table 1 time and do not crate cells in a loop ?
